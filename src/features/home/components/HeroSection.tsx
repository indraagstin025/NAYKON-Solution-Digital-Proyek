import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { HERO_HIGHLIGHTS } from "../data/homeData";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative isolate overflow-hidden pt-[68px] lg:pt-[76px] bg-gradient-to-b from-[#F8FBFF] via-[#FFFFFF] to-[#F3F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] min-h-[auto] lg:min-h-dvh flex items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[115px] sm:h-[155px] lg:h-[190px] w-full overflow-hidden -z-10"
      >
        <svg
          viewBox="0 0 1440 240"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full opacity-95 dark:opacity-25"
        >
          <path
            d="M0 75 C210 95, 370 185, 620 220 C880 250, 1180 140, 1440 70 L1440 240 L0 240 Z"
            fill="url(#heroWaveBack)"
          />
          <path
            d="M0 110 C180 125, 310 190, 490 240 L0 240 Z"
            fill="url(#heroWaveLeft)"
          />
          <path
            d="M860 240 C1060 215, 1250 135, 1440 95 L1440 240 Z"
            fill="url(#heroWaveRight)"
          />
          <defs>
            <linearGradient id="heroWaveBack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4E1FF" stopOpacity="0.65" />
              <stop offset="48%" stopColor="#E5F2FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D2E8FF" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="heroWaveLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8EC5FF" stopOpacity="0.78" />
              <stop offset="65%" stopColor="#BADBFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#E1F0FF" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="heroWaveRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C8E3FF" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#EDF6FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 py-10 sm:py-14 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="max-w-[530px]">
            <h1 className="nk-hero-enter text-[33px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#041E42] dark:text-[#f4f8ff]">
              Inovasi teknologi.
              <br />
              <span className="sm:whitespace-nowrap">
                Dampak yang{" "}
                <span className="text-[#0066FF] dark:text-[#38BDF8]">
                  nyata.
                </span>
              </span>
            </h1>

            <p className="nk-hero-enter nk-hero-delay-1 mt-4 max-w-[465px] text-[13.5px] sm:text-[15px] leading-[1.65] text-[#4A5D78] dark:text-[#b5c5dd] font-normal">
              NAIKON Digital Solution adalah tim rekayasa website dan aplikasi yang
              merancang solusi digital cerdas untuk membantu bisnis Anda tumbuh,
              beradaptasi, dan melangkah lebih jauh.
            </p>

            <div className="nk-hero-enter nk-hero-delay-2 mt-6 flex flex-wrap items-center gap-3.5">
              <Link
                href="/kontak"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3 text-[13.5px] font-semibold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-5px_rgba(0,102,255,0.55)] active:scale-[0.98]"
              >
                <span>Mulai Berkolaborasi</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portofolio"
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#0066FF] bg-white hover:bg-[#0066FF] hover:text-white px-6 py-3 text-[13.5px] font-semibold text-[#0066FF] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] dark:bg-slate-900 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-[#0066FF] dark:hover:text-white"
              >
                Lihat Portofolio
              </Link>
            </div>

            <div className="nk-hero-enter nk-hero-delay-3 mt-9 sm:mt-11 flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-5">
              {HERO_HIGHLIGHTS.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && (
                    <div className="hidden sm:block h-6 w-[1px] bg-[#CBD5E1] dark:bg-slate-700/80" />
                  )}
                  <div className="group flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-[12.5px] font-semibold text-[#0A192F] dark:text-slate-200">
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="nk-hero-enter nk-hero-delay-2 group relative flex items-center justify-center w-full max-w-[550px] mx-auto min-h-[280px] sm:min-h-[360px] lg:min-h-[430px]">
            <svg
              viewBox="0 0 700 540"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            >
              <defs>
                <linearGradient id="heroAuraOval" x1="15%" y1="5%" x2="85%" y2="95%">
                  <stop offset="0%" stopColor="#D6EBFF" stopOpacity="0.72" />
                  <stop offset="55%" stopColor="#EBF5FF" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="#B8DCFF" stopOpacity="0.58" />
                </linearGradient>

                <radialGradient id="heroBottomGlow" cx="52%" cy="76%" r="38%">
                  <stop offset="0%" stopColor="#9ED0FF" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="primaryOrbitStroke" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6DB1FF" stopOpacity="0.45" />
                  <stop offset="45%" stopColor="#2B86FF" stopOpacity="0.75" />
                  <stop offset="80%" stopColor="#0066FF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6DB1FF" stopOpacity="0.5" />
                </linearGradient>

                <linearGradient id="innerOrbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A6D1FF" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#DCEEFF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8BC2FF" stopOpacity="0.5" />
                </linearGradient>

                <radialGradient id="iceSphere3D" cx="72%" cy="72%" r="68%" fx="72%" fy="72%">
                  <stop offset="0%" stopColor="#F5FAFF" />
                  <stop offset="52%" stopColor="#D4E8FF" />
                  <stop offset="100%" stopColor="#B5D6FC" />
                </radialGradient>
              </defs>

              <g transform="rotate(-22 350 270)">
                <ellipse
                  cx="350"
                  cy="270"
                  rx="295"
                  ry="220"
                  fill="url(#heroAuraOval)"
                  className="dark:opacity-25"
                />
              </g>

              <ellipse
                cx="355"
                cy="380"
                rx="215"
                ry="115"
                fill="url(#heroBottomGlow)"
                className="dark:opacity-30"
              />

              <g transform="rotate(-19 350 270)">
                <ellipse
                  cx="350"
                  cy="270"
                  rx="288"
                  ry="202"
                  stroke="url(#innerOrbitStroke)"
                  strokeWidth="1.2"
                />
              </g>

              <g transform="rotate(-14 350 270)">
                <ellipse
                  cx="350"
                  cy="270"
                  rx="318"
                  ry="198"
                  stroke="url(#primaryOrbitStroke)"
                  strokeWidth="1.6"
                />
                <circle cx="600.6" cy="148.1" r="10.5" fill="#0066FF" />
                <circle cx="99.4" cy="391.9" r="5.5" fill="#0066FF" />
              </g>

              <circle
                cx="630"
                cy="392"
                r="27"
                fill="url(#iceSphere3D)"
                className="dark:opacity-35"
              />
            </svg>

            <div className="relative z-10 w-[63%] sm:w-[65%] max-w-[345px] transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1">
              <Image
                src="/logo-hero.png"
                alt="NAIKON Digital Solution - Mengakselerasi Inovasi, Mewujudkan Karya Digital"
                width={960}
                height={196}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_10px_24px_rgba(0,60,150,0.06)] dark:brightness-150"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
