import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { PORTFOLIO_TEASERS } from "../data/homeData";

export function PortfolioSection() {
  return (
    <section
      id="portofolio"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-[#F9FCFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
      >
        <circle
          cx="15"
          cy="15"
          r="135"
          fill="#DCEEFF"
          fillOpacity="0.7"
          className="dark:opacity-15"
        />
        <circle
          cx="15"
          cy="15"
          r="164"
          stroke="#1D7AFC"
          strokeOpacity="0.6"
          strokeWidth="1.3"
        />
        <circle cx="144.2" cy="116" r="5.5" fill="#0066FF" />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 h-[215px] w-[215px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
        <div className="text-center max-w-[740px] mx-auto">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
            STUDI KASUS &amp; KONSEP SOLUSI
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Gambaran implementasi{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">teknologi</span> pada{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">sektor bisnis</span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Contoh arsitektur proyek dan solusi digital yang kami rancang untuk
            memecahkan kendala operasional klien secara terukur.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-7 md:grid-cols-3">
          {PORTFOLIO_TEASERS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400 transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-[#EDF5FF] dark:bg-blue-950/70 px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF] dark:text-blue-300">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                  {item.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#EEF5FF] dark:bg-slate-800 px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558] dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E8F0FC] dark:border-slate-800/80">
                <div className="rounded-2xl bg-[#F4F8FF] dark:bg-slate-800/70 p-4 text-xs sm:text-[12.5px] text-[#4A5D78] dark:text-slate-300 border border-[#DCEBFE] dark:border-slate-700/60 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] dark:text-blue-400 mb-1">
                    <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>Dampak Bisnis</span>
                  </div>
                  {item.businessImpact}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
