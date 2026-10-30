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

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
        <ScrollReveal direction="left" className="relative flex items-center justify-center py-6 sm:py-8">
          <svg
            viewBox="0 0 620 560"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 w-[114%] h-[112%] -z-10"
          >
            <defs>
              <linearGradient id="aboutAuraCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2EEF8" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#EEF5FA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D5E6F5" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="aboutOrbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0986C8" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#005090" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#002857" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            <circle
              cx="260"
              cy="280"
              r="225"
              fill="url(#aboutAuraCircle)"
              className="dark:opacity-20"
            />

            <g transform="rotate(-22 285 280)">
              <ellipse
                cx="285"
                cy="280"
                rx="268"
                ry="225"
                stroke="url(#aboutOrbitStroke)"
                strokeWidth="1.4"
              />
              <circle cx="105.7" cy="112.8" r="7" fill="#005090" />
              <circle cx="464.3" cy="447.2" r="4.5" fill="#0986C8" />
            </g>
          </svg>

          <div className="group relative w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white dark:border-slate-800 bg-white shadow-[0_22px_50px_-12px_rgba(10,35,80,0.15)] transition-shadow duration-300 group-hover:shadow-[0_28px_60px_-12px_rgba(0,80,144,0.18)]">
              <Image
                src="/team-naikon.jpg"
                alt="Tim programmer Next Karya Digital Solutions berkolaborasi merancang arsitektur sistem"
                width={960}
                height={680}
                className="h-[310px] sm:h-[380px] md:h-[410px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>

            <div className="relative sm:absolute -bottom-5 left-0 sm:-left-3 mt-4 sm:mt-0 w-full sm:w-[82%] max-w-[390px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 shadow-[0_16px_38px_-8px_rgba(10,35,80,0.14)] flex items-center gap-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#005090]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#005090] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                <PersonIcon className="h-5 w-5" />
              </div>
              <div className="h-9 w-[1px] bg-[#CBD5E1] dark:bg-slate-700 shrink-0" />
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#005090] dark:text-[#0986C8]">
                  KOMITMEN REKAYASA
                </p>
                <p className="mt-0.5 text-xs sm:text-[12.5px] leading-snug text-[#4A5D78] dark:text-slate-300 font-normal">
                  Tim kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis Anda.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right">
          <div className="mb-4">
            <Image
              src="/logo/logo-gabungan.png"
              alt="Next Karya Digital Solutions"
              width={260}
              height={82}
              className="h-[32px] sm:h-[38px] w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#005090] px-3.5 py-1 text-white shadow-sm">
            <span className="h-2 w-2 rounded-full bg-white shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              TENTANG TIM KAMI
            </span>
          </div>

          <h2 className="mt-4 text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Solusi digital yang dibangun
            <br className="hidden sm:inline" /> berdasarkan kebutuhan{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#005090] dark:text-[#0986C8]">
              riil bisnis Anda.
            </span>
          </h2>

          <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
            Next Karya Digital Solutions adalah tim rekayasa web dan aplikasi yang berfokus
            pada hasil terukur. Tim kami merancang arsitektur website dan sistem yang
            cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara
            efisien.
          </p>

          <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {ABOUT_FEATURES.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-[0_4px_16px_-4px_rgba(0,40,87,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#005090] hover:shadow-[0_12px_26px_-8px_rgba(0,80,144,0.14)]"
              >
                <div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#005090] to-[#002857] text-white shadow-xs transition-transform duration-300 group-hover:scale-105 mb-3.5">
                    {item.icon}
                  </div>
                  <h3 className="text-[13.5px] sm:text-[14px] font-bold text-[#041E42] dark:text-white transition-colors duration-200 group-hover:text-[#005090] dark:group-hover:text-[#0986C8] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[12.5px] leading-[1.6] text-[#4A5D78] dark:text-slate-300">
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
