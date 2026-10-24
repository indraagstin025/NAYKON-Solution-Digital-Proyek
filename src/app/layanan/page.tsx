import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  GlobeIcon,
  UpdateIcon,
  CodeIcon,
  MobileIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  LayoutIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Layanan Utama - NAIKON Digital Solution",
  description:
    "Layanan pembuatan website bisnis, redesign website, aplikasi web kustom, dan pengembangan aplikasi mobile Android & iOS.",
};

export default function LayananPage() {
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
              LAYANAN UTAMA
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42]">
              Spesialisasi rekayasa web dan{" "}
              <span className="text-[#0066FF]">mobile</span> untuk
              <br className="hidden sm:inline" />{" "}
              <span className="text-[#0066FF]">pertumbuhan bisnis</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78]">
              Dari website profil korporasi hingga sistem alur kerja terintegrasi, kami
              merancang dan mengembangkan produk digital yang siap digunakan jangka panjang.
            </p>
          </div>
        </section>

        {/* ─── 2x2 Service Cards Section ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7FAFF] to-[#F3F8FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            <div className="grid gap-6 lg:gap-7 md:grid-cols-2">
              {/* Service 1 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] transition-transform duration-300 group-hover:scale-105">
                      <GlobeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-4 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Website
                    </span>
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Pembuatan Website Bisnis
                  </h2>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Website korporasi dan landing page yang berfokus pada kredibilitas,
                    konversi, dan pengalaman pengguna.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Company Profile", "Landing Page", "Optimasi SEO", "Panel Admin / CMS"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558]"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Pembuatan Web</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 2 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] transition-transform duration-300 group-hover:scale-105">
                      <UpdateIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-4 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Penyegaran
                    </span>
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Redesign &amp; Optimalisasi Website
                  </h2>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Memodernisasi tampilan dan kode website lama yang lambat, tidak responsif,
                    atau usang menjadi antarmuka modern dengan skor kecepatan Google PageSpeed
                    tinggi.
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
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Redesign</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 3 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] transition-transform duration-300 group-hover:scale-105">
                      <CodeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-4 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Sistem Web
                    </span>
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Aplikasi Web &amp; Dashboard Kustom
                  </h2>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
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
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Web App</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>

              {/* Service 4 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] transition-transform duration-300 group-hover:scale-105">
                      <MobileIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-4 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Mobile App
                    </span>
                  </div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Pengembangan Aplikasi Mobile
                  </h2>
                  <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
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
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
                  >
                    <span>Konsultasi Mobile App</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </div>

            {/* ─── Alur Kerja Ringkas ─── */}
            <div className="mt-16 pt-14 border-t border-[#DCEBFE]">
              <div className="text-center max-w-[680px] mx-auto mb-10">
                <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF]">
                  PROSES KERJA
                </p>
                <h2 className="mt-2.5 text-[24px] sm:text-[32px] font-extrabold text-[#041E42]">
                  Tahapan kerja dari <span className="text-[#0066FF]">perencanaan</span> hingga{" "}
                  <span className="text-[#0066FF]">peluncuran</span>
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "Tahap 01",
                    title: "Discovery & Spesifikasi",
                    desc: "Pemetaan tujuan bisnis, spesifikasi fitur, dan estimasi jadwal pengerjaan.",
                    icon: MagnifyingGlassIcon,
                  },
                  {
                    step: "Tahap 02",
                    title: "Desain UI/UX & Alur",
                    desc: "Penyusunan wireframe dan prototipe interaktif sebelum tahap penulisan kode.",
                    icon: LayoutIcon,
                  },
                  {
                    step: "Tahap 03",
                    title: "Rekayasa Kode & QA",
                    desc: "Pengembangan berstandar bersih, integrasi API, dan pengujian lintas perangkat.",
                    icon: CodeIcon,
                  },
                  {
                    step: "Tahap 04",
                    title: "Deployment & Garansi",
                    desc: "Peluncuran ke server produksi disertai pelatihan tim dan garansi pemeliharaan.",
                    icon: RocketIcon,
                  },
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-[#EDF5FF] px-3 py-1 text-[11px] font-bold text-[#0066FF]">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-extrabold text-[#041E42]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#4A5D78]">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
