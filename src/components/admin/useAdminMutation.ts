"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/server/config/result";

const CLIENT_MUTATION_TIMEOUT_MS = 15_000;

function subscribeOnlineStatus(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineSnapshot() {
  if (typeof navigator === "undefined") {
    return true;
  }
  return navigator.onLine;
}

function getServerOnlineSnapshot() {
  return true;
}

export interface AdminFeedback {
  type: "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export function useAdminMutation() {
  const router = useRouter();
  const isOnline = useSyncExternalStore(
    subscribeOnlineStatus,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );
  const [isPending, setIsPending] = useState(false);
  const [feedback, setFeedback] = useState<AdminFeedback | null>(null);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const execute = useCallback(
    async <T,>(
      fn: () => Promise<ActionResult<T>>,
      options?: {
        onSuccess?: (data: T) => void;
        refreshOnSuccess?: boolean;
      }
    ): Promise<ActionResult<T>> => {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        const offlineResult: ActionResult<T> = {
          ok: false,
          error:
            "Perangkat Anda sedang tidak terhubung ke internet. Periksa koneksi jaringan sebelum menyimpan perubahan.",
        };
        setFeedback({
          type: "error",
          message: offlineResult.error,
        });
        return offlineResult;
      }

      setIsPending(true);
      setFeedback(null);

      let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

      try {
        const timeoutPromise = new Promise<ActionResult<T>>((resolve) => {
          timeoutHandle = setTimeout(() => {
            resolve({
              ok: false,
              error:
                "Permintaan ke server melebihi batas waktu 15 detik. Periksa koneksi jaringan Anda lalu coba kembali.",
            });
          }, CLIENT_MUTATION_TIMEOUT_MS);
        });

        const result = await Promise.race([fn(), timeoutPromise]);

        if (result.ok) {
          setFeedback({
            type: "success",
            message: result.message,
          });
          if (options?.refreshOnSuccess !== false) {
            router.refresh();
          }
          options?.onSuccess?.(result.data);
        } else {
          setFeedback({
            type: "error",
            message: result.error,
            fieldErrors: result.fieldErrors,
          });
        }

        return result;
      } catch {
        const fallbackError: ActionResult<T> = {
          ok: false,
          error:
            "Koneksi ke server terputus saat memproses permintaan. Periksa jaringan Anda lalu coba kembali.",
        };
        setFeedback({
          type: "error",
          message: fallbackError.error,
        });
        return fallbackError;
      } finally {
        if (timeoutHandle !== undefined) {
          clearTimeout(timeoutHandle);
        }
        setIsPending(false);
      }
    },
    [router]
  );

  return {
    isOnline,
    isPending,
    feedback,
    setFeedback,
    clearFeedback,
    execute,
  };
}
