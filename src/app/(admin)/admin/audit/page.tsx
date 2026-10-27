import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { getAdminAuditWorkspaceData } from "@/server/modules/audit/queries";
import { AuditLogsManager } from "@/features/admin/components/AuditLogsManager";

export const metadata: Metadata = {
  title: "Log Audit Keamanan",
};

export default async function AdminAuditPage() {
  await requirePermission("audit.view");
  const data = await getAdminAuditWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Log Audit Keamanan & Perubahan Sistem
        </h1>
        <p className="mt-1 text-sm text-[#5A6E85] dark:text-[#94A7C4]">
          Jejak rekaman autentikasi, perubahan konten CMS, manajemen hak akses,
          dan aktivitas sistem. Data kredensial disensor secara otomatis.
        </p>
      </div>

      {data.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
            aria-hidden="true"
          />
          <p>{data.loadError}</p>
        </div>
      )}

      <AuditLogsManager logs={data.logs} entityTypes={data.entityTypes} />
    </div>
  );
}
