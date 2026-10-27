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
import { faqFormSchema, pageFormSchema } from "@/server/validators/content";

export async function saveFaqAction(input: {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
  status: string;
}): Promise<ActionResult<{ id: string }>> {
  const isUpdate = Boolean(input.id && input.id.trim().length > 0);

  return runProtectedAction(
    {
      actionName: isUpdate ? "faqs.update" : "faqs.create",
      permission: isUpdate ? "content.update" : "content.create",
    },
    async ({ user, ipHash }) => {
      const parsed = faqFormSchema.safeParse({
        ...input,
        id: isUpdate ? input.id : undefined,
      });

      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali pertanyaan atau jawaban FAQ.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      const now = new Date();

      const saved = await prisma.$transaction(async (tx) => {
        if (data.id) {
          const existing = await tx.faq.findUnique({
            where: { id: data.id },
            select: { id: true, publishedAt: true },
          });
          if (!existing) {
            throw new Error("Item FAQ tidak ditemukan.");
          }

          const updated = await tx.faq.update({
            where: { id: existing.id },
            data: {
              question: data.question,
              answer: data.answer,
              category: data.category,
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
              entityType: "Faq",
              entityId: updated.id,
              createdById: user.id,
              snapshot: {
                question: data.question,
                answer: data.answer,
                status: data.status,
              },
            },
          });

          return updated;
        }

        const created = await tx.faq.create({
          data: {
            question: data.question,
            answer: data.answer,
            category: data.category,
            sortOrder: data.sortOrder,
            status: data.status,
            publishedAt: data.status === "PUBLISHED" ? now : null,
          },
          select: { id: true },
        });

        await tx.revision.create({
          data: {
            entityType: "Faq",
            entityId: created.id,
            createdById: user.id,
            snapshot: {
              question: data.question,
              answer: data.answer,
              status: data.status,
            },
          },
        });

        return created;
      });

      await recordAuditLog({
        userId: user.id,
        action: isUpdate ? "faq.updated" : "faq.created",
        entityType: "Faq",
        entityId: saved.id,
        summary: { status: data.status },
        ipHash,
      });

      revalidateCmsDomains(["faqs"]);

      return {
        ok: true,
        message: isUpdate
          ? "Pertanyaan FAQ berhasil diperbarui."
          : "Pertanyaan FAQ baru berhasil ditambahkan.",
        data: saved,
      };
    }
  );
}

export async function toggleFaqTrashAction(input: {
  id: string;
  restore?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: input.restore ? "faqs.restore" : "faqs.delete",
      permission: "content.delete",
      destructive: !input.restore,
    },
    async ({ user, ipHash }) => {
      const idParsed = entityIdSchema.safeParse(input.id);
      if (!idParsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID FAQ tidak valid.",
        };
      }

      const existing = await prisma.faq.findUnique({
        where: { id: idParsed.data },
        select: { id: true, question: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Item FAQ tidak ditemukan.",
        };
      }

      await prisma.faq.update({
        where: { id: existing.id },
        data: input.restore
          ? { deletedAt: null, status: "DRAFT" }
          : { deletedAt: new Date(), status: "ARCHIVED" },
      });

      await recordAuditLog({
        userId: user.id,
        action: input.restore ? "faq.restored" : "faq.soft_deleted",
        entityType: "Faq",
        entityId: existing.id,
        summary: { question: existing.question },
        ipHash,
      });

      revalidateCmsDomains(["faqs"]);

      return {
        ok: true,
        message: input.restore
          ? "Pertanyaan FAQ dipulihkan sebagai draf."
          : "Pertanyaan FAQ dipindahkan ke tempat sampah.",
        data: { id: existing.id },
      };
    }
  );
}

export async function saveStaticPageAction(input: {
  id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedLabel?: string;
  bodyText: string;
  status: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "pages.update",
      permission: "content.update",
    },
    async ({ user, ipHash }) => {
      const parsed = pageFormSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali isian halaman statis.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;
      const publishDeny = assertPublishPermission(user, data.status);
      if (publishDeny) return publishDeny;

      const existing = await prisma.page.findUnique({
        where: { id: data.id },
        select: { id: true, slug: true, publishedAt: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Halaman statis tidak ditemukan.",
        };
      }

      const contentJson = {
        updatedLabel: data.updatedLabel ?? undefined,
        blocks: data.blocks,
      };
      const now = new Date();

      await prisma.$transaction(async (tx) => {
        await tx.page.update({
          where: { id: existing.id },
          data: {
            title: data.title,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            content: contentJson,
            status: data.status,
            publishedAt:
              data.status === "PUBLISHED"
                ? existing.publishedAt ?? now
                : existing.publishedAt,
          },
        });

        await tx.revision.create({
          data: {
            entityType: "Page",
            entityId: existing.id,
            createdById: user.id,
            snapshot: {
              slug: existing.slug,
              title: data.title,
              content: contentJson,
              status: data.status,
            },
          },
        });
      });

      await recordAuditLog({
        userId: user.id,
        action: "page.updated",
        entityType: "Page",
        entityId: existing.id,
        summary: { slug: existing.slug, status: data.status },
        ipHash,
      });

      revalidateCmsDomains(["pages"], [`/${existing.slug}`]);

      return {
        ok: true,
        message: `Halaman "${data.title}" berhasil disimpan.`,
        data: { id: existing.id },
      };
    }
  );
}
