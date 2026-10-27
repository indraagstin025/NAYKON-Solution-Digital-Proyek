import type { Metadata } from "next";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getMessagesInboxData } from "@/server/modules/messages/queries";
import { MessagesManager } from "@/features/admin/components/MessagesManager";

export const metadata: Metadata = {
  title: "Inbox Pesan Masuk",
};

export default async function AdminMessagesPage() {
  const user = await requirePermission("messages.view");
  const inbox = await getMessagesInboxData();

  const canUpdate = hasPermission(user.role, "messages.update");
  const canDelete = hasPermission(user.role, "messages.delete");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Inbox Pesan Konsultasi Masuk
        </h1>
        <p className="mt-1 text-sm text-[#5A6E85] dark:text-[#94A7C4]">
          Tinjau kiriman pesan dari formulir halaman Beranda dan Kontak, catat tindak
          lanjut tim, dan perbarui status penanganan.
        </p>
      </div>

      {inbox.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#0B1730] p-4 text-sm text-rose-900 dark:text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
            aria-hidden="true"
          />
          <p>{inbox.loadError}</p>
        </div>
      )}

      <MessagesManager
        initialItems={inbox.items}
        canUpdate={canUpdate}
        canDelete={canDelete}
      />
    </div>
  );
}
