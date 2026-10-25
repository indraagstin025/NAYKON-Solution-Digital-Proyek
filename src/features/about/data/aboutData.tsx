import React from "react";
import {
  TargetIcon,
  CodeIcon,
  CheckCircledIcon,
  RocketIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

export const ABOUT_APPROACH_ITEMS = [
  {
    icon: <TargetIcon className="h-5 w-5" />,
    title: "Pendekatan Berbasis Solusi Nyata",
    description:
      "Kami memahami kebutuhan bisnis Anda dan menghadirkan solusi yang tepat, terukur, dan berdampak.",
  },
  {
    icon: <CodeIcon className="h-5 w-5" />,
    title: "Standar Kode Teruji & Skalabilitas Tinggi",
    description:
      "Menggunakan teknologi modern dengan kode berkualitas yang aman dan mudah dikembangkan.",
  },
  {
    icon: <CheckCircledIcon className="h-5 w-5" />,
    title: "Transparansi Biaya & Garansi Purnajual",
    description:
      "Biaya jelas sejak awal dan dukungan penuh setelah implementasi untuk memastikan solusi berjalan optimal.",
  },
];

export const ABOUT_VALUE_CARDS = [
  {
    icon: <RocketIcon className="h-6 w-6" />,
    title: "Visi Perusahaan",
    description:
      "Menjadi mitra rekayasa teknologi pilihan utama bagi korporasi dan bisnis di Indonesia dalam mengakselerasi inovasi digital yang berkelanjutan.",
  },
  {
    icon: <LightningBoltIcon className="h-6 w-6" />,
    title: "Misi Rekayasa",
    description:
      "Membangun perangkat lunak berstandar industri yang cepat, aman, dan mudah dikelola dengan komunikasi proyek yang terbuka di setiap tahapan.",
  },
];
