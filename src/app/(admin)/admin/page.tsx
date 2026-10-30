import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  CardStackIcon,
  CheckCircledIcon,
  ClockIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  FilePlusIcon,
  FileTextIcon,
  LayersIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { requirePermission } from "@/server/security/auth";
import { hasPermission } from "@/server/security/permissions";
import { getAdminOverviewData } from "@/server/modules/overview/queries";

const MESSAGE_STATUS_LABELS = {
  NEW: "Baru",
  READ: "Dibaca",
  REPLIED: "Dibalas",
  SPAM: "Spam",
} as const;

const CONTENT_STATUS_LABELS = {
  DRAFT: "Draf",
  REVIEW: "Tinjauan",
  SCHEDULED: "Terjadwal",
  PUBLISHED: "Terbit",
  ARCHIVED: "Arsip",
} as const;

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator Sistem",
  EDITOR: "Editor Konten",
  ANALYST: "Analis Data",
  VIEWER: "Pemeriksa",
};

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Jakarta",
});

export default async function AdminOverviewPage() {
  const user = await requirePermission("dashboard.view");
  const overview = await getAdminOverviewData(user);

  const canViewContent = hasPermission(user.role, "content.view");
  const canViewMessages = hasPermission(user.role, "messages.view");
  const canManageUsers = hasPermission(user.role, "users.manage");
  const canViewAudit = hasPermission(user.role, "audit.view");

  const todayFormatted = dateFormatter.format(new Date());

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Executive Welcome Banner */}
      <section
        aria-label="Sambutan operasional admin"
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-6 sm:p-8 shadow-xs dark:border-[#1E3358] dark:bg-gradient-to-br dark:from-[#0B1730] dark:via-[#0E2144] dark:to-[#071225]"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4E6FC] bg-[#EAF4FC] px-3 py-1 text-xs font-semibold text-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#94A7C4]">
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{todayFormatted}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
              Selamat Datang Kembali, {user.name || "Administrator"}!
            </h1>

            <p className="text-sm leading-relaxed text-[#5A6E85] dark:text-[#94A7C4]">
              Pusat komando operasional Next Karya CMS. Pantau pesan prospek konsultasi yang masuk,
              publikasikan materi wawasan teknologi, dan awasi integritas sistem.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {canViewContent && (
              <Link
                href="/admin/konten/artikel"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0066FF] px-4 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#0052CC] hover:shadow-[0_8px_20px_-6px_rgba(0,102,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
              >
                <FilePlusIcon className="h-4 w-4" aria-hidden="true" />
                <span>Tulis Artikel Baru</span>
              </Link>
            )}

            {canViewMessages && (
              <Link
                href="/admin/pesan"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-[#041E42] shadow-xs transition-colors hover:bg-slate-50 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
              >
                <EnvelopeClosedIcon className="h-4 w-4 text-[#0066FF] dark:text-[#38BDF8]" aria-hidden="true" />
                <span>Inbox Konsultasi</span>
                {overview.unreadMessagesCount > 0 && (
                  <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold text-white">
                    {overview.unreadMessagesCount}
                  </span>
                )}
              </Link>
            )}

            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-[#5A6E85] shadow-xs transition-colors hover:bg-slate-50 hover:text-[#041E42] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#94A7C4] dark:hover:bg-[#192D54] dark:hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <span>Lihat Web Publik</span>
              <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Error Alert if Database Query Fails */}
      {overview.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900 shadow-xs dark:border-[#F87171]/60 dark:bg-[#12213F] dark:text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
            aria-hidden="true"
          />
          <div>
            <p className="font-bold">Gagal memuat sebagian data operasional</p>
            <p className="mt-0.5 text-xs opacity-90">{overview.loadError}</p>
          </div>
        </div>
      )}

      {/* Top Tier: 4 High-Impact KPI Stat Cards */}
      <section
        aria-label="Ringkasan metrik operasional"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Metric Card 1: Unread Messages */}
        {canViewMessages ? (
          <Link
            href="/admin/pesan"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.16)] dark:border-[#1E3358] dark:bg-[#0B1730] dark:hover:border-[#0066FF] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Pesan Masuk Baru
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                  <EnvelopeClosedIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.unreadMessagesCount}
                </span>
                <span className="text-xs font-medium text-[#5A6E85] dark:text-[#94A7C4]">
                  belum dibaca
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-[#1E3358]/80">
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${
                  overview.unreadMessagesCount > 0
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
              >
                {overview.unreadMessagesCount > 0 ? "Perlu Respons" : "Inbox Bersih"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] group-hover:translate-x-0.5 transition-transform dark:text-[#38BDF8]">
                <span>Buka Inbox</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 opacity-60 dark:border-[#1E3358] dark:bg-[#0B1730]">
            <span className="text-xs font-bold text-[#5A6E85] dark:text-[#94A7C4]">Inbox Terkunci</span>
            <p className="mt-2 text-xs text-[#5A6E85] dark:text-[#94A7C4]">Memerlukan izin pesan</p>
          </div>
        )}

        {/* Metric Card 2: Articles */}
        {canViewContent ? (
          <Link
            href="/admin/konten/artikel"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.16)] dark:border-[#1E3358] dark:bg-[#0B1730] dark:hover:border-[#0066FF] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Artikel Publik
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0066FF] dark:bg-[#12213F] dark:text-[#38BDF8]">
                  <FileTextIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedArticles}
                </span>
                <span className="text-xs font-medium text-[#5A6E85] dark:text-[#94A7C4]">
                  terbit publik
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-[#1E3358]/80">
              <span className="inline-block rounded-md bg-[#EAF4FC] border border-[#D4E6FC] px-2 py-0.5 text-[11px] font-bold text-[#0066FF] dark:bg-[#12213F] dark:text-[#94A7C4]">
                +{overview.draftArticles} Draf Aktif
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] group-hover:translate-x-0.5 transition-transform dark:text-[#38BDF8]">
                <span>Kelola Blog</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ) : null}

        {/* Metric Card 3: Portfolios */}
        {canViewContent ? (
          <Link
            href="/admin/konten/portofolio"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.16)] dark:border-[#1E3358] dark:bg-[#0B1730] dark:hover:border-[#0066FF] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Portofolio Klien
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                  <CardStackIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedPortfolios}
                </span>
                <span className="text-xs font-medium text-[#5A6E85] dark:text-[#94A7C4]">
                  proyek terbit
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-[#1E3358]/80">
              <span className="inline-block rounded-md bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300">
                Studi Kasus
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] group-hover:translate-x-0.5 transition-transform dark:text-[#38BDF8]">
                <span>Kelola Portofolio</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ) : null}

        {/* Metric Card 4: Services & Pricing */}
        {canViewContent ? (
          <Link
            href="/admin/konten/layanan"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.16)] dark:border-[#1E3358] dark:bg-[#0B1730] dark:hover:border-[#0066FF] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Layanan & Solusi
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400">
                  <LayersIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedServices}
                </span>
                <span className="text-xs font-medium text-[#5A6E85] dark:text-[#94A7C4]">
                  layanan aktif
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-[#1E3358]/80">
              <span className="inline-block rounded-md bg-cyan-100 px-2 py-0.5 text-[11px] font-bold text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300">
                {overview.publishedPricingPlans} Paket Harga
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] group-hover:translate-x-0.5 transition-transform dark:text-[#38BDF8]">
                <span>Kelola Layanan</span>
                <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ) : null}
      </section>

      {/* Main Command Center: 12-Column Responsive Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Primary Column: 8 Columns for Live Operational Feeds */}
        <div className="space-y-6 lg:col-span-8">
          {/* Primary Feed A: Recent Consultation Messages */}
          {canViewMessages && (
            <section
              aria-labelledby="recent-messages-heading"
              className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-[#1E3358]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0066FF] dark:bg-[#12213F] dark:text-[#38BDF8]">
                    <EnvelopeClosedIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="recent-messages-heading"
                      className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]"
                    >
                      Pesan Konsultasi Masuk Terbaru
                    </h2>
                    <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      Kiriman prospek terbaru dari formulir kontak situs publik
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/pesan"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-xs font-bold text-[#041E42] transition-colors hover:bg-slate-100 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    <span>Semua Pesan</span>
                    <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {overview.recentMessages.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4FC] text-[#0066FF] dark:bg-[#12213F] dark:text-[#38BDF8]">
                    <EnvelopeClosedIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]">
                    Belum ada pesan konsultasi yang masuk.
                  </p>
                  <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                    Setiap pesan yang dikirim klien lewat situs publik akan langsung tampil di sini.
                  </p>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-slate-100 dark:divide-[#1E3358]">
                  {overview.recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between rounded-xl px-2 transition-colors hover:bg-slate-50/80 dark:hover:bg-[#12213F]/50"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#1D4ED8] text-white font-bold text-xs shadow-xs">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]">
                              {msg.name}
                            </p>
                            <span
                              className={`shrink-0 rounded-md border px-2 py-0.2 text-[10px] font-bold ${
                                msg.status === "NEW"
                                  ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/60 dark:bg-[#12213F] dark:text-[#FBBF24]"
                                  : msg.status === "REPLIED"
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-[#12213F] dark:text-[#34D399]"
                                  : msg.status === "SPAM"
                                  ? "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-[#12213F] dark:text-[#FCA5A5]"
                                  : "border-slate-300 bg-slate-100 text-slate-700 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#94A7C4]"
                              }`}
                            >
                              {MESSAGE_STATUS_LABELS[msg.status]}
                            </span>
                          </div>
                          <p className="truncate text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                            {msg.email}
                          </p>
                          <p className="mt-0.5 text-[11px] font-medium text-[#0066FF] dark:text-[#38BDF8]">
                            Kebutuhan: {msg.service || "Konsultasi Umum"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                        <div className="flex items-center gap-1 text-[#5A6E85] dark:text-[#94A7C4] tabular-nums">
                          <ClockIcon className="h-3 w-3" aria-hidden="true" />
                          <span>{dateTimeFormatter.format(msg.createdAt)}</span>
                        </div>
                        <Link
                          href="/admin/pesan"
                          className="inline-flex min-h-11 items-center justify-center rounded-lg px-2.5 text-xs font-semibold text-[#0066FF] hover:bg-[#EAF4FC] dark:text-[#38BDF8] dark:hover:bg-[#12213F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                        >
                          Tinjau
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Primary Feed B: Recently Updated Articles */}
          {canViewContent && (
            <section
              aria-labelledby="recent-articles-heading"
              className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-[#1E3358]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0066FF] dark:bg-[#12213F] dark:text-[#38BDF8]">
                    <FileTextIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="recent-articles-heading"
                      className="text-base sm:text-lg font-bold text-[#041E42] dark:text-[#F1F5FB]"
                    >
                      Artikel & Materi Terakhir Diperbarui
                    </h2>
                    <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                      Wawasan teknologi dan pembaruan draf tim konten
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/konten/artikel"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 text-xs font-bold text-[#041E42] transition-colors hover:bg-slate-100 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                >
                  <span>Semua Artikel</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {overview.recentArticles.length === 0 ? (
                <p className="py-8 text-center text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  Belum ada artikel yang diterbitkan atau disimpan dalam draf.
                </p>
              ) : (
                <div className="mt-4 divide-y divide-slate-100 dark:divide-[#1E3358]">
                  {overview.recentArticles.map((art) => (
                    <div
                      key={art.id}
                      className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between rounded-xl px-2 transition-colors hover:bg-slate-50/80 dark:hover:bg-[#12213F]/50"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <p className="truncate text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]">
                          {art.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[#5A6E85] dark:bg-[#12213F] dark:text-[#94A7C4]">
                            {art.categoryName || "Umum"}
                          </span>
                          <span className="text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                            Diperbarui {dateTimeFormatter.format(art.updatedAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${
                            art.status === "PUBLISHED"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-[#12213F] dark:text-[#34D399]"
                              : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700/60 dark:bg-[#12213F] dark:text-[#FBBF24]"
                          }`}
                        >
                          {CONTENT_STATUS_LABELS[art.status]}
                        </span>
                        <Link
                          href={`/admin/konten/artikel?edit=${art.id}`}
                          className="inline-flex min-h-11 items-center justify-center rounded-lg px-2.5 text-xs font-semibold text-[#0066FF] hover:bg-[#EAF4FC] dark:text-[#38BDF8] dark:hover:bg-[#12213F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                        >
                          Sunting
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right Secondary Column: 4 Columns for System Health, DB Inventory & Audit */}
        <div className="space-y-6 lg:col-span-4">
          {/* Card C: Infrastructure & Security Health */}
          <section
            aria-labelledby="system-health-heading"
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3 dark:border-[#1E3358]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircledIcon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id="system-health-heading"
                  className="text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]"
                >
                  Status Sistem & Keamanan
                </h3>
                <p className="text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                  Integritas runtime dan koneksi basis data
                </p>
              </div>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#071225]">
                <span className="text-[#5A6E85] dark:text-[#94A7C4]">Basis Data PostgreSQL Neon</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Terhubung
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#071225]">
                <span className="text-[#5A6E85] dark:text-[#94A7C4]">Hak Akses Peran Pengguna</span>
                <span className="font-bold text-[#041E42] dark:text-[#F1F5FB]">
                  {ROLE_LABELS[user.role] || user.role}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#071225]">
                <span className="text-[#5A6E85] dark:text-[#94A7C4]">Keamanan Sesi Login</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  HttpOnly Strict
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 dark:bg-[#071225]">
                <span className="text-[#5A6E85] dark:text-[#94A7C4]">Proteksi CSRF Server Action</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  Origin Validated
                </span>
              </div>
            </div>
          </section>

          {/* Card D: PostgreSQL Content Inventory */}
          {canViewContent && (
            <section
              aria-labelledby="content-inventory-heading"
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
            >
              <div className="border-b border-slate-100 pb-3 dark:border-[#1E3358]">
                <h3
                  id="content-inventory-heading"
                  className="text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]"
                >
                  Inventaris Konten PostgreSQL
                </h3>
                <p className="mt-0.5 text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                  Total catatan data tersimpan pada schema produksi
                </p>
              </div>

              <dl className="mt-3 divide-y divide-slate-100 text-xs dark:divide-[#1E3358]">
                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Artikel blog publik</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedArticles}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Draf atau tinjauan artikel</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.draftArticles}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Portofolio dan studi kasus</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedPortfolios}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Layanan aktif</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedServices}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Paket harga aktif</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedPricingPlans}
                  </dd>
                </div>

                <div className="flex items-center justify-between py-2">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">Pertanyaan FAQ terbit</dt>
                  <dd className="font-bold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedFaqs}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {/* Card E: Security Audit Feed */}
          {canViewAudit && (
            <section
              aria-labelledby="audit-logs-heading"
              className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-[#1E3358] dark:bg-[#0B1730]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-[#1E3358]">
                <div>
                  <h3
                    id="audit-logs-heading"
                    className="text-sm font-bold text-[#041E42] dark:text-[#F1F5FB]"
                  >
                    Log Audit Keamanan
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                    Rekaman mutasi dan autentikasi
                  </p>
                </div>

                <Link
                  href="/admin/audit"
                  className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline dark:text-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
                >
                  <span>Lihat Semua</span>
                  <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>

              {overview.recentAudits.length === 0 ? (
                <p className="py-6 text-center text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  Belum ada log audit yang tersimpan.
                </p>
              ) : (
                <div className="mt-3 divide-y divide-slate-100 dark:divide-[#1E3358]">
                  {overview.recentAudits.slice(0, 4).map((entry) => (
                    <div key={entry.id} className="py-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#041E42] dark:bg-[#12213F] dark:text-[#F1F5FB]">
                          {entry.action}
                        </span>
                        <span className="text-[11px] tabular-nums text-[#5A6E85] dark:text-[#94A7C4]">
                          {dateTimeFormatter.format(entry.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                        Oleh <strong className="font-semibold text-[#041E42] dark:text-[#F1F5FB]">{entry.userName}</strong> pada entitas {entry.entityType}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {canManageUsers && (
                <div className="mt-4 border-t border-slate-100 pt-3 dark:border-[#1E3358]">
                  <Link
                    href="/admin/pengguna"
                    className="flex min-h-11 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-[#041E42] hover:bg-slate-100 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
                  >
                    <div className="flex items-center gap-2">
                      <PersonIcon className="h-3.5 w-3.5 text-[#0066FF] dark:text-[#38BDF8]" aria-hidden="true" />
                      <span>Manajemen Pengguna & Peran</span>
                    </div>
                    <ArrowRightIcon className="h-3.5 w-3.5 text-[#5A6E85] dark:text-[#94A7C4]" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
