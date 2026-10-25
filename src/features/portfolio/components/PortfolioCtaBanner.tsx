import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PortfolioCtaBanner() {
  return (
    <ScrollReveal delayMs={120}>
      <div className="mt-12 rounded-[24px] bg-white dark:bg-slate-900 border border-[#E6F0FD] dark:border-slate-800 p-8 sm:p-10 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-[#0066FF] dark:hover:border-blue-500 hover:shadow-[0_22px_48px_-12px_rgba(0,102,255,0.14)]">
        <div>
          <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#041E42] dark:text-white">
            Ingin mendiskusikan rancangan proyek serupa untuk bisnis Anda?
          </h3>
          <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#4A5D78] dark:text-slate-300">
            Tim kami siap membantu memetakan kebutuhan fitur dan estimasi pengerjaan
            secara transparan.
          </p>
        </div>
        <Link
          href="/kontak"
          className="group shrink-0 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3 text-[13.5px] font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <span>Konsultasikan Proyek</span>
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </ScrollReveal>
  );
}
