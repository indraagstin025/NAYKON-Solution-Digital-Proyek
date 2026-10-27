import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  LayersIcon,
  LockClosedIcon,
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

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminOverviewPage() {
  const user = await requirePermission("dashboard.view");
  const overview = await getAdminOverviewData(user);

  const canViewContent = hasPermission(user.role, "content.view");
  const canViewMessages = hasPermission(user.role, "messages.view");
  const canManageUsers = hasPermission(user.role, "users.manage");
  const canViewAudit = hasPermission(user.role, "audit.view");

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
            Ringkasan Operasional
          </h1>
          <p className="mt-1 text-sm text-[#5A6E85] dark:text-[#94A7C4]">
            Pantau pesan konsultasi masuk, inventaris konten publik, dan log
            keamanan sistem NAIKON.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] px-3.5 py-2 text-xs font-medium text-[#5A6E85] dark:text-[#94A7C4] shadow-xs">
          <CheckCircledIcon
            className="h-4 w-4 shrink-0 text-emerald-600 dark:text-[#34D399]"
            aria-hidden="true"
          />
          <span>Sesi aman aktif ({user.email})</span>
        </div>
      </div>

      {overview.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#0B1730] p-4 text-sm text-rose-900 dark:text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
            aria-hidden="true"
          />
          <p>{overview.loadError}</p>
        </div>
      )}

      {/* Metric Cards Grid */}
      <section
        aria-label="Pintasan modul manajemen"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {canViewMessages && (
          <Link
            href="/admin/pesan"
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.14)] dark:hover:border-[#60A5FA] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                Pesan Baru
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-[#12213F] text-[#0066FF] dark:text-[#60A5FA]">
                <EnvelopeClosedIcon className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                {overview.unreadMessagesCount}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] dark:text-[#60A5FA] group-hover:translate-x-0.5 transition-transform">
                <span>Buka Inbox</span>
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        {canViewContent && (
          <>
            <Link
              href="/admin/konten/artikel"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.14)] dark:hover:border-[#60A5FA] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Artikel Blog
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-[#12213F] text-[#0066FF] dark:text-[#60A5FA]">
                  <FileTextIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedArticles}
                </p>
                <span className="text-xs font-semibold text-[#5A6E85] dark:text-[#94A7C4]">
                  +{overview.draftArticles} draf
                </span>
              </div>
            </Link>

            <Link
              href="/admin/konten/portofolio"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.14)] dark:hover:border-[#60A5FA] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Portofolio Terbit
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-[#12213F] text-[#0066FF] dark:text-[#60A5FA]">
                  <LayersIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedPortfolios}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] dark:text-[#60A5FA] group-hover:translate-x-0.5 transition-transform">
                  <span>Kelola</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <Link
              href="/admin/konten/layanan"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_12px_28px_-8px_rgba(0,102,255,0.14)] dark:hover:border-[#60A5FA] dark:hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                  Layanan & Harga
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-[#12213F] text-[#0066FF] dark:text-[#60A5FA]">
                  <LayersIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                  {overview.publishedServices}
                </p>
                <span className="text-xs font-semibold text-[#5A6E85] dark:text-[#94A7C4]">
                  {overview.publishedPricingPlans} paket harga
                </span>
              </div>
            </Link>
          </>
        )}
      </section>

      {/* Recent Messages Section */}
      {canViewMessages && (
        <section
          aria-labelledby="recent-messages-heading"
          className="rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E3358] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-[#12213F] text-[#0066FF] dark:text-[#60A5FA]">
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
                  Menampilkan maksimal 5 kiriman terakhir dari formulir konsultasi publik
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="rounded-xl border border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#12213F] px-3 py-1.5 text-xs font-bold tabular-nums text-amber-800 dark:text-[#FBBF24]">
                Belum dibaca: {overview.unreadMessagesCount}
              </span>
              <Link
                href="/admin/pesan"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-4 text-xs font-bold text-[#041E42] dark:text-[#F1F5FB] transition-colors hover:bg-slate-100 dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
              >
                <span>Buka Inbox</span>
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {overview.recentMessages.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                Belum ada pesan konsultasi yang masuk.
              </p>
              <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Kiriman baru dari formulir Beranda atau Kontak akan langsung muncul
                di daftar ini.
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#1E3358] text-xs font-bold text-[#5A6E85] dark:text-[#94A7C4]">
                    <th scope="col" className="pb-3 pr-4">
                      Pengirim
                    </th>
                    <th scope="col" className="pb-3 pr-4">
                      Kebutuhan Layanan
                    </th>
                    <th scope="col" className="pb-3 pr-4">
                      Status
                    </th>
                    <th scope="col" className="pb-3 text-right">
                      Waktu Masuk (WIB)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#1E3358]">
                  {overview.recentMessages.map((msg) => (
                    <tr key={msg.id} className="align-top hover:bg-slate-50/70 dark:hover:bg-[#12213F]/50 transition-colors">
                      <td className="py-3.5 pr-4">
                        <p className="font-bold text-[#041E42] dark:text-[#F1F5FB]">
                          {msg.name}
                        </p>
                        <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                          {msg.email}
                        </p>
                      </td>
                      <td className="py-3.5 pr-4 text-xs font-medium text-[#041E42] dark:text-[#F1F5FB]">
                        {msg.service || "Konsultasi Umum"}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-bold ${
                            msg.status === "NEW"
                              ? "border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#12213F] text-amber-800 dark:text-[#FBBF24]"
                              : msg.status === "REPLIED"
                              ? "border-emerald-300 dark:border-[#34D399]/60 bg-emerald-50 dark:bg-[#12213F] text-emerald-800 dark:text-[#34D399]"
                              : msg.status === "SPAM"
                              ? "border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#12213F] text-rose-800 dark:text-[#FCA5A5]"
                              : "border-slate-300 dark:border-[#4E6E9E] bg-slate-100 dark:bg-[#12213F] text-slate-700 dark:text-[#94A7C4]"
                          }`}
                        >
                          {MESSAGE_STATUS_LABELS[msg.status]}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-xs tabular-nums text-[#5A6E85] dark:text-[#94A7C4]">
                        {dateTimeFormatter.format(msg.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Content Inventory & Audit Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {canViewContent && (
          <section
            aria-labelledby="content-inventory-heading"
            className="rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 lg:col-span-5 space-y-5 shadow-xs"
          >
            <div>
              <h2
                id="content-inventory-heading"
                className="text-base font-bold text-[#041E42] dark:text-[#F1F5FB]"
              >
                Inventaris Konten PostgreSQL
              </h2>
              <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                Total baris data tersimpan di server database Neon
              </p>

              <dl className="mt-4 divide-y divide-slate-100 dark:divide-[#1E3358] text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Artikel terbit
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedArticles}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Draf / tinjauan artikel
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.draftArticles}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Portofolio terbit
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedPortfolios}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Layanan aktif
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedServices}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Paket harga aktif
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedPricingPlans}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#5A6E85] dark:text-[#94A7C4]">
                    Pertanyaan FAQ terbit
                  </dt>
                  <dd className="font-extrabold tabular-nums text-[#041E42] dark:text-[#F1F5FB]">
                    {overview.publishedFaqs}
                  </dd>
                </div>
              </dl>
            </div>

            {overview.recentArticles.length > 0 && (
              <div className="border-t border-slate-200 dark:border-[#1E3358] pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6E85] dark:text-[#94A7C4]">
                    Artikel Terakhir Diperbarui
                  </h3>
                  <Link
                    href="/admin/konten/artikel"
                    className="text-xs font-bold text-[#0066FF] dark:text-[#60A5FA] hover:underline"
                  >
                    Semua Artikel
                  </Link>
                </div>
                <ul className="mt-3 divide-y divide-slate-100 dark:divide-[#1E3358] text-xs">
                  {overview.recentArticles.map((art) => (
                    <li
                      key={art.id}
                      className="flex items-center justify-between gap-2 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                          {art.title}
                        </p>
                        <p className="text-[#5A6E85] dark:text-[#94A7C4]">
                          {art.categoryName}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold ${
                          art.status === "PUBLISHED"
                            ? "border-emerald-300 dark:border-[#34D399]/60 bg-emerald-50 dark:bg-[#12213F] text-emerald-800 dark:text-[#34D399]"
                            : "border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#12213F] text-amber-800 dark:text-[#FBBF24]"
                        }`}
                      >
                        {CONTENT_STATUS_LABELS[art.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {canViewAudit && (
          <section
            aria-labelledby="recent-audit-heading"
            className={`rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-white dark:bg-[#0B1730] p-5 sm:p-6 shadow-xs ${
              canViewContent ? "lg:col-span-7" : "lg:col-span-12"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E3358] pb-4">
              <div>
                <h2
                  id="recent-audit-heading"
                  className="text-base font-bold text-[#041E42] dark:text-[#F1F5FB]"
                >
                  Catatan Keamanan & Audit Terbaru
                </h2>
                <p className="mt-1 text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                  Aktivitas autentikasi dan mutasi konten paling akhir
                </p>
              </div>

              <div className="flex items-center gap-2">
                {canManageUsers && (
                  <Link
                    href="/admin/pengguna"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-xs font-bold text-[#041E42] dark:text-[#F1F5FB] transition-colors hover:bg-slate-100 dark:hover:bg-[#192D54]"
                  >
                    <PersonIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Pengguna</span>
                  </Link>
                )}
                <Link
                  href="/admin/audit"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-slate-50 dark:bg-[#12213F] px-3.5 text-xs font-bold text-[#041E42] dark:text-[#F1F5FB] transition-colors hover:bg-slate-100 dark:hover:bg-[#192D54]"
                >
                  <LockClosedIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Semua Log</span>
                </Link>
              </div>
            </div>

            {overview.recentAudits.length === 0 ? (
              <p className="mt-8 text-center text-sm text-[#5A6E85] dark:text-[#94A7C4]">
                Belum ada catatan aktivitas yang terekam di tabel audit.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100 dark:divide-[#1E3358] text-sm">
                {overview.recentAudits.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex flex-wrap items-center justify-between gap-2 py-3"
                  >
                    <div>
                      <p className="font-mono text-xs font-bold text-[#041E42] dark:text-[#F1F5FB]">
                        {entry.action}
                      </p>
                      <p className="text-xs text-[#5A6E85] dark:text-[#94A7C4]">
                        Pelaku: {entry.userName} · Entitas: {entry.entityType}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums text-[#5A6E85] dark:text-[#94A7C4]">
                      {dateTimeFormatter.format(entry.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
