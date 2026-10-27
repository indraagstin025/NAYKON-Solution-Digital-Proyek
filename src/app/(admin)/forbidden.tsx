import Link from "next/link";
import { LockClosedIcon } from "@radix-ui/react-icons";

export default function AdminForbidden() {
  return (
    <section
      aria-labelledby="forbidden-heading"
      className="mx-auto my-8 max-w-lg rounded-2xl border border-[#1E3358] bg-[#0B1730] p-6 sm:p-8"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F87171]/60 bg-[#12213F] text-[#FCA5A5]">
        <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
      </div>

      <p className="mt-4 text-xs font-semibold text-[#FCA5A5]">Kode Status 403</p>

      <h1
        id="forbidden-heading"
        className="mt-1.5 text-xl sm:text-2xl font-bold text-[#F1F5FB]"
      >
        Akses ke modul ini tidak diizinkan untuk peran akun Anda.
      </h1>

      <p className="mt-2.5 text-sm leading-relaxed text-[#94A7C4]">
        Hubungi Administrator NAIKON apabila pekerjaan Anda membutuhkan hak akses
        tambahan pada bagian ini.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
        >
          Kembali ke Ringkasan
        </Link>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#4E6E9E] bg-[#12213F] px-4 py-2 text-sm font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
        >
          Buka Situs Publik
        </Link>
      </div>
    </section>
  );
}
