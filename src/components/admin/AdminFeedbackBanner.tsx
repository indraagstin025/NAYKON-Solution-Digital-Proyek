"use client";

import {
  CheckCircledIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import type { AdminFeedback } from "./useAdminMutation";

export function AdminFeedbackBanner({
  isOnline,
  feedback,
  onDismiss,
}: {
  isOnline: boolean;
  feedback: AdminFeedback | null;
  onDismiss: () => void;
}) {
  return (
    <>
      {!isOnline && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-amber-300 dark:border-[#FBBF24]/60 bg-amber-50 dark:bg-[#12213F] p-4 text-sm text-amber-900 dark:text-[#FBBF24]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-[#FBBF24]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-amber-950 dark:text-[#F1F5FB]">
              Koneksi internet terputus
            </p>
            <p className="mt-0.5 text-xs text-amber-800 dark:text-[#94A7C4]">
              Perubahan belum dapat dikirim ke server hingga jaringan Anda kembali aktif.
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`flex items-start justify-between gap-3 rounded-2xl border p-4 text-sm ${
            feedback.type === "error"
              ? "border-rose-300 dark:border-[#F87171]/60 bg-rose-50 dark:bg-[#12213F] text-rose-900 dark:text-[#FCA5A5]"
              : "border-emerald-300 dark:border-[#34D399]/60 bg-emerald-50 dark:bg-[#12213F] text-emerald-950 dark:text-[#F1F5FB]"
          }`}
        >
          <div className="flex items-start gap-3">
            {feedback.type === "error" ? (
              <ExclamationTriangleIcon
                className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-[#F87171]"
                aria-hidden="true"
              />
            ) : (
              <CheckCircledIcon
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-[#34D399]"
                aria-hidden="true"
              />
            )}
            <div className="space-y-1">
              <p className="font-medium">{feedback.message}</p>
              {feedback.fieldErrors &&
                Object.keys(feedback.fieldErrors).length > 0 && (
                  <ul className="list-disc pl-4 text-xs text-rose-700 dark:text-[#FCA5A5] space-y-0.5">
                    {Object.entries(feedback.fieldErrors).map(([field, msgs]) => (
                      <li key={field}>{msgs.join(", ")}</li>
                    ))}
                  </ul>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            aria-label="Tutup pemberitahuan"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 dark:border-[#4E6E9E] bg-white dark:bg-[#0B1730] text-[#5A6E85] dark:text-[#94A7C4] transition-colors hover:bg-slate-100 dark:hover:bg-[#192D54] hover:text-[#041E42] dark:hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005090] dark:focus-visible:outline-[#0986C8]"
          >
            <Cross2Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
