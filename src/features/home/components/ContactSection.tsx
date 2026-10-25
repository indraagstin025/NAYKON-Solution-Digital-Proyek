import React from "react";
import { CONTACT_INFO_ITEMS } from "../data/homeData";
import { ConsultationForm } from "./ConsultationForm";

export function ContactSection() {
  return (
    <section
      id="kontak"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#FFFFFF] to-[#F3F8FF] dark:from-[#030711] dark:via-[#061231] dark:to-[#091a45] py-16 sm:py-20 lg:py-24 border-t border-slate-200/50 dark:border-blue-900/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-[215px] w-[215px] rounded-full bg-[#DCEEFF]/75 dark:bg-blue-900/15 -z-10"
      />
      <svg
        viewBox="0 0 260 260"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] -z-10"
      >
        <circle
          cx="15"
          cy="245"
          r="135"
          fill="#DCEEFF"
          fillOpacity="0.7"
          className="dark:opacity-15"
        />
        <circle
          cx="15"
          cy="245"
          r="164"
          stroke="#1D7AFC"
          strokeOpacity="0.6"
          strokeWidth="1.3"
        />
        <circle cx="147.7" cy="148.6" r="5.5" fill="#0066FF" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div>
          <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF] dark:text-blue-400">
            HUBUNGI KAMI
          </p>
          <h2 className="mt-3 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#041E42] dark:text-white">
            Siap mendiskusikan{" "}
            <span className="text-[#0066FF] dark:text-[#38BDF8]">
              rencana digital
            </span>{" "}
            Anda?
          </h2>
          <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78] dark:text-slate-300">
            Ceritakan kebutuhan website atau sistem yang ingin Anda kembangkan. Kami
            akan meninjau spesifikasi Anda dan memberikan estimasi solusi serta langkah
            awal dalam 1x24 jam kerja.
          </p>

          <div className="mt-8 space-y-4">
            {CONTACT_INFO_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E6F0FD] dark:border-slate-800 p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] dark:bg-blue-950/80 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5A6E8C] dark:text-slate-400">
                    {item.title}
                  </p>
                  {item.isLink && item.linkHref ? (
                    <a
                      href={item.linkHref}
                      className="mt-0.5 inline-block text-[15px] sm:text-base font-extrabold text-[#0066FF] dark:text-blue-400 hover:underline"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-[13.5px] sm:text-[15px] font-bold text-[#041E42] dark:text-white">
                      {item.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ConsultationForm />
      </div>
    </section>
  );
}
