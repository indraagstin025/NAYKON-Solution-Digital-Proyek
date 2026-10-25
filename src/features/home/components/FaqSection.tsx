"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusIcon, MinusIcon, ArrowRightIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { FAQ_ITEMS } from "../data/homeData";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#FFFFFF] to-[#F8FBFF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <div className="relative z-10 mx-auto w-full max-w-[980px] px-6 sm:px-9 lg:px-14">
        <div className="text-center max-w-[700px] mx-auto">
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
            PERTANYAAN UMUM (FAQ)
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Hal yang sering ditanyakan{" "}
            <br className="hidden sm:inline" />
            seputar{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">
              proyek dan kolaborasi
            </span>
          </h2>
          <p className="mx-auto mt-3.5 max-w-[620px] text-[13.5px] sm:text-[14.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
            Jawaban transparan mengenai durasi pengerjaan, garansi teknis, kesiapan materi,
            serta tata cara memulai proyek bersama tim NAIKON.
          </p>
        </div>

        <div className="mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 shadow-[0_8px_24px_-8px_rgba(10,35,80,0.05)] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors hover:bg-blue-50/40 dark:hover:bg-slate-800/40"
                >
                  <span className="text-[15px] sm:text-[16px] font-bold text-[#041E42] dark:text-white">
                    {item.question}
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-sm">
                    {isOpen ? (
                      <MinusIcon className="h-4 w-4" />
                    ) : (
                      <PlusIcon className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-[13.5px] leading-[1.75] text-[#4A5D78] dark:text-slate-300 border-t border-[#F0F5FD] dark:border-slate-800/80">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-[24px] bg-[#F4F8FF] dark:bg-slate-800/70 border border-[#DCEBFE] dark:border-slate-700/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm">
              <ChatBubbleIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[15px] sm:text-base font-bold text-[#041E42] dark:text-white">
                Masih memiliki pertanyaan teknis lainnya?
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4A5D78] dark:text-slate-300">
                Tim rekayasa NAIKON siap berdiskusi langsung sesuai kebutuhan unik bisnis Anda.
              </p>
            </div>
          </div>
          <Link
            href="/kontak"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-5 py-2.5 text-xs sm:text-[13px] font-bold text-white shadow-sm transition-all"
          >
            <span>Hubungi Kami</span>
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
