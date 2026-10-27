import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPolicyPage } from "@/features/legal/pages/PrivacyPolicyPage";
import { getPublicPage } from "@/lib/public-content";

const SLUG = "kebijakan-privasi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPublicPage(SLUG);
  return {
    title: page?.seoTitle || "Kebijakan Privasi - NAIKON Digital Solution",
    description:
      page?.seoDescription ||
      "Kebijakan privasi NAIKON Digital Solution terkait data formulir konsultasi dan keamanan penyimpanan.",
    alternates: { canonical: `/${SLUG}` },
  };
}

export default async function Page() {
  const page = await getPublicPage(SLUG);
  if (!page) notFound();
  return <PrivacyPolicyPage page={page} />;
}
