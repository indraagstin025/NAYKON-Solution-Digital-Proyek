"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircledIcon,
  ExternalLinkIcon,
  PlusIcon,
  ResetIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type { ContentStatus } from "@prisma/client";
import type {
  AdminArticleDTO,
  AdminCategoryDTO,
  AdminTagDTO,
} from "@/server/modules/articles/queries";
import {
  createCategoryAction,
  createTagAction,
  deleteCategoryAction,
  deleteTagAction,
  restoreArticleRevisionAction,
  saveArticleAction,
  toggleArticleTrashAction,
} from "@/server/modules/articles/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/RadixTabs";
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

export interface ArticlesManagerProps {
  articles: AdminArticleDTO[];
  categories: AdminCategoryDTO[];
  tags: AdminTagDTO[];
  redirectsCount: number;
  canCreate: boolean;
  canUpdate: boolean;
  canPublish: boolean;
  canDelete: boolean;
  canManageTaxonomy: boolean;
  canRestoreRevision: boolean;
}

export function ArticlesManager({
  articles,
  categories,
  tags,
  redirectsCount,
  canCreate,
  canUpdate,
  canPublish,
  canDelete,
  canManageTaxonomy,
  canRestoreRevision,
}: ArticlesManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const [activeTab, setActiveTab] = useState<"articles" | "taxonomy">(
    "articles"
  );
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "ALL">(
    "ALL"
  );

  const firstArticle = articles[0] ?? null;

  const [editingId, setEditingId] = useState<string | null>(
    firstArticle?.id ?? null
  );
  const [title, setTitle] = useState(firstArticle?.title ?? "");
  const [slug, setSlug] = useState(firstArticle?.slug ?? "");
  const [excerpt, setExcerpt] = useState(firstArticle?.excerpt ?? "");
  const [categoryId, setCategoryId] = useState(
    firstArticle?.categoryId ?? categories[0]?.id ?? ""
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    firstArticle?.tagIds ?? []
  );
  const [bodyText, setBodyText] = useState(firstArticle?.bodyText ?? "");
  const [seoTitle, setSeoTitle] = useState(firstArticle?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    firstArticle?.seoDescription ?? ""
  );
  const [status, setStatus] = useState<ContentStatus>(
    firstArticle?.status ?? "DRAFT"
  );

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catOrder, setCatOrder] = useState(0);

  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");

  const [isTrashDialogOpen, setIsTrashDialogOpen] = useState(false);
  const [isRestoreRevisionOpen, setIsRestoreRevisionOpen] = useState(false);
  const [deleteCatTarget, setDeleteCatTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteTagTarget, setDeleteTagTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      if (statusFilter === "ALL") return true;
      return art.status === statusFilter;
    });
  }, [articles, statusFilter]);

  const currentArticle = useMemo(
    () => articles.find((a) => a.id === editingId) ?? null,
    [articles, editingId]
  );

  const loadArticleIntoForm = (art: AdminArticleDTO) => {
    setEditingId(art.id);
    setTitle(art.title);
    setSlug(art.slug);
    setExcerpt(art.excerpt);
    setCategoryId(art.categoryId);
    setSelectedTagIds(art.tagIds);
    setBodyText(art.bodyText);
    setSeoTitle(art.seoTitle);
    setSeoDescription(art.seoDescription);
    setStatus(art.status);
    clearFeedback();
  };

  const startNewArticle = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setCategoryId(categories[0]?.id ?? "");
    setSelectedTagIds([]);
    setBodyText(
      "## Ringkasan Masalah\n\nJelaskan konteks teknis dan tantangan operasional yang dibahas dalam artikel ini.\n\n## Pendekatan Rekayasa\n\n- Langkah arsitektur pertama\n- Langkah optimasi kedua"
    );
    setSeoTitle("");
    setSeoDescription("");
    setStatus("DRAFT");
    clearFeedback();
  };

  const toggleTagSelection = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingId);
    if ((isEditing && !canUpdate) || (!isEditing && !canCreate)) {
      return;
    }

    await execute(
      () =>
        saveArticleAction({
          id: editingId ?? undefined,
          title,
          slug: slug || toClientSlug(title),
          excerpt,
          categoryId,
          tagIds: selectedTagIds,
          bodyText,
          seoTitle,
          seoDescription,
          status,
        }),
      {
        onSuccess: (saved) => {
          setEditingId(saved.id);
          setSlug(saved.slug);
        },
      }
    );
  };

  const handleToggleTrash = async (articleId: string, restore: boolean) => {
    if (!canDelete) return;
    await execute(() =>
      toggleArticleTrashAction({
        id: articleId,
        restore,
      })
    );
  };

  const handleRestoreRevision = async (
    articleId: string,
    revisionId: string
  ) => {
    if (!canRestoreRevision) return;
    await execute(() =>
      restoreArticleRevisionAction({
        articleId,
        revisionId,
      })
    );
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageTaxonomy) return;
    await execute(
      () =>
        createCategoryAction({
          name: catName,
          slug: catSlug || toClientSlug(catName),
          description: catDesc,
          sortOrder: Number(catOrder) || 0,
        }),
      {
        onSuccess: () => {
          setCatName("");
          setCatSlug("");
          setCatDesc("");
          setCatOrder(0);
        },
      }
    );
  };

  const handleDeleteCategory = async (id: string) => {
    if (!canManageTaxonomy) return;
    await execute(() => deleteCategoryAction({ id }));
  };

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageTaxonomy) return;
    await execute(
      () =>
        createTagAction({
          name: tagName,
          slug: tagSlug || toClientSlug(tagName),
        }),
      {
        onSuccess: () => {
          setTagName("");
          setTagSlug("");
        },
      }
    );
  };

  const handleDeleteTag = async (id: string) => {
    if (!canManageTaxonomy) return;
    await execute(() => deleteTagAction({ id }));
  };

  const canSubmitForm = editingId ? canUpdate : canCreate;

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-4 shadow-xs">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "articles" | "taxonomy")}
        >
          <TabsList aria-label="Submodul manajemen artikel">
            <TabsTrigger value="articles" className="gap-2">
              <span>Editor & Daftar Artikel ({articles.length})</span>
            </TabsTrigger>
            <TabsTrigger value="taxonomy" className="gap-2">
              <span>
                Kategori ({categories.length}) & Tag ({tags.length})
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
          <span className="rounded-xl border border-slate-200 dark:border-[#1E3358] bg-slate-50 dark:bg-[#12213F] px-3 py-1.5 tabular-nums">
            Pengalihan URL 301 aktif: {redirectsCount}
          </span>
          {canCreate && activeTab === "articles" && (
            <button
              type="button"
              onClick={startNewArticle}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-3.5 text-xs font-semibold text-white transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              <span>Artikel Baru</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === "articles" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-4 space-y-4 shadow-xs">
            <Tabs
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val as ContentStatus | "ALL")}
            >
              <TabsList aria-label="Filter status artikel">
                {(
                  ["ALL", "PUBLISHED", "DRAFT", "REVIEW", "ARCHIVED"] as const
                ).map((st) => (
                  <TabsTrigger key={st} value={st}>
                    {st === "ALL" ? "Semua" : STATUS_LABELS[st]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="divide-y divide-slate-100 dark:divide-[#1E3358] border-t border-slate-200 dark:border-[#1E3358]">
              {filteredArticles.length === 0 ? (
                <p className="py-8 text-center text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  Tidak ada artikel pada status ini.
                </p>
              ) : (
                filteredArticles.map((art) => {
                  const selected = art.id === editingId;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => loadArticleIntoForm(art)}
                      className={`w-full text-left py-3.5 px-3 transition-colors rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] ${
                        selected
                          ? "bg-[#EAF4FC] dark:bg-[#12213F]"
                          : "bg-white dark:bg-[#0B1730] hover:bg-slate-50 dark:hover:bg-[#12213F]/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-[#041E42] dark:text-[#F1F5FB] line-clamp-2">
                          {art.title}
                        </p>
                        <span
                          className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold ${
                            art.deletedAt
                              ? "border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#0B1730] text-rose-800 dark:text-[#FCA5A5]"
                              : art.status === "PUBLISHED"
                              ? "border-emerald-300 dark:border-[#34D399]/60 bg-emerald-50 dark:bg-[#0B1730] text-emerald-800 dark:text-[#34D399]"
                              : "border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#0B1730] text-amber-800 dark:text-[#FBBF24]"
                          }`}
                        >
                          {art.deletedAt
                            ? "Sampah"
                            : STATUS_LABELS[art.status]}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                        {art.categoryName} · {art.readingTime} menit baca ·{" "}
                        {art.revisionCount} revisi
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <section
            aria-label="Formulir editor artikel"
            className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 space-y-5 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E3358] pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]">
                  {editingId ? "Perbarui Artikel Blog" : "Buat Artikel Baru"}
                </h2>
                <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  {editingId
                    ? "Mengubah slug artikel yang sudah terbit akan otomatis mencatat pengalihan 301."
                    : "Isi konten artikel menggunakan format blok teks terstruktur."}
                </p>
              </div>

              {currentArticle && currentArticle.status === "PUBLISHED" && (
                <Link
                  href={`/blog/${currentArticle.slug}`}
                  target="_blank"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] hover:bg-slate-100 dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                >
                  <span>Lihat di Situs Publik</span>
                  <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label
                  htmlFor="article-title"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Judul Artikel
                </label>
                <input
                  id="article-title"
                  type="text"
                  required
                  minLength={5}
                  maxLength={130}
                  disabled={!canSubmitForm || isPending}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingId) {
                      setSlug(toClientSlug(e.target.value));
                    }
                  }}
                  placeholder="Contoh: Arsitektur Aplikasi Web Multi-Cabang yang Mudah Dipelihara"
                  className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="article-slug"
                      className="text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB]"
                    >
                      Slug URL (/blog/...)
                    </label>
                    <button
                      type="button"
                      onClick={() => setSlug(toClientSlug(title))}
                      className="text-[11px] font-bold text-[#0066FF] dark:text-[#38BDF8] hover:underline"
                    >
                      Buat dari judul
                    </button>
                  </div>
                  <input
                    id="article-slug"
                    type="text"
                    required
                    minLength={3}
                    maxLength={100}
                    disabled={!canSubmitForm || isPending}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="arsitektur-aplikasi-web-multi-cabang"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="article-category"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Kategori Artikel
                  </label>
                  <select
                    id="article-category"
                    required
                    disabled={!canSubmitForm || isPending}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="article-excerpt"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  id="article-excerpt"
                  rows={2}
                  required
                  minLength={20}
                  maxLength={260}
                  disabled={!canSubmitForm || isPending}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1 hingga 2 kalimat yang tampil pada kartu daftar artikel blog."
                  className="w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] p-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="article-body"
                  className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                >
                  Isi Artikel Terstruktur
                </label>
                <p className="mb-2 text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                  Pisahkan blok dengan baris kosong. Awali dengan{" "}
                  <code className="text-[#0066FF] dark:text-[#38BDF8]">## Judul Bagian</code> untuk
                  subjudul H2,{" "}
                  <code className="text-[#0066FF] dark:text-[#38BDF8]">### Subbagian</code> untuk H3,{" "}
                  <code className="text-[#0066FF] dark:text-[#38BDF8]">- Butir</code> untuk daftar,
                  atau <code className="text-[#0066FF] dark:text-[#38BDF8]">&gt; Kutipan</code>.
                </p>
                <textarea
                  id="article-body"
                  rows={10}
                  required
                  disabled={!canSubmitForm || isPending}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] p-3.5 font-mono text-xs leading-relaxed text-[#041E42] dark:text-[#F1F5FB] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                />
              </div>

              {tags.length > 0 && (
                <fieldset className="space-y-2">
                  <legend className="text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                    Tag Topik Artikel
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                      const checked = selectedTagIds.includes(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          disabled={!canSubmitForm || isPending}
                          onClick={() => toggleTagSelection(tag.id)}
                          aria-pressed={checked}
                          className={`inline-flex min-h-11 items-center rounded-xl border px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] ${
                            checked
                              ? "border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF] dark:border-[#0066FF] dark:bg-[#12213F] dark:text-[#F1F5FB]"
                              : "border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#0B1730] text-[#5A6E85] dark:text-[#94A7C4] hover:bg-slate-100 dark:hover:bg-[#12213F]"
                          }`}
                        >
                          #{tag.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-200 dark:border-[#1E3358] pt-4">
                <div>
                  <label
                    htmlFor="article-status"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Status Publikasi
                  </label>
                  <select
                    id="article-status"
                    disabled={!canSubmitForm || isPending}
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ContentStatus)
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    <option value="DRAFT">Draf</option>
                    <option value="REVIEW">Tinjauan</option>
                    {canPublish && <option value="PUBLISHED">Terbit</option>}
                    {canPublish && <option value="ARCHIVED">Arsip</option>}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="article-seo-title"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Judul SEO (Maks 70 karakter)
                  </label>
                  <input
                    id="article-seo-title"
                    type="text"
                    maxLength={70}
                    disabled={!canSubmitForm || isPending}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Kosongkan untuk memakai judul utama"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="article-seo-desc"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1.5"
                  >
                    Deskripsi SEO (Maks 170 karakter)
                  </label>
                  <input
                    id="article-seo-desc"
                    type="text"
                    maxLength={170}
                    disabled={!canSubmitForm || isPending}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Kosongkan untuk memakai ringkasan"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-sm text-[#041E42] dark:text-[#F1F5FB] placeholder:text-slate-400 dark:placeholder:text-[#94A7C4] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {canSubmitForm ? (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-4 text-xs font-semibold text-white transition-colors disabled:opacity-60 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isPending
                        ? "Menyimpan..."
                        : editingId
                        ? "Simpan Perubahan Artikel"
                        : "Tambahkan Artikel"}
                    </span>
                  </button>
                ) : (
                  <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                    Akun Anda memiliki akses baca saja.
                  </p>
                )}

                {currentArticle && (
                  <div className="flex flex-wrap items-center gap-2">
                    {canRestoreRevision &&
                      currentArticle.latestRevisionId && (
                        <>
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => setIsRestoreRevisionOpen(true)}
                            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] hover:bg-slate-100 dark:hover:bg-[#192D54] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                          >
                            <ResetIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>
                              Pulihkan Snapshot ({currentArticle.revisionCount})
                            </span>
                          </button>

                          <RadixConfirmDialog
                            open={isRestoreRevisionOpen}
                            onOpenChange={setIsRestoreRevisionOpen}
                            title="Pulihkan Snapshot Artikel"
                            description={`Artikel akan dikembalikan ke isi snapshot revisi terakhir (${currentArticle.revisionCount} revisi tersimpan).`}
                            confirmLabel="Pulihkan Snapshot"
                            isDestructive={false}
                            isPending={isPending}
                            onConfirm={() =>
                              handleRestoreRevision(
                                currentArticle.id,
                                currentArticle.latestRevisionId!
                              )
                            }
                          />
                        </>
                      )}

                    {canDelete && (
                      <>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => setIsTrashDialogOpen(true)}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 dark:border-[#F87171]/60 bg-white dark:bg-[#0B1730] px-3.5 text-xs font-semibold text-rose-600 dark:text-[#FCA5A5] hover:bg-rose-50 dark:hover:bg-[#12213F] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                          <span>
                            {currentArticle.deletedAt
                              ? "Pulihkan dari Sampah"
                              : "Pindahkan ke Sampah"}
                          </span>
                        </button>

                        <RadixConfirmDialog
                          open={isTrashDialogOpen}
                          onOpenChange={setIsTrashDialogOpen}
                          title={
                            currentArticle.deletedAt
                              ? "Pulihkan Artikel"
                              : "Pindahkan Artikel ke Sampah"
                          }
                          description={
                            currentArticle.deletedAt
                              ? `Artikel "${currentArticle.title}" akan dipulihkan kembali ke daftar aktif.`
                              : `Artikel "${currentArticle.title}" akan dipindahkan ke folder sampah. Halaman publik tidak akan lagi menampilkan artikel ini.`
                          }
                          confirmLabel={
                            currentArticle.deletedAt ? "Pulihkan" : "Pindahkan ke Sampah"
                          }
                          isDestructive={!currentArticle.deletedAt}
                          isPending={isPending}
                          onConfirm={() =>
                            handleToggleTrash(
                              currentArticle.id,
                              Boolean(currentArticle.deletedAt)
                            )
                          }
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <section
            aria-label="Manajemen kategori artikel"
            className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 space-y-5 shadow-xs"
          >
            <div>
              <h2 className="text-base font-bold text-[#041E42] dark:text-[#F1F5FB]">
                Kategori Artikel
              </h2>
              <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Kategori yang sedang digunakan oleh artikel aktif tidak dapat dihapus
                sebelum artikel dipindahkan.
              </p>
            </div>

            {canManageTaxonomy && (
              <form
                onSubmit={handleCreateCategory}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border border-slate-200 dark:border-[#1E3358] bg-slate-50/70 dark:bg-[#12213F]/50 p-4"
              >
                <div>
                  <label
                    htmlFor="cat-name"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                  >
                    Nama Kategori
                  </label>
                  <input
                    id="cat-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    value={catName}
                    onChange={(e) => {
                      setCatName(e.target.value);
                      setCatSlug(toClientSlug(e.target.value));
                    }}
                    placeholder="Contoh: Keamanan Aplikasi"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cat-slug"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                  >
                    Slug Kategori
                  </label>
                  <input
                    id="cat-slug"
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="keamanan-aplikasi"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cat-desc"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                  >
                    Deskripsi Singkat
                  </label>
                  <input
                    id="cat-desc"
                    type="text"
                    maxLength={220}
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="Topik audit keamanan dan proteksi data"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="w-24">
                    <label
                      htmlFor="cat-order"
                      className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                    >
                      Urutan
                    </label>
                    <input
                      id="cat-order"
                      type="number"
                      min={0}
                      max={999}
                      value={catOrder}
                      onChange={(e) => setCatOrder(Number(e.target.value))}
                      className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-4 text-xs font-semibold text-white disabled:opacity-60 shadow-xs"
                  >
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    <span>Tambah Kategori</span>
                  </button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#1E3358] text-xs font-bold text-[#5A6E85] dark:text-[#94A7C4]">
                    <th scope="col" className="pb-2.5 pr-3">
                      Kategori
                    </th>
                    <th scope="col" className="pb-2.5 pr-3">
                      Slug
                    </th>
                    <th scope="col" className="pb-2.5 pr-3">
                      Artikel
                    </th>
                    <th scope="col" className="pb-2.5 text-right">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3358]">
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="py-3 pr-3 font-bold text-[#041E42] dark:text-[#F1F5FB]">
                        {cat.name}
                      </td>
                      <td className="py-3 pr-3 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                        {cat.slug}
                      </td>
                      <td className="py-3 pr-3 text-xs tabular-nums font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                        {cat.articleCount}
                      </td>
                      <td className="py-3 text-right">
                        {canManageTaxonomy && (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              setDeleteCatTarget({ id: cat.id, name: cat.name })
                            }
                            className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-rose-200 dark:border-[#F87171]/60 bg-white dark:bg-[#0B1730] px-3 text-xs font-semibold text-rose-600 dark:text-[#FCA5A5] hover:bg-rose-50 dark:hover:bg-[#12213F] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                          >
                            <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Hapus</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            aria-label="Manajemen tag artikel"
            className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 space-y-5 shadow-xs"
          >
            <div>
              <h2 className="text-base font-bold text-[#041E42] dark:text-[#F1F5FB]">
                Tag Topik Artikel
              </h2>
              <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Tag memudahkan pengelompokan lintas kategori pada halaman blog.
              </p>
            </div>

            {canManageTaxonomy && (
              <form
                onSubmit={handleCreateTag}
                className="space-y-3 rounded-xl border border-slate-200 dark:border-[#1E3358] bg-slate-50/70 dark:bg-[#12213F]/50 p-4"
              >
                <div>
                  <label
                    htmlFor="tag-name"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                  >
                    Nama Tag
                  </label>
                  <input
                    id="tag-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={40}
                    value={tagName}
                    onChange={(e) => {
                      setTagName(e.target.value);
                      setTagSlug(toClientSlug(e.target.value));
                    }}
                    placeholder="Contoh: PostgreSQL"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tag-slug"
                    className="block text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] mb-1"
                  >
                    Slug Tag
                  </label>
                  <input
                    id="tag-slug"
                    type="text"
                    required
                    minLength={2}
                    maxLength={60}
                    value={tagSlug}
                    onChange={(e) => setTagSlug(e.target.value)}
                    placeholder="postgresql"
                    className="min-h-11 w-full rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3 text-sm text-[#041E42] dark:text-[#F1F5FB]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] px-4 text-xs font-semibold text-white disabled:opacity-60 shadow-xs"
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  <span>Tambah Tag</span>
                </button>
              </form>
            )}

            <ul className="divide-y divide-slate-100 dark:divide-[#1E3358] text-sm">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className="flex items-center justify-between gap-2 py-2.5"
                >
                  <div>
                    <p className="font-bold text-[#041E42] dark:text-[#F1F5FB]">#{tag.name}</p>
                    <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      Slug: {tag.slug} · {tag.articleCount} artikel
                    </p>
                  </div>
                  {canManageTaxonomy && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() =>
                        setDeleteTagTarget({ id: tag.id, name: tag.name })
                      }
                      className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-rose-200 dark:border-[#F87171]/60 bg-white dark:bg-[#0B1730] px-3 text-xs font-semibold text-rose-600 dark:text-[#FCA5A5] hover:bg-rose-50 dark:hover:bg-[#12213F] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                    >
                      <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Hapus</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <RadixConfirmDialog
              open={deleteCatTarget !== null}
              onOpenChange={(open) => !open && setDeleteCatTarget(null)}
              title="Hapus Kategori Artikel"
              description={`Kategori "${deleteCatTarget?.name}" akan dihapus dari sistem. Pastikan tidak ada artikel aktif yang masih terhubung.`}
              confirmLabel="Hapus Kategori"
              isPending={isPending}
              onConfirm={() => {
                if (deleteCatTarget) {
                  return handleDeleteCategory(deleteCatTarget.id);
                }
              }}
            />

            <RadixConfirmDialog
              open={deleteTagTarget !== null}
              onOpenChange={(open) => !open && setDeleteTagTarget(null)}
              title="Hapus Tag Artikel"
              description={`Tag #${deleteTagTarget?.name} akan dihapus dari sistem.`}
              confirmLabel="Hapus Tag"
              isPending={isPending}
              onConfirm={() => {
                if (deleteTagTarget) {
                  return handleDeleteTag(deleteTagTarget.id);
                }
              }}
            />
          </section>
        </div>
      )}
    </div>
  );
}
