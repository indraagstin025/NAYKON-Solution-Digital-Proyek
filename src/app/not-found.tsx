import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | Next Karya",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="site-wrap min-h-screen flex flex-col justify-between bg-[#F7FAFC] text-[#041E42] dark:bg-[#030711] dark:text-[#F1F5FB]">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-start justify-center px-6 sm:px-9 lg:px-14 pt-32 pb-20">
        <p className="rounded-md rounded-full border border-[#D4E6FC] bg-[#EAF4FC] px-3.5 py-1 text-xs font-semibold text-[#0066FF] dark:border-[#4E6E9E] dark:bg-[#12213F] dark:text-[#38BDF8]">
          Kode Status 404
        </p>

        <h1 className="mt-4 max-w-xl text-2xl sm:text-4xl font-bold tracking-tight text-[#041E42] dark:text-[#F1F5FB]">
          Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </h1>

        <p className="mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-[#425776] dark:text-[#94A7C4]">
          Periksa kembali penulisan alamat URL di bilah peramban, atau kembali ke
          halaman utama untuk menelusuri layanan dan portofolio Next Karya.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-xl rounded-full bg-[#0066FF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052CC] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
          >
            Kembali ke Beranda
          </Link>

          <Link
            href="/kontak"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#0066FF] bg-white px-6 py-3 text-sm font-semibold text-[#0066FF] transition-all hover:bg-[#0066FF] hover:text-white hover:-translate-y-0.5 active:scale-[0.98] dark:bg-slate-900 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-[#0066FF] dark:hover:text-white"
          >
            Hubungi Tim Next Karya
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
