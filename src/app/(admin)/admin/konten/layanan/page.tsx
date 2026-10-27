import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getAdminServicesWorkspaceData } from "@/server/modules/services/queries";
import { ServicesManager } from "@/features/admin/components/ServicesManager";

export const metadata: Metadata = {
  title: "Layanan & Paket Harga",
};

export default async function AdminServicesPage() {
  const user = await requirePermission("content.view");
  const data = await getAdminServicesWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Manajemen Layanan & Paket Harga
        </h1>
        <p className="mt-1 text-sm text-[#5A6E85] dark:text-[#94A7C4]">
          Perbarui cakupan layanan rekayasa perangkat lunak serta struktur paket
          investasi publik NAIKON.
        </p>
      </div>

      {data.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#0B1730] p-4 text-sm text-rose-900 dark:text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
            aria-hidden="true"
          />
          <p>{data.loadError}</p>
        </div>
      )}

      <ServicesManager
        services={data.services}
        pricingPlans={data.pricingPlans}
        canCreate={hasPermission(user.role, "content.create")}
        canUpdate={hasPermission(user.role, "content.update")}
        canPublish={hasPermission(user.role, "content.publish")}
        canDelete={hasPermission(user.role, "content.delete")}
      />
    </div>
  );
}
