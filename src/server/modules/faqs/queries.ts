import "server-only";
import type { ContentStatus } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";
import { cleanText, serializeBlocksToEditorText } from "@/server/validators/common";

const FAQS_TIMEOUT_MS = 8_000;

export interface AdminFaqDTO {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  status: ContentStatus;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdminPageDTO {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  updatedLabel: string;
  bodyText: string;
  status: ContentStatus;
  updatedAt: string;
}

export interface AdminFaqsAndPagesWorkspaceData {
  faqs: AdminFaqDTO[];
  pages: AdminPageDTO[];
  loadError: string | null;
}

export async function getAdminFaqsAndPagesWorkspaceData(): Promise<AdminFaqsAndPagesWorkspaceData> {
  try {
    const [rawFaqs, rawPages] = await withServerTimeout(
      Promise.all([
        prisma.faq.findMany({
          orderBy: [{ deletedAt: "asc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
          take: 50,
          select: {
            id: true,
            question: true,
            answer: true,
            category: true,
            sortOrder: true,
            status: true,
            updatedAt: true,
            deletedAt: true,
          },
        }),
        prisma.page.findMany({
          where: { deletedAt: null },
          orderBy: { slug: "asc" },
          take: 20,
          select: {
            id: true,
            slug: true,
            title: true,
            seoTitle: true,
            seoDescription: true,
            content: true,
            status: true,
            updatedAt: true,
          },
        }),
      ]),
      FAQS_TIMEOUT_MS,
      "getAdminFaqsAndPagesWorkspaceData"
    );

    return {
      faqs: rawFaqs.map((f) => ({
        ...f,
        category: f.category ?? "",
        updatedAt: f.updatedAt.toISOString(),
        deletedAt: f.deletedAt ? f.deletedAt.toISOString() : null,
      })),
      pages: rawPages.map((p) => {
        const updatedLabel =
          typeof p.content === "object" &&
          p.content !== null &&
          "updatedLabel" in p.content
            ? cleanText((p.content as { updatedLabel?: unknown }).updatedLabel, 60)
            : "";

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          seoTitle: p.seoTitle ?? "",
          seoDescription: p.seoDescription ?? "",
          updatedLabel,
          bodyText: serializeBlocksToEditorText(p.content),
          status: p.status,
          updatedAt: p.updatedAt.toISOString(),
        };
      }),
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to load FAQs and pages workspace data:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      faqs: [],
      pages: [],
      loadError:
        "Tidak dapat memuat data FAQ dan halaman statis dari database saat ini.",
    };
  }
}
