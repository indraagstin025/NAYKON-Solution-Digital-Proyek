import { EncryptJWT, jwtDecrypt } from "jose";

// Neutral cookie name avoids exposing CMS/admin conventions in browser storage.
// __Host- enforces Secure + Path=/ + host-only binding on HTTPS deployments.
export const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "production" ? "__Host-nk_sess" : "nk_sess";

export const SESSION_TTL_SECONDS = 8 * 60 * 60;
export const SESSION_REFRESH_INTERVAL_SECONDS = 60 * 60;

export interface SessionTokenPayload {
  sub: string;
  sv: number;
  rf: number;
}

export class MissingAuthSecretError extends Error {
  constructor() {
    super("AUTH_SECRET must be set to at least 32 characters.");
    this.name = "MissingAuthSecretError";
  }
}

async function deriveEncryptionKey(): Promise<Uint8Array> {
  const rawSecret = process.env.AUTH_SECRET;
  if (!rawSecret || rawSecret.trim().length < 32) {
    throw new MissingAuthSecretError();
  }

  // Hash arbitrary-length secret into the exact 256-bit key required by A256GCM.
  const encoded = new TextEncoder().encode(rawSecret);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(digest);
}

export async function encryptSessionToken(
  payload: SessionTokenPayload
): Promise<string> {
  const key = await deriveEncryptionKey();
  const nowSeconds = Math.floor(Date.now() / 1000);

  return new EncryptJWT({
    sv: payload.sv,
    rf: payload.rf,
  })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setSubject(payload.sub)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + SESSION_TTL_SECONDS)
    .encrypt(key);
}

export async function decryptSessionToken(
  token: string | undefined
): Promise<SessionTokenPayload | null> {
  if (!token) return null;

  try {
    const key = await deriveEncryptionKey();
    const { payload } = await jwtDecrypt(token, key, {
      contentEncryptionAlgorithms: ["A256GCM"],
      keyManagementAlgorithms: ["dir"],
    });

    if (
      typeof payload.sub !== "string" ||
      !payload.sub ||
      typeof payload.sv !== "number" ||
      typeof payload.rf !== "number"
    ) {
      return null;
    }

    return {
      sub: payload.sub,
      sv: payload.sv,
      rf: payload.rf,
    };
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
