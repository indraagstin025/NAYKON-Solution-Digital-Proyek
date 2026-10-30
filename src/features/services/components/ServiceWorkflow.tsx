import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SERVICE_WORKFLOW_STEPS } from "../data/servicesData";

export function ServiceWorkflow() {
  return (
    <div className="mt-20 pt-16 border-t border-[#E4F2FD] dark:border-slate-800">
      <ScrollReveal className="text-center max-w-[680px] mx-auto mb-10">
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-[#38BDF8]">
          PROSES KERJA
        </p>
        <h2 className="mt-2.5 text-[24px] sm:text-[32px] font-extrabold text-[#041E42] dark:text-white">
          Tahapan kerja dari{" "}
          <span className="text-[#0066FF] dark:text-[#38BDF8]">perencanaan</span> hingga{" "}
          <span className="text-[#0066FF] dark:text-[#38BDF8]">peluncuran</span>
        </h2>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_WORKFLOW_STEPS.map((item, idx) => (
          <ScrollReveal key={item.step} delayMs={idx * 80} className="h-full">
            <article className="group relative overflow-hidden h-full rounded-[24px] bg-white dark:bg-slate-900 border border-[#E4F2FD] dark:border-slate-800 p-6 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066FF] dark:hover:border-blue-500 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.14)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="rounded-full bg-[#0066FF] text-white px-3 py-1 text-[11px] font-bold shadow-sm">
                  {item.step}
                </span>
              </div>
              <h3 className="text-[16px] font-extrabold text-[#041E42] dark:text-white transition-colors duration-200 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8]">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4A5D78] dark:text-slate-300">
                {item.desc}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1 w-0 bg-[#0066FF] transition-all duration-300 group-hover:w-full"
              />
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
