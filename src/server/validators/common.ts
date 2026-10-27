import * as z from "zod";
import {
  cleanText,
  parseContentBlocks,
  publicSlugSchema,
  sanitizeInternalHref,
  validateRedirectTarget,
  type ContentBlock,
} from "@/lib/public-validators";

export {
  cleanText,
  parseContentBlocks,
  publicSlugSchema,
  sanitizeInternalHref,
  validateRedirectTarget,
  type ContentBlock,
};

const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;
const MULTILINE_CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function normalizeSingleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(CONTROL_CHARS_REGEX, " ").replace(/\s+/g, " ").trim();
}

export function normalizeMultiLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(MULTILINE_CONTROL_CHARS_REGEX, "")
    .trim();
}

export function slugifyText(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 120);
}

export const entityIdSchema = z
  .string()
  .transform((val) => normalizeSingleLine(val))
  .pipe(
    z
      .string()
      .min(3, "ID entitas tidak valid.")
      .max(64, "ID entitas terlalu panjang.")
      .regex(/^[a-zA-Z0-9_-]+$/, "Format ID entitas tidak diizinkan.")
  );

export const cmsSlugSchema = z
  .string()
  .transform((val) => slugifyText(val))
  .pipe(
    z
      .string()
      .min(2, "Slug minimal 2 karakter.")
      .max(120, "Slug maksimal 120 karakter.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung."
      )
  );

export const contentStatusSchema = z.enum([
  "DRAFT",
  "REVIEW",
  "SCHEDULED",
  "PUBLISHED",
  "ARCHIVED",
]);

export const safeInternalHrefSchema = z
  .string()
  .transform((val) => normalizeSingleLine(val))
  .refine(
    (val) => {
      if (!val.startsWith("/") || val.startsWith("//") || val.includes("..")) {
        return false;
      }
      const lower = val.toLowerCase();
      if (
        lower === "/admin" ||
        lower.startsWith("/admin/") ||
        lower === "/api" ||
        lower.startsWith("/api/")
      ) {
        return false;
      }
      return /^\/[a-zA-Z0-9\-_/#]*$/.test(val);
    },
    {
      message:
        "Tautan tujuan harus berupa path internal publik yang valid (contoh: /kontak atau /layanan).",
    }
  );

export function safeTextSchema(min: number, max: number, fieldLabel: string) {
  return z
    .string()
    .transform((val) => normalizeSingleLine(val))
    .pipe(
      z
        .string()
        .min(min, `${fieldLabel} minimal ${min} karakter.`)
        .max(max, `${fieldLabel} maksimal ${max} karakter.`)
    );
}

export function optionalSafeTextSchema(max: number, fieldLabel: string) {
  return z
    .string()
    .optional()
    .transform((val) => {
      const cleaned = normalizeSingleLine(val ?? "");
      return cleaned.length > 0 ? cleaned : null;
    })
    .refine((val) => val === null || val.length <= max, {
      message: `${fieldLabel} maksimal ${max} karakter.`,
    });
}

export function parseCommaOrLineList(raw: unknown, maxItems = 16, maxItemLen = 80): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => normalizeSingleLine(item))
      .filter((item) => item.length > 0)
      .map((item) => item.slice(0, maxItemLen))
      .slice(0, maxItems);
  }
  if (typeof raw !== "string") return [];
  return raw
    .split(/[\n,]+/)
    .map((item) => normalizeSingleLine(item))
    .filter((item) => item.length > 0)
    .map((item) => item.slice(0, maxItemLen))
    .slice(0, maxItems);
}

// Converts structured ContentBlock[] into an ergonomic plain-text notation for the CMS editor:
//   ## Heading Level 2
//   ### Heading Level 3
//   - Bullet item
//   [!CATATAN: Judul Catatan] Isi catatan penting
//   Plain paragraph text
export function serializeBlocksToEditorText(rawContent: unknown): string {
  const blocks = parseContentBlocks(rawContent);
  if (blocks.length === 0) return "";

  return blocks
    .map((block) => {
      if (block.type === "heading") {
        return `${block.level === 3 ? "###" : "##"} ${block.text}`;
      }
      if (block.type === "list") {
        return block.items.map((item) => `- ${item}`).join("\n");
      }
      if (block.type === "callout") {
        return `[!CATATAN: ${block.title || "Catatan Penting"}]\n${block.text}`;
      }
      return block.text;
    })
    .join("\n\n");
}

export function parseEditorTextToBlocks(rawEditorText: string): ContentBlock[] {
  const normalized = normalizeMultiLine(rawEditorText);
  if (!normalized) return [];

  const chunks = normalized
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const blocks: ContentBlock[] = [];

  for (const chunk of chunks.slice(0, 80)) {
    if (chunk.startsWith("### ")) {
      const text = cleanText(chunk.slice(4), 200);
      if (text) blocks.push({ type: "heading", level: 3, text });
      continue;
    }

    if (chunk.startsWith("## ")) {
      const text = cleanText(chunk.slice(3), 200);
      if (text) blocks.push({ type: "heading", level: 2, text });
      continue;
    }

    const calloutMatch = chunk.match(/^\[!CATATAN:\s*([^\]]*)\]\s*([\s\S]+)$/i);
    if (calloutMatch) {
      const title = cleanText(calloutMatch[1] || "Catatan Penting", 120);
      const text = cleanText(calloutMatch[2], 1200);
      if (text) {
        blocks.push({ type: "callout", title: title || "Catatan Penting", text });
      }
      continue;
    }

    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length > 0 && lines.every((line) => line.startsWith("- ") || line.startsWith("* "))) {
      const items = lines
        .slice(0, 30)
        .map((line) => cleanText(line.slice(2), 600))
        .filter(Boolean);
      if (items.length > 0) {
        blocks.push({ type: "list", items });
        continue;
      }
    }

    const paragraphText = cleanText(lines.join(" "), 3000);
    if (paragraphText) {
      blocks.push({ type: "paragraph", text: paragraphText });
    }
  }

  return blocks;
}

export function estimateReadingTimeMinutes(blocks: readonly ContentBlock[]): number {
  let words = 0;
  for (const block of blocks) {
    if (block.type === "list") {
      for (const item of block.items) {
        words += item.split(/\s+/).filter(Boolean).length;
      }
    } else {
      words += block.text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.min(60, Math.ceil(words / 180)));
}
