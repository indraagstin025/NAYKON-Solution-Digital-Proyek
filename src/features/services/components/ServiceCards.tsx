import React from "react";
import Link from "next/link";
import {
  GlobeIcon,
  UpdateIcon,
  CodeIcon,
  MobileIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

export function ServiceCards() {
  return (
    <div className="space-y-6 lg:space-y-7">
      <div className="grid gap-6 lg:gap-7 lg:grid-cols-12 items-stretch">
        <article className="lg:col-span-7 flex flex-col justify-between rounded-[30px] bg-white border-2 border-[#3B82F6] p-7 sm:p-9 shadow-[0_16px_40px_-10px_rgba(0,102,255,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-10px_rgba(0,102,255,0.22)] hover:border-[#0066FF] group">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <GlobeIcon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#0066FF] px-3.5 py-1 text-[11.5px] font-bold text-white shadow-sm">
                  Website
                </span>
              </div>

              <h2 className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                Pembuatan Website Bisnis
              </h2>
              <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                Website korporasi dan landing page yang berfokus pada kredibilitas,
                konversi, dan pengalaman pengguna.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 max-w-[340px]">
                {[
                  "Company Profile",
                  "Landing Page",
                  "Optimasi SEO",
                  "Panel Admin / CMS",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1.5 text-[11.5px] font-semibold text-[#0F172A] transition-colors group-hover:bg-slate-200"
                  >
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-[#0066FF] stroke-2" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
                >
                  <span>Lihat detail</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center pt-4 md:pt-0">
              <div className="relative w-full max-w-[280px] transition-transform duration-500 group-hover:scale-[1.04] group-hover:-translate-y-1.5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-full bg-blue-100/60 blur-xl -z-10"
                />
                <svg
                  viewBox="0 0 320 230"
                  fill="none"
                  className="w-full h-auto drop-shadow-[0_12px_28px_rgba(0,102,255,0.12)]"
                >
                  <defs>
                    <linearGradient id="servicesBrowserHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F0F5FF" />
                      <stop offset="100%" stopColor="#E4EFFF" />
                    </linearGradient>
                    <linearGradient id="servicesBrowserLandscapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CBE2FE" />
                      <stop offset="100%" stopColor="#87B9FA" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="15"
                    y="15"
                    width="290"
                    height="190"
                    rx="16"
                    fill="#FFFFFF"
                    stroke="#D5E6FE"
                    strokeWidth="2"
                  />

                  <rect
                    x="15"
                    y="15"
                    width="290"
                    height="34"
                    rx="16"
                    fill="url(#servicesBrowserHeaderGrad)"
                  />
                  <circle cx="34" cy="32" r="3.5" fill="#FF5F56" />
                  <circle cx="46" cy="32" r="3.5" fill="#FFBD2E" />
                  <circle cx="58" cy="32" r="3.5" fill="#27C93F" />
                  <rect x="76" y="24" width="130" height="16" rx="8" fill="#FFFFFF" fillOpacity="0.85" />

                  <rect
                    x="34"
                    y="66"
                    width="118"
                    height="82"
                    rx="12"
                    fill="url(#servicesBrowserLandscapeGrad)"
                    className="opacity-90"
                  />
                  <path
                    d="M50 148 L80 102 L106 132 L124 114 L146 148 Z"
                    fill="#3B82F6"
                    fillOpacity="0.8"
                  />
                  <circle cx="70" cy="88" r="8" fill="#FFFFFF" fillOpacity="0.85" />

                  <rect x="168" y="68" width="118" height="10" rx="5" fill="#E2EDFC" />
                  <rect x="168" y="86" width="94" height="8" rx="4" fill="#EDF3FD" />
                  <rect x="168" y="100" width="110" height="8" rx="4" fill="#EDF3FD" />
                  <rect x="168" y="114" width="80" height="8" rx="4" fill="#EDF3FD" />

                  <rect x="168" y="132" width="58" height="14" rx="7" fill="#0066FF" />

                  <g className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1">
                    <circle cx="12" cy="115" r="16" fill="#0066FF" className="drop-shadow-md" />
                    <circle cx="12" cy="115" r="11" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M12 4 L12 26 M1 15 L23 15" stroke="#FFFFFF" strokeWidth="1.2" />
                  </g>

                  <g className="transition-transform duration-500 group-hover:translate-y-1 group-hover:translate-x-1">
                    <rect x="268" y="142" width="28" height="28" rx="8" fill="#FFFFFF" stroke="#D5E6FE" strokeWidth="1.5" className="drop-shadow-md" />
                    <path d="M276 156 L288 156 M282 150 L288 156 L282 162" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </g>

                  <g className="transition-transform duration-500 group-hover:-translate-y-1.5">
                    <rect x="264" y="44" width="30" height="30" rx="9" fill="#0066FF" className="drop-shadow-lg" />
                    <rect x="271" y="52" width="16" height="14" rx="2.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                    <path d="M271 57 L287 57" stroke="#FFFFFF" strokeWidth="1.2" />
                  </g>

                  <g className="transition-transform duration-500 group-hover:translate-y-1">
                    <rect x="24" y="174" width="32" height="32" rx="9" fill="#FFFFFF" stroke="#D5E6FE" strokeWidth="1.5" className="drop-shadow-md" />
                    <path d="M32 196 L32 188 M40 196 L40 182 M48 196 L48 185" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </article>

        <article className="lg:col-span-5 relative overflow-hidden flex flex-col justify-between rounded-[30px] bg-white border border-[#E6F0FD] p-7 sm:p-9 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-10px_rgba(0,102,255,0.15)] hover:border-[#0066FF] group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-45">
                <UpdateIcon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-[#0066FF] px-3.5 py-1 text-[11.5px] font-bold text-white shadow-sm">
                Penyegaran
              </span>
            </div>

            <h2 className="text-[20px] sm:text-[21px] font-extrabold tracking-[-0.015em] text-[#041E42]">
              Redesign &amp; Optimalisasi Website
            </h2>
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
              Memodernisasi tampilan dan kode website lama yang lambat, tidak responsif,
              atau usang menjadi antarmuka modern dengan skor kecepatan Google PageSpeed tinggi.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Penyegaran UI/UX",
                "Kecepatan Loading",
                "Mobile-First",
                "Migrasi Konten Aman",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0F172A] transition-colors group-hover:bg-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#E8F0FC]">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
            >
              <span>Lihat detail</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
            </Link>
          </div>
        </article>
      </div>

      <div className="grid gap-6 lg:gap-7 lg:grid-cols-12 items-stretch">
        <article className="lg:col-span-5 relative overflow-hidden flex flex-col justify-between rounded-[30px] bg-white border border-[#E6F0FD] p-7 sm:p-9 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-10px_rgba(0,102,255,0.15)] hover:border-[#0066FF] group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <CodeIcon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-[#0066FF] px-3.5 py-1 text-[11.5px] font-bold text-white shadow-sm">
                Sistem Web
              </span>
            </div>

            <h2 className="text-[20px] sm:text-[21px] font-extrabold tracking-[-0.015em] text-[#041E42]">
              Aplikasi Web &amp; Dashboard Kustom
            </h2>
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
              Pengembangan sistem internal berbasis web seperti dashboard operasional,
              inventaris pergudangan, portal karyawan, dan otomatisasi administrasi
              multi-cabang.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Dashboard Analitik",
                "Database Relasional",
                "Integrasi REST API",
                "Hak Akses",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0F172A] transition-colors group-hover:bg-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mt-8 pt-4 border-t border-[#E8F0FC] flex items-center justify-between">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link z-10"
            >
              <span>Lihat detail</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
            </Link>

            <div className="absolute right-0 bottom-0 pointer-events-none w-[170px] h-[100px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
              <svg viewBox="0 0 180 110" fill="none" className="w-full h-full opacity-90">
                <rect x="25" y="15" width="145" height="90" rx="10" fill="#F8FBFF" stroke="#D3E5FD" strokeWidth="1.6" />
                <rect x="25" y="15" width="145" height="18" rx="10" fill="#E8F2FF" />
                <circle cx="37" cy="24" r="2.5" fill="#0066FF" />
                <circle cx="45" cy="24" r="2.5" fill="#38BDF8" />
                <circle cx="53" cy="24" r="2.5" fill="#93C5FD" />
                <rect x="36" y="44" width="58" height="42" rx="6" fill="#FFFFFF" stroke="#E2EEFE" />
                <path d="M44 76 L52 64 L62 70 L72 56 L82 76 Z" fill="#0066FF" fillOpacity="0.75" />
                <rect x="104" y="44" width="54" height="6" rx="3" fill="#0066FF" />
                <rect x="104" y="56" width="46" height="5" rx="2.5" fill="#CBDDF8" />
                <rect x="104" y="66" width="38" height="5" rx="2.5" fill="#CBDDF8" />
                <rect x="104" y="76" width="50" height="5" rx="2.5" fill="#CBDDF8" />
              </svg>
            </div>
          </div>
        </article>

        <article className="lg:col-span-7 relative overflow-hidden flex flex-col justify-between rounded-[30px] bg-gradient-to-br from-[#1258DB] via-[#104CC4] to-[#0A389C] p-7 sm:p-9 shadow-[0_18px_48px_-10px_rgba(16,76,196,0.38)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_-10px_rgba(16,76,196,0.52)] group">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-400/20 blur-2xl -z-10"
          />

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#08296B] text-white border border-[#164294] shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <MobileIcon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#08296B] border border-[#164294] px-3.5 py-1 text-[11.5px] font-semibold text-white">
                  Mobile App
                </span>
              </div>

              <h2 className="text-[20px] sm:text-[22px] font-extrabold tracking-[-0.015em] text-white">
                Pengembangan Aplikasi Mobile
              </h2>
              <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-blue-100/90">
                Pembuatan aplikasi Android dan iOS yang responsif, intuitif, dan
                terintegrasi dengan sistem bisnis dan API server perusahaan Anda.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Android & iOS",
                  "Push Notification",
                  "Integrasi Payment Gateway",
                  "Sinkronisasi Real-Time",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#08296B] border border-[#164294] px-3.5 py-1.5 text-[11.5px] font-semibold text-white transition-colors group-hover:bg-[#0D388E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 text-[13.5px] font-bold text-white hover:text-blue-200 transition-colors group/link"
                >
                  <span>Lihat detail</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1.5" />
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center pt-4 md:pt-0">
              <div className="relative w-full max-w-[220px] transition-transform duration-500 group-hover:scale-[1.05] group-hover:-translate-y-2 group-hover:rotate-1">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 rounded-full bg-cyan-400/25 blur-2xl -z-10"
                />

                <svg viewBox="0 0 240 320" fill="none" className="w-full h-auto drop-shadow-[0_20px_35px_rgba(3,20,68,0.5)]">
                  <rect
                    x="40"
                    y="20"
                    width="160"
                    height="280"
                    rx="28"
                    fill="#FFFFFF"
                    stroke="#CBDDF8"
                    strokeWidth="3.5"
                  />

                  <rect
                    x="48"
                    y="28"
                    width="144"
                    height="264"
                    rx="22"
                    fill="#0A2558"
                  />

                  <rect x="90" y="36" width="60" height="7" rx="3.5" fill="#1D4080" />
                  <circle cx="158" cy="39.5" r="2.5" fill="#3B82F6" />

                  <rect x="60" y="58" width="56" height="50" rx="10" fill="#1D4080" />
                  <rect x="124" y="58" width="56" height="50" rx="10" fill="#1D4080" />
                  <rect x="60" y="118" width="56" height="50" rx="10" fill="#1D4080" />
                  <rect x="124" y="118" width="56" height="50" rx="10" fill="#1D4080" />

                  <circle cx="88" cy="78" r="8" fill="#3B82F6" />
                  <circle cx="152" cy="78" r="8" fill="#38BDF8" />
                  <circle cx="88" cy="138" r="8" fill="#38BDF8" />
                  <circle cx="152" cy="138" r="8" fill="#3B82F6" />

                  <rect x="60" y="182" width="120" height="42" rx="10" fill="#13336B" />
                  <rect x="72" y="196" width="70" height="6" rx="3" fill="#60A5FA" />
                  <rect x="72" y="206" width="45" height="5" rx="2.5" fill="#3B82F6" />

                  <rect x="60" y="234" width="120" height="40" rx="10" fill="#13336B" />
                  <rect x="72" y="248" width="60" height="6" rx="3" fill="#60A5FA" />

                  <g className="transition-transform duration-500 group-hover:-translate-y-2">
                    <circle cx="28" cy="120" r="19" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2" className="drop-shadow-lg" />
                    <path d="M22 122 C22 117.5 25.5 114 30 114 C34.5 114 38 117.5 38 122 Z" fill="#FFFFFF" />
                    <circle cx="26" cy="119" r="1" fill="#0066FF" />
                    <circle cx="34" cy="119" r="1" fill="#0066FF" />
                    <line x1="24" y1="114" x2="21" y2="110" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="36" y1="114" x2="39" y2="110" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  </g>

                  <g className="transition-transform duration-500 group-hover:translate-y-2">
                    <circle cx="212" cy="190" r="19" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2" className="drop-shadow-lg" />
                    <path
                      d="M211 182 C212 180.5 213.5 180 214.5 180 C215 181 214.5 182.5 213.5 183 C212.8 183.5 211.5 183.2 211 182 Z M215.5 185 C217 185 218 186 218 187 C217 187.5 216.5 189 217.2 190.5 C218 192 217 194 216 195.5 C215.2 196.5 214.5 197 213.5 197 C212.5 197 212 196.2 211 196.2 C210 196.2 209.2 197 208.2 197 C207 197 206 195.8 205.2 194.5 C204 192.5 203.5 189.5 204.8 187.5 C205.5 186 207 185 208.5 185 C209.5 185 210.2 185.8 211 185.8 C211.8 185.8 212.5 185 213.5 185 Z"
                      fill="#FFFFFF"
                    />
                  </g>

                  <path
                    d="M15 155 C35 90, 205 70, 225 210"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    fill="none"
                    className="opacity-75"
                  />
                  <circle cx="130" cy="85" r="3" fill="#67E8F9" />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
