import "server-only";
import { cache } from "react";
import { prisma } from "@/server/config/db";
import { hasPermission } from "@/server/security/permissions";
import { withServerTimeout } from "@/server/security/csrf";
import type { AuthenticatedUser } from "@/server/security/auth";
import type { ContentStatus, MessageStatus } from "@prisma/client";

const OVERVIEW_TIMEOUT_MS = 8_000;

export interface OverviewSummaryData {
  loadError: string | null;
  unreadMessagesCount: number;
  publishedArticles: number;
  draftArticles: number;
  publishedPortfolios: number;
  publishedServices: number;
  publishedPricingPlans: number;
  publishedFaqs: number;
  recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: MessageStatus;
    createdAt: Date;
  }>;
  recentArticles: Array<{
    id: string;
    title: string;
    slug: string;
    status: ContentStatus;
    updatedAt: Date;
    categoryName: string;
  }>;
  recentAudits: Array<{
    id: string;
    action: string;
    entityType: string;
    createdAt: Date;
    userName: string;
  }>;
}

export const getUnreadMessagesBadgeCount = cache(
  async (user: AuthenticatedUser): Promise<number> => {
    if (!hasPermission(user.role, "messages.view")) return 0;
    try {
      return await withServerTimeout(
        prisma.contactMessage.count({ where: { status: "NEW" } }),
        5_000,
        "unreadMessagesBadgeCount"
      );
    } catch {
      return 0;
    }
  }
);

export async function getAdminOverviewData(
  user: AuthenticatedUser
): Promise<OverviewSummaryData> {
  const canViewContent = hasPermission(user.role, "content.view");
  const canViewMessages = hasPermission(user.role, "messages.view");
  const canViewAudit = hasPermission(user.role, "audit.view");

  const empty: OverviewSummaryData = {
    loadError: null,
    unreadMessagesCount: 0,
    publishedArticles: 0,
    draftArticles: 0,
    publishedPortfolios: 0,
    publishedServices: 0,
    publishedPricingPlans: 0,
    publishedFaqs: 0,
    recentMessages: [],
    recentArticles: [],
    recentAudits: [],
  };

  try {
    const [
      pubArtCount,
      drfArtCount,
      pubPortCount,
      pubSvcCount,
      pubPriceCount,
      pubFaqCount,
      newMsgCount,
      latestMessages,
      latestArticles,
      latestAudits,
    ] = await withServerTimeout(
      Promise.all([
        canViewContent
          ? prisma.article.count({ where: { status: "PUBLISHED", deletedAt: null } })
          : Promise.resolve(0),
        canViewContent
          ? prisma.article.count({ where: { status: { in: ["DRAFT", "REVIEW"] }, deletedAt: null } })
          : Promise.resolve(0),
        canViewContent
          ? prisma.portfolio.count({ where: { status: "PUBLISHED", deletedAt: null } })
          : Promise.resolve(0),
        canViewContent
          ? prisma.service.count({ where: { status: "PUBLISHED", deletedAt: null } })
          : Promise.resolve(0),
        canViewContent
          ? prisma.pricingPlan.count({ where: { status: "PUBLISHED", deletedAt: null } })
          : Promise.resolve(0),
        canViewContent
          ? prisma.faq.count({ where: { status: "PUBLISHED", deletedAt: null } })
          : Promise.resolve(0),
        canViewMessages
          ? prisma.contactMessage.count({ where: { status: "NEW" } })
          : Promise.resolve(0),
        canViewMessages
          ? prisma.contactMessage.findMany({
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                name: true,
                email: true,
                service: true,
                status: true,
                createdAt: true,
              },
            })
          : Promise.resolve([]),
        canViewContent
          ? prisma.article.findMany({
              where: { deletedAt: null },
              orderBy: { updatedAt: "desc" },
              take: 5,
              select: {
                id: true,
                title: true,
                slug: true,
                status: true,
                updatedAt: true,
                category: { select: { name: true } },
              },
            })
          : Promise.resolve([]),
        canViewAudit
          ? prisma.auditLog.findMany({
              orderBy: { createdAt: "desc" },
              take: 5,
              select: {
                id: true,
                action: true,
                entityType: true,
                createdAt: true,
                user: { select: { name: true } },
              },
            })
          : Promise.resolve([]),
      ]),
      OVERVIEW_TIMEOUT_MS,
      "getAdminOverviewData"
    );

    return {
      loadError: null,
      unreadMessagesCount: newMsgCount,
      publishedArticles: pubArtCount,
      draftArticles: drfArtCount,
      publishedPortfolios: pubPortCount,
      publishedServices: pubSvcCount,
      publishedPricingPlans: pubPriceCount,
      publishedFaqs: pubFaqCount,
      recentMessages: latestMessages,
      recentArticles: latestArticles.map((art) => ({
        id: art.id,
        title: art.title,
        slug: art.slug,
        status: art.status,
        updatedAt: art.updatedAt,
        categoryName: art.category.name,
      })),
      recentAudits: latestAudits.map((entry) => ({
        id: entry.id,
        action: entry.action,
        entityType: entry.entityType,
        createdAt: entry.createdAt,
        userName: entry.user?.name || "Tidak terautentikasi",
      })),
    };
  } catch (error) {
    console.error(
      "Failed to load admin overview metrics:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      ...empty,
      loadError:
        "Gagal memuat sebagian data dari database PostgreSQL. Muat ulang halaman ini dalam beberapa saat.",
    };
  }
}
