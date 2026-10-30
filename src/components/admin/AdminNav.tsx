"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cross1Icon,
  ExternalLinkIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

export interface AdminNavProps {
  unreadMessagesCount: number;
  canViewMessages: boolean;
  canViewContent: boolean;
  canManageUsers: boolean;
  canViewAudit: boolean;
}

interface NavItem {
  href: string;
  label: string;
  visible: boolean;
  badge?: number;
  exact?: boolean;
}

export function AdminNav({
  unreadMessagesCount,
  canViewMessages,
  canViewContent,
  canManageUsers,
  canViewAudit,
}: AdminNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items: NavItem[] = [
    {
      href: "/admin",
      label: "Ringkasan",
      visible: true,
      exact: true,
    },
    {
      href: "/admin/pesan",
      label: "Pesan Masuk",
      visible: canViewMessages,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      href: "/admin/konten/artikel",
      label: "Artikel & Kategori",
      visible: canViewContent,
    },
    {
      href: "/admin/konten/layanan",
      label: "Layanan & Harga",
      visible: canViewContent,
    },
    {
      href: "/admin/konten/portofolio",
      label: "Portofolio",
      visible: canViewContent,
    },
    {
      href: "/admin/konten/faq",
      label: "FAQ & Halaman",
      visible: canViewContent,
    },
    {
      href: "/admin/pengguna",
      label: "Pengguna",
      visible: canManageUsers,
    },
    {
      href: "/admin/audit",
      label: "Log Audit",
      visible: canViewAudit,
    },
  ].filter((item) => item.visible);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const isItemActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <div className="w-full border-t border-[#1E3358] bg-[#0B1730]">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 py-2">
        <div className="flex lg:hidden items-center justify-between w-full">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="admin-mobile-menu"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8]"
          >
            {mobileOpen ? (
              <Cross1Icon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <HamburgerMenuIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span>Menu Modul CMS</span>
            {unreadMessagesCount > 0 && (
              <span className="rounded-md border border-[#FBBF24]/60 bg-[#0B1730] px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-[#FBBF24]">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] px-3 text-xs font-medium text-[#94A7C4] transition-colors hover:bg-[#12213F] hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8]"
          >
            <span>Situs Publik</span>
            <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <nav
          aria-label="Modul ruang kerja admin"
          className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:w-full lg:gap-2"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {items.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8] ${
                    active
                      ? "border-[#005090] bg-[#12213F] text-[#F1F5FB]"
                      : "border-transparent text-[#94A7C4] hover:border-[#4E6E9E] hover:bg-[#12213F] hover:text-[#F1F5FB]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="rounded-md border border-[#FBBF24]/60 bg-[#0B1730] px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-[#FBBF24]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] px-3.5 text-xs font-medium text-[#94A7C4] transition-colors hover:bg-[#12213F] hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8]"
          >
            <span>Situs Publik</span>
            <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </nav>
      </div>

      {mobileOpen && (
        <nav
          id="admin-mobile-menu"
          aria-label="Menu modul mobile"
          className="lg:hidden border-t border-[#1E3358] bg-[#0B1730] px-5 py-3 space-y-1.5"
        >
          {items.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center justify-between rounded-xl border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8] ${
                  active
                    ? "border-[#005090] bg-[#12213F] text-[#F1F5FB]"
                    : "border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4] hover:bg-[#12213F] hover:text-[#F1F5FB]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="rounded-md border border-[#FBBF24]/60 bg-[#0B1730] px-2 py-0.5 text-xs font-bold tabular-nums text-[#FBBF24]">
                    {item.badge} baru
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
