"use client";

import { useMemo, useState } from "react";
import {
  CheckCircledIcon,
  EnvelopeClosedIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type { MessageStatus } from "@prisma/client";
import type { ContactMessageItemDTO } from "@/server/modules/messages/queries";
import {
  deleteContactMessageAction,
  updateContactMessageAction,
} from "@/server/modules/messages/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/RadixTabs";
import { RadixConfirmDialog } from "@/components/admin/ui/RadixConfirmDialog";
import { Tooltip } from "@/components/admin/ui/RadixTooltip";

const STATUS_OPTIONS: Array<{
  value: MessageStatus | "ALL";
  label: string;
}> = [
  { value: "ALL", label: "Semua" },
  { value: "NEW", label: "Baru" },
  { value: "READ", label: "Dibaca" },
  { value: "REPLIED", label: "Dibalas" },
  { value: "SPAM", label: "Spam" },
];

const STATUS_LABELS: Record<MessageStatus, string> = {
  NEW: "Baru",
  READ: "Dibaca",
  REPLIED: "Dibalas",
  SPAM: "Spam",
};

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export interface MessagesManagerProps {
  initialItems: ContactMessageItemDTO[];
  canUpdate: boolean;
  canDelete: boolean;
}

export function MessagesManager({
  initialItems,
  canUpdate,
  canDelete,
}: MessagesManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    initialItems[0]?.id ?? null
  );

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return initialItems.filter((item) => {
      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.service ?? "").toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [initialItems, statusFilter, searchQuery]);

  const counts = useMemo(() => {
    const map = {
      ALL: initialItems.length,
      NEW: 0,
      READ: 0,
      REPLIED: 0,
      SPAM: 0,
    };
    for (const item of initialItems) {
      map[item.status] += 1;
    }
    return map;
  }, [initialItems]);

  const selectedMessage = useMemo(() => {
    return (
      filteredItems.find((item) => item.id === selectedId) ??
      filteredItems[0] ??
      null
    );
  }, [filteredItems, selectedId]);

  const [draftStatus, setDraftStatus] = useState<MessageStatus>(
    selectedMessage?.status ?? "NEW"
  );
  const [draftNote, setDraftNote] = useState<string>(
    selectedMessage?.internalNote ?? ""
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const selectMessage = (msg: ContactMessageItemDTO) => {
    setSelectedId(msg.id);
    setDraftStatus(msg.status);
    setDraftNote(msg.internalNote ?? "");
    clearFeedback();
  };

  const handleSaveHandling = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !canUpdate) {
      return;
    }

    await execute(() =>
      updateContactMessageAction({
        id: selectedMessage.id,
        status: draftStatus,
        internalNote: draftNote,
      })
    );
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) {
      return;
    }

    await execute(
      () =>
        deleteContactMessageAction({
          id,
        }),
      {
        onSuccess: () => {
          const remaining = initialItems.filter((item) => item.id !== id);
          const next = remaining[0] ?? null;
          setSelectedId(next?.id ?? null);
          if (next) {
            setDraftStatus(next.status);
            setDraftNote(next.internalNote ?? "");
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList aria-label="Filter status pesan masuk">
              {STATUS_OPTIONS.map((tab) => {
                const count = counts[tab.value];
                return (
                  <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                    <span>{tab.label}</span>
                    <span className="rounded-md bg-slate-200 dark:bg-[#030711] px-1.5 py-0.5 text-[11px] tabular-nums text-slate-700 dark:text-[#94A7C4]">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <div className="relative w-full lg:w-72">
            <label htmlFor="message-search" className="sr-only">
              Cari pengirim, email, atau isi pesan
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A6E85] dark:text-[#94A7C4]"
              aria-hidden="true"
            />
            <input
              id="message-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, atau layanan..."
              className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] pl-10 pr-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            />
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-10 text-center shadow-xs">
          <p className="text-sm font-semibold text-[#041E42] dark:text-[#F1F5FB]">
            Tidak ada pesan yang cocok dengan filter saat ini.
          </p>
          <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
            Ubah tab status atau kata kunci pencarian untuk menampilkan pesan lainnya.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] divide-y divide-slate-100 dark:divide-[#1E3358] overflow-hidden shadow-xs">
            {filteredItems.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => selectMessage(msg)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] ${
                    isSelected
                      ? "bg-[#EAF4FC] dark:bg-[#12213F]"
                      : "bg-white dark:bg-[#0B1730] hover:bg-slate-50 dark:hover:bg-[#12213F]/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]">
                        {msg.name}
                      </p>
                      <p className="truncate text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                        {msg.email}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold ${
                        msg.status === "NEW"
                          ? "border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#0B1730] text-amber-800 dark:text-[#FBBF24]"
                          : msg.status === "REPLIED"
                          ? "border-emerald-300 dark:border-[#34D399]/60 bg-emerald-50 dark:bg-[#0B1730] text-emerald-800 dark:text-[#34D399]"
                          : msg.status === "SPAM"
                          ? "border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#0B1730] text-rose-800 dark:text-[#FCA5A5]"
                          : "border-slate-300 dark:border-[#4E6E9E] bg-slate-100 dark:bg-[#0B1730] text-slate-700 dark:text-[#94A7C4]"
                      }`}
                    >
                      {STATUS_LABELS[msg.status]}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-slate-700 dark:text-[#F1F5FB]/90">
                    {msg.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                    <span className="font-medium">{msg.service || "Konsultasi Umum"}</span>
                    <span className="tabular-nums">
                      {dateTimeFormatter.format(new Date(msg.createdAt))}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedMessage && (
            <section
              key={selectedMessage.id}
              aria-label="Detail pesan terpilih"
              className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 space-y-6 shadow-xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 dark:border-[#1E3358] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                    Email: {selectedMessage.email} · Sumber:{" "}
                    {selectedMessage.sourcePage}
                  </p>
                  <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                    Waktu masuk:{" "}
                    {dateTimeFormatter.format(new Date(selectedMessage.createdAt))}{" "}
                    WIB
                    {selectedMessage.handledByName
                      ? ` · Ditangani oleh: ${selectedMessage.handledByName}`
                      : ""}
                  </p>
                </div>

                <Tooltip content="Buka aplikasi email klien untuk membalas pengirim">
                  <a
                    href={`mailto:${encodeURIComponent(
                      selectedMessage.email
                    )}?subject=${encodeURIComponent(
                      `Tindak Lanjut Konsultasi Next Karya: ${
                        selectedMessage.service || "Kebutuhan Proyek Digital"
                      }`
                    )}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-4 text-xs font-semibold text-white transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    <EnvelopeClosedIcon className="h-4 w-4" aria-hidden="true" />
                    <span>Balas via Email</span>
                  </a>
                </Tooltip>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Kebutuhan Layanan: {selectedMessage.service || "Umum"}
                </p>
                <div className="rounded-xl border border-slate-200 dark:border-[#1E3358] bg-slate-50 dark:bg-[#12213F] p-4 text-sm leading-relaxed text-[#041E42] dark:text-[#F1F5FB] whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <form onSubmit={handleSaveHandling} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="message-status-select"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Status Penanganan
                    </label>
                    <select
                      id="message-status-select"
                      value={draftStatus}
                      disabled={!canUpdate || isPending}
                      onChange={(e) =>
                        setDraftStatus(e.target.value as MessageStatus)
                      }
                      className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] disabled:opacity-60 focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                    >
                      <option value="NEW">Baru (Belum Ditangani)</option>
                      <option value="READ">Sudah Dibaca</option>
                      <option value="REPLIED">Sudah Dibalas</option>
                      <option value="SPAM">Tandai sebagai Spam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message-internal-note"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Catatan Internal Tim (Tidak terlihat oleh pengirim)
                  </label>
                  <textarea
                    id="message-internal-note"
                    rows={3}
                    maxLength={1000}
                    disabled={!canUpdate || isPending}
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    placeholder="Contoh: Sudah dihubungi melalui email pada pukul 10.30 WIB untuk penjadwalan diskusi teknis."
                    className="w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] p-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] disabled:opacity-60 focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {canUpdate ? (
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-4 text-xs font-semibold text-white transition-colors disabled:opacity-60 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                    >
                      <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {isPending ? "Menyimpan..." : "Simpan Status & Catatan"}
                      </span>
                    </button>
                  ) : (
                    <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      Peran akun Anda hanya memiliki akses baca pada pesan masuk.
                    </p>
                  )}

                  {canDelete && (
                    <>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 dark:border-[#F87171]/60 bg-white dark:bg-[#0B1730] px-3.5 text-xs font-semibold text-rose-600 dark:text-[#FCA5A5] transition-colors hover:bg-rose-50 dark:hover:bg-[#12213F] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                      >
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        <span>Hapus Pesan</span>
                      </button>

                      <RadixConfirmDialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        title="Hapus Pesan Masuk"
                        description={`Pesan dari ${selectedMessage.name} (${selectedMessage.email}) akan dihapus secara permanen dari basis data. Tindakan ini tidak dapat dibatalkan.`}
                        confirmLabel="Hapus Permanen"
                        isPending={isPending}
                        onConfirm={() => handleDelete(selectedMessage.id)}
                      />
                    </>
                  )}
                </div>
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
