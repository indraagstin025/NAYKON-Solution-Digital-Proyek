"use client";

import { useState } from "react";
import {
  CheckCircledIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type { ContentStatus } from "@prisma/client";
import type {
  AdminFaqDTO,
  AdminPageDTO,
} from "@/server/modules/faqs/queries";
import {
  saveFaqAction,
  saveStaticPageAction,
  toggleFaqTrashAction,
} from "@/server/modules/faqs/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/RadixTabs";
import { RadixConfirmDialog } from "@/components/admin/ui/RadixConfirmDialog";

const STATUS_LABELS: Record<ContentStatus, string> = {
  DRAFT: "Draf",
  REVIEW: "Tinjauan",
  SCHEDULED: "Terjadwal",
  PUBLISHED: "Terbit",
  ARCHIVED: "Arsip",
};

export interface FaqsManagerProps {
  faqs: AdminFaqDTO[];
  pages: AdminPageDTO[];
  canCreate: boolean;
  canUpdate: boolean;
  canPublish: boolean;
  canDelete: boolean;
}

export function FaqsManager({
  faqs,
  pages,
  canCreate,
  canUpdate,
  canPublish,
  canDelete,
}: FaqsManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const [activeTab, setActiveTab] = useState<"faqs" | "pages">("faqs");

  const firstFaq = faqs[0] ?? null;
  const [faqId, setFaqId] = useState<string | null>(firstFaq?.id ?? null);
  const [question, setQuestion] = useState(firstFaq?.question ?? "");
  const [answer, setAnswer] = useState(firstFaq?.answer ?? "");
  const [category, setCategory] = useState(firstFaq?.category ?? "Umum");
  const [sortOrder, setSortOrder] = useState(firstFaq?.sortOrder ?? 1);
  const [faqStatus, setFaqStatus] = useState<ContentStatus>(
    firstFaq?.status ?? "PUBLISHED"
  );

  const firstPage = pages[0] ?? null;
  const [pageId, setPageId] = useState<string>(firstPage?.id ?? "");
  const [pageTitle, setPageTitle] = useState(firstPage?.title ?? "");
  const [pageSeoTitle, setPageSeoTitle] = useState(firstPage?.seoTitle ?? "");
  const [pageSeoDesc, setPageSeoDesc] = useState(
    firstPage?.seoDescription ?? ""
  );
  const [pageUpdatedLabel, setPageUpdatedLabel] = useState(
    firstPage?.updatedLabel ?? ""
  );
  const [pageBodyText, setPageBodyText] = useState(firstPage?.bodyText ?? "");
  const [pageStatus, setPageStatus] = useState<ContentStatus>(
    firstPage?.status ?? "PUBLISHED"
  );
  const [isTrashFaqOpen, setIsTrashFaqOpen] = useState(false);

  const loadFaq = (item: AdminFaqDTO) => {
    setFaqId(item.id);
    setQuestion(item.question);
    setAnswer(item.answer);
    setCategory(item.category);
    setSortOrder(item.sortOrder);
    setFaqStatus(item.status);
    clearFeedback();
  };

  const startNewFaq = () => {
    setFaqId(null);
    setQuestion("");
    setAnswer("");
    setCategory("Umum");
    setSortOrder(faqs.length + 1);
    setFaqStatus("DRAFT");
    clearFeedback();
  };

  const loadPage = (p: AdminPageDTO) => {
    setPageId(p.id);
    setPageTitle(p.title);
    setPageSeoTitle(p.seoTitle);
    setPageSeoDesc(p.seoDescription);
    setPageUpdatedLabel(p.updatedLabel);
    setPageBodyText(p.bodyText);
    setPageStatus(p.status);
    clearFeedback();
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(faqId);
    if ((isEditing && !canUpdate) || (!isEditing && !canCreate)) return;

    await execute(
      () =>
        saveFaqAction({
          id: faqId ?? undefined,
          question,
          answer,
          category,
          sortOrder: Number(sortOrder) || 0,
          status: faqStatus,
        }),
      {
        onSuccess: (saved) => {
          setFaqId(saved.id);
        },
      }
    );
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageId || !canUpdate) return;

    await execute(() =>
      saveStaticPageAction({
        id: pageId,
        title: pageTitle,
        seoTitle: pageSeoTitle,
        seoDescription: pageSeoDesc,
        updatedLabel: pageUpdatedLabel,
        bodyText: pageBodyText,
        status: pageStatus,
      })
    );
  };

  const currentFaq = faqs.find((f) => f.id === faqId) ?? null;
  const currentPage = pages.find((p) => p.id === pageId) ?? null;
  const canSubmitFaq = faqId ? canUpdate : canCreate;

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "faqs" | "pages")}
        >
          <TabsList aria-label="Submodul FAQ dan halaman statis">
            <TabsTrigger value="faqs">
              Pertanyaan FAQ ({faqs.length})
            </TabsTrigger>
            <TabsTrigger value="pages">
              Halaman Statis ({pages.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "faqs" && canCreate && (
          <button
            type="button"
            onClick={startNewFaq}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#005090] px-3.5 text-xs font-semibold text-white hover:bg-[#003E70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#0986C8]"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            <span>Pertanyaan FAQ Baru</span>
          </button>
        )}
      </div>

      {activeTab === "faqs" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730] dark:divide-[#1E3358]">
            {faqs.map((item) => {
              const selected = item.id === faqId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => loadFaq(item)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8] ${
                    selected
                      ? "bg-[#FFFFFF] border-l-4 border-l-[#005090] dark:bg-[#12213F] dark:border-l-[#0986C8]"
                      : "bg-white hover:bg-slate-50 dark:bg-[#0B1730] dark:hover:bg-[#12213F]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#041E42] dark:text-[#F1F5FB] line-clamp-2">
                      {item.question}
                    </p>
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
                  <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                    Urutan #{item.sortOrder} · {item.category || "Umum"}
                  </p>
                </button>
              );
            })}
          </div>

          <section
            aria-label="Editor pertanyaan FAQ"
            className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
                {faqId ? "Perbarui Pertanyaan FAQ" : "Tambah Pertanyaan FAQ"}
              </h2>
              <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Pertanyaan FAQ terbit akan ditampilkan beserta schema.org
                FAQPage pada halaman Beranda.
              </p>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label
                  htmlFor="faq-question"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Pertanyaan
                </label>
                <input
                  id="faq-question"
                  type="text"
                  required
                  minLength={8}
                  maxLength={180}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                />
              </div>

              <div>
                <label
                  htmlFor="faq-answer"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Jawaban Lengkap
                </label>
                <textarea
                  id="faq-answer"
                  rows={4}
                  required
                  minLength={15}
                  maxLength={1200}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="faq-category"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Kategori Topik
                  </label>
                  <input
                    id="faq-category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="faq-order"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Urutan Tampil
                  </label>
                  <input
                    id="faq-order"
                    type="number"
                    min={0}
                    max={999}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="faq-status"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Status Publikasi
                  </label>
                  <select
                    id="faq-status"
                    value={faqStatus}
                    onChange={(e) =>
                      setFaqStatus(e.target.value as ContentStatus)
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                  >
                    <option value="DRAFT">Draf</option>
                    <option value="REVIEW">Tinjauan</option>
                    {canPublish && <option value="PUBLISHED">Terbit</option>}
                    {canPublish && <option value="ARCHIVED">Arsip</option>}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {canSubmitFaq && (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#005090] px-4 text-xs font-semibold text-white hover:bg-[#003E70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] disabled:opacity-60 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#0986C8]"
                  >
                    <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{isPending ? "Menyimpan..." : "Simpan FAQ"}</span>
                  </button>
                )}

                {currentFaq && canDelete && (
                  <>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setIsTrashFaqOpen(true)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 dark:border-[#F87171]/60 dark:bg-[#0B1730] dark:text-[#FCA5A5] dark:hover:bg-[#12213F]"
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {currentFaq.deletedAt
                          ? "Pulihkan dari Sampah"
                          : "Pindahkan ke Sampah"}
                      </span>
                    </button>

                    <RadixConfirmDialog
                      open={isTrashFaqOpen}
                      onOpenChange={setIsTrashFaqOpen}
                      title={
                        currentFaq.deletedAt
                          ? "Pulihkan Pertanyaan FAQ"
                          : "Pindahkan Pertanyaan FAQ ke Sampah"
                      }
                      description={
                        currentFaq.deletedAt
                          ? `Pertanyaan FAQ "${currentFaq.question}" akan dipulihkan kembali ke daftar aktif.`
                          : `Pertanyaan FAQ "${currentFaq.question}" akan dipindahkan ke folder sampah.`
                      }
                      confirmLabel={
                        currentFaq.deletedAt ? "Pulihkan" : "Pindahkan ke Sampah"
                      }
                      isDestructive={!currentFaq.deletedAt}
                      isPending={isPending}
                      onConfirm={() =>
                        execute(() =>
                          toggleFaqTrashAction({
                            id: currentFaq.id,
                            restore: Boolean(currentFaq.deletedAt),
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
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730] dark:divide-[#1E3358]">
            {pages.map((p) => {
              const selected = p.id === pageId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => loadPage(p)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8] ${
                    selected
                      ? "bg-[#FFFFFF] border-l-4 border-l-[#005090] dark:bg-[#12213F] dark:border-l-[#0986C8]"
                      : "bg-white hover:bg-slate-50 dark:bg-[#0B1730] dark:hover:bg-[#12213F]/60"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                    {p.title}
                  </p>
                  <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">Slug: /{p.slug}</p>
                </button>
              );
            })}
          </div>

          {currentPage && (
            <section
              aria-label="Editor halaman statis"
              className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
            >
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
                  Perbarui Halaman: /{currentPage.slug}
                </h2>
                <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  Perubahan langsung diperbarui pada halaman publik /
                  {currentPage.slug}.
                </p>
              </div>

              <form onSubmit={handleSavePage} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="page-title"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Judul Halaman
                    </label>
                    <input
                      id="page-title"
                      type="text"
                      required
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="page-updated-label"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Label Pembaruan Dokumen
                    </label>
                    <input
                      id="page-updated-label"
                      type="text"
                      value={pageUpdatedLabel}
                      onChange={(e) => setPageUpdatedLabel(e.target.value)}
                      placeholder="Contoh: Oktober 2026"
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="page-body"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Isi Dokumen Terstruktur
                  </label>
                  <textarea
                    id="page-body"
                    rows={10}
                    required
                    value={pageBodyText}
                    onChange={(e) => setPageBodyText(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3.5 font-mono text-xs leading-relaxed text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="page-seo-title"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Judul SEO
                    </label>
                    <input
                      id="page-seo-title"
                      type="text"
                      maxLength={70}
                      value={pageSeoTitle}
                      onChange={(e) => setPageSeoTitle(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="page-seo-desc"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Deskripsi SEO
                    </label>
                    <input
                      id="page-seo-desc"
                      type="text"
                      maxLength={170}
                      value={pageSeoDesc}
                      onChange={(e) => setPageSeoDesc(e.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="page-status"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                    >
                      Status
                    </label>
                    <select
                      id="page-status"
                      value={pageStatus}
                      onChange={(e) =>
                        setPageStatus(e.target.value as ContentStatus)
                      }
                      className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-sm text-[#041E42] placeholder:text-slate-400 focus:bg-white focus:border-[#005090] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:placeholder:text-[#94A7C4] dark:focus:border-[#0986C8]"
                    >
                      <option value="DRAFT">Draf</option>
                      {canPublish && <option value="PUBLISHED">Terbit</option>}
                    </select>
                  </div>
                </div>

                {canUpdate && (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#005090] px-4 text-xs font-semibold text-white hover:bg-[#003E70] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] disabled:opacity-60 dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#0986C8]"
                  >
                    <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isPending ? "Menyimpan..." : "Simpan Halaman Statis"}
                    </span>
                  </button>
                )}
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
