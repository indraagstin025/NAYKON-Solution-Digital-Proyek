import React from "react";
import { LightningBoltIcon, LayersIcon, CodeIcon } from "@radix-ui/react-icons";

export const BLOG_PREVIEWS = [
  {
    category: "Arsitektur Web",
    title: "Mengapa Kecepatan Loading Website Sangat Menentukan Konversi Bisnis B2B",
    excerpt:
      "Memahami bagaimana performa Core Web Vitals dan arsitektur frontend modern berdampak langsung pada kredibilitas bisnis di mata calon klien.",
    date: "Segera Hadir",
    readTime: "5 Menit Baca",
    icon: <LightningBoltIcon className="h-6 w-6" />,
  },
  {
    category: "Sistem Internal",
    title: "Kapan Bisnis Anda Perlu Beralih dari Spreadsheet ke Dashboard Kustom?",
    excerpt:
      "Tanda-tanda operasional bisnis mulai membutuhkan sistem terpusat untuk menghindari duplikasi data dan mempercepat laporan lintas cabang.",
    date: "Segera Hadir",
    readTime: "6 Menit Baca",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    category: "Rekayasa Perangkat Lunak",
    title: "Panduan Memilih Teknologi Website Bisnis yang Aman dan Mudah Dikembangkan",
    excerpt:
      "Hal-hal teknis yang perlu diperhatikan manajemen saat merencanakan pembangunan ulang website agar investasi digital bertahan jangka panjang.",
    date: "Segera Hadir",
    readTime: "7 Menit Baca",
    icon: <CodeIcon className="h-6 w-6" />,
  },
];
