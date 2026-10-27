import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getAdminArticlesWorkspaceData } from "@/server/modules/articles/queries";
import { ArticlesManager } from "@/features/admin/components/ArticlesManager";

export const metadata: Metadata = {
  title: "Artikel, Kategori & Tag",
};

export default async function AdminArticlesPage() {
  const user = await requirePermission("content.view");
  const data = await getAdminArticlesWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F5FB]">
          Manajemen Artikel Blog, Kategori & Tag
        </h1>
        <p className="mt-1 text-sm text-[#94A7C4]">
          Kelola artikel edukasi teknis, metadata SEO, riwayat revisi konten, dan
          taksonomi publikasi.
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

      <ArticlesManager
        articles={data.articles}
        categories={data.categories}
        tags={data.tags}
        redirectsCount={data.redirectsCount}
        canCreate={hasPermission(user.role, "content.create")}
        canUpdate={hasPermission(user.role, "content.update")}
        canPublish={hasPermission(user.role, "content.publish")}
        canDelete={hasPermission(user.role, "content.delete")}
        canManageTaxonomy={hasPermission(user.role, "taxonomy.manage")}
        canRestoreRevision={hasPermission(user.role, "revision.restore")}
      />
    </div>
  );
}
