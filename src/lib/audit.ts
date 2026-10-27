import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

const SENSITIVE_KEYS = new Set([
  "password",
  "passwordHash",
  "token",
  "secret",
  "cookie",
  "authorization",
]);

function scrubSummary(
  input: Record<string, unknown> | undefined
): Prisma.InputJsonObject | undefined {
  if (!input) return undefined;

  const cleaned: Record<string, Prisma.InputJsonValue | null> = {};
  for (const [key, value] of Object.entries(input)) {
    if (SENSITIVE_KEYS.has(key)) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export interface RecordAuditParams {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  summary?: Record<string, unknown>;
  ipHash?: string | null;
}

export async function recordAuditLog(params: RecordAuditParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId ?? null,
        summary: scrubSummary(params.summary),
        ipHash: params.ipHash ?? null,
      },
    });
  } catch (error) {
    console.error("Audit log write failed:", error instanceof Error ? error.message : "unknown");
  }
}
