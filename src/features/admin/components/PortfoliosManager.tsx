"use client";

import { useState } from "react";
import {
  CheckCircledIcon,
  PlusIcon,
  StarFilledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type { ContentStatus } from "@prisma/client";
import type { AdminPortfolioDTO } from "@/server/modules/portfolios/queries";
import {
  savePortfolioAction,
  togglePortfolioTrashAction,
} from "@/server/modules/portfolios/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { RadixSwitch } from "@/components/admin/ui/RadixSwitch";
import { RadixConfirmDialog } from "@/components/admin/ui/RadixConfirmDialog";

function toClientSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 100);
}

const STATUS_LABELS: Record<ContentStatus, string> = {
  DRAFT: "Draf",
  REVIEW: "Tinjauan",
  SCHEDULED: "Terjadwal",
  PUBLISHED: "Terbit",
  ARCHIVED: "Arsip",
};

export interface PortfoliosManagerProps {
  portfolios: AdminPortfolioDTO[];
  featuredCount: number;
  canCreate: boolean;
  canUpdate: boolean;
  canPublish: boolean;
  canDelete: boolean;
}

export function PortfoliosManager({
  portfolios,
  featuredCount,
  canCreate,
  canUpdate,
  canPublish,
  canDelete,
}: PortfoliosManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const first = portfolios[0] ?? null;
  const [editingId, setEditingId] = useState<string | null>(first?.id ?? null);
  const [title, setTitle] = useState(first?.title ?? "");
  const [slug, setSlug] = useState(first?.slug ?? "");
  const [category, setCategory] = useState(first?.category ?? "Sistem Web");
  const [clientSector, setClientSector] = useState(
    first?.clientSector ?? "Distribusi & Rantai Pasok"
  );
  const [summary, setSummary] = useState(first?.summary ?? "");
  const [techRaw, setTechRaw] = useState((first?.tech ?? []).join("\n"));
  const [impact, setImpact] = useState(first?.impact ?? "");
  const [metric, setMetric] = useState(first?.metric ?? "");
  const [imageAlt, setImageAlt] = useState(first?.imageAlt ?? "");
  const [sortOrder, setSortOrder] = useState(first?.sortOrder ?? 1);
  const [featured, setFeatured] = useState(first?.featured ?? false);
  const [status, setStatus] = useState<ContentStatus>(
    first?.status ?? "PUBLISHED"
  );
  const [isTrashDialogOpen, setIsTrashDialogOpen] = useState(false);

  const loadPortfolio = (item: AdminPortfolioDTO) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setCategory(item.category);
    setClientSector(item.clientSector);
    setSummary(item.summary);
    setTechRaw(item.tech.join("\n"));
    setImpact(item.impact);
    setMetric(item.metric);
    setImageAlt(item.imageAlt);
    setSortOrder(item.sortOrder);
    setFeatured(item.featured);
    setStatus(item.status);
    clearFeedback();
  };

  const startNewPortfolio = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCategory("Sistem Web");
    setClientSector("Logistik & Operasional");
    setSummary("");
    setTechRaw("Next.js\nTypeScript\nPostgreSQL");
    setImpact("");
    setMetric("");
    setImageAlt("");
    setSortOrder(portfolios.length + 1);
    setFeatured(false);
    setStatus("DRAFT");
    clearFeedback();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingId);
    if ((isEditing && !canUpdate) || (!isEditing && !canCreate)) return;

    await execute(
      () =>
        savePortfolioAction({
          id: editingId ?? undefined,
          title,
          slug: slug || toClientSlug(title),
          category,
          clientSector,
          summary,
          techRaw,
          impact,
          metric,
          imageAlt,
          sortOrder: Number(sortOrder) || 0,
          featured,
          status,
        }),
      {
        onSuccess: (saved) => {
          setEditingId(saved.id);
        },
      }
    );
  };

  const currentPortfolio = portfolios.find((p) => p.id === editingId) ?? null;
  const canSubmit = editingId ? canUpdate : canCreate;

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-[#041E42] dark:border-[#1E3358] dark:bg-[#12213F] dark:text-[#F1F5FB]">
            Total Studi Kasus: {portfolios.length}
          </span>
          <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 font-semibold tabular-nums text-[#0066FF] dark:border-[#60A5FA]/60 dark:bg-[#12213F] dark:text-[#F1F5FB]">
            Sorotan Beranda Aktif: {featuredCount} / 3
          </span>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={startNewPortfolio}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#0066FF] px-3.5 text-xs font-semibold text-white hover:bg-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#38BDF8]"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            <span>Studi Kasus Baru</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730] dark:divide-[#1E3358]">
          {portfolios.map((item) => {
            const selected = item.id === editingId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => loadPortfolio(item)}
                className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] ${
                  selected
                    ? "bg-blue-50/70 border-l-4 border-l-[#0066FF] dark:bg-[#12213F] dark:border-l-[#38BDF8]"
                    : "bg-white hover:bg-slate-50 dark:bg-[#0B1730] dark:hover:bg-[#12213F]/60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#041E42] dark:text-[#F1F5FB] flex items-center gap-1.5">
                      <span>{item.title}</span>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-[#0066FF] dark:border-[#60A5FA] dark:bg-[#0B1730] dark:text-[#60A5FA]">
                          <StarFilledIcon className="h-3 w-3" />
                          <span>Beranda</span>
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      {item.category} · {item.clientSector}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                      item.deletedAt
                        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5]"
                        : item.status === "PUBLISHED"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-[#34D399]/60 dark:bg-[#0B1730] dark:text-[#34D399]"
                        : "border-amber-200 bg-amber-50 text-amber-700 dark:border-[#FBBF24]/60 dark:bg-[#0B1730] dark:text-[#FBBF24]"
                    }`}
                  >
                    {item.deletedAt ? "Sampah" : STATUS_LABELS[item.status]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <section
          aria-label="Editor studi kasus portofolio"
          className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
        >
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
              {editingId
                ? "Perbarui Studi Kasus Portofolio"
                : "Tambah Studi Kasus Portofolio"}
            </h2>
            <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
              Maksimal 3 studi kasus dengan status Terbit yang dapat ditampilkan
              sebagai sorotan di halaman Beranda.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="port-title"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Judul Studi Kasus
                </label>
                <input
                  id="port-title"
                  type="text"
                  required
                  minLength={5}
                  maxLength={120}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingId) {
                      setSlug(toClientSlug(e.target.value));
                      setImageAlt(e.target.value);
                    }
                  }}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="port-slug"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Slug Identifikasi
                </label>
                <input
                  id="port-slug"
                  type="text"
                  required
                  minLength={3}
                  maxLength={100}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="port-cat"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Kategori Solusi
                </label>
                <select
                  id="port-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                >
                  <option value="Website Bisnis">Website Bisnis</option>
                  <option value="Sistem Web">Sistem Web</option>
                  <option value="Aplikasi Mobile">Aplikasi Mobile</option>
                  <option value="Redesign UI/UX">Redesign UI/UX</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="port-sector"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Sektor Industri Klien
                </label>
                <input
                  id="port-sector"
                  type="text"
                  required
                  value={clientSector}
                  onChange={(e) => setClientSector(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="port-summary"
                className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
              >
                Ringkasan Ruang Lingkup & Solusi
              </label>
              <textarea
                id="port-summary"
                rows={3}
                required
                minLength={20}
                maxLength={360}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="port-impact"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Dampak Operasional Nyata
                </label>
                <input
                  id="port-impact"
                  type="text"
                  required
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="Contoh: Sinkronisasi stok lintas cabang otomatis"
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="port-metric"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Label Cakupan Teknis (Metric)
                </label>
                <input
                  id="port-metric"
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  placeholder="Contoh: Sistem Inventaris Multi-Gudang"
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="port-tech"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Teknologi yang Digunakan (Satu per baris)
                </label>
                <textarea
                  id="port-tech"
                  rows={3}
                  required
                  value={techRaw}
                  onChange={(e) => setTechRaw(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="port-alt"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Teks Alternatif Gambar (Wajib saat Terbit)
                  </label>
                  <input
                    id="port-alt"
                    type="text"
                    required
                    minLength={5}
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Deskripsi visual antarmuka untuk pembaca layar"
                    className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="port-order"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                    >
                      Urutan
                    </label>
                    <input
                      id="port-order"
                      type="number"
                      min={0}
                      max={999}
                      value={sortOrder}
                      onChange={(e) => setSortOrder(Number(e.target.value))}
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="port-status"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="port-status"
                      value={status}
                      onChange={(e) =>
                        setStatus(e.target.value as ContentStatus)
                      }
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#38BDF8]"
                    >
                      <option value="DRAFT">Draf</option>
                      <option value="REVIEW">Tinjauan</option>
                      {canPublish && <option value="PUBLISHED">Terbit</option>}
                      {canPublish && <option value="ARCHIVED">Arsip</option>}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-[#4E6E9E] dark:bg-[#12213F]">
              <RadixSwitch
                id="port-featured"
                checked={featured}
                onCheckedChange={setFeatured}
                label="Tampilkan pada seksi Sorotan Portofolio di Beranda"
                description="Maksimal 3 studi kasus dengan status Terbit yang ditampilkan pada halaman Beranda."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {canSubmit && (
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0066FF] px-4 text-xs font-semibold text-white hover:bg-[#0052CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] disabled:opacity-60 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#38BDF8]"
                >
                  <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {isPending ? "Menyimpan..." : "Simpan Studi Kasus"}
                  </span>
                </button>
              )}

              {currentPortfolio && canDelete && (
                <>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setIsTrashDialogOpen(true)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5] dark:hover:bg-[#12213F]"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {currentPortfolio.deletedAt
                        ? "Pulihkan dari Sampah"
                        : "Pindahkan ke Sampah"}
                    </span>
                  </button>

                  <RadixConfirmDialog
                    open={isTrashDialogOpen}
                    onOpenChange={setIsTrashDialogOpen}
                    title={
                      currentPortfolio.deletedAt
                        ? "Pulihkan Studi Kasus"
                        : "Pindahkan ke Sampah"
                    }
                    description={
                      currentPortfolio.deletedAt
                        ? `Studi kasus "${currentPortfolio.title}" akan dipulihkan kembali ke daftar aktif.`
                        : `Studi kasus "${currentPortfolio.title}" akan dipindahkan ke folder sampah. Anda dapat memulihkannya kembali kapan saja.`
                    }
                    confirmLabel={
                      currentPortfolio.deletedAt ? "Pulihkan" : "Pindahkan ke Sampah"
                    }
                    isDestructive={!currentPortfolio.deletedAt}
                    isPending={isPending}
                    onConfirm={() =>
                      execute(() =>
                        togglePortfolioTrashAction({
                          id: currentPortfolio.id,
                          restore: Boolean(currentPortfolio.deletedAt),
                        })
                      )
                    }
                  />
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
