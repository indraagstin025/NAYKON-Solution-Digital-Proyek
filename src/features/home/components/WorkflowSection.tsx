import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WORKFLOW_STEPS } from "../data/homeData";

export function WorkflowSection() {
  return (
    <section
      id="alur"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EFF6FB] dark:from-[#030711] dark:via-[#061231] dark:to-[#08183A] py-16 sm:py-20 lg:py-24 border-t border-[#E2E8F0] dark:border-blue-900/30"
    >
      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
      >
        <circle
          cx="245"
          cy="15"
          r="135"
          fill="#0986C8"
          fillOpacity="0.05"
          className="dark:opacity-15"
        />
        <circle
          cx="245"
          cy="15"
          r="164"
          stroke="#005090"
          strokeOpacity="0.25"
          strokeWidth="1.3"
        />
        <circle cx="115.8" cy="116" r="5.5" fill="#005090" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
        <ScrollReveal className="text-center max-w-[740px] mx-auto">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#005090] dark:text-[#0986C8]">
            PROSES KERJA
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Tahapan kerja terstruktur dari{" "}
            <span className="text-[#005090] dark:text-[#0986C8]">perencanaan</span>{" "}
            hingga{" "}
            <span className="text-[#005090] dark:text-[#0986C8]">peluncuran</span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[650px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Tim kami menerapkan alur kerja yang transparan agar setiap proyek selesai
            tepat waktu dengan kualitas kode yang teruji.
          </p>
        </ScrollReveal>

        <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((step, idx) => (
            <ScrollReveal key={step.stepNumber} delayMs={idx * 80} className="h-full">
              <article className="relative overflow-hidden h-full flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#005090] dark:hover:border-blue-500 hover:shadow-[0_20px_44px_-10px_rgba(0,80,144,0.14)] group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#005090] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                    <span className="rounded-full bg-[#005090] text-white px-3.5 py-1 text-[11.5px] font-bold shadow-sm">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#041E42] dark:text-white transition-colors duration-200 group-hover:text-[#005090] dark:group-hover:text-[#0986C8]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#005090] dark:text-[#0986C8]">
                  <span>{step.milestone}</span>
                  <span className="text-[#4A5D78] dark:text-slate-400 font-bold">
                    {step.stepNumber}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-1 w-0 bg-[#005090] transition-all duration-300 group-hover:w-full"
                />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
