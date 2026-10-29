"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  CaretSortIcon,
  CardStackIcon,
  Cross1Icon,
  DashboardIcon,
  EnvelopeClosedIcon,
  ExternalLinkIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  LayersIcon,
  LockClosedIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { AdminThemeToggle } from "./AdminThemeToggle";
import { Tooltip } from "./ui/RadixTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/RadixDropdownMenu";
import LogoutForm from "@/features/auth/components/LogoutForm";

export interface AdminSidebarProps {
  userName: string;
  userEmail: string;
  userRole: string;
  unreadMessagesCount: number;
  canViewMessages: boolean;
  canViewContent: boolean;
  canManageUsers: boolean;
  canViewAudit: boolean;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  visible: boolean;
  badge?: number;
  exact?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  EDITOR: "Editor Konten",
  ANALYST: "Analis",
  VIEWER: "Pemeriksa",
};

export function AdminSidebar({
  userName,
  userEmail,
  userRole,
  unreadMessagesCount,
  canViewMessages,
  canViewContent,
  canManageUsers,
  canViewAudit,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections: NavSection[] = [
    {
      title: "UTAMA",
      items: [
        {
          href: "/admin",
          label: "Ringkasan",
          icon: DashboardIcon,
          visible: true,
          exact: true,
        },
        {
          href: "/admin/pesan",
          label: "Pesan Masuk",
          icon: EnvelopeClosedIcon,
          visible: canViewMessages,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
        },
      ],
    },
    {
      title: "MANAJEMEN KONTEN",
      items: [
        {
          href: "/admin/konten/artikel",
          label: "Artikel & Kategori",
          icon: FileTextIcon,
          visible: canViewContent,
        },
        {
          href: "/admin/konten/layanan",
          label: "Layanan & Harga",
          icon: LayersIcon,
          visible: canViewContent,
        },
        {
          href: "/admin/konten/portofolio",
          label: "Portofolio",
          icon: CardStackIcon,
          visible: canViewContent,
        },
        {
          href: "/admin/konten/faq",
          label: "FAQ & Halaman",
          icon: QuestionMarkCircledIcon,
          visible: canViewContent,
        },
      ],
    },
    {
      title: "SISTEM & AUDIT",
      items: [
        {
          href: "/admin/pengguna",
          label: "Pengguna",
          icon: PersonIcon,
          visible: canManageUsers,
        },
        {
          href: "/admin/audit",
          label: "Log Audit",
          icon: LockClosedIcon,
          visible: canViewAudit,
        },
      ],
    },
  ];

  const isItemActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1E3358] pb-4">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 transition-transform hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo-navbar.png"
              alt="Logo NAIKON"
              width={160}
              height={36}
              priority
              className="h-[28px] w-auto object-contain dark:brightness-150"
            />
          </Link>
          <span className="rounded-md border border-blue-200 dark:border-[#4E6E9E] bg-blue-50 dark:bg-[#12213F] px-2 py-0.5 text-[10px] font-bold text-[#0066FF] dark:text-[#94A7C4]">
            CMS
          </span>
        </div>

        {/* User Profile Card with Radix DropdownMenu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-full text-left rounded-2xl border border-slate-200 dark:border-[#1E3358] bg-slate-50/80 hover:bg-slate-100 dark:bg-[#071225] dark:hover:bg-[#12213F] p-3 flex items-center justify-between gap-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0066FF] to-[#1D4ED8] text-white font-bold text-sm shadow-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[#041E42] dark:text-[#F1F5FB]">
                    {userName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    <span className="truncate text-[11px] text-[#5A6E85] dark:text-[#94A7C4]">
                      {ROLE_LABELS[userRole] || userRole}
                    </span>
                  </div>
                </div>
              </div>
              <CaretSortIcon className="h-4 w-4 shrink-0 text-[#5A6E85] dark:text-[#94A7C4]" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Akun Pengguna</DropdownMenuLabel>
            <div className="px-3 py-1.5 text-xs">
              <p className="font-semibold text-[#041E42] dark:text-[#F1F5FB] truncate">
                {userName}
              </p>
              <p className="text-[11px] text-[#5A6E85] dark:text-[#94A7C4] truncate">
                {userEmail}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center gap-2">
                <ExternalLinkIcon className="h-4 w-4" />
                <span>Lihat Situs Publik</span>
              </Link>
            </DropdownMenuItem>
            {canManageUsers && (
              <DropdownMenuItem asChild>
                <Link href="/admin/pengguna" className="flex items-center gap-2">
                  <PersonIcon className="h-4 w-4" />
                  <span>Manajemen Pengguna</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <div className="p-1">
              <LogoutForm />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Navigation Sections */}
        <nav aria-label="Navigasi admin utama" className="space-y-5">
          {sections.map((section) => {
            const visibleItems = section.items.filter((item) => item.visible);
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.title} className="space-y-1.5">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-[#5A6E85]">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const active = isItemActive(item);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8] ${
                          active
                            ? "bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/25 dark:bg-[#12213F] dark:text-[#F1F5FB] dark:border-[#60A5FA]"
                            : "border border-transparent text-[#5A6E85] dark:text-[#94A7C4] hover:bg-slate-100 dark:hover:bg-[#12213F] hover:text-[#041E42] dark:hover:text-[#F1F5FB]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              active
                                ? "text-[#0066FF] dark:text-[#60A5FA]"
                                : "text-[#5A6E85] dark:text-[#94A7C4]"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span className="rounded-md border border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#0B1730] px-2 py-0.5 text-[11px] font-bold tabular-nums text-amber-700 dark:text-[#FBBF24]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Theme Switcher, Public Site, Logout */}
      <div className="border-t border-slate-200 dark:border-[#1E3358] pt-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <AdminThemeToggle className="flex-1" />
          <Tooltip content="Lihat Situs Publik">
            <Link
              href="/"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] text-[#5A6E85] dark:text-[#94A7C4] transition-colors hover:bg-slate-100 dark:hover:bg-[#192D54] hover:text-[#041E42] dark:hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
            >
              <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Buka Situs Publik</span>
            </Link>
          </Tooltip>
        </div>

        <div className="w-full">
          <LogoutForm />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header with Radix Dialog Drawer */}
      <header className="lg:hidden sticky top-0 z-40 flex min-h-[64px] items-center justify-between border-b border-slate-200 dark:border-[#1E3358] bg-white/95 dark:bg-[#0B1730]/95 px-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogPrimitive.Trigger asChild>
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] text-[#041E42] dark:text-[#F1F5FB] hover:bg-slate-100 dark:hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:focus-visible:outline-[#38BDF8]"
              >
                <HamburgerMenuIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Buka Menu Navigasi Admin</span>
              </button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#041E42]/60 backdrop-blur-xs animate-in fade-in-0 dark:bg-black/75" />
              <DialogPrimitive.Content
                className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-slate-200 bg-white shadow-2xl animate-in slide-in-from-left duration-200 dark:border-[#1E3358] dark:bg-[#0B1730]"
              >
                <div className="sr-only">
                  <DialogPrimitive.Title>Menu Navigasi Admin NAIKON</DialogPrimitive.Title>
                  <DialogPrimitive.Description>
                    Pilihan menu ruang kerja CMS dan konfigurasi sistem.
                  </DialogPrimitive.Description>
                </div>
                <div className="absolute right-3 top-4 z-10">
                  <DialogPrimitive.Close className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-[#5A6E85] hover:bg-slate-100 dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#94A7C4] dark:hover:bg-[#192D54]">
                    <Cross1Icon className="h-4 w-4" />
                    <span className="sr-only">Tutup Navigasi</span>
                  </DialogPrimitive.Close>
                </div>
                {navContent}
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>

          <Link href="/admin" className="flex items-center">
            <Image
              src="/logo-navbar.png"
              alt="Logo NAIKON"
              width={140}
              height={32}
              priority
              className="h-[24px] w-auto object-contain dark:brightness-150"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {unreadMessagesCount > 0 && (
            <Link
              href="/admin/pesan"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#12213F] px-2.5 text-xs font-bold text-amber-700 dark:text-[#FBBF24]"
            >
              <EnvelopeClosedIcon className="h-3.5 w-3.5" />
              <span>{unreadMessagesCount}</span>
            </Link>
          )}
          <AdminThemeToggle showLabel={false} />
        </div>
      </header>

      {/* Desktop Fixed Sidebar */}
      <aside
        aria-label="Navigasi samping admin"
        className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col lg:border-r lg:border-slate-200 lg:dark:border-[#1E3358] lg:bg-white lg:dark:bg-[#0B1730] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto"
      >
        {navContent}
      </aside>
    </>
  );
}
