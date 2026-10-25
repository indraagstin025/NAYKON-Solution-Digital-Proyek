import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "Tentang Kami - NAIKON Digital Solution",
  description:
    "Profil tim kami, keahlian rekayasa web dan aplikasi, serta komitmen kualitas NAIKON Digital Solution.",
};

export default function Page() {
  return <AboutPage />;
}
