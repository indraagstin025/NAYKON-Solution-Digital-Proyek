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

  const [statusFilter, setStatusFilter] = useState<MessageStatus | "ALL">("ALL");
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
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const selectMessage = (msg: ContactMessageItemDTO) => {
    setSelectedId(msg.id);
    setDraftStatus(msg.status);
    setDraftNote(msg.internalNote ?? "");
    setConfirmDeleteId(null);
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
          setConfirmDeleteId(null);
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

      <div className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter status pesan masuk"
            className="flex flex-wrap items-center gap-2"
          >
            {STATUS_OPTIONS.map((tab) => {
              const active = statusFilter === tab.value;
              const count = counts[tab.value];
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                    active
                      ? "border-[#60A5FA] bg-[#12213F] text-[#F1F5FB]"
                      : "border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4] hover:bg-[#12213F] hover:text-[#F1F5FB]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="rounded-md bg-[#030711] px-1.5 py-0.5 text-[11px] tabular-nums text-[#94A7C4]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="message-search" className="sr-only">
              Cari pengirim, email, atau isi pesan
            </label>
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A7C4]"
              aria-hidden="true"
            />
            <input
              id="message-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, email, atau layanan..."
              className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] pl-10 pr-3.5 text-sm text-[#F1F5FB] placeholder:text-[#94A7C4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            />
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-8 text-center">
          <p className="text-sm font-semibold text-[#F1F5FB]">
            Tidak ada pesan yang cocok dengan filter saat ini.
          </p>
          <p className="mt-1 text-xs text-[#94A7C4]">
            Ubah tab status atau kata kunci pencarian untuk menampilkan pesan lainnya.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-[#1E3358] bg-[#0B1730] divide-y divide-[#1E3358] overflow-hidden">
            {filteredItems.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => selectMessage(msg)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8] ${
                    isSelected
                      ? "bg-[#12213F]"
                      : "bg-[#0B1730] hover:bg-[#12213F]/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#F1F5FB]">
                        {msg.name}
                      </p>
                      <p className="truncate text-xs text-[#94A7C4]">
                        {msg.email}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                        msg.status === "NEW"
                          ? "border-[#FBBF24]/60 bg-[#0B1730] text-[#FBBF24]"
                          : msg.status === "REPLIED"
                          ? "border-[#34D399]/60 bg-[#0B1730] text-[#34D399]"
                          : msg.status === "SPAM"
                          ? "border-[#F87171]/60 bg-[#0B1730] text-[#FCA5A5]"
                          : "border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4]"
                      }`}
                    >
                      {STATUS_LABELS[msg.status]}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-[#F1F5FB]/90">
                    {msg.message}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#94A7C4]">
                    <span>{msg.service || "Konsultasi Umum"}</span>
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
              className="lg:col-span-7 rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#1E3358] pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#F1F5FB]">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-xs text-[#94A7C4]">
                    Email: {selectedMessage.email} · Sumber:{" "}
                    {selectedMessage.sourcePage}
                  </p>
                  <p className="mt-1 text-xs text-[#94A7C4]">
                    Waktu masuk:{" "}
                    {dateTimeFormatter.format(new Date(selectedMessage.createdAt))}{" "}
                    WIB
                    {selectedMessage.handledByName
                      ? ` · Ditangani oleh: ${selectedMessage.handledByName}`
                      : ""}
                  </p>
                </div>

                <a
                  href={`mailto:${encodeURIComponent(
                    selectedMessage.email
                  )}?subject=${encodeURIComponent(
                    `Tindak Lanjut Konsultasi NAIKON: ${
                      selectedMessage.service || "Kebutuhan Proyek Digital"
                    }`
                  )}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <EnvelopeClosedIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Balas via Email</span>
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#94A7C4]">
                  Kebutuhan Layanan: {selectedMessage.service || "Umum"}
                </p>
                <div className="rounded-xl border border-[#1E3358] bg-[#12213F] p-4 text-sm leading-relaxed text-[#F1F5FB] whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <form onSubmit={handleSaveHandling} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="message-status-select"
                      className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
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
                      className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
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
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
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
                    className="w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5 text-sm text-[#F1F5FB] placeholder:text-[#94A7C4] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {canUpdate ? (
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                    >
                      <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {isPending ? "Menyimpan..." : "Simpan Status & Catatan"}
                      </span>
                    </button>
                  ) : (
                    <p className="text-xs text-[#94A7C4]">
                      Peran akun Anda hanya memiliki akses baca pada pesan masuk.
                    </p>
                  )}

                  {canDelete && (
                    <div className="flex items-center gap-2">
                      {confirmDeleteId === selectedMessage.id ? (
                        <>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDelete(selectedMessage.id)}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#F87171] bg-[#12213F] px-3.5 text-xs font-semibold text-[#FCA5A5] transition-colors hover:bg-[#192D54] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                          >
                            <span>Konfirmasi Hapus Permanen</span>
                          </button>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => setConfirmDeleteId(null)}
                            className="inline-flex min-h-11 items-center rounded-xl border border-[#4E6E9E] bg-[#0B1730] px-3 text-xs font-medium text-[#94A7C4] hover:bg-[#12213F] hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => setConfirmDeleteId(selectedMessage.id)}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#F87171]/60 bg-[#0B1730] px-3.5 text-xs font-semibold text-[#FCA5A5] transition-colors hover:bg-[#12213F] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                          <span>Hapus Pesan</span>
                        </button>
                      )}
                    </div>
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
