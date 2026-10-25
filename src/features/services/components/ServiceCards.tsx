import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SERVICES_LIST } from "../data/servicesData";

export function ServiceCards() {
  return (
    <div className="grid gap-6 lg:gap-7 md:grid-cols-2">
      {SERVICES_LIST.map((service) => (
        <article
          key={service.id}
          className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF] transition-transform duration-300 group-hover:scale-105">
                {service.icon}
              </div>
              <span className="rounded-full bg-[#EDF5FF] px-4 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                {service.category}
              </span>
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-[-0.015em] text-[#041E42]">
              {service.title}
            </h2>
            <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
              {service.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EEF5FF] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#0A2558]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#E8F0FC]">
            <Link
              href={service.linkHref}
              className="inline-flex items-center gap-2 text-[13px] sm:text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors group/link"
            >
              <span>{service.linkText}</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
