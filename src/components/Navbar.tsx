"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Layanan", href: "/layanan" },
  { label: "Portofolio", href: "/portofolio" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#030711]/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(10,30,63,0.08)] border-b border-slate-200/60 dark:border-blue-900/40"
          : "bg-transparent border-b border-transparent"
      }`}
      suppressHydrationWarning
    >
      <div className="mx-auto flex md:grid md:grid-cols-[1fr_auto_1fr] w-full max-w-[1240px] min-h-[68px] lg:min-h-[76px] items-center justify-between gap-4 px-6 sm:px-9 lg:px-14 py-2">
        <Link
          href="/"
          className="flex min-w-0 items-center justify-self-start transition-transform hover:opacity-95 group shrink-0"
          aria-label="NAIKON Digital Solution, kembali ke beranda"
        >
          <div className="relative shrink-0 transition-transform group-hover:scale-[1.02]">
            <Image
              src="/logo-navbar.png"
              alt="Logo NAIKON Digital Solution"
              width={260}
              height={54}
              priority
              className="h-[28px] sm:h-[32px] md:h-[34px] lg:h-[37px] w-auto object-contain dark:brightness-150"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center justify-self-center gap-6 lg:gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`canva-link relative py-1 text-[13px] lg:text-[13.5px] transition-colors ${
                  active
                    ? "font-semibold text-[#0066FF]"
                    : "font-medium text-[#0A1E3F] dark:text-slate-200 hover:text-[#0066FF]"
                }`}
              >
                <span>{item.label}</span>
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#0066FF] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center justify-self-end gap-2.5">
          <Link
            href="/kontak"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white px-5 py-2 text-[13px] font-semibold shadow-[0_8px_20px_-4px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_24px_-4px_rgba(0,102,255,0.55)]"
          >
            <span>Hubungi Kami</span>
            <ArrowRightIcon className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          <button
            id="menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="theme-menu-button rounded-lg border p-2 md:hidden"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <Cross1Icon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <HamburgerMenuIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi mobile"
          className="mobile-nav border-t py-5 md:hidden bg-white/95 dark:bg-[#030711]/95 backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`canva-link text-base ${
                    active
                      ? "font-semibold text-[#0066FF]"
                      : "nav-link theme-text font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontak"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0066FF] px-6 py-3 text-base font-semibold text-white shadow-md shadow-blue-500/20"
            >
              <span>Hubungi Kami</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
