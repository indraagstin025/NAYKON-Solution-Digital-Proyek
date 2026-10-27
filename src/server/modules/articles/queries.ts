import "server-only";
import type { ContentStatus } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";
import { serializeBlocksToEditorText } from "@/server/validators/common";

const ARTICLES_TIMEOUT_MS = 8_000;

export interface AdminArticleDTO {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  bodyText: string;
  categoryId: string;
  categoryName: string;
  tagIds: string[];
  tagNames: string[];
  readingTime: number;
  seoTitle: string;
  seoDescription: string;
  status: ContentStatus;
  publishedAt: string | null;
  updatedAt: string;
  deletedAt: string | null;
  authorName: string;
  latestRevisionId: string | null;
  revisionCount: number;
}

export interface AdminCategoryDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  articleCount: number;
}

export interface AdminTagDTO {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
}

export interface AdminArticlesWorkspaceData {
  articles: AdminArticleDTO[];
  categories: AdminCategoryDTO[];
  tags: AdminTagDTO[];
  redirectsCount: number;
  loadError: string | null;
}

export async function getAdminArticlesWorkspaceData(): Promise<AdminArticlesWorkspaceData> {
  try {
    const [rawArticles, rawCategories, rawTags, rawRevisions, redirectsCount] =
      await withServerTimeout(
        Promise.all([
          prisma.article.findMany({
            orderBy: [{ deletedAt: "asc" }, { updatedAt: "desc" }],
            take: 60,
            select: {
              id: true,
              title: true,
              slug: true,
              excerpt: true,
              content: true,
              categoryId: true,
              readingTime: true,
              seoTitle: true,
              seoDescription: true,
              status: true,
              publishedAt: true,
              updatedAt: true,
              deletedAt: true,
              category: { select: { name: true } },
              author: { select: { name: true } },
              tags: { select: { id: true, name: true }, orderBy: { name: "asc" } },
            },
          }),
          prisma.category.findMany({
            orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              sortOrder: true,
              _count: { select: { articles: true } },
            },
          }),
          prisma.tag.findMany({
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
              slug: true,
              _count: { select: { articles: true } },
            },
          }),
          prisma.revision.findMany({
            where: { entityType: "Article" },
            orderBy: { createdAt: "desc" },
            take: 200,
            select: {
              id: true,
              entityId: true,
            },
          }),
          prisma.redirect.count(),
        ]),
        ARTICLES_TIMEOUT_MS,
        "getAdminArticlesWorkspaceData"
      );

    const revMap = new Map<string, { latestId: string; count: number }>();
    for (const rev of rawRevisions) {
      const current = revMap.get(rev.entityId);
      if (!current) {
        revMap.set(rev.entityId, { latestId: rev.id, count: 1 });
      } else {
        current.count += 1;
      }
    }

    return {
      articles: rawArticles.map((art) => {
        const revInfo = revMap.get(art.id);
        return {
          id: art.id,
          title: art.title,
          slug: art.slug,
          excerpt: art.excerpt,
          bodyText: serializeBlocksToEditorText(art.content),
          categoryId: art.categoryId,
          categoryName: art.category.name,
          tagIds: art.tags.map((t) => t.id),
          tagNames: art.tags.map((t) => t.name),
          readingTime: art.readingTime,
          seoTitle: art.seoTitle ?? "",
          seoDescription: art.seoDescription ?? "",
          status: art.status,
          publishedAt: art.publishedAt ? art.publishedAt.toISOString() : null,
          updatedAt: art.updatedAt.toISOString(),
          deletedAt: art.deletedAt ? art.deletedAt.toISOString() : null,
          authorName: art.author.name,
          latestRevisionId: revInfo?.latestId ?? null,
          revisionCount: revInfo?.count ?? 0,
        };
      }),
      categories: rawCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        sortOrder: cat.sortOrder,
        articleCount: cat._count.articles,
      })),
      tags: rawTags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        articleCount: tag._count.articles,
      })),
      redirectsCount,
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load articles workspace data:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      articles: [],
      categories: [],
      tags: [],
      redirectsCount: 0,
      loadError:
        "Tidak dapat memuat data artikel dari database saat ini. Coba muat ulang halaman.",
    };
  }
}
