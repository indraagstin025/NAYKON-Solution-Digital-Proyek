import type { Metadata } from "next";
import { PortfolioPage } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Portofolio & Studi Kasus - NAIKON Digital Solution",
  description:
    "Studi kasus dan konsep solusi implementasi teknologi web serta mobile NAIKON Digital Solution.",
};

export default function Page() {
  return <PortfolioPage />;
}
