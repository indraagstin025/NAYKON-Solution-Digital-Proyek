import * as z from "zod";

export const portalLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Email wajib diisi." })
    .max(120, { error: "Email maksimal 120 karakter." })
    .pipe(z.email({ error: "Format email tidak valid." }))
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(12, { error: "Kata sandi minimal 12 karakter." })
    .max(128, { error: "Kata sandi maksimal 128 karakter." }),
});

export interface PortalLoginState {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}
