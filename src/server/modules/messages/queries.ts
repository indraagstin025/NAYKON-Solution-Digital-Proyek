import "server-only";
import type { MessageStatus, Prisma } from "@prisma/client";
import { prisma } from "@/server/config/db";
import { withServerTimeout } from "@/server/security/csrf";
import { messageFilterSchema } from "@/server/validators/message";

const MESSAGES_QUERY_TIMEOUT_MS = 8_000;

export interface ContactMessageItemDTO {
  id: string;
  name: string;
  email: string;
  service: string | null;
  message: string;
  sourcePage: string;
  status: MessageStatus;
  internalNote: string | null;
  handledByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesInboxResult {
  items: ContactMessageItemDTO[];
  counts: {
    ALL: number;
    NEW: number;
    READ: number;
    REPLIED: number;
    SPAM: number;
  };
  activeStatus: MessageStatus | "ALL";
  searchQuery: string;
  loadError: string | null;
}

export async function getMessagesInboxData(rawSearchParams?: {
  status?: string;
  q?: string;
}): Promise<MessagesInboxResult> {
  const filter = messageFilterSchema.parse({
    status: rawSearchParams?.status,
    q: rawSearchParams?.q,
  });

  const where: Prisma.ContactMessageWhereInput = {};
  if (filter.status !== "ALL") {
    where.status = filter.status;
  }
  if (filter.q) {
    where.OR = [
      { name: { contains: filter.q, mode: "insensitive" } },
      { email: { contains: filter.q, mode: "insensitive" } },
      { message: { contains: filter.q, mode: "insensitive" } },
      { service: { contains: filter.q, mode: "insensitive" } },
    ];
  }

  try {
    const [rows, groupedCounts] = await withServerTimeout(
      Promise.all([
        prisma.contactMessage.findMany({
          where,
          orderBy: { createdAt: "desc" },
          take: 50,
          select: {
            id: true,
            name: true,
            email: true,
            service: true,
            message: true,
            sourcePage: true,
            status: true,
            internalNote: true,
            createdAt: true,
            updatedAt: true,
            handledBy: { select: { name: true } },
          },
        }),
        prisma.contactMessage.groupBy({
          by: ["status"],
          _count: { _all: true },
        }),
      ]),
      MESSAGES_QUERY_TIMEOUT_MS,
      "getMessagesInboxData"
    );

    const counts = {
      ALL: 0,
      NEW: 0,
      READ: 0,
      REPLIED: 0,
      SPAM: 0,
    };

    for (const row of groupedCounts) {
      counts[row.status] = row._count._all;
      counts.ALL += row._count._all;
    }

    return {
      items: rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        service: row.service,
        message: row.message,
        sourcePage: row.sourcePage,
        status: row.status,
        internalNote: row.internalNote,
        handledByName: row.handledBy?.name ?? null,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      })),
      counts,
      activeStatus: filter.status,
      searchQuery: filter.q,
      loadError: null,
    };
  } catch (error) {
    console.error(
      "Failed to query messages inbox:",
      error instanceof Error ? error.message : "unknown"
    );
    return {
      items: [],
      counts: { ALL: 0, NEW: 0, READ: 0, REPLIED: 0, SPAM: 0 },
      activeStatus: filter.status,
      searchQuery: filter.q,
      loadError:
        "Tidak dapat memuat daftar pesan dari database saat ini. Coba muat ulang halaman.",
    };
  }
}
