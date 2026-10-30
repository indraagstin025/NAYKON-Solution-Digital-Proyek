import type { Metadata } from "next";
import { requireUser } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getUnreadMessagesBadgeCount } from "@/server/modules/overview/queries";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Ruang Kerja CMS | Next Karya Digital Solutions",
    template: "%s | Next Karya CMS",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const unreadMessagesCount = await getUnreadMessagesBadgeCount(user);

  return (
    <AdminShell
      userName={user.name}
      userEmail={user.email}
      userRole={user.role}
      unreadMessagesCount={unreadMessagesCount}
      canViewMessages={hasPermission(user.role, "messages.view")}
      canViewContent={hasPermission(user.role, "content.view")}
      canManageUsers={hasPermission(user.role, "users.manage")}
      canViewAudit={hasPermission(user.role, "audit.view")}
    >
      {children}
    </AdminShell>
  );
}
