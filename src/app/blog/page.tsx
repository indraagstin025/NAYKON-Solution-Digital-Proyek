import type { Metadata } from "next";
import { BlogPage } from "@/features/blog";

export const metadata: Metadata = {
  title: "Blog & Wawasan Teknologi - NAIKON Digital Solution",
  description:
    "Artikel, panduan teknis, dan wawasan seputar rekayasa website, aplikasi mobile, dan transformasi digital bisnis.",
};

export default function Page() {
  return <BlogPage />;
}
