import * as z from "zod";

const CONTROL_CHAR_REGEX = /[\u0000-\u001F\u007F]/;

export const portalLoginSchema = z.object({
  email: z
    .string({ error: "Email wajib diisi." })
    .transform((val) => val.normalize("NFKC").trim())
    .pipe(
      z
        .string()
        .min(1, { error: "Email wajib diisi." })
        .max(120, { error: "Email maksimal 120 karakter." })
        .refine((val) => !CONTROL_CHAR_REGEX.test(val), {
          error: "Email mengandung karakter yang tidak diizinkan.",
        })
        .pipe(z.email({ error: "Format email tidak valid." }))
        .refine(
          (val) => {
            const parts = val.split("@");
            if (parts.length !== 2) return false;
            const [localPart, domainPart] = parts;
            return (
              Boolean(localPart) &&
              Boolean(domainPart) &&
              localPart.length <= 64 &&
              domainPart.length <= 253 &&
              !domainPart.startsWith(".") &&
              !domainPart.endsWith(".")
            );
          },
          { error: "Format email tidak valid." }
        )
        .transform((val) => val.toLowerCase())
    ),
  password: z
    .string({ error: "Kata sandi wajib diisi." })
    .transform((val) => val.normalize("NFKC"))
    .pipe(
      z
        .string()
        .min(1, { error: "Kata sandi wajib diisi." })
        .min(12, { error: "Kata sandi minimal 12 karakter." })
        .max(128, { error: "Kata sandi maksimal 128 karakter." })
        .refine((val) => !CONTROL_CHAR_REGEX.test(val), {
          error: "Kata sandi mengandung karakter kontrol yang tidak valid.",
        })
        .refine((val) => val.trim().length > 0, {
          error: "Kata sandi tidak boleh hanya berisi spasi.",
        })
    ),
});

export type PortalLoginErrorKind =
  | "validation"
  | "credentials"
  | "locked"
  | "offline"
  | "timeout"
  | "stale_deployment"
  | "csrf"
  | "server";

export interface PortalFieldErrors {
  email?: string[];
  password?: string[];
}

export interface PortalLoginState {
  status: "idle" | "error";
  errorKind?: PortalLoginErrorKind;
  message?: string;
  retryAfterSeconds?: number;
  fieldErrors?: PortalFieldErrors;
}

export function extractPortalFieldErrors(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>
): PortalFieldErrors {
  const fieldErrors: PortalFieldErrors = {};
  for (const issue of issues) {
    const field = issue.path[0];
    if (field === "email" || field === "password") {
      fieldErrors[field] = [...(fieldErrors[field] ?? []), issue.message];
    }
  }
  return fieldErrors;
}
