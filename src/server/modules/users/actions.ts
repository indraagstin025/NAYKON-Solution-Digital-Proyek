"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/server/config/db";
import { revalidateAdminPaths } from "@/server/config/cache";
import { extractFieldErrors, type ActionResult } from "@/server/config/result";
import { runProtectedAction } from "@/server/security/action-guard";
import { recordAuditLog } from "@/server/security/audit";
import {
  createUserSchema,
  revokeUserSessionsSchema,
  updateUserAccessSchema,
} from "@/server/validators/user";

const BCRYPT_ROUNDS = 12;

export async function createUserAction(input: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "users.create",
      permission: "users.manage",
    },
    async ({ user, ipHash }) => {
      const parsed = createUserSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Periksa kembali data pengguna baru.",
          fieldErrors: extractFieldErrors(parsed.error.issues),
        };
      }

      const data = parsed.data;

      const existing = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      });

      if (existing) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Alamat email tersebut sudah terdaftar di sistem.",
          fieldErrors: { email: ["Gunakan alamat email lain."] },
        };
      }

      const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

      const created = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
          role: data.role,
          isActive: true,
          emailVerified: new Date(),
        },
        select: { id: true, name: true, email: true, role: true },
      });

      await recordAuditLog({
        userId: user.id,
        action: "user.created",
        entityType: "User",
        entityId: created.id,
        summary: {
          targetEmail: created.email,
          assignedRole: created.role,
        },
        ipHash,
      });

      revalidateAdminPaths(["/admin", "/admin/pengguna", "/admin/audit"]);

      return {
        ok: true,
        message: `Akun pengguna "${created.name}" (${created.role}) berhasil dibuat.`,
        data: { id: created.id },
      };
    }
  );
}

export async function updateUserAccessAction(input: {
  userId: string;
  role: string;
  isActive: boolean;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "users.update_access",
      permission: "users.manage",
      destructive: true,
    },
    async ({ user, ipHash }) => {
      const parsed = updateUserAccessSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "Parameter perubahan akses pengguna tidak valid.",
        };
      }

      const data = parsed.data;

      if (data.userId === user.id && (!data.isActive || data.role !== "ADMIN")) {
        return {
          ok: false,
          errorKind: "conflict",
          error:
            "Anda tidak dapat menonaktifkan akun sendiri atau menurunkan peran Admin milik Anda sendiri.",
        };
      }

      const result = await prisma.$transaction(
        async (
          tx
        ): Promise<
          | { kind: "not_found" }
          | { kind: "last_admin"; lastAdminError: string }
          | {
              kind: "ok";
              target: {
                id: string;
                name: string;
                email: string;
                role: string;
                isActive: boolean;
              };
              shouldBumpSession: boolean;
            }
        > => {
          const target = await tx.user.findUnique({
            where: { id: data.userId },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isActive: true,
            },
          });

          if (!target) {
            return { kind: "not_found" };
          }

          // Prevent removing or deactivating the last active ADMIN account.
          if (
            target.role === "ADMIN" &&
            target.isActive &&
            (data.role !== "ADMIN" || !data.isActive)
          ) {
            const otherActiveAdmins = await tx.user.count({
              where: {
                role: "ADMIN",
                isActive: true,
                id: { not: target.id },
              },
            });

            if (otherActiveAdmins === 0) {
              return {
                kind: "last_admin",
                lastAdminError:
                  "Tidak dapat mengubah peran atau menonaktifkan Administrator aktif terakhir di sistem.",
              };
            }
          }

          const shouldBumpSession =
            target.role !== data.role || (target.isActive && !data.isActive);

          await tx.user.update({
            where: { id: target.id },
            data: {
              role: data.role,
              isActive: data.isActive,
              ...(shouldBumpSession ? { sessionVersion: { increment: 1 } } : {}),
            },
          });

          return {
            kind: "ok",
            target,
            shouldBumpSession,
          };
        }
      );

      if (result.kind === "not_found") {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Pengguna tidak ditemukan.",
        };
      }

      if (result.kind === "last_admin") {
        return {
          ok: false,
          errorKind: "conflict",
          error: result.lastAdminError,
        };
      }

      await recordAuditLog({
        userId: user.id,
        action: "user.access_updated",
        entityType: "User",
        entityId: result.target.id,
        summary: {
          targetEmail: result.target.email,
          previousRole: result.target.role,
          nextRole: data.role,
          isActive: data.isActive,
          sessionsRevoked: result.shouldBumpSession,
        },
        ipHash,
      });

      revalidateAdminPaths(["/admin", "/admin/pengguna", "/admin/audit"]);

      return {
        ok: true,
        message: `Hak akses untuk "${result.target.name}" berhasil diperbarui.`,
        data: { id: result.target.id },
      };
    }
  );
}

export async function revokeUserSessionsAction(input: {
  userId: string;
}): Promise<ActionResult<{ id: string }>> {
  return runProtectedAction(
    {
      actionName: "users.revoke_sessions",
      permission: "users.manage",
      destructive: true,
    },
    async ({ user, ipHash }) => {
      const parsed = revokeUserSessionsSchema.safeParse(input);
      if (!parsed.success) {
        return {
          ok: false,
          errorKind: "validation",
          error: "ID pengguna tidak valid.",
        };
      }

      const target = await prisma.user.findUnique({
        where: { id: parsed.data.userId },
        select: { id: true, name: true, email: true },
      });

      if (!target) {
        return {
          ok: false,
          errorKind: "conflict",
          error: "Pengguna tidak ditemukan.",
        };
      }

      const updated = await prisma.user.update({
        where: { id: target.id },
        data: { sessionVersion: { increment: 1 } },
        select: { sessionVersion: true },
      });

      await recordAuditLog({
        userId: user.id,
        action: "user.sessions_revoked",
        entityType: "User",
        entityId: target.id,
        summary: {
          targetEmail: target.email,
          newSessionVersion: updated.sessionVersion,
        },
        ipHash,
      });

      revalidateAdminPaths(["/admin/pengguna", "/admin/audit"]);

      return {
        ok: true,
        message: `Seluruh sesi aktif untuk "${target.name}" telah diakhiri.`,
        data: { id: target.id },
      };
    }
  );
}
