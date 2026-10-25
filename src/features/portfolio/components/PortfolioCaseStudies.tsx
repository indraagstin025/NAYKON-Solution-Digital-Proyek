"use client";

import React, { useState } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { PORTFOLIO_CASES } from "../data/portfolioData";

type CategoryFilter = "all" | "webapp" | "website" | "mobile";

export function PortfolioCaseStudies() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filterTabs: { label: string; value: CategoryFilter }[] = [
    { label: "Semua Proyek", value: "all" },
    { label: "Aplikasi Web & Dasbor", value: "webapp" },
    { label: "Website Korporasi", value: "website" },
    { label: "Aplikasi Mobile", value: "mobile" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? PORTFOLIO_CASES
      : PORTFOLIO_CASES.filter((item) => item.categorySlug === activeCategory);

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveCategory(tab.value)}
            className={`rounded-full px-4 py-2 text-xs sm:text-[13px] font-semibold transition-all duration-200 ${
              activeCategory === tab.value
                ? "bg-[#0066FF] text-white shadow-[0_6px_18px_-3px_rgba(0,102,255,0.4)]"
                : "bg-white text-[#4A5D78] border border-[#DCEBFE] hover:border-[#0066FF]/40 hover:text-[#0066FF]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
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

              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                {item.clientSector}
              </p>

              <h2 className="mt-1 text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] leading-snug">
                {item.title}
              </h2>
              <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
                {item.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-[#0A2558] border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
              <div className="rounded-2xl bg-[#F4F8FF] p-3.5 text-xs text-[#4A5D78] border border-[#DCEBFE] leading-relaxed">
                <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] mb-0.5">
                  <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>Dampak Bisnis</span>
                </div>
                {item.impact}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
