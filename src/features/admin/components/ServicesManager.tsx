"use client";

import { useState } from "react";
import {
  CheckCircledIcon,
  PlusIcon,
  StarFilledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import type { ContentStatus } from "@prisma/client";
import type {
  AdminPricingPlanDTO,
  AdminServiceDTO,
} from "@/server/modules/services/queries";
import {
  savePricingPlanAction,
  saveServiceAction,
  togglePricingPlanTrashAction,
  toggleServiceTrashAction,
} from "@/server/modules/services/actions";
import { useAdminMutation } from "@/components/admin/useAdminMutation";
import { AdminFeedbackBanner } from "@/components/admin/AdminFeedbackBanner";

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

export interface ServicesManagerProps {
  services: AdminServiceDTO[];
  pricingPlans: AdminPricingPlanDTO[];
  canCreate: boolean;
  canUpdate: boolean;
  canPublish: boolean;
  canDelete: boolean;
}

export function ServicesManager({
  services,
  pricingPlans,
  canCreate,
  canUpdate,
  canPublish,
  canDelete,
}: ServicesManagerProps) {
  const { isOnline, isPending, feedback, clearFeedback, execute } =
    useAdminMutation();

  const [activeTab, setActiveTab] = useState<"services" | "pricing">(
    "services"
  );

  const firstService = services[0] ?? null;
  const [svcId, setSvcId] = useState<string | null>(firstService?.id ?? null);
  const [svcTitle, setSvcTitle] = useState(firstService?.title ?? "");
  const [svcSlug, setSvcSlug] = useState(firstService?.slug ?? "");
  const [svcCategory, setSvcCategory] = useState(
    firstService?.category ?? "Website"
  );
  const [svcShortDesc, setSvcShortDesc] = useState(
    firstService?.shortDesc ?? ""
  );
  const [svcFeatures, setSvcFeatures] = useState(
    (firstService?.features ?? []).join("\n")
  );
  const [svcIcon, setSvcIcon] = useState(firstService?.icon ?? "GlobeIcon");
  const [svcCtaLabel, setSvcCtaLabel] = useState(
    firstService?.ctaLabel ?? "Konsultasikan Kebutuhan"
  );
  const [svcCtaHref, setSvcCtaHref] = useState(
    firstService?.ctaHref ?? "/kontak"
  );
  const [svcSortOrder, setSvcSortOrder] = useState(
    firstService?.sortOrder ?? 1
  );
  const [svcStatus, setSvcStatus] = useState<ContentStatus>(
    firstService?.status ?? "PUBLISHED"
  );

  const firstPlan = pricingPlans[0] ?? null;
  const [planId, setPlanId] = useState<string | null>(firstPlan?.id ?? null);
  const [planName, setPlanName] = useState(firstPlan?.name ?? "");
  const [planPriceLabel, setPlanPriceLabel] = useState(
    firstPlan?.priceLabel ?? ""
  );
  const [planPriceNote, setPlanPriceNote] = useState(
    firstPlan?.priceNote ?? ""
  );
  const [planDesc, setPlanDesc] = useState(firstPlan?.description ?? "");
  const [planFeatures, setPlanFeatures] = useState(
    (firstPlan?.features ?? []).join("\n")
  );
  const [planPopular, setPlanPopular] = useState(firstPlan?.isPopular ?? false);
  const [planCtaLabel, setPlanCtaLabel] = useState(
    firstPlan?.ctaLabel ?? "Konsultasi Paket Ini"
  );
  const [planCtaHref, setPlanCtaHref] = useState(
    firstPlan?.ctaHref ?? "/kontak"
  );
  const [planSortOrder, setPlanSortOrder] = useState(firstPlan?.sortOrder ?? 1);
  const [planStatus, setPlanStatus] = useState<ContentStatus>(
    firstPlan?.status ?? "PUBLISHED"
  );

  const loadService = (svc: AdminServiceDTO) => {
    setSvcId(svc.id);
    setSvcTitle(svc.title);
    setSvcSlug(svc.slug);
    setSvcCategory(svc.category);
    setSvcShortDesc(svc.shortDesc);
    setSvcFeatures(svc.features.join("\n"));
    setSvcIcon(svc.icon);
    setSvcCtaLabel(svc.ctaLabel);
    setSvcCtaHref(svc.ctaHref);
    setSvcSortOrder(svc.sortOrder);
    setSvcStatus(svc.status);
    clearFeedback();
  };

  const startNewService = () => {
    setSvcId(null);
    setSvcTitle("");
    setSvcSlug("");
    setSvcCategory("Sistem Web");
    setSvcShortDesc("");
    setSvcFeatures("Audit Arsitektur\nIntegrasi REST API\nDokumentasi Teknis");
    setSvcIcon("CodeIcon");
    setSvcCtaLabel("Konsultasikan Kebutuhan");
    setSvcCtaHref("/kontak");
    setSvcSortOrder(services.length + 1);
    setSvcStatus("DRAFT");
    clearFeedback();
  };

  const loadPricingPlan = (plan: AdminPricingPlanDTO) => {
    setPlanId(plan.id);
    setPlanName(plan.name);
    setPlanPriceLabel(plan.priceLabel);
    setPlanPriceNote(plan.priceNote);
    setPlanDesc(plan.description);
    setPlanFeatures(plan.features.join("\n"));
    setPlanPopular(plan.isPopular);
    setPlanCtaLabel(plan.ctaLabel);
    setPlanCtaHref(plan.ctaHref);
    setPlanSortOrder(plan.sortOrder);
    setPlanStatus(plan.status);
    clearFeedback();
  };

  const startNewPricingPlan = () => {
    setPlanId(null);
    setPlanName("");
    setPlanPriceLabel("Mulai Rp 12 Juta");
    setPlanPriceNote("sekali bayar");
    setPlanDesc("");
    setPlanFeatures(
      "Desain UI/UX Responsif\nOptimasi Kecepatan Halaman\nGaransi Pemeliharaan 30 Hari"
    );
    setPlanPopular(false);
    setPlanCtaLabel("Diskusikan Paket Ini");
    setPlanCtaHref("/kontak");
    setPlanSortOrder(pricingPlans.length + 1);
    setPlanStatus("DRAFT");
    clearFeedback();
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(svcId);
    if ((isEditing && !canUpdate) || (!isEditing && !canCreate)) return;

    await execute(
      () =>
        saveServiceAction({
          id: svcId ?? undefined,
          title: svcTitle,
          slug: svcSlug || toClientSlug(svcTitle),
          category: svcCategory,
          shortDesc: svcShortDesc,
          featuresRaw: svcFeatures,
          icon: svcIcon,
          ctaLabel: svcCtaLabel,
          ctaHref: svcCtaHref,
          sortOrder: Number(svcSortOrder) || 0,
          status: svcStatus,
        }),
      {
        onSuccess: (saved) => {
          setSvcId(saved.id);
        },
      }
    );
  };

  const handleSavePricingPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(planId);
    if ((isEditing && !canUpdate) || (!isEditing && !canCreate)) return;

    await execute(
      () =>
        savePricingPlanAction({
          id: planId ?? undefined,
          name: planName,
          priceLabel: planPriceLabel,
          priceNote: planPriceNote,
          description: planDesc,
          featuresRaw: planFeatures,
          isPopular: planPopular,
          ctaLabel: planCtaLabel,
          ctaHref: planCtaHref,
          sortOrder: Number(planSortOrder) || 0,
          status: planStatus,
        }),
      {
        onSuccess: (saved) => {
          setPlanId(saved.id);
        },
      }
    );
  };

  const currentService = services.find((s) => s.id === svcId) ?? null;
  const currentPlan = pricingPlans.find((p) => p.id === planId) ?? null;
  const canSubmitService = svcId ? canUpdate : canCreate;
  const canSubmitPlan = planId ? canUpdate : canCreate;

  return (
    <div className="space-y-6">
      <AdminFeedbackBanner
        isOnline={isOnline}
        feedback={feedback}
        onDismiss={clearFeedback}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1E3358] bg-[#0B1730] p-4">
        <div
          role="tablist"
          aria-label="Submodul layanan dan harga"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "services"}
            onClick={() => setActiveTab("services")}
            className={`inline-flex min-h-11 items-center rounded-xl border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
              activeTab === "services"
                ? "border-[#60A5FA] bg-[#12213F] text-[#F1F5FB]"
                : "border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4] hover:bg-[#12213F]"
            }`}
          >
            Daftar Layanan ({services.length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "pricing"}
            onClick={() => setActiveTab("pricing")}
            className={`inline-flex min-h-11 items-center rounded-xl border px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
              activeTab === "pricing"
                ? "border-[#60A5FA] bg-[#12213F] text-[#F1F5FB]"
                : "border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4] hover:bg-[#12213F]"
            }`}
          >
            Paket Harga ({pricingPlans.length})
          </button>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={
              activeTab === "services" ? startNewService : startNewPricingPlan
            }
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#2563EB] px-3.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            <span>
              {activeTab === "services" ? "Layanan Baru" : "Paket Harga Baru"}
            </span>
          </button>
        )}
      </div>

      {activeTab === "services" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-[#1E3358] bg-[#0B1730] divide-y divide-[#1E3358] overflow-hidden">
            {services.map((svc) => {
              const selected = svc.id === svcId;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => loadService(svc)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8] ${
                    selected
                      ? "bg-[#12213F]"
                      : "bg-[#0B1730] hover:bg-[#12213F]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#F1F5FB]">
                        {svc.title}
                      </p>
                      <p className="text-xs text-[#94A7C4]">
                        Slug: {svc.slug} · Urutan: #{svc.sortOrder}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                        svc.deletedAt
                          ? "border-[#F87171]/60 bg-[#0B1730] text-[#FCA5A5]"
                          : svc.status === "PUBLISHED"
                          ? "border-[#34D399]/60 bg-[#0B1730] text-[#34D399]"
                          : "border-[#FBBF24]/60 bg-[#0B1730] text-[#FBBF24]"
                      }`}
                    >
                      {svc.deletedAt ? "Sampah" : STATUS_LABELS[svc.status]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <section
            aria-label="Editor layanan"
            className="lg:col-span-7 rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 space-y-5"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F1F5FB]">
                {svcId ? "Perbarui Layanan" : "Tambah Layanan Baru"}
              </h2>
              <p className="text-xs text-[#94A7C4]">
                Perubahan langsung disinkronkan ke halaman Beranda dan halaman
                Layanan.
              </p>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="svc-title"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Nama Layanan
                  </label>
                  <input
                    id="svc-title"
                    type="text"
                    required
                    minLength={4}
                    maxLength={100}
                    disabled={!canSubmitService || isPending}
                    value={svcTitle}
                    onChange={(e) => {
                      setSvcTitle(e.target.value);
                      if (!svcId) setSvcSlug(toClientSlug(e.target.value));
                    }}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="svc-slug"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Slug Identifikasi
                  </label>
                  <input
                    id="svc-slug"
                    type="text"
                    required
                    minLength={3}
                    maxLength={100}
                    disabled={!canSubmitService || isPending}
                    value={svcSlug}
                    onChange={(e) => setSvcSlug(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="svc-category"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Kategori Layanan
                  </label>
                  <input
                    id="svc-category"
                    type="text"
                    required
                    value={svcCategory}
                    onChange={(e) => setSvcCategory(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="svc-icon"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Ikon Visual
                  </label>
                  <select
                    id="svc-icon"
                    value={svcIcon}
                    onChange={(e) => setSvcIcon(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  >
                    <option value="GlobeIcon">GlobeIcon (Web)</option>
                    <option value="UpdateIcon">UpdateIcon (Redesign)</option>
                    <option value="CodeIcon">CodeIcon (Sistem Web)</option>
                    <option value="MobileIcon">MobileIcon (Mobile App)</option>
                    <option value="LayersIcon">LayersIcon (Arsitektur)</option>
                    <option value="RocketIcon">RocketIcon (Akselerasi)</option>
                    <option value="LightningBoltIcon">
                      LightningBoltIcon (Performa)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="svc-order"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Urutan Tampil
                  </label>
                  <input
                    id="svc-order"
                    type="number"
                    min={0}
                    max={999}
                    value={svcSortOrder}
                    onChange={(e) => setSvcSortOrder(Number(e.target.value))}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="svc-short-desc"
                  className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                >
                  Deskripsi Ringkas Layanan
                </label>
                <textarea
                  id="svc-short-desc"
                  rows={3}
                  required
                  minLength={15}
                  maxLength={280}
                  value={svcShortDesc}
                  onChange={(e) => setSvcShortDesc(e.target.value)}
                  className="w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5 text-sm text-[#F1F5FB]"
                />
              </div>

              <div>
                <label
                  htmlFor="svc-features"
                  className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                >
                  Daftar Cakupan / Fitur Utama (Satu butir per baris)
                </label>
                <textarea
                  id="svc-features"
                  rows={4}
                  required
                  value={svcFeatures}
                  onChange={(e) => setSvcFeatures(e.target.value)}
                  className="w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5 text-sm text-[#F1F5FB]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="svc-cta-label"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Label Tombol CTA
                  </label>
                  <input
                    id="svc-cta-label"
                    type="text"
                    required
                    value={svcCtaLabel}
                    onChange={(e) => setSvcCtaLabel(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="svc-cta-href"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Tautan Internal CTA
                  </label>
                  <input
                    id="svc-cta-href"
                    type="text"
                    required
                    value={svcCtaHref}
                    onChange={(e) => setSvcCtaHref(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="svc-status"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Status Publikasi
                  </label>
                  <select
                    id="svc-status"
                    value={svcStatus}
                    onChange={(e) =>
                      setSvcStatus(e.target.value as ContentStatus)
                    }
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  >
                    <option value="DRAFT">Draf</option>
                    <option value="REVIEW">Tinjauan</option>
                    {canPublish && <option value="PUBLISHED">Terbit</option>}
                    {canPublish && <option value="ARCHIVED">Arsip</option>}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {canSubmitService && (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
                  >
                    <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isPending ? "Menyimpan..." : "Simpan Layanan"}
                    </span>
                  </button>
                )}

                {currentService && canDelete && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      execute(() =>
                        toggleServiceTrashAction({
                          id: currentService.id,
                          restore: Boolean(currentService.deletedAt),
                        })
                      )
                    }
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#F87171]/60 bg-[#0B1730] px-3.5 text-xs font-semibold text-[#FCA5A5] hover:bg-[#12213F]"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {currentService.deletedAt
                        ? "Pulihkan dari Sampah"
                        : "Pindahkan ke Sampah"}
                    </span>
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 rounded-2xl border border-[#1E3358] bg-[#0B1730] divide-y divide-[#1E3358] overflow-hidden">
            {pricingPlans.map((plan) => {
              const selected = plan.id === planId;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => loadPricingPlan(plan)}
                  className={`w-full text-left p-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#38BDF8] ${
                    selected
                      ? "bg-[#12213F]"
                      : "bg-[#0B1730] hover:bg-[#12213F]/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[#F1F5FB] flex items-center gap-1.5">
                        <span>{plan.name}</span>
                        {plan.isPopular && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#60A5FA] bg-[#0B1730] px-1.5 py-0.5 text-[10px] font-bold text-[#60A5FA]">
                            <StarFilledIcon className="h-3 w-3" />
                            <span>Paling Populer</span>
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-[#94A7C4]">
                        {plan.priceLabel} · Urutan #{plan.sortOrder}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                        plan.deletedAt
                          ? "border-[#F87171]/60 bg-[#0B1730] text-[#FCA5A5]"
                          : plan.status === "PUBLISHED"
                          ? "border-[#34D399]/60 bg-[#0B1730] text-[#34D399]"
                          : "border-[#FBBF24]/60 bg-[#0B1730] text-[#FBBF24]"
                      }`}
                    >
                      {plan.deletedAt ? "Sampah" : STATUS_LABELS[plan.status]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <section
            aria-label="Editor paket harga"
            className="lg:col-span-7 rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 space-y-5"
          >
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#F1F5FB]">
                {planId ? "Perbarui Paket Harga" : "Tambah Paket Harga Baru"}
              </h2>
              <p className="text-xs text-[#94A7C4]">
                Hanya satu paket harga yang dapat memegang penanda &ldquo;Paling
                Populer&rdquo; pada satu waktu.
              </p>
            </div>

            <form onSubmit={handleSavePricingPlan} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="plan-name"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Nama Paket
                  </label>
                  <input
                    id="plan-name"
                    type="text"
                    required
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan-price"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Label Harga
                  </label>
                  <input
                    id="plan-price"
                    type="text"
                    required
                    value={planPriceLabel}
                    onChange={(e) => setPlanPriceLabel(e.target.value)}
                    placeholder="Contoh: Mulai Rp 15 Juta"
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan-note"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Catatan Harga
                  </label>
                  <input
                    id="plan-note"
                    type="text"
                    value={planPriceNote}
                    onChange={(e) => setPlanPriceNote(e.target.value)}
                    placeholder="Contoh: sekali bayar / sesuai ruang lingkup"
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-sm text-[#F1F5FB]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="plan-desc"
                  className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                >
                  Deskripsi Paket
                </label>
                <textarea
                  id="plan-desc"
                  rows={2}
                  required
                  value={planDesc}
                  onChange={(e) => setPlanDesc(e.target.value)}
                  className="w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5 text-sm text-[#F1F5FB]"
                />
              </div>

              <div>
                <label
                  htmlFor="plan-features"
                  className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                >
                  Daftar Fitur Paket (Satu butir per baris)
                </label>
                <textarea
                  id="plan-features"
                  rows={5}
                  required
                  value={planFeatures}
                  onChange={(e) => setPlanFeatures(e.target.value)}
                  className="w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5 text-sm text-[#F1F5FB]"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#4E6E9E] bg-[#12213F] p-3.5">
                <input
                  id="plan-popular"
                  type="checkbox"
                  checked={planPopular}
                  onChange={(e) => setPlanPopular(e.target.checked)}
                  className="h-4 w-4 rounded border-[#4E6E9E] accent-[#2563EB]"
                />
                <label
                  htmlFor="plan-popular"
                  className="text-xs font-semibold text-[#F1F5FB]"
                >
                  Jadikan paket ini sebagai rekomendasi utama (&ldquo;Paling
                  Populer&rdquo;). Paket lain otomatis dilepas dari penanda ini.
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label
                    htmlFor="plan-cta-label"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Label Tombol
                  </label>
                  <input
                    id="plan-cta-label"
                    type="text"
                    required
                    value={planCtaLabel}
                    onChange={(e) => setPlanCtaLabel(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan-cta-href"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Tautan Tombol
                  </label>
                  <input
                    id="plan-cta-href"
                    type="text"
                    required
                    value={planCtaHref}
                    onChange={(e) => setPlanCtaHref(e.target.value)}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan-order"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Urutan
                  </label>
                  <input
                    id="plan-order"
                    type="number"
                    min={0}
                    max={999}
                    value={planSortOrder}
                    onChange={(e) => setPlanSortOrder(Number(e.target.value))}
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-sm text-[#F1F5FB]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan-status"
                    className="block text-xs font-semibold text-[#F1F5FB] mb-1.5"
                  >
                    Status
                  </label>
                  <select
                    id="plan-status"
                    value={planStatus}
                    onChange={(e) =>
                      setPlanStatus(e.target.value as ContentStatus)
                    }
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-sm text-[#F1F5FB]"
                  >
                    <option value="DRAFT">Draf</option>
                    <option value="REVIEW">Tinjauan</option>
                    {canPublish && <option value="PUBLISHED">Terbit</option>}
                    {canPublish && <option value="ARCHIVED">Arsip</option>}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {canSubmitPlan && (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-4 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
                  >
                    <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {isPending ? "Menyimpan..." : "Simpan Paket Harga"}
                    </span>
                  </button>
                )}

                {currentPlan && canDelete && (
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      execute(() =>
                        togglePricingPlanTrashAction({
                          id: currentPlan.id,
                          restore: Boolean(currentPlan.deletedAt),
                        })
                      )
                    }
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#F87171]/60 bg-[#0B1730] px-3.5 text-xs font-semibold text-[#FCA5A5] hover:bg-[#12213F]"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {currentPlan.deletedAt
                        ? "Pulihkan dari Sampah"
                        : "Pindahkan ke Sampah"}
                    </span>
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
