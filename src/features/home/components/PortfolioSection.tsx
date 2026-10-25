"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PORTFOLIO_TEASERS } from "../data/homeData";

type CategoryFilter = "all" | "webapp" | "website" | "mobile";

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filterTabs: { label: string; value: CategoryFilter }[] = [
    { label: "Semua Proyek", value: "all" },
    { label: "Aplikasi Web & Dasbor", value: "webapp" },
    { label: "Website Bisnis", value: "website" },
    { label: "Aplikasi Mobile", value: "mobile" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_TEASERS
      : PORTFOLIO_TEASERS.filter((item) => item.categorySlug === activeCategory);

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
            Portofolio rekayasa{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">solusi digital</span> dan{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">dampak nyata</span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Gambaran implementasi arsitektur sistem, aplikasi web, dan mobile yang kami rancang
            untuk memecahkan kendala operasional klien secara terukur.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveCategory(tab.value)}
                className={`rounded-full px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all duration-200 ${
                  activeCategory === tab.value
                    ? "bg-[#0066FF] text-white shadow-[0_6px_18px_-3px_rgba(0,102,255,0.4)]"
                    : "bg-white text-[#4A5D78] border border-[#DCEBFE] hover:border-[#0066FF]/40 hover:text-[#0066FF] dark:bg-slate-900/90 dark:text-slate-300 dark:border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-[#0066FF] text-white px-3.5 py-1 text-[11px] font-bold shadow-sm">
                    {item.metric}
                  </span>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] dark:text-blue-400">
                  {item.clientSector}
                </p>

                <h3 className="mt-1 text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[11px] font-semibold text-[#0A2558] dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800/80">
                <div className="rounded-2xl bg-[#F4F8FF] dark:bg-slate-800/70 p-3.5 text-xs text-[#4A5D78] dark:text-slate-300 border border-[#DCEBFE] dark:border-slate-700/60 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] dark:text-blue-400 mb-0.5">
                    <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>Dampak Bisnis</span>
                  </div>
                  {item.businessImpact}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portofolio"
            className="inline-flex items-center gap-2 rounded-full border border-[#0066FF] bg-white px-6 py-3 text-[13.5px] font-bold text-[#0066FF] shadow-sm transition-all hover:bg-blue-50/80 hover:scale-[1.02] dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-blue-400"
          >
            <span>Eksplorasi Seluruh Studi Kasus</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
