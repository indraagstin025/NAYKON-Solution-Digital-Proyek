"use client";

import React, { useRef, useState } from "react";
import { unstable_rethrow } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";
import { logoutPortalAction } from "../actions";

const LOGOUT_TIMEOUT_MS = 10_000;

export default function LogoutForm() {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRef.current) return;

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setErrorMessage("Perangkat sedang offline. Sambungkan jaringan lalu klik Keluar.");
      return;
    }

    inFlightRef.current = true;
    setIsPending(true);
    setErrorMessage(null);

    let timer: number | undefined;
    try {
      const result = await Promise.race([
        logoutPortalAction(),
        new Promise<never>((_, reject) => {
          timer = window.setTimeout(() => {
            reject(new Error("LOGOUT_TIMEOUT"));
          }, LOGOUT_TIMEOUT_MS);
        }),
      ]);

      if (result && !result.ok) {
        inFlightRef.current = false;
        setIsPending(false);
        setErrorMessage(result.message);
      }
    } catch (error) {
      unstable_rethrow(error);
      inFlightRef.current = false;
      setIsPending(false);
      setErrorMessage(
        "Koneksi terputus saat mengakhiri sesi. Periksa internet lalu klik Keluar kembali."
      );
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      <form onSubmit={handleLogout} className="w-full">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#12213F] px-3.5 py-2 text-xs font-semibold text-[#041E42] dark:text-[#F1F5FB] transition-colors hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-[#192D54] dark:hover:text-[#FCA5A5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8] disabled:cursor-not-allowed disabled:opacity-65"
        >
          <ExitIcon className="h-4 w-4 text-[#5A6E85] dark:text-[#94A7C4]" aria-hidden="true" />
          <span>{isPending ? "Mengakhiri Sesi..." : "Keluar Sesi"}</span>
        </button>
      </form>
      {errorMessage && (
        <p role="alert" className="text-center text-xs text-rose-600 dark:text-[#FCA5A5]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
