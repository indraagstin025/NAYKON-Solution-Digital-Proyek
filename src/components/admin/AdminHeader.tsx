"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  CheckCircledIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  HamburgerMenuIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { AdminThemeToggle } from "./AdminThemeToggle";
import { Tooltip } from "./ui/RadixTooltip";

export interface AdminHeaderProps {
  userName: string;
  userRole: string;
  unreadMessagesCount: number;
  onOpenMobileMenu?: () => void;
}

const PATH_TITLES: Record<string, string> = {
  "/admin": "Ringkasan Operasional",
  "/admin/pesan": "Pesan Masuk",
  "/admin/konten/artikel": "Artikel & Kategori",
  "/admin/konten/layanan": "Layanan & Paket Harga",
  "/admin/konten/portofolio": "Studi Kasus Portofolio",
  "/admin/konten/faq": "FAQ & Halaman Statis",
  "/admin/pengguna": "Manajemen Pengguna",
  "/admin/audit": "Log Audit Keamanan",
};

export function AdminHeader({
  userName,
  userRole,
  unreadMessagesCount,
  onOpenMobileMenu,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const currentTitle = PATH_TITLES[pathname] || "Portal Admin";

  return (
    <header className="sticky top-0 z-30 flex min-h-[64px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md transition-colors dark:border-[#1E3358] dark:bg-[#0B1730]/90">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#041E42] hover:bg-slate-100 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8]"
            aria-label="Buka menu navigasi admin"
          >
            <HamburgerMenuIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <nav aria-label="Breadcrumb ruang kerja" className="flex items-center gap-1.5 text-xs">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-[#5A6E85] hover:text-[#005090] dark:text-[#94A7C4] dark:hover:text-[#60A5FA] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090]"
          >
            <HomeIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline font-medium">Admin</span>
          </Link>

          {pathname !== "/admin" && (
            <>
              <ChevronRightIcon className="h-3 w-3 text-slate-400 dark:text-[#5A6E85]" aria-hidden="true" />
              <span className="truncate font-semibold text-[#041E42] dark:text-[#F1F5FB]">
                {currentTitle}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Right: System Status, Unread Messages, Theme Toggle, Public Site Link */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* System Health Badge */}
        <div className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircledIcon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>Sistem Operasional</span>
        </div>

        {/* User Identity Chip */}
        <Tooltip content={`Sesi terverifikasi: ${userName} (${userRole})`}>
          <div className="hidden xl:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs dark:border-[#1E3358] dark:bg-[#071225]">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#005090] text-[11px] font-bold text-white">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="max-w-[120px] truncate font-semibold text-[#041E42] dark:text-[#F1F5FB]">
              {userName}
            </span>
          </div>
        </Tooltip>

        {/* Unread Message Notification */}
        {unreadMessagesCount > 0 ? (
          <Tooltip content={`${unreadMessagesCount} pesan konsultasi baru belum dibaca`}>
            <Link
              href="/admin/pesan"
              className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-[#12213F] dark:text-amber-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090]"
              aria-label={`Inbox pesan masuk, ${unreadMessagesCount} pesan baru`}
            >
              <BellIcon className="h-4 w-4" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#005090] px-1 text-[10px] font-extrabold text-white">
                {unreadMessagesCount}
              </span>
            </Link>
          </Tooltip>
        ) : (
          <Tooltip content="Kotak Masuk Konsultasi (Semua pesan telah ditangani)">
            <Link
              href="/admin/pesan"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#5A6E85] hover:bg-slate-50 hover:text-[#041E42] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#94A7C4] dark:hover:text-[#F1F5FB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090]"
              aria-label="Kotak Masuk Konsultasi"
            >
              <BellIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Tooltip>
        )}

        {/* Theme Switcher Button */}
        <AdminThemeToggle showLabel={false} />

        {/* External Link to Public Site */}
        <Tooltip content="Buka Halaman Depan Situs Publik (Beranda)">
          <Link
            href="/"
            className="hidden sm:inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-[#041E42] hover:bg-slate-50 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8]"
          >
            <span>Situs Publik</span>
            <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Tooltip>
      </div>
    </header>
  );
}
