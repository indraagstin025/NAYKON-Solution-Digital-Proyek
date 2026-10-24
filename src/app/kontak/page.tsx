"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  EnvelopeClosedIcon,
  ClockIcon,
  ChatBubbleIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "website",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "sending" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: "error",
        message: "Mohon lengkapi nama, email, dan pesan Anda sebelum mengirim.",
      });
      return;
    }

    setFormStatus({ type: "sending", message: "Sedang mengirim pesan..." });

    setTimeout(() => {
      setFormStatus({
        type: "success",
        message:
          "Terima kasih! Pesan Anda telah kami terima. Tim NAIKON akan menghubungi Anda dalam waktu 1x24 jam kerja.",
      });
      setFormData({ name: "", email: "", service: "website", message: "" });
    }, 900);
  };

  return (
    <div id="nk-site" className="site-wrap min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[68px] lg:pt-[76px]">
        {/* ─── Page Hero Header ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F4F9FF] via-[#F9FCFF] to-[#FFFFFF] py-14 sm:py-18 border-b border-[#E6F0FD]">
          <svg
            viewBox="0 0 260 260"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-[190px] w-[190px] sm:h-[240px] sm:w-[240px] -z-10"
          >
            <circle cx="245" cy="15" r="140" fill="#DCEEFF" fillOpacity="0.7" />
            <circle
              cx="245"
              cy="15"
              r="168"
              stroke="#1D7AFC"
              strokeOpacity="0.6"
              strokeWidth="1.3"
            />
            <circle cx="112.6" cy="118.5" r="5.5" fill="#0066FF" />
          </svg>

          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 text-center">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#0066FF]">
              HUBUNGI KAMI
            </p>
            <h1 className="mt-3 text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#041E42]">
              Siap mendiskusikan{" "}
              <span className="text-[#0066FF]">rencana digital</span> Anda?
            </h1>
            <p className="mx-auto mt-4 max-w-[660px] text-[14px] sm:text-[15px] leading-[1.7] text-[#4A5D78]">
              Ceritakan kebutuhan website atau sistem yang ingin Anda kembangkan. Kami akan
              meninjau spesifikasi Anda dan memberikan estimasi solusi dalam 1x24 jam kerja.
            </p>
          </div>
        </section>

        {/* ─── Contact Info & Form Section ─── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFF] to-[#F3F8FF] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            {/* Left Column */}
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#041E42]">
                Saluran Komunikasi Resmi
              </h2>
              <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#4A5D78]">
                Tim kami siap mendampingi mulai dari tahap pemetaan kebutuhan bisnis,
                perancangan arsitektur sistem, hingga estimasi anggaran yang transparan.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl bg-white border border-[#E6F0FD] p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                    <EnvelopeClosedIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C]">
                      Email Resmi Konsultasi
                    </p>
                    <a
                      href="mailto:contact@naykon.id"
                      className="mt-0.5 inline-block text-[15px] sm:text-base font-extrabold text-[#0066FF] hover:underline"
                    >
                      contact@naykon.id
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white border border-[#E6F0FD] p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C]">
                      Jam Kerja Operasional
                    </p>
                    <p className="mt-0.5 text-[14px] sm:text-[15px] font-bold text-[#041E42]">
                      Senin – Jumat, 09.00 – 18.00 WIB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl bg-white border border-[#E6F0FD] p-4 sm:p-5 shadow-[0_12px_32px_-10px_rgba(10,35,80,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F2FF] text-[#0066FF]">
                    <ChatBubbleIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#5A6E8C]">Komitmen Respons</p>
                    <p className="mt-0.5 text-[13.5px] sm:text-[14px] font-bold text-[#041E42]">
                      Tinjauan spesifikasi &amp; estimasi dalam 1x24 jam kerja
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <form
              id="contact-form"
              onSubmit={handleFormSubmit}
              className="rounded-[24px] bg-white border border-[#E6F0FD] p-6 sm:p-8 lg:p-9 shadow-[0_18px_46px_-12px_rgba(10,35,80,0.08)]"
              noValidate
            >
              <div className="mb-6 pb-4 border-b border-[#E8F0FC]">
                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#041E42]">
                  Formulir Konsultasi Proyek
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#5A6E8C]">
                  Isi detail singkat di bawah ini untuk menjadwalkan diskusi bersama tim
                  rekayasa NAIKON.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-[13px] font-bold text-[#041E42]"
                    htmlFor="contact-name"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                    placeholder="Nama Anda"
                    required
                    maxLength={120}
                    className="w-full rounded-xl border border-[#D8E6F8] bg-[#F8FBFF] px-4 py-3 text-[13.5px] text-[#041E42] placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white focus:ring-3 focus:ring-[#0066FF]/15"
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-[13px] font-bold text-[#041E42]"
                    htmlFor="contact-email-input"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="contact-email-input"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                    placeholder="nama@perusahaan.com"
                    required
                    maxLength={254}
                    className="w-full rounded-xl border border-[#D8E6F8] bg-[#F8FBFF] px-4 py-3 text-[13.5px] text-[#041E42] placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white focus:ring-3 focus:ring-[#0066FF]/15"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block text-[13px] font-bold text-[#041E42]"
                  htmlFor="contact-service"
                >
                  Kebutuhan Layanan
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-xl border border-[#D8E6F8] bg-[#F8FBFF] px-4 py-3 text-[13.5px] text-[#041E42] outline-none transition focus:border-[#0066FF] focus:bg-white focus:ring-3 focus:ring-[#0066FF]/15"
                >
                  <option value="website" className="text-slate-900 bg-white">
                    Pembuatan Website Bisnis
                  </option>
                  <option value="redesign" className="text-slate-900 bg-white">
                    Redesign &amp; Optimalisasi Website
                  </option>
                  <option value="webapp" className="text-slate-900 bg-white">
                    Aplikasi Web &amp; Dashboard Kustom
                  </option>
                  <option value="mobile" className="text-slate-900 bg-white">
                    Pengembangan Aplikasi Mobile
                  </option>
                  <option value="other" className="text-slate-900 bg-white">
                    Konsultasi Lainnya
                  </option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  className="mb-2 block text-[13px] font-bold text-[#041E42]"
                  htmlFor="contact-message"
                >
                  Pesan &amp; Ringkasan Kebutuhan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Jelaskan kebutuhan proyek Anda atau fitur yang ingin dibangun..."
                  required
                  maxLength={5000}
                  className="w-full resize-y rounded-xl border border-[#D8E6F8] bg-[#F8FBFF] px-4 py-3 text-[13.5px] text-[#041E42] placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white focus:ring-3 focus:ring-[#0066FF]/15"
                />
              </div>

              <button
                id="submit-button"
                type="submit"
                disabled={formStatus.type === "sending"}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_25px_-5px_rgba(0,102,255,0.45)] transition-all hover:scale-[1.01] hover:shadow-[0_14px_30px_-5px_rgba(0,102,255,0.55)] disabled:cursor-wait disabled:opacity-60"
              >
                <span>
                  {formStatus.type === "sending"
                    ? "Sedang Mengirim..."
                    : "Kirim Pesan Konsultasi"}
                </span>
                <PaperPlaneIcon className="w-4 h-4" />
              </button>

              {formStatus.message && (
                <div
                  id="form-status"
                  className={`mt-4 p-3.5 rounded-xl text-[13px] font-medium ${
                    formStatus.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                  role="status"
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
