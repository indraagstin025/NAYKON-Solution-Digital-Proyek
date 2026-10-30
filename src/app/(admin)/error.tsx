"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";

export default function AdminWorkspaceError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(
      "Workspace route error:",
      error instanceof Error ? error.message : "unknown"
    );
  }, [error]);

  const digest =
    error && typeof error === "object" && "digest" in error
      ? String((error as { digest?: unknown }).digest ?? "")
      : "";

  return (
    <section
      role="alert"
      aria-labelledby="workspace-error-heading"
      className="mx-auto my-8 max-w-lg rounded-2xl border border-[#F87171] bg-[#0B1730] p-6 sm:p-8"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F87171] bg-[#12213F] text-[#FCA5A5]">
        <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h1
        id="workspace-error-heading"
        className="mt-4 text-xl sm:text-2xl font-bold text-[#F1F5FB]"
      >
        Koneksi ruang kerja mengalami gangguan sementara.
      </h1>

      <p className="mt-2.5 text-sm leading-relaxed text-[#94A7C4]">
        Permintaan gagal diselesaikan karena jaringan terputus atau server database
        sedang tidak merespons. Pastikan internet Anda aktif lalu muat ulang modul
        ini.
      </p>

      {digest && (
        <p className="mt-3 rounded-md border border-[#4E6E9E] bg-[#12213F] px-3 py-1.5 text-xs tabular-nums text-[#94A7C4]">
          Kode pelacakan log: {digest}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8]"
        >
          <ReloadIcon className="h-4 w-4" aria-hidden="true" />
          <span>Muat Ulang Modul</span>
        </button>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#4E6E9E] bg-[#12213F] px-4 py-2 text-sm font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0986C8]"
        >
          Buka Situs Publik
        </Link>
      </div>
    </section>
  );
}
