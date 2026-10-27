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
    <div className="flex flex-col items-end gap-1.5">
      <form onSubmit={handleLogout}>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 py-2 text-sm font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-65"
        >
          <ExitIcon className="h-4 w-4 text-[#94A7C4]" aria-hidden="true" />
          <span>{isPending ? "Keluar..." : "Keluar"}</span>
        </button>
      </form>
      {errorMessage && (
        <p role="alert" className="max-w-xs text-right text-xs text-[#FCA5A5]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
