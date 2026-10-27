import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";

export const CMS_CACHE_TAGS = {
  services: "public:services",
  portfolios: "public:portfolios",
  pricing: "public:pricing",
  faqs: "public:faqs",
  articles: "public:articles",
  pages: "public:pages",
} as const;

export type CmsCacheDomain = keyof typeof CMS_CACHE_TAGS;

const DOMAIN_PUBLIC_PATHS: Record<CmsCacheDomain, readonly string[]> = {
  services: ["/", "/layanan"],
  portfolios: ["/", "/portofolio"],
  pricing: ["/", "/layanan"],
  faqs: ["/"],
  articles: ["/blog"],
  pages: ["/kebijakan-privasi", "/tentang-kami"],
};

const DOMAIN_ADMIN_PATHS: Record<CmsCacheDomain, readonly string[]> = {
  services: ["/admin", "/admin/konten/layanan"],
  portfolios: ["/admin", "/admin/konten/portofolio"],
  pricing: ["/admin", "/admin/konten/layanan"],
  faqs: ["/admin", "/admin/konten/faq"],
  articles: ["/admin", "/admin/konten/artikel"],
  pages: ["/admin", "/admin/konten/faq"],
};

export function revalidateCmsDomains(
  domains: readonly CmsCacheDomain[],
  extraPaths: readonly string[] = []
): void {
  const seenTags = new Set<string>();
  const seenPaths = new Set<string>();

  for (const domain of domains) {
    const tag = CMS_CACHE_TAGS[domain];
    if (!seenTags.has(tag)) {
      seenTags.add(tag);
      try {
        revalidateTag(tag, { expire: 0 });
      } catch {
        // Ignore when invoked outside a Next.js request context (e.g., CLI verification scripts).
      }
    }

    for (const p of DOMAIN_PUBLIC_PATHS[domain]) seenPaths.add(p);
    for (const p of DOMAIN_ADMIN_PATHS[domain]) seenPaths.add(p);
  }

  for (const extra of extraPaths) {
    if (extra.startsWith("/")) seenPaths.add(extra);
  }

  for (const path of seenPaths) {
    try {
      revalidatePath(path);
    } catch {
      // Ignore outside request context.
    }
  }
}

export function revalidateAdminPaths(paths: readonly string[]): void {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Ignore outside request context.
    }
  }
}
