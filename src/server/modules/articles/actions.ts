"use server";

import { prisma } from "@/server/config/db";
import { revalidateCmsDomains } from "@/server/config/cache";
import { extractFieldErrors, type ActionResult } from "@/server/config/result";
import {
  assertPublishPermission,
  runProtectedAction,
} from "@/server/security/action-guard";
import { recordAuditLog } from "@/server/security/audit";
import {
  cleanText,
  entityIdSchema,
  estimateReadingTimeMinutes,
  parseContentBlocks,
} from "@/server/validators/common";
import {
  articleFormSchema,
  categoryFormSchema,
  tagFormSchema,
} from "@/server/validators/content";

export async function saveArticleAction(input: {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  tagIds?: string[];
  bodyText: string;
  seoTitle?: string;
  seoDescription?: string;
  status: string;
}): Promise<ActionResult<{ id: string; slug: string }>> {
  const isUpdate = Boolean(input.id && input.id.trim().length > 0);

  return runProtectedAction(
    {
      actionName: isUpdate ? "articles.update" : "articles.create",
      permission: isUpdate ? "content.update" : "content.create",
    },
    async ({ user, ipHash }) => {
      const parsed = articleFormSchema.safeParse({
        ...input,
        id: isUpdate ? input.id : undefined,
      });

      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali isian formulir artikel.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId },
        select: { id: true },
      });
      if (!categoryExists) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Kategori yang dipilih tidak valid atau sudah dihapus.",
          fieldErrors: { categoryId: ["Pilih kategori yang tersedia."] },
        };
      }

      const validTags =
        data.tagIds.length > 0
          ? await prisma.tag.findMany({
              where: { id: { in: data.tagIds } },
              select: { id: true },
            })
          : [];

      const contentJson = { blocks: data.blocks };
      const now = new Date();
      const extraPaths: string[] = [`/blog/${data.slug}`];

      const saved = await prisma.$transaction(async (tx) => {
        const duplicateSlug = await tx.article.findFirst({
          where: {
            slug: data.slug,
            ...(data.id ? { id: { not: data.id } } : {}),
          },
          select: { id: true },
        });

        if (duplicateSlug) {
          throw Object.assign(new Error("Slug duplicate"), { code: "P2002" });
        }

        if (data.id) {
          const existing = await tx.article.findUnique({
            where: { id: data.id },
            select: {
              id: true,
              slug: true,
              status: true,
              publishedAt: true,
            },
          });

          if (!existing) {
            throw new Error("Artikel tidak ditemukan.");
          }

          const nextPublishedAt =
            data.status === "PUBLISHED"
              ? existing.publishedAt ?? now
              : existing.publishedAt;

          const updated = await tx.article.update({
            where: { id: existing.id },
            data: {
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: contentJson,
              categoryId: data.categoryId,
              readingTime: data.readingTime,
              seoTitle: data.seoTitle,
              seoDescription: data.seoDescription,
              status: data.status,
              publishedAt: nextPublishedAt,
              tags: {
                set: validTags.map((t) => ({ id: t.id })),
              },
            },
            select: { id: true, slug: true },
          });

          // Automatically maintain 301 redirects when a published article's slug changes,
          // and prevent redirect loops or multi-hop chains.
          if (
            existing.slug !== data.slug &&
            (existing.status === "PUBLISHED" || existing.publishedAt !== null)
          ) {
            const oldPath = `/blog/${existing.slug}`;
            const newPath = `/blog/${data.slug}`;
            extraPaths.push(oldPath);

            await tx.redirect.deleteMany({
              where: { from: newPath },
            });

            await tx.redirect.updateMany({
              where: { to: oldPath },
              data: { to: newPath },
            });

            await tx.redirect.upsert({
              where: { from: oldPath },
              update: { to: newPath, status: 301 },
              create: { from: oldPath, to: newPath, status: 301 },
            });
          }

          await tx.revision.create({
            data: {
              entityType: "Article",
              entityId: updated.id,
              createdById: user.id,
              snapshot: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: contentJson,
                seoTitle: data.seoTitle,
                seoDescription: data.seoDescription,
                status: data.status,
              },
            },
          });

          return updated;
        }

        const created = await tx.article.create({
          data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: contentJson,
            authorId: user.id,
            categoryId: data.categoryId,
            readingTime: data.readingTime,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            status: data.status,
            publishedAt: data.status === "PUBLISHED" ? now : null,
            tags: {
              connect: validTags.map((t) => ({ id: t.id })),
            },
          },
          select: { id: true, slug: true },
        });

        await tx.revision.create({
          data: {
            entityType: "Article",
            entityId: created.id,
            createdById: user.id,
            snapshot: {
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: contentJson,
              seoTitle: data.seoTitle,
              seoDescription: data.seoDescription,
              status: data.status,
            },
          },
        });

        return created;
      });

      await recordAuditLog({
        userId: user.id,
        action: isUpdate ? "article.updated" : "article.created",
        entityType: "Article",
        entityId: saved.id,
        summary: {
          slug: saved.slug,
          status: data.status,
        },
        ipHash,
      });

      revalidateCmsDomains(["articles"], extraPaths);

      return {
        ok: true,
        message: isUpdate
          ? `Artikel "${data.title}" berhasil diperbarui.`
          : `Artikel "${data.title}" berhasil ditambahkan.`,
        data: saved,
      };
    }
  );
}

export async function toggleArticleTrashAction(input: {
  id: string;
  restore?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: input.restore ? "articles.restore" : "articles.delete",
      permission: "content.delete",
      destructive: !input.restore,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID artikel tidak valid.",
        };
      }

      const existing = await prisma.article.findUnique({
        where: { id: idParsed.data },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Artikel tidak ditemukan.",
        };
      }

      await prisma.article.update({
        where: { id: existing.id },
        data: input.restore
          ? { deletedAt: null, status: "DRAFT" }
          : { deletedAt: new Date(), status: "ARCHIVED" },
      });

      await recordAuditLog({
        userId: user.id,
        action: input.restore ? "article.restored" : "article.soft_deleted",
        entityType: "Article",
        entityId: existing.id,
        summary: { slug: existing.slug },
        ipHash,
      });

      revalidateCmsDomains(["articles"], [`/blog/${existing.slug}`]);

      return {
        ok: true,
        message: input.restore
          ? `Artikel "${existing.title}" dipulihkan sebagai draf.`
          : `Artikel "${existing.title}" dipindahkan ke tempat sampah.`,
        data: { id: existing.id },
      };
    }
  );
}

export async function restoreArticleRevisionAction(input: {
  articleId: string;
  revisionId: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "articles.restore_revision",
      permission: "revision.restore",
    },
    async ({ user, ipHash }) => {
      const artId = entityIdSchema.safeParse(input.articleId);
      const revId = entityIdSchema.safeParse(input.revisionId);
      if (!artId.success || !revId.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Parameter revisi artikel tidak valid.",
        };
      }

      const revision = await prisma.revision.findUnique({
        where: { id: revId.data },
        select: {
          id: true,
          entityType: true,
          entityId: true,
          snapshot: true,
        },
      });

      if (
        !revision ||
        revision.entityType !== "Article" ||
        revision.entityId !== artId.data ||
        typeof revision.snapshot !== "object" ||
        revision.snapshot === null
      ) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Data revisi tidak ditemukan untuk artikel ini.",
        };
      }

      const snap = revision.snapshot as Record<string, unknown>;
      const blocks = parseContentBlocks(snap.content);
      if (blocks.length === 0) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Snapshot revisi tidak memiliki struktur konten yang valid.",
        };
      }

      const restoredTitle = cleanText(snap.title, 130);
      const restoredExcerpt = cleanText(snap.excerpt, 260);
      if (!restoredTitle || !restoredExcerpt) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Snapshot revisi tidak lengkap untuk dipulihkan.",
        };
      }

      await prisma.$transaction(async (tx) => {
        await tx.article.update({
          where: { id: artId.data },
          data: {
            title: restoredTitle,
            excerpt: restoredExcerpt,
            content: { blocks },
            readingTime: estimateReadingTimeMinutes(blocks),
            seoTitle: cleanText(snap.seoTitle, 70) || null,
            seoDescription: cleanText(snap.seoDescription, 170) || null,
          },
        });

        await tx.revision.create({
          data: {
            entityType: "Article",
            entityId: artId.data,
            createdById: user.id,
            snapshot: {
              title: restoredTitle,
              excerpt: restoredExcerpt,
              content: { blocks },
              restoredFromRevisionId: revision.id,
            },
          },
        });
      });

      await recordAuditLog({
        userId: user.id,
        action: "article.revision_restored",
        entityType: "Article",
        entityId: artId.data,
        summary: { revisionId: revision.id },
        ipHash,
      });

      revalidateCmsDomains(["articles"]);

      return {
        ok: true,
        message: `Isi artikel "${restoredTitle}" berhasil dipulihkan dari revisi.`,
        data: { id: artId.data },
      };
    }
  );
}

export async function createCategoryAction(input: {
  name: string;
  slug: string;
  description?: string;
  sortOrder?: number;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "taxonomy.category.create",
      permission: "taxonomy.manage",
    },
    async ({ user, ipHash }) => {
      const parsed = categoryFormSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali nama atau slug kategori.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const created = await prisma.category.create({
        data: parsed.data,
        select: { id: true, name: true, slug: true },
      });

      await recordAuditLog({
        userId: user.id,
        action: "category.created",
        entityType: "Category",
        entityId: created.id,
        summary: { name: created.name, slug: created.slug },
        ipHash,
      });

      revalidateCmsDomains(["articles"]);

      return {
        ok: true,
        message: `Kategori "${created.name}" berhasil ditambahkan.`,
        data: { id: created.id },
      };
    }
  );
}

export async function deleteCategoryAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "taxonomy.category.delete",
      permission: "taxonomy.manage",
      destructive: true,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID kategori tidak valid.",
        };
      }

      const category = await prisma.category.findUnique({
        where: { id: idParsed.data },
        select: {
          id: true,
          name: true,
          _count: { select: { articles: true } },
        },
      });

      if (!category) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Kategori tidak ditemukan.",
        };
      }

      if (category._count.articles > 0) {
        return {
          ok: false,
          errorKind: "conflict",
          error: `Kategori "${category.name}" masih digunakan oleh ${category._count.articles} artikel. Pindahkan artikel tersebut ke kategori lain terlebih dahulu.`,
        };
      }

      await prisma.category.delete({ where: { id: category.id } });

      await recordAuditLog({
        userId: user.id,
        action: "category.deleted",
        entityType: "Category",
        entityId: category.id,
        summary: { name: category.name },
        ipHash,
      });

      revalidateCmsDomains(["articles"]);

      return {
        ok: true,
        message: `Kategori "${category.name}" berhasil dihapus.`,
        data: { id: category.id },
      };
    }
  );
}

export async function createTagAction(input: {
  name: string;
  slug: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "taxonomy.tag.create",
      permission: "taxonomy.manage",
    },
    async ({ user, ipHash }) => {
      const parsed = tagFormSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali nama atau slug tag.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const created = await prisma.tag.create({
        data: parsed.data,
        select: { id: true, name: true, slug: true },
      });

      await recordAuditLog({
        userId: user.id,
        action: "tag.created",
        entityType: "Tag",
        entityId: created.id,
        summary: { name: created.name, slug: created.slug },
        ipHash,
      });

      revalidateCmsDomains(["articles"]);

      return {
        ok: true,
        message: `Tag "${created.name}" berhasil ditambahkan.`,
        data: { id: created.id },
      };
    }
  );
}

export async function deleteTagAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "taxonomy.tag.delete",
      permission: "taxonomy.manage",
      destructive: true,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID tag tidak valid.",
        };
      }

      const tag = await prisma.tag.findUnique({
        where: { id: idParsed.data },
        select: { id: true, name: true },
      });

      if (!tag) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Tag tidak ditemukan.",
        };
      }

      await prisma.tag.delete({ where: { id: tag.id } });

      await recordAuditLog({
        userId: user.id,
        action: "tag.deleted",
        entityType: "Tag",
        entityId: tag.id,
        summary: { name: tag.name },
        ipHash,
      });

      revalidateCmsDomains(["articles"]);

      return {
        ok: true,
        message: `Tag "${tag.name}" berhasil dihapus.`,
        data: { id: tag.id },
      };
    }
  );
}
