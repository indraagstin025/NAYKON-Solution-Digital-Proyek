import React from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { PORTFOLIO_CASES } from "../data/portfolioData";

export function PortfolioCaseStudies() {
  return (
    <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
      {PORTFOLIO_CASES.map((item) => (
        <article
          key={item.id}
          className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                {item.icon}
              </div>
              <span className="rounded-full bg-[#EDF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0066FF]">
                {item.category}
              </span>
            </div>

            <h2 className="text-[18px] sm:text-[19px] font-extrabold tracking-[-0.015em] text-[#041E42]">
              {item.title}
            </h2>
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
              {item.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#EEF5FF] px-3.5 py-1 text-[11.5px] font-semibold text-[#0A2558]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#E8F0FC]">
            <div className="rounded-2xl bg-[#F4F8FF] p-4 text-xs sm:text-[12.5px] text-[#4A5D78] border border-[#DCEBFE] leading-relaxed">
              <div className="flex items-center gap-1.5 font-extrabold text-[#0066FF] mb-1">
                <CheckCircledIcon className="h-3.5 w-3.5 shrink-0" />
                <span>Dampak Bisnis</span>
              </div>
              {item.impact}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
