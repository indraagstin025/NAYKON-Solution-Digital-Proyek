import React from "react";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";
import { ABOUT_APPROACH_ITEMS } from "../data/aboutData";

export function AboutProfile() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
      <div className="relative flex items-center justify-center py-4">
        <div className="relative w-full max-w-[520px]">
          <div className="relative overflow-hidden rounded-[26px] border-[5px] border-white bg-white shadow-[0_22px_50px_-12px_rgba(10,35,80,0.15)]">
            <Image
              src="/team-naikon.jpg"
              alt="Tim programmer NAIKON Digital Solution"
              width={960}
              height={680}
              className="h-[310px] sm:h-[380px] w-full object-cover"
            />
          </div>

          <div className="relative sm:absolute -bottom-5 left-0 sm:-left-3 mt-4 sm:mt-0 w-full sm:w-[82%] max-w-[390px] rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_38px_-8px_rgba(10,35,80,0.14)] flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-sm">
              <PersonIcon className="h-5 w-5" />
            </div>
            <div className="h-9 w-[1px] bg-[#CBD5E1] shrink-0" />
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#0066FF]">
                KOMITMEN REKAYASA
              </p>
              <p className="mt-0.5 text-xs sm:text-[12.5px] leading-snug text-[#4A5D78]">
                Kami hadir sebagai mitra jangka panjang untuk kesuksesan digital bisnis
                Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[24px] sm:text-[32px] font-extrabold leading-[1.2] tracking-[-0.02em] text-[#041E42]">
          Solusi digital yang dibangun berdasarkan kebutuhan{" "}
          <span className="text-[#0066FF]">riil bisnis Anda.</span>
        </h2>
        <p className="mt-4 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78]">
          NAIKON Digital Solution adalah mitra rekayasa perangkat lunak dan website
          yang berfokus pada hasil terukur. Kami merancang arsitektur sistem yang
          cepat, aman, dan mudah dioperasikan agar bisnis Anda dapat berkembang secara
          efisien.
        </p>

        <div className="mt-6 divide-y divide-[#D8E6F8]">
          {ABOUT_APPROACH_ITEMS.map((item) => (
            <div
              key={item.title}
              className="py-4 first:pt-2 last:pb-0 flex items-start gap-4 group"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[15px] sm:text-base font-bold text-[#041E42]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13.5px] leading-relaxed text-[#526580]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
