import React from "react";
import { LayersIcon, GlobeIcon, MobileIcon, DesktopIcon } from "@radix-ui/react-icons";

export interface PortfolioProject {
  id: string;
  category: string;
  categorySlug: "all" | "webapp" | "website" | "mobile";
  clientSector: string;
  title: string;
  description: string;
  tech: string[];
  impact: string;
  metric: string;
  icon: React.ReactNode;
}

export const PORTFOLIO_CASES: PortfolioProject[] = [
  {
    id: "karsa-logistics",
    category: "Aplikasi Web Internal",
    categorySlug: "webapp",
    clientSector: "Logistik & Pergudangan",
    title: "Karsa Logistics Hub - Portal Operasional & Inventaris",
    description:
      "Sistem dasbor terpusat untuk memantau pergerakan stok multi-gudang, rekapitulasi transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga manajemen.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    impact:
      "Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi laporan operasional harian hingga 65%.",
    metric: "Efisiensi +65%",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    id: "nusa-precast",
    category: "Website Korporasi",
    categorySlug: "website",
    clientSector: "Manufaktur & Konstruksi B2B",
    title: "Nusa Mandiri Precast - Portal Korporasi & Katalog B2B",
    description:
      "Website profil perusahaan manufaktur beton pracetak dengan katalog produk digital terstruktur, formulir permintaan penawaran harga otomatis, serta optimasi SEO halaman spesifikasi.",
    tech: ["React", "Next.js", "SEO Engine", "Headless CMS"],
    impact:
      "Mempermudah eksplorasi katalog produk bagi mitra kontraktor dan meningkatkan penerimaan penawaran harga terverifikasi hingga 3x lipat.",
    metric: "Konversi B2B 3x",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
  {
    id: "medikalink-express",
    category: "Aplikasi Mobile",
    categorySlug: "mobile",
    clientSector: "Layanan Kesehatan & Farmasi",
    title: "MedikaLink Express - Aplikasi Pelacakan Pengantaran Resep",
    description:
      "Aplikasi mobile bagi armada pengiriman obat yang dilengkapi konfirmasi tanda tangan digital penerima, pelacakan rute kurir real-time, dan notifikasi jadwal pengantaran pasien.",
    tech: ["React Native", "REST API", "E-Signature", "Mapbox"],
    impact:
      "Memastikan bukti serah terima terdokumentasi akurat dan memangkas waktu verifikasi lapangan tanpa sengketa pengantaran.",
    metric: "Akurasi 99.8%",
    icon: <MobileIcon className="h-6 w-6" />,
  },
  {
    id: "finops-dashboard",
    category: "Aplikasi Web Internal",
    categorySlug: "webapp",
    clientSector: "Finansial & Akuntansi Multi-Cabang",
    title: "FinOps Enterprise - Dasbor Konsolidasi Keuangan & Pajak",
    description:
      "Platform analisis keuangan real-time untuk memantau cash flow 12 kantor cabang, rekonsiliasi bank otomatis, dan ekspor laporan perpajakan compliant.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    impact:
      "Memangkas waktu tutup buku bulanan dari 7 hari kerja menjadi hanya 1.5 hari berkat rekonsiliasi otomatis terpadu.",
    metric: "Tutup Buku 4x Cepat",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    id: "artha-retail-pos",
    category: "Sistem Web & PWA",
    categorySlug: "webapp",
    clientSector: "Ritel & Waralaba",
    title: "Artha POS Cloud - Sistem Kasir & Manajemen Stok Multi-Outlet",
    description:
      "Sistem kasir cloud point-of-sale berbasis PWA yang tetap dapat beroperasi saat koneksi internet terputus, dilengkapi sinkronisasi stok otomatis saat online.",
    tech: ["PWA", "React", "PostgreSQL", "IndexedDB"],
    impact:
      "Mencegah kebocoran stok ritel hingga 0% dan memastikan antrean kasir tetap berjalan lancar tanpa terganggu kendala sinyal.",
    metric: "Uptime 99.9%",
    icon: <DesktopIcon className="h-6 w-6" />,
  },
  {
    id: "aura-living",
    category: "Website & E-Commerce",
    categorySlug: "website",
    clientSector: "Home Decor & Furnitur Ekspor",
    title: "Aura Living Studio - E-Commerce Furnitur Kustom B2C & B2B",
    description:
      "Platform e-commerce katalog furnitur desainer dengan kalkulator ongkos kirim kargo otomatis, integrasi payment gateway multi-metode, dan fitur request custom order.",
    tech: ["Next.js", "Midtrans", "Tailwind CSS", "PostgreSQL"],
    impact:
      "Membuka jalur penjualan langsung ke konsumen nasional dan mencatatkan kenaikan transaksi pemesanan kustom sebesar 120%.",
    metric: "Penjualan +120%",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
];
