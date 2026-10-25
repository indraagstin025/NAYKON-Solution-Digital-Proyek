import React from "react";
import { LayersIcon, GlobeIcon, MobileIcon } from "@radix-ui/react-icons";

export const PORTFOLIO_CASES = [
  {
    id: "inventory-portal",
    category: "Aplikasi Web Internal",
    title: "Portal Operasional & Inventaris",
    description:
      "Sistem dasbor terpusat untuk memantau stok multi-gudang, rekapitulasi transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga manajemen.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    impact:
      "Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi laporan operasional secara terpusat.",
    icon: <LayersIcon className="h-6 w-6" />,
  },
  {
    id: "b2b-portal",
    category: "Website Korporasi",
    title: "Portal Korporasi & Katalog B2B",
    description:
      "Website profil perusahaan manufaktur dengan katalog produk digital terstruktur, formulir permintaan penawaran harga, serta optimasi SEO halaman spesifikasi.",
    tech: ["React", "SEO Engine", "Headless CMS"],
    impact:
      "Mempermudah eksplorasi katalog produk bagi mitra bisnis dan menertibkan jalur penerimaan penawaran harga.",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
  {
    id: "logistics-app",
    category: "Aplikasi Mobile",
    title: "Aplikasi Pelacakan Distribusi",
    description:
      "Aplikasi mobile bagi armada pengiriman barang yang dilengkapi konfirmasi tanda tangan digital penerima dan pembaruan rute pengantaran secara langsung.",
    tech: ["iOS & Android", "REST API", "E-Signature"],
    impact:
      "Memastikan bukti serah terima terdokumentasi rapi dan memangkas waktu verifikasi armada di lapangan.",
    icon: <MobileIcon className="h-6 w-6" />,
  },
];
