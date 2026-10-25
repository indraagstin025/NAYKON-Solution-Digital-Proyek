import React from "react";
import Link from "next/link";
import { CheckCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PRICING_PLANS } from "../data/homeData";

export function PricingSection() {
  return (
    <section
      id="paket"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F7FAFF] via-[#FFFFFF] to-[#F5F9FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-[210px] w-[210px] rounded-full bg-[#DCEEFF]/70 dark:bg-blue-900/15 -z-10"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
        <div className="text-center max-w-[760px] mx-auto">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
            PAKET LAYANAN &amp; INVESTASI
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Pilihan paket solusi digital terukur{" "}
            <br className="hidden sm:inline" />
            untuk{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">
              kebutuhan bisnis Anda
            </span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[660px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Biaya pasti sejak awal tanpa biaya tersembunyi, dengan pengerjaan terstruktur,
            dukungan teknis penuh, serta garansi pasca-peluncuran.
          </p>
        </div>

        <div className="mt-12 sm:mt-14 grid gap-8 lg:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-[26px] p-7 sm:p-8 transition-all duration-300 ${
                plan.isRecommended
                  ? "bg-white dark:bg-slate-900 border-2 border-[#0066FF] shadow-[0_22px_50px_-12px_rgba(0,102,255,0.22)] lg:-translate-y-2"
                  : "bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] hover:-translate-y-1"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-block rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      plan.isRecommended
                        ? "bg-[#0066FF] text-white shadow-md"
                        : "bg-[#EDF5FF] text-[#0066FF] border border-[#CDE2FF] dark:bg-slate-800 dark:border-slate-700 dark:text-blue-300"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#041E42] dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#4A5D78] dark:text-slate-300 min-h-[48px]">
                  {plan.description}
                </p>

                <div className="mt-6 pt-5 pb-6 border-y border-[#E8F0FC] dark:border-slate-800">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#7388A6] dark:text-slate-400">
                    {plan.priceLabel}
                  </span>
                  <div className="mt-1 text-[28px] sm:text-[32px] font-extrabold text-[#0066FF] dark:text-[#38BDF8] tracking-tight">
                    {plan.price}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#041E42] dark:text-slate-200">
                    Fitur &amp; Cakupan Layanan:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] text-[#4A5D78] dark:text-slate-300">
                        <CheckCircledIcon className="h-4 w-4 shrink-0 text-[#0066FF] dark:text-blue-400 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaHref}
                  className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-bold transition-all ${
                    plan.isRecommended
                      ? "bg-[#0066FF] text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] hover:bg-[#0052CC] hover:scale-[1.01]"
                      : "bg-[#F0F6FF] text-[#0066FF] hover:bg-[#E3EFFF] dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
