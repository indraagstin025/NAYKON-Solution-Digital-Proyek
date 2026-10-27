import "server-only";
import type { Role } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";

const USERS_TIMEOUT_MS = 8_000;

export interface AdminUserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  sessionVersion: number;
  lastLoginAt: string | null;
  createdAt: string;
  articleCount: number;
}

export interface AdminUsersWorkspaceData {
  users: AdminUserDTO[];
  activeAdminCount: number;
  loadError: string | null;
}

export async function getAdminUsersWorkspaceData(): Promise<AdminUsersWorkspaceData> {
  try {
    const rows = await withServerTimeout(
      prisma.user.findMany({
        orderBy: [{ isActive: "desc" }, { role: "asc" }, { createdAt: "asc" }],
        take: 50,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          sessionVersion: true,
          lastLoginAt: true,
          createdAt: true,
          _count: { select: { articles: true } },
        },
      }),
      USERS_TIMEOUT_MS,
      "getAdminUsersWorkspaceData"
    );

    const activeAdminCount = rows.filter(
      (r) => r.role === "ADMIN" && r.isActive
    ).length;

    return {
      users: rows.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        sessionVersion: u.sessionVersion,
        lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        createdAt: u.createdAt.toISOString(),
        articleCount: u._count.articles,
      })),
      activeAdminCount,
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load users workspace data:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      users: [],
      activeAdminCount: 0,
      loadError: "Tidak dapat memuat daftar pengguna dari database saat ini.",
    };
  }
}
