import {
  CheckCircledIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { prisma } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";

const MESSAGE_STATUS_LABELS = {
  NEW: "Baru",
  READ: "Dibaca",
  REPLIED: "Dibalas",
  SPAM: "Spam",
} as const;

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminOverviewPage() {
  const user = await requirePermission("dashboard.view");

  const canViewContent = hasPermission(user.role, "content.view");
  const canViewMessages = hasPermission(user.role, "messages.view");
  const canViewAudit = hasPermission(user.role, "audit.view");

  let loadError: string | null = null;
  let publishedArticles = 0;
  let draftArticles = 0;
  let publishedPortfolios = 0;
  let publishedServices = 0;
  let unreadMessagesCount = 0;
  let recentMessages: Array<{
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: keyof typeof MESSAGE_STATUS_LABELS;
    createdAt: Date;
  }> = [];
  let recentAudits: Array<{
    id: string;
    action: string;
    entityType: string;
    createdAt: Date;
    user: { name: string } | null;
  }> = [];

  try {
    const [
      pubArtCount,
      drfArtCount,
      pubPortCount,
      pubSvcCount,
      newMsgCount,
      latestMessages,
      latestAudits,
    ] = await Promise.all([
      canViewContent
        ? prisma.article.count({
            where: { status: "PUBLISHED", deletedAt: null },
          })
        : Promise.resolve(0),
      canViewContent
        ? prisma.article.count({
            where: { status: "DRAFT", deletedAt: null },
          })
        : Promise.resolve(0),
      canViewContent
        ? prisma.portfolio.count({
            where: { status: "PUBLISHED", deletedAt: null },
          })
        : Promise.resolve(0),
      canViewContent
        ? prisma.service.count({
            where: { status: "PUBLISHED", deletedAt: null },
          })
        : Promise.resolve(0),
      canViewMessages
        ? prisma.contactMessage.count({ where: { status: "NEW" } })
        : Promise.resolve(0),
      canViewMessages
        ? prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
              id: true,
              name: true,
              email: true,
              service: true,
              status: true,
              createdAt: true,
            },
          })
        : Promise.resolve([]),
      canViewAudit
        ? prisma.auditLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
              id: true,
              action: true,
              entityType: true,
              createdAt: true,
              user: { select: { name: true } },
            },
          })
        : Promise.resolve([]),
    ]);

    publishedArticles = pubArtCount;
    draftArticles = drfArtCount;
    publishedPortfolios = pubPortCount;
    publishedServices = pubSvcCount;
    unreadMessagesCount = newMsgCount;
    recentMessages = latestMessages;
    recentAudits = latestAudits;
  } catch (error) {
    console.error("Failed to query overview metrics:", error instanceof Error ? error.message : "unknown");
    loadError =
      "Gagal memuat sebagian data dari database PostgreSQL. Muat ulang halaman ini dalam beberapa saat.";
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1F5FB]">
            Ringkasan Operasional
          </h1>
          <p className="mt-1 text-sm text-[#94A7C4]">
            Pantau pesan konsultasi yang belum ditangani dan status publikasi konten
            aktif NAIKON.
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

      {loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-[#F87171]/60 bg-[#0B1730] p-4 text-sm text-[#FCA5A5]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-[#F87171]"
            aria-hidden="true"
          />
          <p>{loadError}</p>
        </div>
      )}

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

            <span className="rounded-md border border-[#4E6E9E] bg-[#12213F] px-2.5 py-1 text-xs font-semibold tabular-nums text-[#F1F5FB]">
              Belum dibaca: {unreadMessagesCount}
            </span>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-[#F1F5FB]">
                Belum ada pesan konsultasi yang masuk.
              </p>
              <p className="mt-1 text-xs text-[#94A7C4]">
                Kiriman baru dari formulir di halaman Beranda atau Kontak akan
                langsung muncul di daftar ini.
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
                  {recentMessages.map((msg) => (
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
            className="rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 lg:col-span-5"
          >
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
                  {publishedArticles}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#94A7C4]">Draf artikel</dt>
                <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                  {draftArticles}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#94A7C4]">Studi kasus portofolio terbit</dt>
                <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                  {publishedPortfolios}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-[#94A7C4]">Layanan aktif</dt>
                <dd className="font-semibold tabular-nums text-[#F1F5FB]">
                  {publishedServices}
                </dd>
              </div>
            </dl>
          </section>
        )}

        {canViewAudit && (
          <section
            aria-labelledby="recent-audit-heading"
            className={`rounded-2xl border border-[#1E3358] bg-[#0B1730] p-5 sm:p-6 ${
              canViewContent ? "lg:col-span-7" : "lg:col-span-12"
            }`}
          >
            <h2
              id="recent-audit-heading"
              className="text-base font-semibold text-[#F1F5FB]"
            >
              Catatan Keamanan & Audit Terbaru
            </h2>
            <p className="mt-1 text-xs text-[#94A7C4]">
              Lima kejadian autentikasi dan perubahan sistem paling akhir
            </p>

            {recentAudits.length === 0 ? (
              <p className="mt-5 text-sm text-[#94A7C4]">
                Belum ada catatan aktivitas yang terekam di tabel audit.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-[#1E3358] text-sm">
                {recentAudits.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex flex-wrap items-center justify-between gap-2 py-2.5"
                  >
                    <div>
                      <p className="font-medium text-[#F1F5FB]">{entry.action}</p>
                      <p className="text-xs text-[#94A7C4]">
                        Pelaku: {entry.user?.name || "Tidak terautentikasi"} · Entitas:{" "}
                        {entry.entityType}
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
