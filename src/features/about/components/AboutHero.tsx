import React from "react";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-[#F9FCFF] to-[#FFFFFF] dark:from-[#030711] dark:via-[#061231] dark:to-[#030711] py-14 sm:py-18 border-b border-[#E6F0FD] dark:border-blue-900/40">
      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
      >
        <circle
          cx="245"
          cy="15"
          r="140"
          fill="#DCEEFF"
          fillOpacity="0.7"
          className="dark:opacity-15"
        />
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
        <p className="nk-hero-enter text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
          TENTANG TIM KAMI
        </p>
        <h1 className="nk-hero-enter nk-hero-delay-1 mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42] dark:text-white">
          Mitra rekayasa digital untuk{" "}
          <span className="text-[#0066FF] dark:text-[#38BDF8]">
            pertumbuhan jangka panjang
          </span>
        </h1>
        <p className="nk-hero-enter nk-hero-delay-2 mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
          Mengenal lebih dekat filosofi kerja, standar teknis, dan tim di balik
          Next Karya Digital Solutions.
        </p>
      </div>
    </section>
  );
}
