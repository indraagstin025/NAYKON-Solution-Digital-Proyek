import type { Metadata } from "next";
import { HomePage } from "@/features/home";
import {
  getPublicFaqs,
  getPublicPortfolios,
  getPublicPricing,
  getPublicServices,
} from "@/lib/public-content";

export const metadata: Metadata = {
  title: "NAIKON Digital Solution - Website, Aplikasi Web, dan Aplikasi Mobile",
  description:
    "Tim rekayasa perangkat lunak untuk website bisnis, dashboard kustom, dan aplikasi mobile. Lihat layanan, paket harga, dan studi kasus NAIKON Digital Solution.",
};

export default async function Page() {
  const [services, portfolios, pricing, faqs] = await Promise.all([
    getPublicServices(),
    getPublicPortfolios(),
    getPublicPricing(),
    getPublicFaqs(),
  ]);

  return (
    <HomePage
      services={services}
      portfolios={portfolios}
      pricing={pricing}
      faqs={faqs}
    />
  );
}
