import React from "react";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import { BLOG_PREVIEWS } from "../data/blogData";

export function BlogGrid() {
  return (
    <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
      {BLOG_PREVIEWS.map((post) => (
        <article
          key={post.title}
          className="flex flex-col justify-between rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-7 shadow-[0_14px_38px_-10px_rgba(10,35,80,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-10px_rgba(0,102,255,0.12)] group"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0066FF] text-white shadow-sm">
                {post.icon}
              </div>
              <span className="rounded-full bg-[#0066FF] text-white px-3.5 py-1 text-[11.5px] font-semibold shadow-sm">
                {post.category}
              </span>
            </div>

            <h2 className="text-[17px] sm:text-[18.5px] font-extrabold leading-snug tracking-[-0.015em] text-[#041E42]">
              {post.title}
            </h2>
            <p className="mt-2.5 text-[13px] sm:text-[13.5px] leading-[1.68] text-[#4A5D78]">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8F0FC] flex items-center justify-between text-xs text-[#5A6E8C]">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0066FF]">
              <CalendarIcon className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ClockIcon className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
