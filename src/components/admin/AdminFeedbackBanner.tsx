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
          className="flex items-start gap-3 rounded-xl border border-[#FBBF24]/60 bg-[#12213F] p-4 text-sm text-[#FBBF24]"
        >
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 shrink-0 text-[#FBBF24]"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-[#F1F5FB]">
              Koneksi internet terputus
            </p>
            <p className="mt-0.5 text-xs text-[#94A7C4]">
              Perubahan belum dapat dikirim ke server hingga jaringan Anda kembali aktif.
            </p>
          </div>
        </div>
      )}

      {feedback && (
        <div
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${
            feedback.type === "error"
              ? "border-[#F87171]/60 bg-[#12213F] text-[#FCA5A5]"
              : "border-[#34D399]/60 bg-[#12213F] text-[#F1F5FB]"
          }`}
        >
          <div className="flex items-start gap-3">
            {feedback.type === "error" ? (
              <ExclamationTriangleIcon
                className="mt-0.5 h-5 w-5 shrink-0 text-[#F87171]"
                aria-hidden="true"
              />
            ) : (
              <CheckCircledIcon
                className="mt-0.5 h-5 w-5 shrink-0 text-[#34D399]"
                aria-hidden="true"
              />
            )}
            <div className="space-y-1">
              <p className="font-medium">{feedback.message}</p>
              {feedback.fieldErrors &&
                Object.keys(feedback.fieldErrors).length > 0 && (
                  <ul className="list-disc pl-4 text-xs text-[#FCA5A5] space-y-0.5">
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
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-[#4E6E9E] bg-[#0B1730] text-[#94A7C4] transition-colors hover:bg-[#192D54] hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            <Cross2Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
