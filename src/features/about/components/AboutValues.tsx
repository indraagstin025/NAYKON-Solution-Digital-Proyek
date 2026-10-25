import React from "react";
import Link from "next/link";
import { CheckCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { ABOUT_VALUE_CARDS } from "../data/aboutData";

export function AboutValues() {
  return (
    <div className="mx-auto mt-16 w-full max-w-[1240px] px-6 sm:px-9 lg:px-14">
      <div className="grid gap-6 md:grid-cols-3">
        {ABOUT_VALUE_CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] mb-4">
              {card.icon}
            </div>
            <h3 className="text-[18px] font-extrabold text-[#041E42]">
              {card.title}
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.68] text-[#4A5D78]">
              {card.description}
            </p>
          </article>
        ))}

        <article className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.06)] flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] mb-4">
              <CheckCircledIcon className="h-6 w-6" />
            </div>
            <h3 className="text-[18px] font-extrabold text-[#041E42]">
              Siap Berkolaborasi?
            </h3>
            <p className="mt-2 text-[13.5px] leading-[1.68] text-[#4A5D78]">
              Diskusikan rencana pengembangan website atau sistem internal perusahaan
              Anda bersama tim teknis NAIKON.
            </p>
          </div>
          <div className="mt-5">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC]"
            >
              <span>Hubungi Tim Kami</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
