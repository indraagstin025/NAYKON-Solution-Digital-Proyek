import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ReaderIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  CodeIcon,
  LightningBoltIcon,
  LayersIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Blog & Wawasan Teknologi - NAIKON Digital Solution",
  description:
    "Artikel, panduan teknis, dan wawasan seputar rekayasa website, aplikasi mobile, dan transformasi digital bisnis.",
};

const BLOG_PREVIEWS = [
  {
    category: "Arsitektur Web",
    title: "Mengapa Kecepatan Loading Website Sangat Menentukan Konversi Bisnis B2B",
    excerpt:
      "Memahami bagaimana performa Core Web Vitals dan arsitektur frontend modern berdampak langsung pada kredibilitas perusahaan di mata calon klien.",
    date: "Segera Hadir",
    readTime: "5 Menit Baca",
    icon: LightningBoltIcon,
  },
  {
    category: "Sistem Internal",
    title: "Kapan Perusahaan Anda Perlu Beralih dari Spreadsheet ke Dashboard Kustom?",
    excerpt:
      "Tanda-tanda operasional bisnis mulai membutuhkan sistem terpusat untuk menghindari duplikasi data dan mempercepat laporan lintas cabang.",
    date: "Segera Hadir",
    readTime: "6 Menit Baca",
    icon: LayersIcon,
  },
  {
    category: "Rekayasa Perangkat Lunak",
    title: "Panduan Memilih Teknologi Website Korporasi yang Aman dan Mudah Dikembangkan",
    excerpt:
      "Hal-hal teknis yang perlu diperhatikan manajemen saat merencanakan pembangunan ulang website agar investasi digital bertahan jangka panjang.",
    date: "Segera Hadir",
    readTime: "7 Menit Baca",
    icon: CodeIcon,
  },
];

export default function BlogPage() {
  return (
    <div id="nk-site" className="site-wrap min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[68px] lg:pt-[76px]">
        {/* ─── Page Hero Header ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-[#F9FCFF] to-[#FFFFFF] py-14 sm:py-18 border-b border-[#E6F0FD]">
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
          >
            <circle cx="15" cy="15" r="145" fill="#DCEEFF" fillOpacity="0.7" />
            <circle
              cx="15"
              cy="15"
              r="172"
              stroke="#1D7AFC"
              strokeOpacity="0.65"
              strokeWidth="1.3"
            />
            <circle cx="154.2" cy="116.1" r="5.5" fill="#0066FF" />
          </svg>

          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 text-center">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF]">
              BLOG &amp; WAWASAN TEKNOLOGI
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42]">
              Catatan rekayasa &amp;{" "}
              <span className="text-[#0066FF]">strategi produk digital</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78]">
              Kumpulan pembahasan seputar pengembangan web, efisiensi sistem operasional, dan
              praktik terbaik teknologi untuk pertumbuhan bisnis.
            </p>
          </div>
        </section>

        {/* ─── Blog Cards Preview Grid ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#F3F8FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
              {BLOG_PREVIEWS.map((post) => {
                const IconComponent = post.icon;
                return (
                  <article
                    key={post.title}
                    className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className="rounded-full bg-[#EDF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-[17px] sm:text-[18.5px] font-extrabold leading-snug tracking-[-0.015em] text-[#041E42]">
                        {post.title}
                      </h2>
                      <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E8F0FC] flex items-center justify-between text-xs text-[#5A6E8C]">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#0066FF]">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Info Box: Konten Lengkap Segera Hadir */}
            <div className="mt-12 rounded-[24px] bg-[#F4F8FF] border border-[#DCEBFE] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                  <ReaderIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#041E42]">
                    Ruang Artikel &amp; Dokumentasi Teknis NAIKON
                  </h3>
                  <p className="mt-1 text-[13px] sm:text-[13.5px] text-[#4A5D78]">
                    Halaman ini telah disiapkan untuk publikasi artikel lengkap, wawasan
                    industri, dan pembaruan produk NAIKON Digital Solution.
                  </p>
                </div>
              </div>
              <Link
                href="/kontak"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-sm transition-all"
              >
                <span>Diskusi Langsung</span>
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
