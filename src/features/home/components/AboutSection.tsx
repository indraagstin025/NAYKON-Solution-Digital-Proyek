import React from "react";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";
import { ABOUT_FEATURES } from "../data/homeData";

export function AboutSection() {
  return (
    <section
      id="tentang"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F7FAFF] via-[#FFFFFF] to-[#F5F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-16 h-[220px] w-[220px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
        <div className="relative flex items-center justify-center py-6 sm:py-8">
          <svg
            viewBox="0 0 620 560"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 w-[114%] h-[112%] -z-10"
          >
            <defs>
              <linearGradient id="aboutAuraCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D6EBFF" stopOpacity="0.65" />
                <stop offset="60%" stopColor="#EAF4FF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#C4E1FF" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="aboutOrbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1D7AFC" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#7FB8FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0.7" />
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
              <circle cx="105.7" cy="112.8" r="7" fill="#0066FF" />
              <circle cx="464.3" cy="447.2" r="4.5" fill="#0066FF" />
            </g>
          </svg>

          <div className="relative w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white dark:border-slate-800 bg-white shadow-[0_22px_50px_-12px_rgba(10,35,80,0.15)]">
              <Image
                src="/team-naikon.jpg"
                alt="Tim programmer NAIKON Digital Solution berkolaborasi merancang arsitektur sistem"
                width={960}
                height={680}
                className="h-[310px] sm:h-[380px] md:h-[410px] w-full object-cover"
              />
            </div>

            <div className="relative sm:absolute -bottom-5 left-0 sm:-left-3 mt-4 sm:mt-0 w-full sm:w-[82%] max-w-[390px] rounded-2xl border border-slate-100 dark:border-slate-700/70 bg-white dark:bg-slate-900 px-5 py-4 shadow-[0_16px_38px_-8px_rgba(10,35,80,0.14)] flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#0066FF] dark:bg-blue-950 dark:text-blue-400">
                <PersonIcon className="h-5 w-5" />
              </div>
              <div className="h-9 w-[1px] bg-[#CBD5E1] dark:bg-slate-700 shrink-0" />
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#0066FF] dark:text-blue-400">
                  KOMITMEN REKAYASA
                </p>
                <p className="mt-0.5 text-xs sm:text-[12.5px] leading-snug text-[#4A5D78] dark:text-slate-300 font-normal">
                  Kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <Image
              src="/logo-navbar.png"
              alt="NAIKON Digital Solution"
              width={220}
              height={46}
              className="h-[30px] sm:h-[34px] w-auto object-contain dark:brightness-150"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#E6F1FF] dark:bg-blue-950/80 px-3.5 py-1 border border-[#CDE2FF]/80 dark:border-blue-800/50">
            <span className="h-2 w-2 rounded-full bg-[#0066FF] dark:bg-[#38BDF8] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0066FF] dark:text-blue-400">
              PROFIL PERUSAHAAN
            </span>
          </div>

          <h2 className="mt-4 text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Solusi digital yang dibangun
            <br className="hidden sm:inline" /> berdasarkan kebutuhan{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#0066FF] dark:text-[#38BDF8]">
              riil bisnis Anda.
            </span>
          </h2>

          <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
            NAIKON Digital Solution adalah mitra rekayasa perangkat lunak dan website yang berfokus pada hasil terukur. Kami merancang arsitektur sistem yang cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara efisien.
          </p>

          <div className="mt-6 divide-y divide-[#D8E6F8] dark:divide-slate-800">
            {ABOUT_FEATURES.map((item) => (
              <div key={item.title} className="py-4 first:pt-2 last:pb-0 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6F1FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-base font-bold text-[#041E42] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580] dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
