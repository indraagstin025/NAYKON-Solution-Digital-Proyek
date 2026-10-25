import React from "react";
import {
  DesktopIcon,
  CodeIcon,
  LightningBoltIcon,
  TargetIcon,
  CheckCircledIcon,
  GlobeIcon,
  UpdateIcon,
  MobileIcon,
  MagnifyingGlassIcon,
  LayoutIcon,
  RocketIcon,
  LayersIcon,
  EnvelopeClosedIcon,
  ClockIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import type {
  HighlightItem,
  ServiceTeaserItem,
  WorkflowStepItem,
  PortfolioTeaserItem,
  ContactInfoItem,
} from "../types";

export const HERO_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: <DesktopIcon className="h-4 w-4" />,
    label: "Solusi Digital",
  },
  {
    icon: <CodeIcon className="h-4 w-4" />,
    label: "Pengembangan Web",
  },
  {
    icon: <LightningBoltIcon className="h-4 w-4" />,
    label: "Inovasi Teknologi",
  },
];

export const ABOUT_FEATURES = [
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

export const SERVICES_TEASERS: ServiceTeaserItem[] = [
  {
    id: "website",
    category: "Website",
    title: "Pembuatan Website Bisnis",
    description:
      "Website korporasi dan landing page yang berfokus pada kredibilitas, konversi, dan pengalaman pengguna.",
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
      "Pembuatan aplikasi Android dan iOS yang responsif, intuitif, dan terintegrasi dengan sistem bisnis dan API server perusahaan Anda.",
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

export const WORKFLOW_STEPS: WorkflowStepItem[] = [
  {
    stepNumber: "01 / 04",
    badge: "Tahap 01",
    title: "Discovery & Spesifikasi",
    description:
      "Sesi konsultasi untuk memetakan tujuan bisnis, kendala alur kerja, spesifikasi teknis, serta estimasi jadwal pengerjaan yang transparan.",
    milestone: "Pemetaan Kebutuhan",
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
  },
  {
    stepNumber: "02 / 04",
    badge: "Tahap 02",
    title: "Desain UI/UX & Alur",
    description:
      "Penyusunan arsitektur informasi, wireframe, dan prototipe antarmuka interaktif sehingga Anda dapat meninjau alur aplikasi sebelum koding dimulai.",
    milestone: "Prototipe Interaktif",
    icon: <LayoutIcon className="h-6 w-6" />,
  },
  {
    stepNumber: "03 / 04",
    badge: "Tahap 03",
    title: "Rekayasa Kode & QA",
    description:
      "Pengembangan dengan standar arsitektur bersih, integrasi API, pengujian responsivitas antar device, serta evaluasi keamanan sistem.",
    milestone: "Pengujian & Keamanan",
    icon: <CodeIcon className="h-6 w-6" />,
  },
  {
    stepNumber: "04 / 04",
    badge: "Tahap 04",
    title: "Deployment & Garansi",
    description:
      "Peluncuran aplikasi ke server produksi atau app store, pelatihan penggunaan bagi tim Anda, serta garansi pemeliharaan pasca rilis.",
    milestone: "Rilis & Pendampingan",
    icon: <RocketIcon className="h-6 w-6" />,
  },
];

export const PORTFOLIO_TEASERS: PortfolioTeaserItem[] = [
  {
    id: "inventory-app",
    category: "Aplikasi Web Internal",
    title: "Portal Operasional & Inventaris",
    description:
      "Sistem dasbor terpusat untuk memantau stok multi-gudang, rekapitulasi transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga manajemen.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    businessImpact:
      "Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi laporan operasional secara terpusat.",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    id: "b2b-catalog",
    category: "Website Korporasi",
    title: "Portal Korporasi & Katalog B2B",
    description:
      "Website profil perusahaan manufaktur dengan katalog produk digital terstruktur, formulir permintaan penawaran harga, serta optimasi SEO halaman spesifikasi.",
    tech: ["React", "SEO Engine", "Headless CMS"],
    businessImpact:
      "Mempermudah eksplorasi katalog produk bagi mitra bisnis dan menertibkan jalur penerimaan penawaran harga.",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
  {
    id: "logistics-mobile",
    category: "Aplikasi Mobile",
    title: "Aplikasi Pelacakan Distribusi",
    description:
      "Aplikasi mobile bagi armada pengiriman barang yang dilengkapi konfirmasi tanda tangan digital penerima dan pembaruan rute pengantaran secara langsung.",
    tech: ["iOS & Android", "REST API", "E-Signature"],
    businessImpact:
      "Memastikan bukti serah terima terdokumentasi rapi dan memangkas waktu verifikasi armada di lapangan.",
    icon: <MobileIcon className="h-6 w-6" />,
  },
];

export const CONTACT_INFO_ITEMS: ContactInfoItem[] = [
  {
    icon: <EnvelopeClosedIcon className="h-5 w-5" />,
    title: "Email Resmi Konsultasi",
    content: "contact@naykon.id",
    isLink: true,
    linkHref: "mailto:contact@naykon.id",
  },
  {
    icon: <ClockIcon className="h-5 w-5" />,
    title: "Jam Kerja Operasional",
    content: "Senin – Jumat, 09.00 – 18.00 WIB",
  },
  {
    icon: <ChatBubbleIcon className="h-5 w-5" />,
    title: "Komitmen Respons",
    content: "Tinjauan spesifikasi & estimasi dalam 1x24 jam kerja",
  },
];
