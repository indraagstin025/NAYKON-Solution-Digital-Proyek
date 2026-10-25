import React from "react";
import Link from "next/link";
import { ReaderIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export function BlogCallout() {
  return (
    <div className="mt-12 rounded-[24px] bg-[#F4F8FF] border border-[#DCEBFE] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-start sm:items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
          <ReaderIcon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#041E42]">
            Ruang Artikel &amp; Dokumentasi Teknis NAIKON
          </h3>
          <p className="mt-1 text-[13px] sm:text-[13.5px] text-[#4A5D78]">
            Halaman ini telah disiapkan untuk publikasi artikel lengkap, wawasan
            industri, dan pembaruan produk NAIKON Digital Solution.
          </p>
        </div>
      </div>
      <Link
        href="/kontak"
        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-sm transition-all"
      >
        <span>Diskusi Langsung</span>
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
