import * as z from "zod";
import { entityIdSchema, normalizeSingleLine, safeTextSchema } from "./common";

export const userRoleSchema = z.enum(["ADMIN", "EDITOR", "VIEWER", "ANALYST"]);

export const createUserSchema = z.object({
  name: safeTextSchema(2, 80, "Nama lengkap pengguna"),
  email: z
    .string()
    .transform((val) => normalizeSingleLine(val).toLowerCase())
    .pipe(
      z
        .email("Format alamat email tidak valid.")
        .max(120, "Alamat email maksimal 120 karakter.")
    ),
  password: z
    .string()
    .min(12, "Kata sandi wajib minimal 12 karakter.")
    .max(128, "Kata sandi maksimal 128 karakter.")
    .regex(/[A-Za-z]/, "Kata sandi wajib mengandung huruf.")
    .regex(/[0-9]/, "Kata sandi wajib mengandung angka."),
  role: userRoleSchema.default("VIEWER"),
});

export const updateUserAccessSchema = z.object({
  userId: entityIdSchema,
  role: userRoleSchema,
  isActive: z.boolean(),
});

export const revokeUserSessionsSchema = z.object({
  userId: entityIdSchema,
});
