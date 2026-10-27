"use server";

import bcrypt from "bcryptjs";
import { redirect, unstable_rethrow } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createUserSession,
  destroyUserSession,
  getCurrentUser,
} from "@/lib/auth";
import { MissingAuthSecretError } from "@/lib/session-crypto";
import {
  DatabaseTimeoutError,
  verifySameOriginMutation,
  withServerTimeout,
} from "@/lib/request-security";
import {
  clearRateLimit,
  getRequestIpHash,
  isRateLimited,
  recordRateLimitHit,
} from "@/lib/rate-limit";
import { recordAuditLog } from "@/lib/audit";
import {
  extractPortalFieldErrors,
  portalLoginSchema,
  type PortalLoginState,
} from "./schema";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const BURST_WINDOW_SECONDS = 5 * 60;
const MAX_EMAIL_FAILURES = 5;
const MAX_IP_FAILURES = 15;
const MAX_IP_BURST_ATTEMPTS = 25;
const AUTH_DB_TIMEOUT_MS = 10_000;
const LOGOUT_CLEANUP_TIMEOUT_MS = 5_000;
const MAX_FORM_ENTRIES = 12;

// Precomputed cost-10 bcrypt hash equalizes response timing when an email does not exist.
const DUMMY_PASSWORD_HASH =
  "$2b$10$wMcwDAlTUjuVNo34TaHac.f3K3s3Qb.L1PpyINEKgI9CTx2CPGkdi";

function isTransientDatabaseConnectivityError(error: unknown): boolean {
  if (error instanceof DatabaseTimeoutError) return true;
  if (!(error instanceof Error)) return false;

  const code = (error as { code?: string }).code;
  if (code && ["P1001", "P1002", "P1008", "P1017"].includes(code)) {
    return true;
  }

  return /can't reach database|connection.*closed|timed? out|econnreset|etimedout|enotfound/i.test(
    error.message
  );
}

export async function submitPortalLoginAction(
  formData: FormData
): Promise<PortalLoginState> {
  if (!(formData instanceof FormData)) {
    return {
      status: "error",
      errorKind: "validation",
      message: "Format pengiriman formulir tidak valid.",
    };
  }

  let entryCount = 0;
  for (const entry of formData.entries()) {
    void entry;
    entryCount += 1;
    if (entryCount > MAX_FORM_ENTRIES) {
      return {
        status: "error",
        errorKind: "validation",
        message: "Permintaan ditolak karena jumlah atribut melebihi batas.",
      };
    }
  }

  let loginSucceeded = false;

  try {
    const originCheck = await verifySameOriginMutation();
    if (!originCheck.allowed) {
      const ipHash = await getRequestIpHash();
      await recordAuditLog({
        action: "auth.csrf.blocked",
        entityType: "User",
        summary: { reason: originCheck.reason ?? "origin_rejected" },
        ipHash,
      });
      return {
        status: "error",
        errorKind: "csrf",
        message:
          "Permintaan ditolak karena asal halaman tidak terverifikasi. Muat ulang halaman lalu coba kembali.",
      };
    }

    const ipHash = await getRequestIpHash();
    const burstLimitKey = `auth:burst:ip:${ipHash}`;
    const ipLimitKey = `auth:ip:${ipHash}`;

    const burstCheck = await withServerTimeout(
      isRateLimited(burstLimitKey, MAX_IP_BURST_ATTEMPTS),
      AUTH_DB_TIMEOUT_MS,
      "burstRateLimitCheck"
    );

    if (burstCheck.limited) {
      const waitMinutes = Math.max(1, Math.ceil(burstCheck.retryAfterSeconds / 60));
      return {
        status: "error",
        errorKind: "locked",
        retryAfterSeconds: burstCheck.retryAfterSeconds,
        message: `Terlalu banyak permintaan dari jaringan ini. Coba kembali dalam ${waitMinutes} menit.`,
      };
    }

    const honeypotRaw = formData.get("workExtension");
    if (typeof honeypotRaw === "string" && honeypotRaw.trim().length > 0) {
      await Promise.all([
        recordRateLimitHit(burstLimitKey, BURST_WINDOW_SECONDS),
        recordRateLimitHit(ipLimitKey, LOGIN_WINDOW_SECONDS),
        bcrypt.compare("bot-honeypot-padding", DUMMY_PASSWORD_HASH),
      ]);
      await recordAuditLog({
        action: "auth.login.bot_blocked",
        entityType: "User",
        summary: { reason: "honeypot_triggered" },
        ipHash,
      });
      return {
        status: "error",
        errorKind: "credentials",
        message: "Email atau kata sandi tidak sesuai.",
      };
    }

    const parsed = portalLoginSchema.safeParse({
      email: typeof formData.get("email") === "string" ? formData.get("email") : "",
      password:
        typeof formData.get("password") === "string" ? formData.get("password") : "",
    });

    if (!parsed.success) {
      await withServerTimeout(
        recordRateLimitHit(burstLimitKey, BURST_WINDOW_SECONDS),
        AUTH_DB_TIMEOUT_MS,
        "recordValidationBurst"
      );
      return {
        status: "error",
        errorKind: "validation",
        message: "Periksa kembali email dan kata sandi yang Anda masukkan.",
        fieldErrors: extractPortalFieldErrors(parsed.error.issues),
      };
    }

    const { email, password } = parsed.data;
    const emailLimitKey = `auth:email:${email}`;

    const [emailCheck, ipCheck] = await withServerTimeout(
      Promise.all([
        isRateLimited(emailLimitKey, MAX_EMAIL_FAILURES),
        isRateLimited(ipLimitKey, MAX_IP_FAILURES),
      ]),
      AUTH_DB_TIMEOUT_MS,
      "credentialRateLimitCheck"
    );

    if (emailCheck.limited || ipCheck.limited) {
      const retryAfterSeconds = Math.max(
        emailCheck.retryAfterSeconds,
        ipCheck.retryAfterSeconds
      );
      const waitMinutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
      await recordAuditLog({
        action: "auth.login.locked",
        entityType: "User",
        summary: { waitMinutes },
        ipHash,
      });
      return {
        status: "error",
        errorKind: "locked",
        retryAfterSeconds,
        message: `Terlalu banyak percobaan gagal. Coba kembali dalam ${waitMinutes} menit.`,
      };
    }

    const user = await withServerTimeout(
      prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          role: true,
          isActive: true,
          sessionVersion: true,
        },
      }),
      AUTH_DB_TIMEOUT_MS,
      "findPortalUser"
    );

    const passwordMatches = await bcrypt.compare(
      password,
      user?.passwordHash || DUMMY_PASSWORD_HASH
    );

    if (!user || !user.passwordHash || !user.isActive || !passwordMatches) {
      const [emailHit, ipHit] = await withServerTimeout(
        Promise.all([
          recordRateLimitHit(emailLimitKey, LOGIN_WINDOW_SECONDS),
          recordRateLimitHit(ipLimitKey, LOGIN_WINDOW_SECONDS),
          recordRateLimitHit(burstLimitKey, BURST_WINDOW_SECONDS),
        ]),
        AUTH_DB_TIMEOUT_MS,
        "recordFailedLoginHits"
      );

      await recordAuditLog({
        userId: user?.id ?? null,
        action: "auth.login.failed",
        entityType: "User",
        entityId: user?.id ?? null,
        summary: {
          reason: !user
            ? "unknown_account"
            : !user.isActive
              ? "inactive_account"
              : "invalid_password",
        },
        ipHash,
      });

      if (emailHit.count >= MAX_EMAIL_FAILURES || ipHit.count >= MAX_IP_FAILURES) {
        const retryAfterSeconds = Math.max(
          emailHit.retryAfterSeconds,
          ipHit.retryAfterSeconds
        );
        const waitMinutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
        return {
          status: "error",
          errorKind: "locked",
          retryAfterSeconds,
          message: `Batas percobaan tercapai. Akun dikunci sementara selama ${waitMinutes} menit.`,
        };
      }

      return {
        status: "error",
        errorKind: "credentials",
        message: "Email atau kata sandi tidak sesuai.",
      };
    }

    await createUserSession(user.id, user.sessionVersion);

    await withServerTimeout(
      Promise.all([
        clearRateLimit(emailLimitKey),
        prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        }),
        recordAuditLog({
          userId: user.id,
          action: "auth.login.success",
          entityType: "User",
          entityId: user.id,
          summary: { role: user.role },
          ipHash,
        }),
      ]),
      AUTH_DB_TIMEOUT_MS,
      "finalizePortalLogin"
    );

    loginSucceeded = true;
  } catch (error) {
    unstable_rethrow(error);

    if (error instanceof MissingAuthSecretError) {
      console.error("AUTH_SECRET is missing or fails entropy requirements.");
      return {
        status: "error",
        errorKind: "server",
        message:
          "Konfigurasi kunci sesi server belum lengkap. Hubungi pengelola infrastruktur.",
      };
    }

    if (isTransientDatabaseConnectivityError(error)) {
      console.error(
        "Transient database connectivity failure during login:",
        error instanceof Error ? error.message : "unknown"
      );
      return {
        status: "error",
        errorKind: "timeout",
        message:
          "Koneksi server ke database sedang melambat atau terputus sementara. Silakan coba lagi dalam beberapa detik.",
      };
    }

    console.error(
      "Portal authentication failed:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      status: "error",
      errorKind: "server",
      message: "Layanan autentikasi sedang mengalami gangguan. Coba beberapa saat lagi.",
    };
  }

  if (loginSucceeded) {
    // Server-side redirect keeps the destination prefix out of client-side markup and bundles.
    redirect("/admin");
  }

  return { status: "idle" };
}

export async function loginPortalAction(
  _prevState: PortalLoginState,
  formData: FormData
): Promise<PortalLoginState> {
  return submitPortalLoginAction(formData);
}

export async function logoutPortalAction(): Promise<{ ok: false; message: string } | never> {
  const originCheck = await verifySameOriginMutation();
  if (!originCheck.allowed) {
    return {
      ok: false,
      message: "Permintaan keluar ditolak karena asal halaman tidak valid.",
    };
  }

  // Always clear the local cookie even if PostgreSQL is temporarily unreachable.
  let currentUserId: string | null = null;
  let ipHash: string | null = null;

  try {
    const [user, resolvedIpHash] = await withServerTimeout(
      Promise.all([getCurrentUser(), getRequestIpHash()]),
      LOGOUT_CLEANUP_TIMEOUT_MS,
      "logoutReadContext"
    );
    currentUserId = user?.id ?? null;
    ipHash = resolvedIpHash;
  } catch (error) {
    unstable_rethrow(error);
    console.error(
      "Portal logout context lookup degraded:",
      error instanceof Error ? error.message : "unknown"
    );
  }

  await destroyUserSession();

  if (currentUserId) {
    try {
      await withServerTimeout(
        recordAuditLog({
          userId: currentUserId,
          action: "auth.logout",
          entityType: "User",
          entityId: currentUserId,
          ipHash,
        }),
        LOGOUT_CLEANUP_TIMEOUT_MS,
        "logoutAuditWrite"
      );
    } catch (error) {
      unstable_rethrow(error);
    }
  }

  redirect("/");
}
