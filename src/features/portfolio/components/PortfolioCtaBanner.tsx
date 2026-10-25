import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export function PortfolioCtaBanner() {
  return (
    <div className="mt-12 rounded-[24px] bg-white border border-[#E6F0FD] p-8 sm:p-10 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#041E42]">
          Ingin mendiskusikan rancangan proyek serupa untuk bisnis Anda?
        </h3>
        <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-[#4A5D78]">
          Tim kami siap membantu memetakan kebutuhan fitur dan estimasi pengerjaan
          secara transparan.
        </p>
      </div>
      <Link
        href="/kontak"
        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3 text-[13.5px] font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.02]"
      >
        <span>Konsultasikan Proyek</span>
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
