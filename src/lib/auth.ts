import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { forbidden, notFound } from "next/navigation";
import { NextResponse } from "next/server";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hasPermission, type Permission } from "@/lib/permissions";
import { withServerTimeout } from "@/lib/request-security";
import {
  SESSION_ABSOLUTE_MAX_SECONDS,
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  decryptSessionToken,
  encryptSessionToken,
  getClearedSessionCookieOptions,
  getSessionCookieOptions,
} from "@/lib/session-crypto";

const SESSION_DB_VERIFY_TIMEOUT_MS = 8_000;

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  emailVerified: Date | null;
}

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

// Reads role and active status from PostgreSQL on every request so role downgrades,
// account deactivation, or sessionVersion bumps take effect immediately.
export const getCurrentUser = cache(async (): Promise<AuthenticatedUser | null> => {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const payload = await decryptSessionToken(rawToken);
  if (!payload) return null;

  const user = await withServerTimeout(
    prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        sessionVersion: true,
        emailVerified: true,
      },
    }),
    SESSION_DB_VERIFY_TIMEOUT_MS,
    "getCurrentUser"
  );

  if (!user || !user.isActive || user.sessionVersion !== payload.sv) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
  };
});

// Unauthenticated or revoked sessions receive 404 rather than a login redirect
// so protected /admin routes remain indistinguishable from non-existent paths.
export async function requireUser(): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();
  if (!user) {
    notFound();
  }
  return user;
}

export async function requirePermission(
  permission: Permission
): Promise<AuthenticatedUser> {
  const user = await requireUser();
  if (!hasPermission(user.role, permission)) {
    forbidden();
  }
  return user;
}

export async function authorizeAction(
  permission: Permission
): Promise<{ ok: true; user: AuthenticatedUser } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "Sesi Anda telah berakhir. Silakan masuk kembali." };
  }
  if (!hasPermission(user.role, permission)) {
    return { ok: false, error: "Akun Anda tidak memiliki izin untuk tindakan ini." };
  }
  return { ok: true, user };
}

export async function authorizeApi(
  permission: Permission
): Promise<
  | { ok: true; user: AuthenticatedUser }
  | { ok: false; response: NextResponse }
> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!hasPermission(user.role, permission)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { ok: true, user };
}

export async function createUserSession(
  userId: string,
  sessionVersion: number
): Promise<void> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const absoluteExpiry = nowSeconds + SESSION_ABSOLUTE_MAX_SECONDS;
  const token = await encryptSessionToken({
    sub: userId,
    sv: sessionVersion,
    rf: nowSeconds,
    abs: absoluteExpiry,
  });

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_NAME,
    token,
    getSessionCookieOptions(SESSION_TTL_SECONDS)
  );
}

// Uses explicit Secure + Path=/ attributes so __Host- cookies clear reliably on HTTPS.
export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", getClearedSessionCookieOptions());
}
