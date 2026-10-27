"use server";

import { prisma } from "@/server/config/db";
import { revalidateCmsDomains } from "@/server/config/cache";
import { extractFieldErrors, type ActionResult } from "@/server/config/result";
import {
  assertPublishPermission,
  runProtectedAction,
} from "@/server/security/action-guard";
import { recordAuditLog } from "@/server/security/audit";
import { entityIdSchema } from "@/server/validators/common";
import { portfolioFormSchema } from "@/server/validators/content";

const MAX_FEATURED_PORTFOLIOS = 3;

export async function savePortfolioAction(input: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  clientSector: string;
  summary: string;
  techRaw: string;
  impact: string;
  metric?: string;
  imageAlt?: string;
  sortOrder: number;
  featured: boolean;
  status: string;
}): Promise<ActionResult<{ id: string }>> {
  const isUpdate = Boolean(input.id && input.id.trim().length > 0);

  return runProtectedAction(
    {
      actionName: isUpdate ? "portfolios.update" : "portfolios.create",
      permission: isUpdate ? "content.update" : "content.create",
    },
    async ({ user, ipHash }) => {
      const parsed = portfolioFormSchema.safeParse({
        ...input,
        id: isUpdate ? input.id : undefined,
      });

      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali isian formulir portofolio.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      if (
        (data.status === "PUBLISHED" || data.status === "SCHEDULED") &&
        (!data.imageAlt || data.imageAlt.length < 5)
      ) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Teks alternatif (Alt Gambar) wajib diisi minimal 5 karakter saat portofolio diterbitkan.",
          fieldErrors: {
            imageAlt: ["Alt gambar wajib diisi untuk aksesibilitas saat terbit."],
          },
        };
      }

      const now = new Date();
      const descriptionJson = {
        blocks: [{ type: "paragraph", text: data.summary }],
      };

      const saved = await prisma.$transaction(
        async (
          tx
        ): Promise<
          | { kind: "conflict"; conflictError: string }
          | { kind: "ok"; id: string }
        > => {
          if (data.featured && data.status === "PUBLISHED") {
            const currentFeaturedCount = await tx.portfolio.count({
              where: {
                featured: true,
                status: "PUBLISHED",
                deletedAt: null,
                ...(data.id ? { id: { not: data.id } } : {}),
              },
            });

            if (currentFeaturedCount >= MAX_FEATURED_PORTFOLIOS) {
              return {
                kind: "conflict",
                conflictError:
                  "Maksimal 3 studi kasus portofolio yang dapat disorot di Beranda secara bersamaan. Nonaktifkan sorotan pada salah satu item lain terlebih dahulu.",
              };
            }
          }

          if (data.id) {
            const existing = await tx.portfolio.findUnique({
              where: { id: data.id },
              select: { id: true, publishedAt: true },
            });
            if (!existing) {
              throw new Error("Studi kasus portofolio tidak ditemukan.");
            }

            const updated = await tx.portfolio.update({
              where: { id: existing.id },
              data: {
                title: data.title,
                slug: data.slug,
                category: data.category,
                clientSector: data.clientSector,
                summary: data.summary,
                description: descriptionJson,
                tech: data.techRaw,
                impact: data.impact,
                metric: data.metric,
                imageAlt: data.imageAlt ?? data.title,
                sortOrder: data.sortOrder,
                featured: data.featured,
                status: data.status,
                publishedAt:
                  data.status === "PUBLISHED"
                    ? existing.publishedAt ?? now
                    : existing.publishedAt,
              },
              select: { id: true },
            });

            await tx.revision.create({
              data: {
                entityType: "Portfolio",
                entityId: updated.id,
                createdById: user.id,
                snapshot: {
                  title: data.title,
                  slug: data.slug,
                  summary: data.summary,
                  impact: data.impact,
                  metric: data.metric,
                  status: data.status,
                },
              },
            });

            return { kind: "ok", id: updated.id };
          }

          const created = await tx.portfolio.create({
            data: {
              title: data.title,
              slug: data.slug,
              category: data.category,
              clientSector: data.clientSector,
              summary: data.summary,
              description: descriptionJson,
              tech: data.techRaw,
              impact: data.impact,
              metric: data.metric,
              imageAlt: data.imageAlt ?? data.title,
              sortOrder: data.sortOrder,
              featured: data.featured,
              status: data.status,
              publishedAt: data.status === "PUBLISHED" ? now : null,
            },
            select: { id: true },
          });

          await tx.revision.create({
            data: {
              entityType: "Portfolio",
              entityId: created.id,
              createdById: user.id,
              snapshot: {
                title: data.title,
                slug: data.slug,
                summary: data.summary,
                impact: data.impact,
                metric: data.metric,
                status: data.status,
              },
            },
          });

          return { kind: "ok", id: created.id };
        }
      );

      if (saved.kind === "conflict") {
        return {
          ok: false,
          errorKind: "conflict",
          error: saved.conflictError,
        };
      }

      await recordAuditLog({
        userId: user.id,
        action: isUpdate ? "portfolio.updated" : "portfolio.created",
        entityType: "Portfolio",
        entityId: saved.id,
        summary: {
          slug: data.slug,
          featured: data.featured,
          status: data.status,
        },
        ipHash,
      });

      revalidateCmsDomains(["portfolios"]);

      return {
        ok: true,
        message: isUpdate
          ? `Portofolio "${data.title}" berhasil diperbarui.`
          : `Portofolio "${data.title}" berhasil ditambahkan.`,
        data: { id: saved.id },
      };
    }
  );
}

export async function togglePortfolioTrashAction(input: {
  id: string;
  restore?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: input.restore ? "portfolios.restore" : "portfolios.delete",
      permission: "content.delete",
      destructive: !input.restore,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID portofolio tidak valid.",
        };
      }

      const existing = await prisma.portfolio.findUnique({
        where: { id: idParsed.data },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Studi kasus portofolio tidak ditemukan.",
        };
      }

      await prisma.portfolio.update({
        where: { id: existing.id },
        data: input.restore
          ? { deletedAt: null, status: "DRAFT" }
          : { deletedAt: new Date(), status: "ARCHIVED", featured: false },
      });

      await recordAuditLog({
        userId: user.id,
        action: input.restore ? "portfolio.restored" : "portfolio.soft_deleted",
        entityType: "Portfolio",
        entityId: existing.id,
        summary: { slug: existing.slug },
        ipHash,
      });

      revalidateCmsDomains(["portfolios"]);

      return {
        ok: true,
        message: input.restore
          ? `Portofolio "${existing.title}" dipulihkan sebagai draf.`
          : `Portofolio "${existing.title}" dipindahkan ke tempat sampah.`,
        data: { id: existing.id },
      };
    }
  );
}
