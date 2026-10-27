import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";
import { getPublicPricing, getPublicServices } from "@/lib/public-content";

export const metadata: Metadata = {
  title: "Layanan & Paket Harga - NAIKON Digital Solution",
  description:
    "Layanan pembuatan website bisnis, daftar paket investasi website, redesign, aplikasi web kustom, dan aplikasi mobile Android & iOS.",
};

export default async function Page() {
  const [services, pricing] = await Promise.all([
    getPublicServices(),
    getPublicPricing(),
  ]);
  return <ServicesPage services={services} pricing={pricing} />;
}
