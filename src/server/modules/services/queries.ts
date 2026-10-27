import "server-only";
import type { ContentStatus } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";

const SERVICES_TIMEOUT_MS = 8_000;

export interface AdminServiceDTO {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  features: string[];
  icon: string;
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  status: ContentStatus;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdminPricingPlanDTO {
  id: string;
  name: string;
  priceLabel: string;
  priceNote: string;
  description: string;
  features: string[];
  badge: string | null;
  isPopular: boolean;
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  status: ContentStatus;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdminServicesWorkspaceData {
  services: AdminServiceDTO[];
  pricingPlans: AdminPricingPlanDTO[];
  loadError: string | null;
}

export async function getAdminServicesWorkspaceData(): Promise<AdminServicesWorkspaceData> {
  try {
    const [rawServices, rawPricing] = await withServerTimeout(
      Promise.all([
        prisma.service.findMany({
          orderBy: [{ deletedAt: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
          take: 40,
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            shortDesc: true,
            features: true,
            icon: true,
            ctaLabel: true,
            ctaHref: true,
            sortOrder: true,
            status: true,
            updatedAt: true,
            deletedAt: true,
          },
        }),
        prisma.pricingPlan.findMany({
          orderBy: [{ deletedAt: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
          take: 40,
          select: {
            id: true,
            name: true,
            priceLabel: true,
            priceNote: true,
            description: true,
            features: true,
            badge: true,
            ctaLabel: true,
            ctaHref: true,
            sortOrder: true,
            status: true,
            updatedAt: true,
            deletedAt: true,
          },
        }),
      ]),
      SERVICES_TIMEOUT_MS,
      "getAdminServicesWorkspaceData"
    );

    return {
      services: rawServices.map((s) => ({
        ...s,
        updatedAt: s.updatedAt.toISOString(),
        deletedAt: s.deletedAt ? s.deletedAt.toISOString() : null,
      })),
      pricingPlans: rawPricing.map((p) => ({
        ...p,
        priceNote: p.priceNote ?? "",
        isPopular: p.badge === "Paling Populer",
        updatedAt: p.updatedAt.toISOString(),
        deletedAt: p.deletedAt ? p.deletedAt.toISOString() : null,
      })),
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load services workspace data:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      services: [],
      pricingPlans: [],
      loadError:
        "Tidak dapat memuat data layanan dan paket harga dari database saat ini.",
    };
  }
}
