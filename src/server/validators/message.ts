import * as z from "zod";
import { entityIdSchema, normalizeMultiLine, normalizeSingleLine } from "./common";

export const messageStatusSchema = z.enum(["NEW", "READ", "REPLIED", "SPAM"]);

export const updateContactMessageSchema = z.object({
  id: entityIdSchema,
  status: messageStatusSchema,
  internalNote: z
    .string()
    .optional()
    .transform((val) => {
      const cleaned = normalizeMultiLine(val ?? "");
      return cleaned.length > 0 ? cleaned.slice(0, 1000) : null;
    }),
});

export const deleteContactMessageSchema = z.object({
  id: entityIdSchema,
});

export const messageFilterSchema = z.object({
  status: z
    .string()
    .optional()
    .transform((val) => {
      const upper = normalizeSingleLine(val).toUpperCase();
      if (upper === "NEW" || upper === "READ" || upper === "REPLIED" || upper === "SPAM") {
        return upper as z.infer<typeof messageStatusSchema>;
      }
      return "ALL" as const;
    }),
  q: z
    .string()
    .optional()
    .transform((val) => normalizeSingleLine(val).slice(0, 100)),
});
