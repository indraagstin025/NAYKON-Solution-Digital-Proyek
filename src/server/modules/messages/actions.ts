"use server";

import { prisma } from "@/server/config/db";
import { revalidateAdminPaths } from "@/server/config/cache";
import { extractFieldErrors, type ActionResult } from "@/server/config/result";
import { runProtectedAction } from "@/server/security/action-guard";
import { recordAuditLog } from "@/server/security/audit";
import {
  deleteContactMessageSchema,
  updateContactMessageSchema,
} from "@/server/validators/message";

export async function updateContactMessageAction(input: {
  id: string;
  status: string;
  internalNote?: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "messages.update",
      permission: "messages.update",
    },
    async ({ user, ipHash }) => {
      const parsed = updateContactMessageSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali status atau catatan pesan.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const { id, status, internalNote } = parsed.data;

      const existing = await prisma.contactMessage.findUnique({
        where: { id },
        select: { id: true, status: true, email: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Pesan tidak ditemukan atau sudah dihapus.",
        };
      }

      await prisma.contactMessage.update({
        where: { id },
        data: {
          status,
          internalNote,
          handledById: user.id,
        },
      });

      await recordAuditLog({
        userId: user.id,
        action: "message.status_updated",
        entityType: "ContactMessage",
        entityId: id,
        summary: {
          previousStatus: existing.status,
          nextStatus: status,
          hasNote: Boolean(internalNote),
        },
        ipHash,
      });

      revalidateAdminPaths(["/admin", "/admin/pesan"]);

      return {
        ok: true,
        message: "Status dan catatan penanganan pesan berhasil diperbarui.",
        data: { id },
      };
    }
  );
}

export async function deleteContactMessageAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "messages.delete",
      permission: "messages.delete",
      destructive: true,
    },
    async ({ user, ipHash }) => {
      const parsed = deleteContactMessageSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID pesan tidak valid.",
        };
      }

      const existing = await prisma.contactMessage.findUnique({
        where: { id: parsed.data.id },
        select: { id: true, name: true, status: true },
      });

      if (!existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Pesan sudah tidak ada di database.",
        };
      }

      await prisma.contactMessage.delete({
        where: { id: existing.id },
      });

      await recordAuditLog({
        userId: user.id,
        action: "message.deleted",
        entityType: "ContactMessage",
        entityId: existing.id,
        summary: {
          senderName: existing.name,
          statusBeforeDelete: existing.status,
        },
        ipHash,
      });

      revalidateAdminPaths(["/admin", "/admin/pesan"]);

      return {
        ok: true,
        message: `Pesan dari "${existing.name}" berhasil dihapus permanen.`,
        data: { id: existing.id },
      };
    }
  );
}
