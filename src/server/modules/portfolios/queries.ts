import "server-only";
import type { ContentStatus } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";

const PORTFOLIOS_TIMEOUT_MS = 8_000;

export interface AdminPortfolioDTO {
  id: string;
  title: string;
  slug: string;
  category: string;
  clientSector: string;
  summary: string;
  tech: string[];
  impact: string;
  metric: string;
  imageAlt: string;
  sortOrder: number;
  featured: boolean;
  status: ContentStatus;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdminPortfoliosWorkspaceData {
  portfolios: AdminPortfolioDTO[];
  featuredCount: number;
  loadError: string | null;
}

export async function getAdminPortfoliosWorkspaceData(): Promise<AdminPortfoliosWorkspaceData> {
  try {
    const rows = await withServerTimeout(
      prisma.portfolio.findMany({
        orderBy: [{ deletedAt: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
        take: 60,
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          clientSector: true,
          summary: true,
          tech: true,
          impact: true,
          metric: true,
          imageAlt: true,
          sortOrder: true,
          featured: true,
          status: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      PORTFOLIOS_TIMEOUT_MS,
      "getAdminPortfoliosWorkspaceData"
    );

    const featuredCount = rows.filter(
      (r) => r.featured && !r.deletedAt && r.status === "PUBLISHED"
    ).length;

    return {
      portfolios: rows.map((r) => ({
        ...r,
        metric: r.metric ?? "",
        imageAlt: r.imageAlt ?? r.title,
        updatedAt: r.updatedAt.toISOString(),
        deletedAt: r.deletedAt ? r.deletedAt.toISOString() : null,
      })),
      featuredCount,
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load portfolios workspace data:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      portfolios: [],
      featuredCount: 0,
      loadError: "Tidak dapat memuat data portofolio dari database saat ini.",
    };
  }
}
