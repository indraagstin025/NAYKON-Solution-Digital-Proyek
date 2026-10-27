import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export function hashIpAddress(rawIp: string): string {
  const secret = process.env.AUTH_SECRET || "nk-ip-fallback-salt";
  return createHmac("sha256", secret).update(rawIp).digest("hex").slice(0, 32);
}

export async function getRequestIpHash(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const realIp = requestHeaders.get("x-real-ip");
  const candidate = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "unknown";
  return hashIpAddress(candidate);
}

export async function isRateLimited(
  key: string,
  maxAttempts: number
): Promise<{ limited: boolean; retryAfterSeconds: number }> {
  const now = new Date();
  const entry = await prisma.rateLimit.findUnique({
    where: { key },
    select: { count: true, expiresAt: true },
  });

  if (!entry || entry.expiresAt <= now || entry.count < maxAttempts) {
    return { limited: false, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((entry.expiresAt.getTime() - now.getTime()) / 1000)
  );
  return { limited: true, retryAfterSeconds };
}

// Records a hit inside a transaction so expired windows reset atomically instead of stacking.
export async function recordRateLimitHit(
  key: string,
  windowSeconds: number
): Promise<number> {
  const now = new Date();
  const nextExpiry = new Date(now.getTime() + windowSeconds * 1000);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.rateLimit.findUnique({
      where: { key },
      select: { count: true, expiresAt: true },
    });

    if (!existing || existing.expiresAt <= now) {
      const fresh = await tx.rateLimit.upsert({
        where: { key },
        update: { count: 1, expiresAt: nextExpiry },
        create: { key, count: 1, expiresAt: nextExpiry },
      });
      return fresh.count;
    }

    const updated = await tx.rateLimit.update({
      where: { key },
      data: { count: { increment: 1 } },
    });
    return updated.count;
  });
}

export async function clearRateLimit(key: string): Promise<void> {
  await prisma.rateLimit.deleteMany({ where: { key } });
}
