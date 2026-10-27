import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";
import { normalizeSingleLine } from "@/server/validators/common";

const AUDIT_TIMEOUT_MS = 8_000;

export interface AdminAuditLogDTO {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  userName: string;
  userEmail: string | null;
  summaryText: string;
  ipHash: string | null;
  createdAt: string;
}

export interface AdminAuditWorkspaceData {
  logs: AdminAuditLogDTO[];
  entityTypes: string[];
  activeEntity: string;
  searchQuery: string;
  loadError: string | null;
}

const ALLOWED_ENTITY_FILTERS = [
  "ALL",
  "User",
  "Article",
  "Service",
  "PricingPlan",
  "Portfolio",
  "Faq",
  "Page",
  "ContactMessage",
  "Category",
  "Tag",
  "Security",
] as const;

function formatSummaryPreview(summary: unknown): string {
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    return "-";
  }
  const entries = Object.entries(summary as Record<string, unknown>);
  if (entries.length === 0) return "-";
  return entries
    .slice(0, 6)
    .map(([key, val]) => `${key}: ${String(val)}`)
    .join(" · ");
}

export async function getAdminAuditWorkspaceData(rawSearchParams?: {
  entity?: string;
  q?: string;
}): Promise<AdminAuditWorkspaceData> {
  const rawEntity = normalizeSingleLine(rawSearchParams?.entity ?? "ALL");
  const activeEntity = ALLOWED_ENTITY_FILTERS.includes(
    rawEntity as (typeof ALLOWED_ENTITY_FILTERS)[number]
  )
    ? rawEntity
    : "ALL";
  const searchQuery = normalizeSingleLine(rawSearchParams?.q ?? "").slice(0, 80);

  const where: Prisma.AuditLogWhereInput = {};
  if (activeEntity !== "ALL") {
    where.entityType = activeEntity;
  }
  if (searchQuery) {
    where.OR = [
      { action: { contains: searchQuery, mode: "insensitive" } },
      { entityType: { contains: searchQuery, mode: "insensitive" } },
      { entityId: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  try {
    const rows = await withServerTimeout(
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 80,
        select: {
          id: true,
          action: true,
          entityType: true,
          entityId: true,
          summary: true,
          ipHash: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
        },
      }),
      AUDIT_TIMEOUT_MS,
      "getAdminAuditWorkspaceData"
    );

    return {
      logs: rows.map((row) => ({
        id: row.id,
        action: row.action,
        entityType: row.entityType,
        entityId: row.entityId,
        userName: row.user?.name ?? "Sistem / Publik",
        userEmail: row.user?.email ?? null,
        summaryText: formatSummaryPreview(row.summary),
        ipHash: row.ipHash,
        createdAt: row.createdAt.toISOString(),
      })),
      entityTypes: [...ALLOWED_ENTITY_FILTERS],
      activeEntity,
      searchQuery,
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load audit logs:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      logs: [],
      entityTypes: [...ALLOWED_ENTITY_FILTERS],
      activeEntity,
      searchQuery,
      loadError: "Tidak dapat memuat log audit keamanan dari database saat ini.",
    };
  }
}
