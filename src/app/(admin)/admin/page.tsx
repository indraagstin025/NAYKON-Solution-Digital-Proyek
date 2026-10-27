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
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F5FB]">
            Ringkasan Operasional
          </h1>
          <p className="mt-1 text-sm text-[#94A7C4]">
            Pantau pesan konsultasi masuk, status publikasi konten situs publik, dan log
            keamanan NAIKON.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg border border-[#1E3358] bg-[#0B1730] px-3 py-1.5 text-xs text-[#94A7C4]">
          <CheckCircledIcon
            className="h-4 w-4 shrink-0 text-[#34D399]"
            aria-hidden="true"
          />
          <span>Sesi terenkripsi aktif ({user.email})</span>
        </div>
      </div>

      {overview.loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#F87171]/60 bg-[#0B1730] p-4 text-sm text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-[#F87171]"
            aria-hidden="true"
          />
          <p>{overview.loadError}</p>
        </div>
      )}

      <section
        aria-label="Pintasan modul manajemen"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {canViewMessages && (
          <Link
            href="/admin/pesan"
            className="flex flex-col justify-between rounded-2xl border border-[#4E6E9E] bg-[#0B1730] p-5 transition-colors hover:border-[#60A5FA] hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#94A7C4]">
                Pesan Belum Dibaca
              </span>
              <EnvelopeClosedIcon
                className="h-4 w-4 text-[#60A5FA]"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl font-bold tabular-nums text-[#F1F5FB]">
                {overview.unreadMessagesCount}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA]">
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
              className="flex flex-col justify-between rounded-2xl border border-[#4E6E9E] bg-[#0B1730] p-5 transition-colors hover:border-[#60A5FA] hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#94A7C4]">
                  Artikel Blog Terbit
                </span>
                <FileTextIcon
                  className="h-4 w-4 text-[#60A5FA]"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="text-2xl font-bold tabular-nums text-[#F1F5FB]">
                  {overview.publishedArticles}
                </p>
                <span className="text-xs text-[#94A7C4]">
                  +{overview.draftArticles} draf
                </span>
              </div>
            </Link>

            <Link
              href="/admin/konten/portofolio"
              className="flex flex-col justify-between rounded-2xl border border-[#4E6E9E] bg-[#0B1730] p-5 transition-colors hover:border-[#60A5FA] hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#94A7C4]">
                  Studi Kasus Portofolio
                </span>
                <LayersIcon
                  className="h-4 w-4 text-[#60A5FA]"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="text-2xl font-bold tabular-nums text-[#F1F5FB]">
                  {overview.publishedPortfolios}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA]">
                  <span>Kelola</span>
                  <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <Link
              href="/admin/konten/layanan"
              className="flex flex-col justify-between rounded-2xl border border-[#4E6E9E] bg-[#0B1730] p-5 transition-colors hover:border-[#60A5FA] hover:bg-[#12213F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#94A7C4]">
                  Layanan & Paket Harga
                </span>
                <LayersIcon
                  className="h-4 w-4 text-[#60A5FA]"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="text-2xl font-bold tabular-nums text-[#F1F5FB]">
                  {overview.publishedServices}
                </p>
                <span className="text-xs text-[#94A7C4]">
                  {overview.publishedPricingPlans} paket harga
                </span>
              </div>
            </Link>
          </>
        )}
      </section>

      {canViewMessages && (
        <section
          aria-labelledby="recent-messages-heading"
          className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3358] pb-4">
            <div className="flex items-center gap-2.5">
              <EnvelopeClosedIcon
                className="h-5 w-5 text-[#60A5FA]"
                aria-hidden="true"
              />
              <div>
                <h2
                  id="recent-messages-heading"
                  className="text-base sm:text-lg font-semibold text-[#F1F5FB]"
                >
                  Pesan Konsultasi Masuk Terbaru
                </h2>
                <p className="text-xs text-[#94A7C4]">
                  Menampilkan maksimal 5 kiriman terakhir dari formulir publik
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="rounded-md border border-[#4E6E9E] bg-[#12213F] px-2.5 py-1 text-xs font-semibold tabular-nums text-[#F1F5FB]">
                Belum dibaca: {overview.unreadMessagesCount}
              </span>
              <Link
                href="/admin/pesan"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <span>Kelola Pesan</span>
                <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {overview.recentMessages.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-[#F1F5FB]">
                Belum ada pesan konsultasi yang masuk.
              </p>
              <p className="mt-1 text-xs text-[#94A7C4]">
                Kiriman baru dari formulir di halaman Beranda atau Kontak akan langsung
                muncul di daftar ini.
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#1E3358] text-xs font-semibold text-[#94A7C4]">
                    <th scope="col" className="pb-2.5 pr-4">
                      Pengirim
                    </th>
                    <th scope="col" className="pb-2.5 pr-4">
                      Kebutuhan Layanan
                    </th>
                    <th scope="col" className="pb-2.5 pr-4">
                      Status
                    </th>
                    <th scope="col" className="pb-2.5 text-right">
                      Waktu Masuk (WIB)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E3358]">
                  {overview.recentMessages.map((msg) => (
                    <tr key={msg.id} className="align-top">
                      <td className="py-3 pr-4">
                        <p className="font-medium text-[#F1F5FB]">{msg.name}</p>
                        <p className="text-xs text-[#94A7C4]">{msg.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-[#F1F5FB]">
                        {msg.service || "Umum"}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                            msg.status === "NEW"
                              ? "border border-[#FBBF24]/60 bg-[#12213F] text-[#FBBF24]"
                              : msg.status === "REPLIED"
                              ? "border border-[#34D399]/60 bg-[#12213F] text-[#34D399]"
                              : msg.status === "SPAM"
                              ? "border border-[#F87171]/60 bg-[#12213F] text-[#FCA5A5]"
                              : "border border-[#4E6E9E] bg-[#12213F] text-[#94A7C4]"
                          }`}
                        >
                          {MESSAGE_STATUS_LABELS[msg.status]}
                        </span>
                      </td>
                      <td className="py-3 text-right text-xs tabular-nums text-[#94A7C4]">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {canViewContent && (
          <section
            aria-labelledby="content-inventory-heading"
            className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 lg:col-span-5 space-y-5"
          >
            <div>
              <h2
                id="content-inventory-heading"
                className="text-base font-semibold text-[#F1F5FB]"
              >
                Inventaris Konten Database
              </h2>
              <p className="mt-1 text-xs text-[#94A7C4]">
                Jumlah baris nyata yang saat ini tersimpan di PostgreSQL
              </p>

              <dl className="mt-4 divide-y divide-[#1E3358] text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Artikel terbit</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.publishedArticles}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Draf / tinjauan artikel</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.draftArticles}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Studi kasus portofolio terbit</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.publishedPortfolios}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Layanan aktif</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.publishedServices}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Paket harga aktif</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.publishedPricingPlans}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <dt className="text-[#94A7C4]">Pertanyaan FAQ terbit</dt>
                  <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                    {overview.publishedFaqs}
                  </dd>
                </div>
              </dl>
            </div>

            {overview.recentArticles.length > 0 && (
              <div className="border-t border-[#1E3358] pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A7C4]">
                    Artikel Terakhir Diperbarui
                  </h3>
                  <Link
                    href="/admin/konten/artikel"
                    className="text-xs font-semibold text-[#60A5FA] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Semua Artikel
                  </Link>
                </div>
                <ul className="mt-3 divide-y divide-[#1E3358] text-xs">
                  {overview.recentArticles.map((art) => (
                    <li
                      key={art.id}
                      className="flex items-center justify-between gap-2 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-[#F1F5FB]">
                          {art.title}
                        </p>
                        <p className="text-[#94A7C4]">{art.categoryName}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                          art.status === "PUBLISHED"
                            ? "border-[#34D399]/60 bg-[#12213F] text-[#34D399]"
                            : "border-[#FBBF24]/60 bg-[#12213F] text-[#FBBF24]"
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
            className={`rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 ${
              canViewContent ? "lg:col-span-7" : "lg:col-span-12"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2
                  id="recent-audit-heading"
                  className="text-base font-semibold text-[#F1F5FB]"
                >
                  Catatan Keamanan & Audit Terbaru
                </h2>
                <p className="mt-1 text-xs text-[#94A7C4]">
                  Lima kejadian autentikasi dan perubahan sistem paling akhir
                </p>
              </div>

              <div className="flex items-center gap-2">
                {canManageUsers && (
                  <Link
                    href="/admin/pengguna"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    <PersonIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Pengguna</span>
                  </Link>
                )}
                <Link
                  href="/admin/audit"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <LockClosedIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Semua Log</span>
                </Link>
              </div>
            </div>

            {overview.recentAudits.length === 0 ? (
              <p className="mt-5 text-sm text-[#94A7C4]">
                Belum ada catatan aktivitas yang terekam di tabel audit.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-[#1E3358] text-sm">
                {overview.recentAudits.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                  >
                    <div>
                      <p className="font-medium text-[#F1F5FB]">{entry.action}</p>
                      <p className="text-xs text-[#94A7C4]">
                        Pelaku: {entry.userName} · Entitas: {entry.entityType}
                      </p>
                    </div>
                    <span className="text-xs tabular-nums text-[#94A7C4]">
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
