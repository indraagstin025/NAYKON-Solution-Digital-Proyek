import React from "react";

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8FAFC] dark:bg-[#030711] py-14 sm:py-18 border-b border-[#E2E8F0] dark:border-blue-900/40">

      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 text-center">
        <p className="nk-hero-enter text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#005090] dark:text-[#0986C8]">
          LAYANAN &amp; PAKET INVESTASI
        </p>
        <h1 className="nk-hero-enter nk-hero-delay-1 mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42] dark:text-white">
          Spesialisasi rekayasa web dan{" "}
          <span className="text-[#005090] dark:text-[#0986C8]">mobile</span> untuk
          <br className="hidden sm:inline" />{" "}
          <span className="text-[#005090] dark:text-[#0986C8]">pertumbuhan bisnis</span>
        </h1>
        <p className="nk-hero-enter nk-hero-delay-2 mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
          Dari website profil bisnis hingga sistem alur kerja terintegrasi, tim kami
          merancang dan mengembangkan produk digital yang siap digunakan jangka panjang
          dengan estimasi investasi yang transparan.
        </p>
      </div>
    </section>
  );
}
