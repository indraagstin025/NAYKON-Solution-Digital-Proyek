import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getAdminPortfoliosWorkspaceData } from "@/server/modules/portfolios/queries";
import { PortfoliosManager } from "@/features/admin/components/PortfoliosManager";

export const metadata: Metadata = {
  title: "Studi Kasus Portofolio",
};

export default async function AdminPortfoliosPage() {
  const user = await requirePermission("content.view");
  const data = await getAdminPortfoliosWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Manajemen Studi Kasus Portofolio
        </h1>
        <p className="mt-1 text-sm text-[#5A6E85] dark:text-[#94A7C4]">
          Kelola studi kasus proyek digital NAIKON, cakupan teknologi, serta
          sorotan portofolio di halaman Beranda.
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

      <PortfoliosManager
        portfolios={data.portfolios}
        featuredCount={data.featuredCount}
        canCreate={hasPermission(user.role, "content.create")}
        canUpdate={hasPermission(user.role, "content.update")}
        canPublish={hasPermission(user.role, "content.publish")}
        canDelete={hasPermission(user.role, "content.delete")}
      />
    </div>
  );
}
