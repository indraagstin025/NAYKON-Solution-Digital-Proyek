import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { getAdminUsersWorkspaceData } from "@/server/modules/users/queries";
import { UsersManager } from "@/features/admin/components/UsersManager";

export const metadata: Metadata = {
  title: "Manajemen Pengguna",
};

export default async function AdminUsersPage() {
  const user = await requirePermission("users.manage");
  const data = await getAdminUsersWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F5FB]">
          Manajemen Pengguna & Keamanan Sesi
        </h1>
        <p className="mt-1 text-sm text-[#94A7C4]">
          Kelola akun internal NAIKON, hak akses berbasis peran (RBAC), status
          aktif akun, serta pencabutan sesi instan.
        </p>
      </div>

      {data.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#F87171]/60 bg-[#0B1730] p-4 text-sm text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-[#F87171]"
            aria-hidden="true"
          />
          <p>{data.loadError}</p>
        </div>
      )}

      <UsersManager
        users={data.users}
        currentUserId={user.id}
        activeAdminCount={data.activeAdminCount}
      />
    </div>
  );
}
