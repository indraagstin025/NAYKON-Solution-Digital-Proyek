"use client";

import React from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useConsultationForm } from "../hooks/useConsultationForm";

export function ConsultationForm() {
  const { formData, formStatus, handleChange, handleSubmit } = useConsultationForm();

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="rounded-[24px] bg-white dark:bg-slate-900/95 border border-[#E6F0FD] dark:border-slate-800 p-6 sm:p-8 lg:p-9 shadow-[0_18px_46px_-12px_rgba(10,35,80,0.08)]"
      noValidate
    >
      <div className="mb-6 pb-4 border-b border-[#E8F0FC] dark:border-slate-800">
        <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#041E42] dark:text-white">
          Formulir Konsultasi Proyek
        </h3>
        <p className="mt-1 text-xs sm:text-[13px] text-[#5A6E8C] dark:text-slate-400">
          Isi detail singkat di bawah ini untuk menjadwalkan diskusi bersama tim
          rekayasa NAIKON.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
            htmlFor="contact-name"
          >
            Nama Lengkap
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Nama Anda"
            required
            maxLength={120}
            className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
          />
        </div>
        <div>
          <label
            className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
            htmlFor="contact-email-input"
          >
            Alamat Email
          </label>
          <input
            id="contact-email-input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="nama@email.com"
            required
            maxLength={254}
            className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
          htmlFor="contact-service"
        >
          Kebutuhan Layanan
        </label>
        <select
          id="contact-service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
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
          className="mb-2 block text-[13px] font-bold text-[#041E42] dark:text-slate-200"
          htmlFor="contact-message"
        >
          Pesan &amp; Ringkasan Kebutuhan
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Jelaskan kebutuhan proyek Anda atau fitur yang ingin dibangun..."
          required
          maxLength={5000}
          className="w-full resize-y rounded-xl border border-[#D8E6F8] dark:border-slate-700 bg-[#F8FBFF] dark:bg-slate-800/80 px-4 py-3 text-[13.5px] text-[#041E42] dark:text-white placeholder:text-[#869AB8] outline-none transition focus:border-[#0066FF] focus:bg-white dark:focus:bg-slate-900 focus:ring-3 focus:ring-[#0066FF]/15"
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
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/40"
              : "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/40"
          }`}
          role="status"
        >
          {formStatus.message}
        </div>
      )}
    </form>
  );
}
