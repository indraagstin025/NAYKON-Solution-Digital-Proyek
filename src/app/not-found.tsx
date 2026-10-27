import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | NAIKON",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="site-wrap min-h-screen flex flex-col justify-between bg-[#F7F9FD] text-[#041E42] dark:bg-[#030711] dark:text-[#F1F5FB]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-start justify-center px-6 sm:px-9 lg:px-14 pt-32 pb-20">
        <p className="rounded-md border border-[#5B789E] bg-[#E7F1FF] px-3 py-1 text-xs font-semibold text-[#0052CC] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#93C5FD]">
          Kode Status 404
        </p>

        <h1 className="mt-4 max-w-xl text-2xl sm:text-4xl font-bold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </h1>

        <p className="mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-[#425776] dark:text-[#94A7C4]">
          Periksa kembali penulisan alamat URL di bilah peramban, atau kembali ke
          halaman utama untuk menelusuri layanan dan portofolio NAIKON.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0052CC] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#003E99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#38BDF8]"
          >
            Kembali ke Beranda
          </Link>

          <Link
            href="/kontak"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#5B789E] bg-white px-5 py-2.5 text-sm font-semibold text-[#041E42] transition-colors hover:bg-[#EEF4FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#F1F5FB] dark:hover:bg-[#192D54] dark:focus-visible:outline-[#38BDF8]"
          >
            Hubungi Tim NAIKON
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
