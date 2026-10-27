"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  createUserSession,
  destroyUserSession,
  getCurrentUser,
} from "@/lib/auth";
import { MissingAuthSecretError } from "@/lib/session-crypto";
import {
  clearRateLimit,
  getRequestIpHash,
  isRateLimited,
  recordRateLimitHit,
} from "@/lib/rate-limit";
import { recordAuditLog } from "@/lib/audit";
import { portalLoginSchema, type PortalLoginState } from "./schema";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const MAX_EMAIL_FAILURES = 5;
const MAX_IP_FAILURES = 15;

// Precomputed cost-10 bcrypt hash equalizes response timing when an email does not exist.
const DUMMY_PASSWORD_HASH =
  "$2b$10$wMcwDAlTUjuVNo34TaHac.f3K3s3Qb.L1PpyINEKgI9CTx2CPGkdi";

export async function loginPortalAction(
  _prevState: PortalLoginState,
  formData: FormData
): Promise<PortalLoginState> {
  const parsed = portalLoginSchema.safeParse({
    email: typeof formData.get("email") === "string" ? formData.get("email") : "",
    password:
      typeof formData.get("password") === "string" ? formData.get("password") : "",
  });

  if (!parsed.success) {
    const fieldErrors: { email?: string[]; password?: string[] } = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "email" || field === "password") {
        fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
      }
    }
    return {
      status: "error",
      message: "Periksa kembali email dan kata sandi yang Anda masukkan.",
      fieldErrors,
    };
  }

  const { email, password } = parsed.data;
  const emailLimitKey = `auth:email:${email}`;

  let loginSucceeded = false;

  try {
    const ipHash = await getRequestIpHash();
    const ipLimitKey = `auth:ip:${ipHash}`;

    const [emailCheck, ipCheck] = await Promise.all([
      isRateLimited(emailLimitKey, MAX_EMAIL_FAILURES),
      isRateLimited(ipLimitKey, MAX_IP_FAILURES),
    ]);

    if (emailCheck.limited || ipCheck.limited) {
      const waitMinutes = Math.max(
        1,
        Math.ceil(
          Math.max(emailCheck.retryAfterSeconds, ipCheck.retryAfterSeconds) / 60
        )
      );
      await recordAuditLog({
        action: "auth.login.locked",
        entityType: "User",
        summary: { waitMinutes },
        ipHash,
      });
      return {
        status: "error",
        message: `Terlalu banyak percobaan gagal. Coba kembali dalam ${waitMinutes} menit.`,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        isActive: true,
        sessionVersion: true,
      },
    });

    const passwordMatches = await bcrypt.compare(
      password,
      user?.passwordHash || DUMMY_PASSWORD_HASH
    );

    if (!user || !user.passwordHash || !user.isActive || !passwordMatches) {
      await Promise.all([
        recordRateLimitHit(emailLimitKey, LOGIN_WINDOW_SECONDS),
        recordRateLimitHit(ipLimitKey, LOGIN_WINDOW_SECONDS),
      ]);
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

      return {
        status: "error",
        message: "Email atau kata sandi tidak sesuai.",
      };
    }

    await createUserSession(user.id, user.sessionVersion);

    await Promise.all([
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
    ]);

    loginSucceeded = true;
  } catch (error) {
    if (error instanceof MissingAuthSecretError) {
      console.error("AUTH_SECRET is missing or shorter than 32 characters.");
      return {
        status: "error",
        message:
          "Konfigurasi kunci sesi server belum lengkap. Hubungi pengelola infrastruktur.",
      };
    }

    console.error("Portal authentication failed:", error instanceof Error ? error.message : "unknown");
    return {
      status: "error",
      message: "Layanan autentikasi sedang mengalami gangguan. Coba beberapa saat lagi.",
    };
  }

  if (loginSucceeded) {
    // Server-side redirect keeps the destination prefix out of client-side markup and bundles.
    redirect("/admin");
  }

  return { status: "idle" };
}

export async function logoutPortalAction(): Promise<void> {
  try {
    const [user, ipHash] = await Promise.all([
      getCurrentUser(),
      getRequestIpHash(),
    ]);
    await destroyUserSession();

    if (user) {
      await recordAuditLog({
        userId: user.id,
        action: "auth.logout",
        entityType: "User",
        entityId: user.id,
        ipHash,
      });
    }
  } catch (error) {
    console.error("Portal logout cleanup error:", error instanceof Error ? error.message : "unknown");
  }

  redirect("/");
}
