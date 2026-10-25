import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Hubungi Kami - NAIKON Digital Solution",
  description:
    "Konsultasikan kebutuhan pembuatan website, sistem internal, dan aplikasi mobile bisnis Anda bersama tim kami di NAIKON Digital Solution.",
};

export default function Page() {
  return <ContactPage />;
}
