import * as z from "zod";
import {
  cmsSlugSchema,
  contentStatusSchema,
  entityIdSchema,
  estimateReadingTimeMinutes,
  optionalSafeTextSchema,
  parseCommaOrLineList,
  parseEditorTextToBlocks,
  safeInternalHrefSchema,
  safeTextSchema,
} from "./common";

export const ALLOWED_SERVICE_ICONS = [
  "globe",
  "update",
  "code",
  "mobile",
  "layers",
  "rocket",
  "check",
] as const;

export const serviceFormSchema = z.object({
  id: entityIdSchema.optional(),
  title: safeTextSchema(4, 120, "Nama layanan"),
  slug: cmsSlugSchema,
  category: safeTextSchema(2, 60, "Kategori layanan"),
  shortDesc: safeTextSchema(15, 220, "Deskripsi singkat"),
  featuresRaw: z.string().transform((val) => parseCommaOrLineList(val, 12, 80)),
  icon: z.enum(ALLOWED_SERVICE_ICONS).default("globe"),
  ctaLabel: safeTextSchema(3, 60, "Teks tombol CTA"),
  ctaHref: safeInternalHrefSchema,
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  status: contentStatusSchema.default("DRAFT"),
}).refine((data) => data.featuresRaw.length >= 1, {
  path: ["featuresRaw"],
  message: "Masukkan minimal 1 fitur layanan (pisahkan dengan koma atau baris baru).",
});

export const pricingPlanFormSchema = z.object({
  id: entityIdSchema.optional(),
  name: safeTextSchema(3, 80, "Nama paket harga"),
  priceLabel: safeTextSchema(3, 80, "Label harga"),
  priceNote: optionalSafeTextSchema(100, "Catatan harga"),
  description: safeTextSchema(10, 220, "Deskripsi paket"),
  featuresRaw: z.string().transform((val) => parseCommaOrLineList(val, 16, 120)),
  isPopular: z.boolean().default(false),
  ctaLabel: safeTextSchema(3, 60, "Teks tombol CTA"),
  ctaHref: safeInternalHrefSchema,
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  status: contentStatusSchema.default("DRAFT"),
}).refine((data) => data.featuresRaw.length >= 2, {
  path: ["featuresRaw"],
  message: "Masukkan minimal 2 fitur paket harga.",
});

export const portfolioFormSchema = z.object({
  id: entityIdSchema.optional(),
  title: safeTextSchema(5, 140, "Judul proyek portofolio"),
  slug: cmsSlugSchema,
  category: safeTextSchema(3, 60, "Kategori proyek"),
  clientSector: safeTextSchema(3, 80, "Sektor klien"),
  summary: safeTextSchema(20, 260, "Ringkasan proyek"),
  techRaw: z.string().transform((val) => parseCommaOrLineList(val, 12, 50)),
  impact: safeTextSchema(10, 240, "Dampak proyek"),
  metric: optionalSafeTextSchema(60, "Metrik terukur"),
  imageAlt: optionalSafeTextSchema(180, "Teks alternatif gambar"),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  featured: z.boolean().default(false),
  status: contentStatusSchema.default("DRAFT"),
}).refine((data) => data.techRaw.length >= 1, {
  path: ["techRaw"],
  message: "Masukkan minimal 1 teknologi yang digunakan.",
});

export const faqFormSchema = z.object({
  id: entityIdSchema.optional(),
  question: safeTextSchema(8, 200, "Pertanyaan FAQ"),
  answer: safeTextSchema(15, 700, "Jawaban FAQ"),
  category: optionalSafeTextSchema(60, "Kategori FAQ"),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
  status: contentStatusSchema.default("DRAFT"),
});

export const pageFormSchema = z.object({
  id: entityIdSchema,
  title: safeTextSchema(4, 140, "Judul halaman"),
  seoTitle: optionalSafeTextSchema(70, "Judul SEO"),
  seoDescription: optionalSafeTextSchema(170, "Deskripsi SEO"),
  updatedLabel: optionalSafeTextSchema(60, "Label tanggal pembaruan"),
  bodyText: z.string().min(20, "Isi halaman terlalu pendek."),
  status: contentStatusSchema.default("PUBLISHED"),
}).transform((data, ctx) => {
  const blocks = parseEditorTextToBlocks(data.bodyText);
  if (blocks.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["bodyText"],
      message: "Isi halaman wajib memiliki minimal 1 paragraf teks.",
    });
    return z.NEVER;
  }
  return {
    ...data,
    blocks,
  };
});

export const articleFormSchema = z.object({
  id: entityIdSchema.optional(),
  title: safeTextSchema(5, 130, "Judul artikel"),
  slug: cmsSlugSchema,
  excerpt: safeTextSchema(20, 260, "Ringkasan artikel"),
  categoryId: entityIdSchema,
  tagIds: z.array(entityIdSchema).max(8).default([]),
  bodyText: z.string().min(20, "Isi artikel minimal terdiri dari 1 paragraf."),
  seoTitle: optionalSafeTextSchema(70, "Judul SEO"),
  seoDescription: optionalSafeTextSchema(170, "Deskripsi SEO"),
  status: contentStatusSchema.default("DRAFT"),
}).transform((data, ctx) => {
  const blocks = parseEditorTextToBlocks(data.bodyText);
  if (blocks.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["bodyText"],
      message: "Isi artikel wajib memiliki minimal 1 paragraf yang valid.",
    });
    return z.NEVER;
  }
  const readingTime = estimateReadingTimeMinutes(blocks);
  return {
    ...data,
    blocks,
    readingTime,
  };
});

export const categoryFormSchema = z.object({
  name: safeTextSchema(2, 60, "Nama kategori"),
  slug: cmsSlugSchema,
  description: optionalSafeTextSchema(160, "Deskripsi kategori"),
  sortOrder: z.coerce.number().int().min(0).max(999).default(0),
});

export const tagFormSchema = z.object({
  name: safeTextSchema(2, 50, "Nama tag"),
  slug: cmsSlugSchema,
});
