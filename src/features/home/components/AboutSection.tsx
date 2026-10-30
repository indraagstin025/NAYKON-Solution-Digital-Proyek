import React from "react";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ABOUT_FEATURES } from "../data/homeData";

export function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF5FB] dark:from-[#030711] dark:via-[#002857]/20 dark:to-[#030711] py-16 sm:py-20 lg:py-24 border-t border-slate-200 dark:border-slate-800"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#005090]/5 dark:bg-[#002857]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0986C8]/5 dark:bg-[#005090]/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
        {/* Kolom Kiri: Logo, Badge, Judul, Deskripsi, dan Foto Tim */}
        <ScrollReveal direction="left" className="flex flex-col">
          <div className="mb-3.5">
            <Image
              src="/logo/logo-gabungan.png"
              alt="Next Karya Digital Solutions"
              width={260}
              height={82}
              className="h-[32px] sm:h-[36px] w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#005090] px-3.5 py-1 text-white shadow-sm w-fit">
            <span className="h-2 w-2 rounded-full bg-white shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              TENTANG TIM KAMI
            </span>
          </div>

          <h2 className="mt-4 text-[26px] sm:text-[32px] lg:text-[35px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Solusi digital yang dibangun
            <br className="hidden sm:inline" /> berdasarkan kebutuhan{" "}
            <span className="text-[#005090] dark:text-[#0986C8]">
              riil bisnis Anda.
            </span>
          </h2>

          <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
            Next Karya Digital Solutions adalah tim rekayasa web dan aplikasi yang berfokus
            pada hasil terukur. Tim kami merancang arsitektur website dan sistem yang
            cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara
            efisien.
          </p>

          <div className="relative mt-6 sm:mt-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#005090]/10 via-[#0986C8]/10 to-transparent blur-xl -z-10"
            />
            <div className="group relative w-full overflow-hidden rounded-[22px] border-[4px] border-white dark:border-slate-800 bg-white shadow-[0_18px_42px_-10px_rgba(10,35,80,0.13)] transition-all duration-300 hover:shadow-[0_24px_50px_-10px_rgba(0,80,144,0.18)]">
              <Image
                src="/team-naikon.jpg"
                alt="Tim programmer Next Karya Digital Solutions berkolaborasi merancang arsitektur sistem"
                width={960}
                height={680}
                className="h-[230px] sm:h-[270px] md:h-[290px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-[360px] rounded-xl border border-white/40 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 shadow-[0_10px_25px_-5px_rgba(10,35,80,0.18)] flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#005090] text-white shadow-xs">
                  <PersonIcon className="h-4.5 w-4.5" />
                </div>
                <div className="h-7 w-[1px] bg-[#CBD5E1] dark:bg-slate-700 shrink-0" />
                <div>
                  <p className="text-[10.5px] font-extrabold uppercase tracking-[0.05em] text-[#005090] dark:text-[#0986C8]">
                    KOMITMEN REKAYASA
                  </p>
                  <p className="text-[11px] leading-tight text-[#4A5D78] dark:text-slate-300 font-normal">
                    Tim kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Kolom Kanan: 4 Card Keunggulan dalam Grid 2x2 */}
        <ScrollReveal direction="right" className="flex items-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5">
            {ABOUT_FEATURES.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-800 p-4.5 sm:p-5 shadow-[0_4px_18px_-4px_rgba(0,40,87,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#005090] hover:shadow-[0_14px_30px_-8px_rgba(0,80,144,0.14)]"
              >
                <div>
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#005090] to-[#002857] text-white shadow-xs transition-transform duration-300 group-hover:scale-105 mb-3.5">
                    {item.icon}
                  </div>
                  <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#041E42] dark:text-white transition-colors duration-200 group-hover:text-[#005090] dark:group-hover:text-[#0986C8] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[12.5px] leading-[1.65] text-[#4A5D78] dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
