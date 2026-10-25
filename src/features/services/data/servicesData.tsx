import React from "react";
import {
  GlobeIcon,
  UpdateIcon,
  CodeIcon,
  MobileIcon,
  MagnifyingGlassIcon,
  LayoutIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

export const SERVICES_LIST = [
  {
    id: "website",
    category: "Website",
    title: "Pembuatan Website Bisnis",
    description:
      "Website profil bisnis, company profile, dan landing page yang berfokus pada kredibilitas, konversi, dan pengalaman pengguna.",
    tags: ["Company Profile", "Landing Page", "Optimasi SEO", "Panel Admin / CMS"],
    linkText: "Konsultasi Pembuatan Web",
    linkHref: "/kontak",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
  {
    id: "redesign",
    category: "Penyegaran",
    title: "Redesign & Optimalisasi Website",
    description:
      "Memodernisasi tampilan dan kode website lama yang lambat, tidak responsif, atau usang menjadi antarmuka modern dengan skor kecepatan Google PageSpeed tinggi.",
    tags: ["Penyegaran UI/UX", "Kecepatan Loading", "Mobile-First", "Migrasi Konten Aman"],
    linkText: "Konsultasi Redesign",
    linkHref: "/kontak",
    icon: <UpdateIcon className="h-6 w-6" />,
  },
  {
    id: "webapp",
    category: "Sistem Web",
    title: "Aplikasi Web & Dashboard Kustom",
    description:
      "Pengembangan sistem internal berbasis web seperti dashboard operasional, inventaris pergudangan, portal karyawan, dan otomatisasi administrasi multi-cabang.",
    tags: ["Dashboard Analitik", "Database Relasional", "Integrasi REST API", "Hak Akses"],
    linkText: "Konsultasi Web App",
    linkHref: "/kontak",
    icon: <CodeIcon className="h-6 w-6" />,
  },
  {
    id: "mobile",
    category: "Mobile App",
    title: "Pengembangan Aplikasi Mobile",
    description:
      "Pembuatan aplikasi Android dan iOS yang responsif, intuitif, dan terintegrasi dengan sistem alur kerja dan API server bisnis Anda.",
    tags: [
      "Android & iOS",
      "Push Notification",
      "Integrasi Payment Gateway",
      "Sinkronisasi Real-Time",
    ],
    linkText: "Konsultasi Mobile App",
    linkHref: "/kontak",
    icon: <MobileIcon className="h-6 w-6" />,
  },
];

export const SERVICE_WORKFLOW_STEPS = [
  {
    step: "Tahap 01",
    title: "Discovery & Spesifikasi",
    desc: "Pemetaan tujuan bisnis, spesifikasi fitur, dan estimasi jadwal pengerjaan.",
    icon: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
  {
    step: "Tahap 02",
    title: "Desain UI/UX & Alur",
    desc: "Penyusunan wireframe dan prototipe interaktif sebelum tahap penulisan kode.",
    icon: <LayoutIcon className="h-5 w-5" />,
  },
  {
    step: "Tahap 03",
    title: "Rekayasa Kode & QA",
    desc: "Pengembangan berstandar bersih, integrasi API, dan pengujian lintas perangkat.",
    icon: <CodeIcon className="h-5 w-5" />,
  },
  {
    step: "Tahap 04",
    title: "Deployment & Garansi",
    desc: "Peluncuran ke server produksi disertai pelatihan tim dan garansi pemeliharaan.",
    icon: <RocketIcon className="h-5 w-5" />,
  },
];
