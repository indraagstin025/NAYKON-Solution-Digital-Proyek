import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";

export const metadata: Metadata = {
  title: "Layanan & Paket Harga - NAIKON Digital Solution",
  description:
    "Layanan pembuatan website bisnis, daftar paket investasi website, redesign, aplikasi web kustom, dan aplikasi mobile Android & iOS.",
};

export default function Page() {
  return <ServicesPage />;
}
