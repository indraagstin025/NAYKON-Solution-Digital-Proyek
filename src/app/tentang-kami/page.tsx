import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  PersonIcon,
  TargetIcon,
  CodeIcon,
  CheckCircledIcon,
  RocketIcon,
  LightningBoltIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Tentang Kami - NAIKON Digital Solution",
  description:
    "Profil perusahaan, visi rekayasa perangkat lunak, dan komitmen kualitas tim NAIKON Digital Solution.",
};

export default function TentangKamiPage() {
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
              PROFIL PERUSAHAAN
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42]">
              Mitra rekayasa digital untuk{" "}
              <span className="text-[#0066FF]">pertumbuhan jangka panjang</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78]">
              Mengenal lebih dekat filosofi kerja, standar teknis, dan tim di balik
              NAIKON Digital Solution.
            </p>
          </div>
        </section>

        {/* ─── Core Profile Section ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#F4F9FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
            {/* Left Photo & Floating Card */}
            <div className="relative flex items-center justify-center py-4">
              <div className="relative w-full max-w-[520px]">
                <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white bg-white shadow-[0_22px_50px_-12px_rgba(10,35,80,0.15)]">
                  <Image
                    src="/team-naikon.jpg"
                    alt="Tim programmer NAIKON Digital Solution"
                    width={960}
                    height={680}
                    className="h-[310px] sm:h-[380px] w-full object-cover"
                  />
                </div>

                <div className="relative sm:absolute -bottom-5 left-0 sm:-left-3 mt-4 sm:mt-0 w-full sm:w-[82%] max-w-[390px] rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_16px_38px_-8px_rgba(10,35,80,0.14)] flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066FF]">
                    <PersonIcon className="h-5 w-5" />
                  </div>
                  <div className="h-9 w-[1px] bg-[#CBD5E1] shrink-0" />
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#0066FF]">
                      KOMITMEN REKAYASA
                    </p>
                    <p className="mt-0.5 text-xs sm:text-[12.5px] leading-snug text-[#4A5D78]">
                      Kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis
                      Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Description */}
            <div>
              <h2 className="text-[24px] sm:text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#041E42]">
                Solusi digital yang dibangun berdasarkan kebutuhan{" "}
                <span className="text-[#0066FF]">riil bisnis Anda.</span>
              </h2>
              <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78]">
                NAIKON Digital Solution adalah mitra rekayasa perangkat lunak dan website
                yang berfokus pada hasil terukur. Kami merancang arsitektur sistem yang
                cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara
                efisien.
              </p>

              <div className="mt-6 divide-y divide-[#D8E6F8]">
                <div className="py-4 first:pt-2 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF]">
                    <TargetIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42]">
                      Pendekatan Berbasis Solusi Nyata
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580]">
                      Kami memahami kebutuhan bisnis Anda dan menghadirkan solusi yang
                      tepat, terukur, dan berdampak.
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF]">
                    <CodeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42]">
                      Standar Kode Teruji &amp; Skalabilitas Tinggi
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580]">
                      Menggunakan teknologi modern dengan kode berkualitas yang aman dan
                      mudah dikembangkan.
                    </p>
                  </div>
                </div>

                <div className="py-4 last:pb-0 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF]">
                    <CheckCircledIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-base font-bold text-[#041E42]">
                      Transparansi Biaya &amp; Garansi Purnajual
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580]">
                      Biaya jelas sejak awal dan dukungan penuh setelah implementasi untuk
                      memastikan solusi berjalan optimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Visi, Misi & Nilai Inti Placeholder Cards ─── */}
          <div className="mx-auto mt-16 w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] mb-4">
                  <RocketIcon className="h-6 w-6" />
                </div>
                <h3 className="text-[18px] font-extrabold text-[#041E42]">Visi Perusahaan</h3>
                <p className="mt-2 text-[13.5px] leading-[1.68] text-[#4A5D78]">
                  Menjadi mitra rekayasa teknologi pilihan utama bagi korporasi dan bisnis di
                  Indonesia dalam mengakselerasi inovasi digital yang berkelanjutan.
                </p>
              </article>

              <article className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] mb-4">
                  <LightningBoltIcon className="h-6 w-6" />
                </div>
                <h3 className="text-[18px] font-extrabold text-[#041E42]">Misi Rekayasa</h3>
                <p className="mt-2 text-[13.5px] leading-[1.68] text-[#4A5D78]">
                  Membangun perangkat lunak berstandar industri yang cepat, aman, dan mudah
                  dikelola dengan komunikasi proyek yang terbuka di setiap tahapan.
                </p>
              </article>

              <article className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)] flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] mb-4">
                    <CheckCircledIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-[18px] font-extrabold text-[#041E42]">
                    Siap Berkolaborasi?
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.68] text-[#4A5D78]">
                    Diskusikan rencana pengembangan website atau sistem internal perusahaan
                    Anda bersama tim teknis NAIKON.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC]"
                  >
                    <span>Hubungi Tim Kami</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
