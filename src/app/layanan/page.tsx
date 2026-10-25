import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";

export const metadata: Metadata = {
  title: "Layanan Utama - NAIKON Digital Solution",
  description:
    "Layanan pembuatan website bisnis, redesign website, aplikasi web kustom, dan pengembangan aplikasi mobile Android & iOS.",
};

export default function Page() {
  return <ServicesPage />;
}
