"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@/components/admin/ui/RadixTooltip";

const THEME_KEY = "nk-theme-preference";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getSnapshot() {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light") return false;
  return true; // default dark for admin
}

function getServerSnapshot() {
  return true;
}

export function AdminThemeToggle({
  showLabel = true,
  className = "",
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new Event("storage"));
  };

  const button = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-[#041E42] transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] dark:focus-visible:outline-[#38BDF8] ${className}`}
    >
      {isDark ? (
        <SunIcon className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-4 w-4 text-[#0066FF]" aria-hidden="true" />
      )}
      {showLabel && (
        <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
      )}
    </button>
  );

  if (!showLabel) {
    return (
      <Tooltip content={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}>
        {button}
      </Tooltip>
    );
  }

  return button;
}
