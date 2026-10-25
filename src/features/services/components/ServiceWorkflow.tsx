import React from "react";
import { SERVICE_WORKFLOW_STEPS } from "../data/servicesData";

export function ServiceWorkflow() {
  return (
    <div className="mt-16 pt-14 border-t border-[#DCEBFE]">
      <div className="text-center max-w-[680px] mx-auto mb-10">
        <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF]">
          PROSES KERJA
        </p>
        <h2 className="mt-2.5 text-[24px] sm:text-[32px] font-extrabold text-[#041E42]">
          Tahapan kerja dari <span className="text-[#0066FF]">perencanaan</span> hingga{" "}
          <span className="text-[#0066FF]">peluncuran</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_WORKFLOW_STEPS.map((item) => (
          <div
            key={item.step}
            className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm">
                {item.icon}
              </div>
              <span className="rounded-full bg-[#0066FF] text-white px-3 py-1 text-[11px] font-bold shadow-sm">
                {item.step}
              </span>
            </div>
            <h3 className="text-[16px] font-extrabold text-[#041E42]">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#4A5D78]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
