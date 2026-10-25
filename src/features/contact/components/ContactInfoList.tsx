import React from "react";
import { CONTACT_CHANNELS } from "../data/contactData";

export function ContactInfoList() {
  return (
    <div>
      <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#041E42]">
        Saluran Komunikasi Resmi
      </h2>
      <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78]">
        Tim kami siap mendampingi mulai dari tahap pemetaan kebutuhan bisnis,
        perancangan arsitektur sistem, hingga estimasi anggaran yang transparan.
      </p>

      <div className="mt-7 space-y-4">
        {CONTACT_CHANNELS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl bg-white border border-[#E6F0FD] p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm">
              {item.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-[#5A6E8C]">{item.title}</p>
              {item.isLink && item.linkHref ? (
                <a
                  href={item.linkHref}
                  className="mt-0.5 inline-block text-[15px] sm:text-base font-extrabold text-[#0066FF] hover:underline"
                >
                  {item.content}
                </a>
              ) : (
                <p className="mt-0.5 text-[14px] sm:text-[15px] font-bold text-[#041E42]">
                  {item.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
