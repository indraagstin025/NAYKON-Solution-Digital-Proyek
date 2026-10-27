import "server-only";
import type { z } from "zod";
import { DatabaseTimeoutError } from "@/lib/request-security";

export type ActionResult<T = void> =
  | { ok: true; message: string; data: T }
  | {
      ok: false;
      error: string;
      errorKind?: "validation" | "unauthorized" | "forbidden" | "rate_limit" | "conflict" | "timeout" | "server";
      fieldErrors?: Record<string, string[]>;
    };

export function extractFieldErrors(
  issues: readonly z.core.$ZodIssue[]
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) {
      fieldErrors[key] = [];
    }
    if (fieldErrors[key].length < 2) {
      fieldErrors[key].push(issue.message);
    }
  }
  return fieldErrors;
}

export function isTransientDatabaseError(error: unknown): boolean {
  if (error instanceof DatabaseTimeoutError) return true;
  if (!(error instanceof Error)) return false;

  const code = (error as { code?: string }).code;
  if (code && ["P1001", "P1002", "P1008", "P1017"].includes(code)) {
    return true;
  }

  return /can't reach database|connection.*closed|timed? out|econnreset|etimedout|enotfound/i.test(
    error.message
  );
}

export function isPrismaUniqueConstraintError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (error as { code?: string }).code === "P2002";
}

export function isPrismaForeignKeyError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (error as { code?: string }).code === "P2003";
}

export function toSafeMutationError(
  operationLabel: string,
  error: unknown
): ActionResult<never> {
  if (isPrismaUniqueConstraintError(error)) {
    return {
      ok: false,
      errorKind: "conflict",
      error: "Slug atau data unik tersebut sudah dipakai oleh entitas lain. Gunakan nilai yang berbeda.",
    };
  }

  if (isPrismaForeignKeyError(error)) {
    return {
      ok: false,
      errorKind: "conflict",
      error: "Data ini masih terhubung dengan entitas lain sehingga tidak dapat dihapus atau diubah.",
    };
  }

  if (isTransientDatabaseError(error)) {
    console.error(
      `[CMS Timeout/Network] ${operationLabel}:`,
      error instanceof Error ? error.message : "unknown"
    );
    return {
      ok: false,
      errorKind: "timeout",
      error:
        "Koneksi ke server database sedang melambat atau terputus sementara. Periksa jaringan Anda lalu coba kembali.",
    };
  }

  console.error(
    `[CMS Mutation Error] ${operationLabel}:`,
    error instanceof Error ? error.message : "unknown"
  );
  return {
    ok: false,
    errorKind: "server",
    error: "Terjadi gangguan saat memproses perubahan di server. Silakan coba beberapa saat lagi.",
  };
}
