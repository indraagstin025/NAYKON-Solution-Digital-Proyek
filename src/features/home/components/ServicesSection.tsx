import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SERVICES_TEASERS } from "../data/homeData";

export function ServicesSection() {
  return (
    <section
      id="layanan"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#F9FCFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
      >
        <circle
          cx="15"
          cy="15"
          r="145"
          fill="#DCEEFF"
          fillOpacity="0.7"
          className="dark:opacity-15"
        />
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
      />

      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
      >
        <circle
          cx="250"
          cy="250"
          r="130"
          fill="#DCEEFF"
          fillOpacity="0.7"
          className="dark:opacity-15"
        />
        <circle
          cx="250"
          cy="250"
          r="158"
          stroke="#1D7AFC"
          strokeOpacity="0.65"
          strokeWidth="1.3"
        />
        <circle cx="106.8" cy="183.2" r="5.5" fill="#0066FF" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
        <div className="text-center max-w-[740px] mx-auto">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
            LAYANAN UTAMA
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Spesialisasi rekayasa web dan{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">mobile</span> untuk
            <br className="hidden sm:inline" />{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">
              pertumbuhan bisnis
            </span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Dari website profil korporasi hingga sistem alur kerja terintegrasi, kami
            merancang dan mengembangkan produk digital yang siap digunakan jangka
            panjang.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-7 md:grid-cols-2">
          {SERVICES_TEASERS.map((service) => (
            <article
              key={service.id}
              className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                    {service.icon}
                  </div>
                  <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-4 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                <Link
                  href={service.linkHref}
                  className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] dark:text-blue-400 hover:text-[#0052CC] transition-colors group/link"
                >
                  <span>{service.linkText}</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
