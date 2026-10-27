import type { Role } from "@prisma/client";

export type Permission =
  | "dashboard.view"
  | "content.view"
  | "content.create"
  | "content.update"
  | "content.publish"
  | "content.delete"
  | "revision.view"
  | "revision.restore"
  | "taxonomy.manage"
  | "media.view"
  | "media.create"
  | "media.delete"
  | "messages.view"
  | "messages.update"
  | "messages.delete"
  | "users.manage"
  | "settings.manage"
  | "analytics.view"
  | "analytics.export"
  | "audit.view";

export const PERMISSIONS: Record<Role, readonly Permission[]> = {
  ADMIN: [
    "dashboard.view",
    "content.view",
    "content.create",
    "content.update",
    "content.publish",
    "content.delete",
    "revision.view",
    "revision.restore",
    "taxonomy.manage",
    "media.view",
    "media.create",
    "media.delete",
    "messages.view",
    "messages.update",
    "messages.delete",
    "users.manage",
    "settings.manage",
    "analytics.view",
    "analytics.export",
    "audit.view",
  ],
  EDITOR: [
    "dashboard.view",
    "content.view",
    "content.create",
    "content.update",
    "content.publish",
    "revision.view",
    "revision.restore",
    "taxonomy.manage",
    "media.view",
    "media.create",
    "messages.view",
    "messages.update",
    "analytics.view",
    "analytics.export",
  ],
  VIEWER: [
    "dashboard.view",
    "content.view",
    "media.view",
    "messages.view",
    "analytics.view",
  ],
  ANALYST: [
    "dashboard.view",
    "messages.view",
    "analytics.view",
    "analytics.export",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role].includes(permission);
}
