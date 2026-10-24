import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  LayersIcon,
  GlobeIcon,
  MobileIcon,
  CheckCircledIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Portofolio & Studi Kasus - NAIKON Digital Solution",
  description:
    "Studi kasus dan konsep solusi implementasi teknologi web serta mobile NAIKON Digital Solution.",
};

export default function PortofolioPage() {
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
            className="pointer-events-none absolute top-0 right-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
          >
            <circle cx="245" cy="15" r="140" fill="#DCEEFF" fillOpacity="0.7" />
            <circle
              cx="245"
              cy="15"
              r="168"
              stroke="#1D7AFC"
              strokeOpacity="0.6"
              strokeWidth="1.3"
            />
            <circle cx="112.6" cy="118.5" r="5.5" fill="#0066FF" />
          </svg>

          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 text-center">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF]">
              PORTOFOLIO &amp; STUDI KASUS
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42]">
              Gambaran implementasi <span className="text-[#0066FF]">teknologi</span> pada{" "}
              <span className="text-[#0066FF]">sektor bisnis</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78]">
              Contoh arsitektur proyek dan solusi digital yang kami rancang untuk memecahkan
              kendala operasional klien secara terukur.
            </p>
          </div>
        </section>

        {/* ─── Case Studies Grid ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#F3F8FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
              {/* Case 1 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                      <LayersIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Aplikasi Web Internal
                    </span>
                  </div>

                  <h2 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Portal Operasional &amp; Inventaris
                  </h2>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Sistem dasbor terpusat untuk memantau stok multi-gudang, rekapitulasi
                    transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga
                    manajemen.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Next.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC]">
                  <div className="rounded-2xl bg-[#F4F8FF] p-4 text-xs sm:text-[12.5px] text-[#4A5D78] border border-[#DCEBFE] leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi
                    laporan operasional secara terpusat.
                  </div>
                </div>
              </article>

              {/* Case 2 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                      <GlobeIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Website Korporasi
                    </span>
                  </div>

                  <h2 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Portal Korporasi &amp; Katalog B2B
                  </h2>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Website profil perusahaan manufaktur dengan katalog produk digital
                    terstruktur, formulir permintaan penawaran harga, serta optimasi SEO
                    halaman spesifikasi.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["React", "SEO Engine", "Headless CMS"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC]">
                  <div className="rounded-2xl bg-[#F4F8FF] p-4 text-xs sm:text-[12.5px] text-[#4A5D78] border border-[#DCEBFE] leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Mempermudah eksplorasi katalog produk bagi mitra bisnis dan menertibkan
                    jalur penerimaan penawaran harga.
                  </div>
                </div>
              </article>

              {/* Case 3 */}
              <article className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                      <MobileIcon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-[#EDF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                      Aplikasi Mobile
                    </span>
                  </div>

                  <h2 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42]">
                    Aplikasi Pelacakan Distribusi
                  </h2>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Aplikasi mobile bagi armada pengiriman barang yang dilengkapi konfirmasi
                    tanda tangan digital penerima dan pembaruan rute pengantaran secara
                    langsung.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["iOS & Android", "REST API", "E-Signature"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#EEF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8F0FC]">
                  <div className="rounded-2xl bg-[#F4F8FF] p-4 text-xs sm:text-[12.5px] text-[#4A5D78] border border-[#DCEBFE] leading-relaxed">
                    <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] mb-1">
                      <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                      <span>Dampak Bisnis</span>
                    </div>
                    Memastikan bukti serah terima terdokumentasi rapi dan memangkas waktu
                    verifikasi armada di lapangan.
                  </div>
                </div>
              </article>
            </div>

            {/* Bottom Callout Banner */}
            <div className="mt-12 rounded-[24px] bg-white border border-[#E6F0FD] p-8 sm:p-10 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#041E42]">
                  Ingin mendiskusikan arsitektur proyek serupa untuk perusahaan Anda?
                </h3>
                <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#4A5D78]">
                  Tim NAIKON siap membantu memetakan kebutuhan fitur dan estimasi pengerjaan
                  secara transparan.
                </p>
              </div>
              <Link
                href="/kontak"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3 text-[13.5px] font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.02]"
              >
                <span>Konsultasikan Proyek</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
