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
  PricingPlan,
  FaqItem,
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
      "Kami memahami proses bisnis Anda terlebih dahulu sebelum menulis baris kode pertama, memastikan teknologi yang dibuat memecahkan kendala operasional riil.",
  },
  {
    icon: <LightningBoltIcon className="h-5 w-5" />,
    title: "Metodologi Agile & Iteratif",
    description:
      "Pengembangan bertahap dengan update berkala dan transparansi progres, sehingga Anda selalu tahu setiap perkembangan dan sistem fleksibel terhadap perubahan.",
  },
  {
    icon: <CodeIcon className="h-5 w-5" />,
    title: "Standar Kode Teruji & Skalabilitas Tinggi",
    description:
      "Arsitektur modern yang cepat, aman dari celah kerentanan, dan mudah dikembangkan untuk kebutuhan jangka panjang perusahaan Anda.",
  },
  {
    icon: <CheckCircledIcon className="h-5 w-5" />,
    title: "Transparansi Biaya & Garansi Purnajual",
    description:
      "Biaya jelas dan pasti di awal tanpa biaya tersembunyi, disertai garansi perbaikan bug dan pendampingan teknis setelah sistem resmi dirilis.",
  },
];

export const SERVICES_TEASERS: ServiceTeaserItem[] = [
  {
    id: "website",
    category: "Website",
    title: "Pembuatan Website Bisnis",
    description:
      "Website korporasi dan landing page berkecepatan tinggi yang dirancang untuk membangun kredibilitas, meningkatkan konversi prospek, dan ramah seluler.",
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
      "Penyegaran tampilan antarmuka dan refaktorisasi kode website lama yang lambat atau usang menjadi sistem modern berstandar Google Core Web Vitals tinggi.",
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
      "Pengembangan sistem internal berbasis web seperti dashboard analitik operasional, manajemen inventaris pergudangan, portal karyawan, dan alur data terpusat.",
    tags: ["Dashboard Analitik", "Database Relasional", "Integrasi REST API", "Hak Akses Bertingkat"],
    linkText: "Konsultasi Web App",
    linkHref: "/kontak",
    icon: <CodeIcon className="h-6 w-6" />,
  },
  {
    id: "mobile",
    category: "Mobile App",
    title: "Pengembangan Aplikasi Mobile",
    description:
      "Aplikasi Android dan iOS yang responsif, intuitif, dan terintegrasi aman dengan database server dan sistem manajemen bisnis perusahaan Anda.",
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
    id: "karsa-logistics",
    category: "Aplikasi Web Internal",
    categorySlug: "webapp",
    clientSector: "Logistik & Pergudangan",
    title: "Karsa Logistics Hub - Portal Operasional & Inventaris",
    description:
      "Sistem dasbor terpusat untuk memantau pergerakan stok multi-gudang, rekapitulasi transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga manajemen.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    businessImpact:
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
    businessImpact:
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
    businessImpact:
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
    businessImpact:
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
    businessImpact:
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
    businessImpact:
      "Membuka jalur penjualan langsung ke konsumen nasional dan mencatatkan kenaikan transaksi pemesanan kustom sebesar 120%.",
    metric: "Penjualan +120%",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Bisnis",
    badge: "Cepat & Efisien",
    isRecommended: false,
    priceLabel: "Mulai dari",
    price: "Rp 1.500.000",
    description:
      "Paket ideal untuk Personal Branding, Landing Page promosi spesifik, atau UMKM yang membutuhkan kehadiran digital profesional dalam waktu singkat.",
    features: [
      "Estimasi pengerjaan cepat (2 – 4 hari kerja)",
      "1 – 3 Halaman responsif modern (Mobile, Tablet, Desktop)",
      "Desain antarmuka bersih & profesional",
      "Integrasi formulir pesan & tombol WhatsApp resmi",
      "Setup domain & sertifikat keamanan SSL gratis",
      "Garansi teknis perbaikan error & bug 30 hari",
    ],
    ctaText: "Pilih Paket Starter",
    ctaHref: "/kontak",
  },
  {
    id: "corporate",
    name: "Corporate Pro",
    badge: "Paling Populer",
    isRecommended: true,
    priceLabel: "Mulai dari",
    price: "Rp 3.500.000",
    description:
      "Solusi terlengkap untuk Perusahaan, Korporasi, dan Bisnis Berkembang yang mengutamakan kredibilitas tinggi, optimasi SEO Google, dan kemudahan update konten.",
    features: [
      "Estimasi pengerjaan terstruktur (5 – 10 hari kerja)",
      "4 – 8 Halaman lengkap (Beranda, Profil, Layanan, Portofolio, dsb.)",
      "Panel Admin / CMS untuk kemudahan update konten mandiri",
      "Struktur SEO On-Page teroptimasi & Google Analytics",
      "Skor kecepatan Google PageSpeed tinggi (Core Web Vitals)",
      "Panduan penggunaan sistem & pelatihan bagi tim Anda",
      "Garansi teknis prioritas & pendampingan 60 hari",
    ],
    ctaText: "Pilih Corporate Pro",
    ctaHref: "/kontak",
  },
  {
    id: "enterprise",
    name: "Enterprise & Kustom",
    badge: "Kustom Arsitektur",
    isRecommended: false,
    priceLabel: "Estimasi berdasarkan",
    price: "Kebutuhan Sistem",
    description:
      "Dirancang khusus untuk sistem bisnis yang membutuhkan logika kompleks seperti Web App internal, Dashboard analitik, Portal multi-cabang, atau Aplikasi Mobile.",
    features: [
      "Perancangan arsitektur sistem & database relasional kustom",
      "Aplikasi Web internal atau Aplikasi Mobile (Android & iOS)",
      "Integrasi REST API pihak ketiga & Payment Gateway",
      "Sistem otentikasi aman & pembagian hak akses bertingkat",
      "Pengujian otomatis & QA menyeluruh",
      "Dokumentasi arsitektur sistem & kode sumber lengkap",
      "SLA prioritas & opsi pemeliharaan sistem berkala",
    ],
    ctaText: "Konsultasi Kustom",
    ctaHref: "/kontak",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "durasi-pengerjaan",
    question: "Berapa lama estimasi waktu pengerjaan proyek di NAIKON?",
    answer:
      "Waktu pengerjaan bergantung pada skala proyek. Untuk Landing Page atau paket Starter, pengerjaan biasanya berkisar antara 2 – 4 hari kerja. Untuk Website Korporasi lengkap berkisar 5 – 10 hari kerja. Sementara untuk Aplikasi Web kustom atau Aplikasi Mobile, jadwal disesuaikan dengan roadmap sprint Agile yang disepakati bersama sejak awal.",
  },
  {
    id: "garansi-teknis",
    question: "Apakah ada garansi setelah website atau aplikasi selesai diluncurkan?",
    answer:
      "Ya, setiap proyek NAIKON dilindungi garansi teknis resmi minimal 30 hingga 60 hari pasca-peluncuran. Jika ditemukan kendala, bug, atau error dari kode yang kami bangun, tim kami akan memperbaikinya secara cepat tanpa biaya tambahan.",
  },
  {
    id: "materi-klien",
    question: "Apa saja materi yang perlu disiapkan oleh pihak klien?",
    answer:
      "Secara umum, materi awal mencakup logo perusahaan, profil singkat bisnis, daftar layanan/produk, dan kontak resmi. Namun jika Anda belum memiliki konten yang tersusun rapi, tim NAIKON siap membantu menyusun arsitektur informasi dan memberikan template materi yang mudah diisi.",
  },
  {
    id: "mobile-dan-seo",
    question: "Apakah website yang dibangun sudah mobile-friendly dan ramah SEO?",
    answer:
      "Tentu. Seluruh website yang kami rancang menggunakan pendekatan Mobile-First yang responsif di semua perangkat (smartphone, tablet, monitor lebar). Kode kami juga terstruktur dengan tag semantik SEO, open graph social media, dan Core Web Vitals berkecepatan tinggi agar mudah terindeks mesin pencari Google.",
  },
  {
    id: "skema-pembayaran",
    question: "Bagaimana skema pembayaran dan tahapan pengerjaan di NAIKON?",
    answer:
      "Kami menerapkan skema pembayaran bertahap yang transparan dan aman bagi kedua pihak: Uang Muka (Down Payment) sebesar 40-50% saat proyek dimulai, dan pelunasan dilakukan setelah proses revisi disetujui serta aplikasi siap ditayangkan (Go-Live). Untuk proyek skala besar, kami juga menyediakan skema milestone berbasis sprint.",
  },
  {
    id: "kelola-mandiri",
    question: "Apakah saya bisa mengelola atau mengubah isi konten website sendiri?",
    answer:
      "Bisa. Untuk paket Corporate Pro dan Enterprise, kami menyediakan panel admin / CMS yang intuitif sehingga Anda atau tim admin dapat mengubah teks, menambah gambar produk, maupun menerbitkan artikel blog baru tanpa perlu memahami koding.",
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
