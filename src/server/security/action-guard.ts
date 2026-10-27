import "server-only";
import { unstable_rethrow } from "next/navigation";
import { authorizeAction, type AuthenticatedUser } from "./auth";
import { hasPermission, type Permission } from "./permissions";
import { verifySameOriginMutation, withServerTimeout } from "./csrf";
import { getRequestIpHash, isRateLimited, recordRateLimitHit } from "./rate-limit";
import { recordAuditLog } from "./audit";
import { toSafeMutationError, type ActionResult } from "../config/result";

const MUTATION_TIMEOUT_MS = 10_000;
const MUTATION_WINDOW_SECONDS = 5 * 60;
const MAX_STANDARD_MUTATIONS = 60;
const MAX_DESTRUCTIVE_MUTATIONS = 20;

export interface ProtectedActionContext {
  user: AuthenticatedUser;
  ipHash: string;
}

export interface ProtectedActionOptions {
  actionName: string;
  permission: Permission;
  destructive?: boolean;
  timeoutMs?: number;
}

// Enforces the full security pipeline on every CMS Server Action:
// Origin/CSRF -> Session & Live DB User -> RBAC Permission -> Rate Limit -> Timeout -> Safe Error.
export async function runProtectedAction<T>(
  options: ProtectedActionOptions,
  handler: (ctx: ProtectedActionContext) => Promise<ActionResult<T>>
): Promise<ActionResult<T>> {
  const timeoutMs = options.timeoutMs ?? MUTATION_TIMEOUT_MS;

  try {
    const originCheck = await verifySameOriginMutation();
    if (!originCheck.allowed) {
      const ipHash = await getRequestIpHash();
      await recordAuditLog({
        action: `${options.actionName}.csrf_blocked`,
        entityType: "Security",
        summary: { reason: originCheck.reason ?? "origin_mismatch" },
        ipHash,
      });
      return {
        ok: false,
        errorKind: "forbidden",
        error:
          "Permintaan ditolak karena asal halaman tidak terverifikasi. Muat ulang halaman lalu coba kembali.",
      };
    }

    const authResult = await authorizeAction(options.permission);
    if (!authResult.ok) {
      return {
        ok: false,
        errorKind: "forbidden",
        error: authResult.error,
      };
    }

    const { user } = authResult;
    const ipHash = await getRequestIpHash();
    const rateKey = options.destructive
      ? `admin:del:${user.id}`
      : `admin:mut:${user.id}`;
    const maxAllowed = options.destructive
      ? MAX_DESTRUCTIVE_MUTATIONS
      : MAX_STANDARD_MUTATIONS;

    const rateCheck = await withServerTimeout(
      isRateLimited(rateKey, maxAllowed),
      timeoutMs,
      `${options.actionName}:rateCheck`
    );

    if (rateCheck.limited) {
      const waitSeconds = Math.max(5, rateCheck.retryAfterSeconds);
      await recordAuditLog({
        userId: user.id,
        action: `${options.actionName}.rate_limited`,
        entityType: "Security",
        summary: { retryAfterSeconds: waitSeconds },
        ipHash,
      });
      return {
        ok: false,
        errorKind: "rate_limit",
        error: `Terlalu banyak perubahan dalam waktu singkat. Silakan tunggu ${waitSeconds} detik sebelum mencoba kembali.`,
      };
    }

    await withServerTimeout(
      recordRateLimitHit(rateKey, MUTATION_WINDOW_SECONDS),
      timeoutMs,
      `${options.actionName}:rateHit`
    );

    return await withServerTimeout(
      handler({ user, ipHash }),
      timeoutMs,
      options.actionName
    );
  } catch (error) {
    unstable_rethrow(error);
    return toSafeMutationError(options.actionName, error);
  }
}

export function assertPublishPermission(
  user: AuthenticatedUser,
  nextStatus: string
): ActionResult<never> | null {
  if (
    (nextStatus === "PUBLISHED" || nextStatus === "SCHEDULED") &&
    !hasPermission(user.role, "content.publish")
  ) {
    return {
      ok: false,
      errorKind: "forbidden",
      error: "Peran akun Anda tidak memiliki izin untuk menerbitkan atau menjadwalkan konten.",
    };
  }
  return null;
}
