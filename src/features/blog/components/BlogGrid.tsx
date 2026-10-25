import React from "react";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BLOG_PREVIEWS } from "../data/blogData";

export function BlogGrid() {
  return (
    <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
      {BLOG_PREVIEWS.map((post, idx) => (
        <ScrollReveal key={post.title} delayMs={idx * 80} className="h-full">
          <article className="relative overflow-hidden h-full flex flex-col justify-between rounded-[24px] bg-white dark:bg-slate-900 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0066FF] dark:hover:border-blue-500 hover:shadow-[0_22px_46px_-10px_rgba(0,102,255,0.15)] group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {post.icon}
                </div>
                <span className="rounded-full bg-[#0066FF] text-white px-3.5 py-1 text-[11.5px] font-semibold shadow-sm">
                  {post.category}
                </span>
              </div>

              <h2 className="text-[17px] sm:text-[18.5px] font-extrabold leading-snug tracking-[-0.015em] text-[#041E42] dark:text-white transition-colors duration-200 group-hover:text-[#0066FF] dark:group-hover:text-[#38BDF8]">
                {post.title}
              </h2>
              <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78] dark:text-slate-300">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8F0FC] dark:border-slate-800 flex items-center justify-between text-xs text-[#4A5D78] dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#0066FF] dark:text-blue-400">
                <CalendarIcon className="h-3.5 w-3.5" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ClockIcon className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1 w-0 bg-[#0066FF] transition-all duration-300 group-hover:w-full"
            />
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
