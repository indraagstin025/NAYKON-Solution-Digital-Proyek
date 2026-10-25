import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "Tentang Kami - NAIKON Digital Solution",
  description:
    "Profil perusahaan, visi rekayasa perangkat lunak, dan komitmen kualitas tim NAIKON Digital Solution.",
};

export default function Page() {
  return <AboutPage />;
}
