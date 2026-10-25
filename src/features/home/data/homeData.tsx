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
      "Arsitektur modern yang cepat, aman dari celah kerentanan, dan mudah dikembangkan untuk kebutuhan jangka panjang bisnis Anda.",
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
      "Website profil bisnis dan landing page berkecepatan tinggi yang dirancang untuk membangun kredibilitas, meningkatkan konversi prospek, dan ramah seluler.",
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
      "Aplikasi Android dan iOS yang responsif, intuitif, dan terintegrasi aman dengan database server dan sistem alur kerja bisnis Anda.",
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
    category: "Website Bisnis",
    categorySlug: "website",
    clientSector: "Manufaktur & Konstruksi B2B",
    title: "Nusa Mandiri Precast - Portal Bisnis & Katalog B2B",
    description:
      "Website profil usaha manufaktur beton pracetak dengan katalog produk digital terstruktur, formulir permintaan penawaran harga otomatis, serta optimasi SEO halaman spesifikasi.",
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
    id: "landing-page",
    name: "Website Landing Page",
    badge: "Cepat & Efektif",
    isRecommended: false,
    priceLabel: "Estimasi Investasi",
    price: "Rp 750.000 – 1.750.000",
    description:
      "Pembuatan website satu halaman untuk mempromosikan produk, layanan, acara, atau kampanye bisnis dengan fokus konversi tinggi.",
    features: [
      "1 Halaman responsif (5–8 section konten terstruktur)",
      "Desain responsif mobile & desktop sesuai identitas brand",
      "Integrasi tombol WhatsApp & formulir kontak langsung",
      "Optimasi dasar judul halaman & metadata SEO",
      "Termasuk Dashboard Analitik Tingkat Dasar NAIKON",
      "Lacak klik tombol WhatsApp & trafik 30 hari terakhir",
      "Garansi teknis 14–30 hari & revisi hingga 2 putaran",
    ],
    ctaText: "Pilih Landing Page",
    ctaHref: "/kontak",
  },
  {
    id: "company-profile",
    name: "Website Company Profile",
    badge: "Paling Populer",
    isRecommended: true,
    priceLabel: "Estimasi Investasi",
    price: "Rp 1.750.000 – 4.000.000",
    description:
      "Pembuatan website profil resmi untuk memperkenalkan bisnis, UMKM, atau penyedia jasa melalui profil, layanan, dan portofolio.",
    features: [
      "5 – 8 Halaman utama (Beranda, Profil, Layanan, Kontak, Galeri)",
      "Desain responsif mobile-first & integrasi peta lokasi",
      "Integrasi tombol WhatsApp, formulir pesan, & media sosial",
      "Optimasi struktur SEO Google & Google Search Console",
      "Termasuk Dashboard Analitik Tingkat Dasar (Pantau layanan terpopuler)",
      "Dapat di-upgrade langsung ke modul CMS NAIKON",
      "Garansi teknis 30 hari & revisi hingga 3 putaran",
    ],
    ctaText: "Pilih Company Profile",
    ctaHref: "/kontak",
  },
  {
    id: "portofolio-personal",
    name: "Website Portofolio Personal",
    badge: "Personal Branding",
    isRecommended: false,
    priceLabel: "Estimasi Investasi",
    price: "Rp 1.000.000 – 2.750.000",
    description:
      "Website personal untuk menampilkan profil profesional, keahlian, riwayat pendidikan/pengalaman, sertifikasi, dan katalog karya.",
    features: [
      "Halaman profil diri & showcase portofolio proyek terstruktur",
      "Bagian keahlian, pengalaman, sertifikasi, & riwayat kerja",
      "Tautan profesional terintegrasi (LinkedIn, GitHub, Resume/CV)",
      "Desain visual elegan & responsif sesuai identitas personal",
      "Termasuk Dashboard Analitik Tingkat Dasar (Pantau karya terpopuler)",
      "Optimasi dasar metadata SEO agar nama mudah ditemukan",
      "Garansi teknis 30 hari & revisi 2–3 putaran",
    ],
    ctaText: "Pilih Portofolio Personal",
    ctaHref: "/kontak",
  },
  {
    id: "sekolah",
    name: "Website Sekolah & Institusi",
    badge: "Edukasi Terpusat",
    isRecommended: false,
    priceLabel: "Estimasi Investasi",
    price: "Rp 2.500.000 – 4.500.000",
    description:
      "Website informasi resmi untuk sekolah atau lembaga pendidikan guna menyampaikan profil, fasilitas, agenda, dan pengumuman.",
    features: [
      "Halaman profil sekolah, visi-misi, fasilitas, & tenaga pengajar",
      "Halaman publikasi berita, agenda kegiatan, galeri, & pengumuman",
      "Navigasi ramah & mudah diakses orang tua, siswa, & masyarakat",
      "Integrasi media sosial resmi & peta lokasi Google Maps",
      "Termasuk Dashboard Analitik Tingkat Dasar (Upgrade Menengah bila ada CMS)",
      "Panduan penggunaan & pelatihan dasar pengelolaan bagi admin sekolah",
      "Garansi teknis 30–45 hari untuk modul yang disepakati",
    ],
    ctaText: "Konsultasi Web Sekolah",
    ctaHref: "/kontak",
  },
  {
    id: "komunitas-organisasi",
    name: "Website Komunitas & Organisasi",
    badge: "Publikasi Terstruktur",
    isRecommended: false,
    priceLabel: "Estimasi Investasi",
    price: "Rp 2.000.000 – 4.000.000",
    description:
      "Website untuk organisasi mahasiswa, komunitas sosial/hobi, lembaga kepemudaan, atau asosiasi profesi.",
    features: [
      "Profil organisasi, visi-misi, & struktur kepengurusan",
      "Informasi program kerja, agenda kegiatan, & galeri dokumentasi",
      "Pusat informasi berita & pengumuman resmi lintas periode",
      "Desain responsif & terhubung ke kanal media sosial",
      "Termasuk Dashboard Analitik Tingkat Dasar (Upgrade Menengah bila ada CMS)",
      "Panduan operasional dasar untuk pengurus organisasi",
      "Garansi teknis 30–45 hari untuk fungsi dalam lingkup kerja",
    ],
    ctaText: "Konsultasi Web Komunitas",
    ctaHref: "/kontak",
  },
  {
    id: "portal-berita-cms",
    name: "Website Portal Berita (CMS)",
    badge: "CMS & Analitik Lengkap",
    isRecommended: false,
    priceLabel: "Estimasi Investasi",
    price: "Rp 5.500.000 – 10.000.000",
    description:
      "Website dengan Content Management System (CMS) mandiri untuk menerbitkan dan mengelola berita, artikel, dan pengumuman secara dinamis.",
    features: [
      "Dashboard Admin CMS mandiri (Kelola artikel, kategori, & gambar)",
      "Halaman daftar & detail artikel dengan fitur pencarian cepat",
      "Manajemen status publikasi & profil informasi penulis",
      "Termasuk Dashboard Analitik Tingkat Menengah (Satu panel dengan CMS)",
      "Statistik real-time, artikel terpopuler, durasi baca, & ekspor CSV",
      "Optimasi SEO On-Page dinamis untuk setiap publikasi berita",
      "Panduan penggunaan sistem & garansi teknis 30–45 hari",
    ],
    ctaText: "Pilih Portal Berita CMS",
    ctaHref: "/kontak",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "durasi-pengerjaan",
    question: "Berapa lama estimasi waktu pengerjaan proyek di NAIKON?",
    answer:
      "Waktu pengerjaan bergantung pada skala proyek. Untuk Landing Page atau paket Starter, pengerjaan biasanya berkisar antara 2 – 4 hari kerja. Untuk Website Bisnis lengkap berkisar 5 – 10 hari kerja. Sementara untuk Aplikasi Web kustom atau Aplikasi Mobile, jadwal disesuaikan dengan roadmap sprint Agile yang disepakati bersama tim kami sejak awal.",
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
      "Secara umum, materi awal mencakup logo usaha, profil singkat bisnis, daftar layanan/produk, dan kontak resmi. Namun jika Anda belum memiliki konten yang tersusun rapi, tim kami siap membantu menyusun arsitektur informasi dan memberikan template materi yang mudah diisi.",
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
