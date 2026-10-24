import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#F5F9FF] to-[#EAF3FF] dark:from-[#030711] dark:to-[#050C1D] border-t border-[#DCEBFE] dark:border-blue-900/40 pt-14 pb-10">
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
        {/* Top Multi-Column Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_1fr] lg:gap-8">
          {/* Column 1: Brand Identity */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo-navbar.png"
                alt="NAIKON Digital Solution"
                width={250}
                height={52}
                className="h-[34px] sm:h-[38px] w-auto object-contain dark:brightness-150"
              />
            </Link>
            <p className="mt-4 max-w-[340px] text-[13px] sm:text-[13.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
              NAIKON Digital Solution adalah mitra rekayasa perangkat lunak dan website
              korporasi yang berfokus pada arsitektur modern, performa tinggi, dan dampak
              pertumbuhan nyata bagi bisnis Anda.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-[#D4E6FF] dark:border-slate-800 px-3.5 py-1.5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[#0066FF]" />
              <span className="text-[11.5px] font-semibold text-[#041E42] dark:text-slate-200">
                Megakselerasi Inovasi, Mewujudkan Karya Digital
              </span>
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#041E42] dark:text-white">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] font-medium text-[#4A5D78] dark:text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#0066FF] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-[#0066FF] transition-colors">
                  Layanan Utama
                </Link>
              </li>
              <li>
                <Link
                  href="/portofolio"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Portofolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#0066FF] transition-colors">
                  Blog &amp; Artikel
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#0066FF] transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan Spesialis */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#041E42] dark:text-white">
              Layanan Utama
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] font-medium text-[#4A5D78] dark:text-slate-300">
              <li>
                <Link href="/layanan" className="hover:text-[#0066FF] transition-colors">
                  Pembuatan Website Bisnis
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-[#0066FF] transition-colors">
                  Redesign &amp; Optimalisasi Website
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-[#0066FF] transition-colors">
                  Aplikasi Web &amp; Dashboard Kustom
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-[#0066FF] transition-colors">
                  Pengembangan Aplikasi Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Operasional */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#041E42] dark:text-white">
              Kontak Resmi
            </h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-[#4A5D78] dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <EnvelopeClosedIcon className="h-4 w-4 text-[#0066FF] shrink-0 mt-1" />
                <div>
                  <span className="block text-[11.5px] font-semibold text-[#647896] dark:text-slate-400">
                    Email Bisnis
                  </span>
                  <a
                    href="mailto:contact@naykon.id"
                    className="font-bold text-[#0066FF] dark:text-blue-400 hover:underline"
                  >
                    contact@naykon.id
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="h-4 w-4 text-[#0066FF] shrink-0 mt-1" />
                <div>
                  <span className="block text-[11.5px] font-semibold text-[#647896] dark:text-slate-400">
                    Jam Operasional
                  </span>
                  <span className="font-semibold text-[#041E42] dark:text-slate-200">
                    Senin – Jumat, 09.00 – 18.00 WIB
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_20px_-4px_rgba(0,102,255,0.4)] transition-all hover:scale-[1.02]"
              >
                <span>Mulai Diskusi Proyek</span>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#D5E6FC] dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6E8C] dark:text-slate-400">
          <p className="text-center sm:text-left font-medium">
            &copy; 2026 PT NAIKON Digital Solution. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 font-medium">
            <span>Standar Rekayasa Perangkat Lunak</span>
            <span className="hidden sm:inline text-[#B8D0F0] dark:text-slate-700">
              &bull;
            </span>
            <span>Keamanan &amp; Skalabilitas Teruji</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
