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
import {
  pricingPlanFormSchema,
  serviceFormSchema,
} from "@/server/validators/content";

export async function saveServiceAction(input: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  featuresRaw: string;
  icon: string;
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  status: string;
}): Promise<ActionResult<{ id: string }>> {
  const isUpdate = Boolean(input.id && input.id.trim().length > 0);

  return runProtectedAction(
    {
      actionName: isUpdate ? "services.update" : "services.create",
      permission: isUpdate ? "content.update" : "content.create",
    },
    async ({ user, ipHash }) => {
      const parsed = serviceFormSchema.safeParse({
        ...input,
        id: isUpdate ? input.id : undefined,
      });

      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali isian formulir layanan.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      const now = new Date();
      const descriptionJson = {
        blocks: [{ type: "paragraph", text: data.shortDesc }],
      };

      const saved = await prisma.$transaction(async (tx) => {
        if (data.id) {
          const existing = await tx.service.findUnique({
            where: { id: data.id },
            select: { id: true, publishedAt: true },
          });
          if (!existing) {
            throw new Error("Layanan tidak ditemukan.");
          }

          const updated = await tx.service.update({
            where: { id: existing.id },
            data: {
              title: data.title,
              slug: data.slug,
              category: data.category,
              shortDesc: data.shortDesc,
              description: descriptionJson,
              features: data.featuresRaw,
              icon: data.icon,
              ctaLabel: data.ctaLabel,
              ctaHref: data.ctaHref,
              sortOrder: data.sortOrder,
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
              entityType: "Service",
              entityId: updated.id,
              createdById: user.id,
              snapshot: {
                title: data.title,
                slug: data.slug,
                category: data.category,
                shortDesc: data.shortDesc,
                features: data.featuresRaw,
                status: data.status,
              },
            },
          });

          return updated;
        }

        const created = await tx.service.create({
          data: {
            title: data.title,
            slug: data.slug,
            category: data.category,
            shortDesc: data.shortDesc,
            description: descriptionJson,
            features: data.featuresRaw,
            icon: data.icon,
            ctaLabel: data.ctaLabel,
            ctaHref: data.ctaHref,
            sortOrder: data.sortOrder,
            status: data.status,
            publishedAt: data.status === "PUBLISHED" ? now : null,
          },
          select: { id: true },
        });

        await tx.revision.create({
          data: {
            entityType: "Service",
            entityId: created.id,
            createdById: user.id,
            snapshot: {
              title: data.title,
              slug: data.slug,
              category: data.category,
              shortDesc: data.shortDesc,
              features: data.featuresRaw,
              status: data.status,
            },
          },
        });

        return created;
      });

      await recordAuditLog({
        userId: user.id,
        action: isUpdate ? "service.updated" : "service.created",
        entityType: "Service",
        entityId: saved.id,
        summary: { slug: data.slug, status: data.status },
        ipHash,
      });

      revalidateCmsDomains(["services"]);

      return {
        ok: true,
        message: isUpdate
          ? `Layanan "${data.title}" berhasil diperbarui.`
          : `Layanan "${data.title}" berhasil ditambahkan.`,
        data: saved,
      };
    }
  );
}

export async function toggleServiceTrashAction(input: {
  id: string;
  restore?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: input.restore ? "services.restore" : "services.delete",
      permission: "content.delete",
      destructive: !input.restore,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID layanan tidak valid.",
        };
      }

      const existing = await prisma.service.findUnique({
        where: { id: idParsed.data },
        select: { id: true, title: true, slug: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Layanan tidak ditemukan.",
        };
      }

      await prisma.service.update({
        where: { id: existing.id },
        data: input.restore
          ? { deletedAt: null, status: "DRAFT" }
          : { deletedAt: new Date(), status: "ARCHIVED" },
      });

      await recordAuditLog({
        userId: user.id,
        action: input.restore ? "service.restored" : "service.soft_deleted",
        entityType: "Service",
        entityId: existing.id,
        summary: { slug: existing.slug },
        ipHash,
      });

      revalidateCmsDomains(["services"]);

      return {
        ok: true,
        message: input.restore
          ? `Layanan "${existing.title}" dipulihkan sebagai draf.`
          : `Layanan "${existing.title}" dipindahkan ke tempat sampah.`,
        data: { id: existing.id },
      };
    }
  );
}

export async function savePricingPlanAction(input: {
  id?: string;
  name: string;
  priceLabel: string;
  priceNote?: string;
  description: string;
  featuresRaw: string;
  isPopular: boolean;
  ctaLabel: string;
  ctaHref: string;
  sortOrder: number;
  status: string;
}): Promise<ActionResult<{ id: string }>> {
  const isUpdate = Boolean(input.id && input.id.trim().length > 0);

  return runProtectedAction(
    {
      actionName: isUpdate ? "pricing.update" : "pricing.create",
      permission: isUpdate ? "content.update" : "content.create",
    },
    async ({ user, ipHash }) => {
      const parsed = pricingPlanFormSchema.safeParse({
        ...input,
        id: isUpdate ? input.id : undefined,
      });

      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali isian formulir paket harga.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      const now = new Date();
      const badgeValue = data.isPopular ? "Paling Populer" : null;

      const saved = await prisma.$transaction(async (tx) => {
        // Enforce the single "Paling Populer" badge rule atomically across all pricing plans.
        if (data.isPopular) {
          await tx.pricingPlan.updateMany({
            where: {
              badge: "Paling Populer",
              ...(data.id ? { id: { not: data.id } } : {}),
            },
            data: { badge: null },
          });
        }

        if (data.id) {
          const existing = await tx.pricingPlan.findUnique({
            where: { id: data.id },
            select: { id: true, publishedAt: true },
          });
          if (!existing) {
            throw new Error("Paket harga tidak ditemukan.");
          }

          const updated = await tx.pricingPlan.update({
            where: { id: existing.id },
            data: {
              name: data.name,
              priceLabel: data.priceLabel,
              priceNote: data.priceNote,
              description: data.description,
              features: data.featuresRaw,
              badge: badgeValue,
              ctaLabel: data.ctaLabel,
              ctaHref: data.ctaHref,
              sortOrder: data.sortOrder,
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
              entityType: "PricingPlan",
              entityId: updated.id,
              createdById: user.id,
              snapshot: {
                name: data.name,
                priceLabel: data.priceLabel,
                features: data.featuresRaw,
                badge: badgeValue,
                status: data.status,
              },
            },
          });

          return updated;
        }

        const created = await tx.pricingPlan.create({
          data: {
            name: data.name,
            priceLabel: data.priceLabel,
            priceNote: data.priceNote,
            description: data.description,
            features: data.featuresRaw,
            badge: badgeValue,
            ctaLabel: data.ctaLabel,
            ctaHref: data.ctaHref,
            sortOrder: data.sortOrder,
            status: data.status,
            publishedAt: data.status === "PUBLISHED" ? now : null,
          },
          select: { id: true },
        });

        await tx.revision.create({
          data: {
            entityType: "PricingPlan",
            entityId: created.id,
            createdById: user.id,
            snapshot: {
              name: data.name,
              priceLabel: data.priceLabel,
              features: data.featuresRaw,
              badge: badgeValue,
              status: data.status,
            },
          },
        });

        return created;
      });

      await recordAuditLog({
        userId: user.id,
        action: isUpdate ? "pricing.updated" : "pricing.created",
        entityType: "PricingPlan",
        entityId: saved.id,
        summary: {
          name: data.name,
          isPopular: data.isPopular,
          status: data.status,
        },
        ipHash,
      });

      revalidateCmsDomains(["pricing"]);

      return {
        ok: true,
        message: isUpdate
          ? `Paket harga "${data.name}" berhasil diperbarui.`
          : `Paket harga "${data.name}" berhasil ditambahkan.`,
        data: saved,
      };
    }
  );
}

export async function togglePricingPlanTrashAction(input: {
  id: string;
  restore?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: input.restore ? "pricing.restore" : "pricing.delete",
      permission: "content.delete",
      destructive: !input.restore,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID paket harga tidak valid.",
        };
      }

      const existing = await prisma.pricingPlan.findUnique({
        where: { id: idParsed.data },
        select: { id: true, name: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Paket harga tidak ditemukan.",
        };
      }

      await prisma.pricingPlan.update({
        where: { id: existing.id },
        data: input.restore
          ? { deletedAt: null, status: "DRAFT" }
          : { deletedAt: new Date(), status: "ARCHIVED", badge: null },
      });

      await recordAuditLog({
        userId: user.id,
        action: input.restore ? "pricing.restored" : "pricing.soft_deleted",
        entityType: "PricingPlan",
        entityId: existing.id,
        summary: { name: existing.name },
        ipHash,
      });

      revalidateCmsDomains(["pricing"]);

      return {
        ok: true,
        message: input.restore
          ? `Paket harga "${existing.name}" dipulihkan sebagai draf.`
          : `Paket harga "${existing.name}" dipindahkan ke tempat sampah.`,
        data: { id: existing.id },
      };
    }
  );
}
