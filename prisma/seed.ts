import { PrismaClient, Role, ContentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai proses seeding database NAIKON...');

  // ---------------------------------------------------------------------------
  // 1. PENGGUNA: SUPER ADMIN
  // ---------------------------------------------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@naykon.id';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'AdminNaykon2026!';
  const passwordHash = bcrypt.hashSync(defaultPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      name: 'Admin NAIKON',
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN,
      isActive: true,
    },
  });
  console.log(`✅ User Admin siap: ${admin.email} (Password: ${defaultPassword})`);

  // ---------------------------------------------------------------------------
  // 2. KATEGORI BLOG & TAG
  // ---------------------------------------------------------------------------
  const categoriesData = [
    { name: 'Umum', slug: 'umum', description: 'Kategori umum dan pengumuman NAIKON', color: '#64748b', sortOrder: 0 },
    { name: 'Arsitektur Web', slug: 'arsitektur-web', description: 'Wawasan arsitektur website modern dan performa tinggi', color: '#0284c7', sortOrder: 1 },
    { name: 'Sistem Internal', slug: 'sistem-internal', description: 'Pembahasan dasbor, otomatisasi bisnis, dan sistem manajemen data', color: '#8b5cf6', sortOrder: 2 },
    { name: 'Rekayasa Perangkat Lunak', slug: 'rekayasa-perangkat-lunar', description: 'Praktik engineering bersih, keamanan, dan skalabilitas sistem', color: '#10b981', sortOrder: 3 },
  ];

  const categories: Record<string, { id: string }> = {};
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = record;
  }
  console.log(`✅ ${categoriesData.length} Kategori konten tersimpan.`);

  const tagsData = [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Next.js', slug: 'nextjs' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Optimasi SEO', slug: 'optimasi-seo' },
    { name: 'UI/UX', slug: 'ui-ux' },
    { name: 'B2B', slug: 'b2b' },
  ];

  for (const tag of tagsData) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }
  console.log(`✅ ${tagsData.length} Tag artikel tersimpan.`);

  // ---------------------------------------------------------------------------
  // 3. LAYANAN (SERVICES)
  // ---------------------------------------------------------------------------
  const servicesData = [
    {
      title: 'Pembuatan Website Bisnis',
      slug: 'pembuatan-website-bisnis',
      category: 'Website',
      shortDesc: 'Website profil bisnis, company profile, dan landing page yang berfokus pada kredibilitas, konversi, dan pengalaman pengguna.',
      description: {
        intro: 'Website profil bisnis modern yang memadukan kecepatan muat tinggi, arsitektur SEO on-page, dan visual elegan untuk memperkuat citra profesional perusahaan Anda.',
        deliverables: [
          'Desain responsif mobile-first',
          'Arsitektur SEO Google & Open Graph sosial',
          'Integrasi formulir kontak & WhatsApp resmi',
          'Dashboard analitik performa terpadu',
        ],
      },
      features: ['Company Profile', 'Landing Page', 'Optimasi SEO', 'Panel Admin / CMS'],
      icon: 'GlobeIcon',
      ctaLabel: 'Konsultasi Pembuatan Web',
      ctaHref: '/kontak',
      sortOrder: 1,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Redesign & Optimalisasi Website',
      slug: 'redesign-optimalisasi-website',
      category: 'Penyegaran',
      shortDesc: 'Memodernisasi tampilan dan kode website lama yang lambat, tidak responsif, atau usang menjadi antarmuka modern dengan skor kecepatan Google PageSpeed tinggi.',
      description: {
        intro: 'Transformasi menyeluruh sistem website lawas tanpa kehilangan peringkat SEO lama, menghasilkan situs baru yang cepat, ringan, dan mudah dikelola.',
        deliverables: [
          'Audit kode dan performa awal',
          'Penyegaran antarmuka UI/UX modern',
          'Migrasi konten tanpa down time',
          'Peningkatan skor Google Core Web Vitals',
        ],
      },
      features: ['Penyegaran UI/UX', 'Kecepatan Loading', 'Mobile-First', 'Migrasi Konten Aman'],
      icon: 'UpdateIcon',
      ctaLabel: 'Konsultasi Redesign',
      ctaHref: '/kontak',
      sortOrder: 2,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Aplikasi Web & Dashboard Kustom',
      slug: 'aplikasi-web-dashboard-kustom',
      category: 'Sistem Web',
      shortDesc: 'Pengembangan sistem internal berbasis web seperti dashboard operasional, inventaris pergudangan, portal karyawan, dan otomatisasi administrasi multi-cabang.',
      description: {
        intro: 'Bangun sistem perangkat lunak yang disesuaikan persis dengan alur kerja bisnis Anda, mengeliminasi kesalahan data spreadsheet dan mempercepat kolaborasi.',
        deliverables: [
          'Analisis alur kerja & skema database relasional',
          'Pembagian hak akses bertingkat (RBAC)',
          'Rekapitulasi laporan & ekspor data Excel/PDF',
          'Integrasi API pihak ketiga & payment gateway',
        ],
      },
      features: ['Dashboard Analitik', 'Database Relasional', 'Integrasi REST API', 'Hak Akses'],
      icon: 'CodeIcon',
      ctaLabel: 'Konsultasi Web App',
      ctaHref: '/kontak',
      sortOrder: 3,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Pengembangan Aplikasi Mobile',
      slug: 'pengembangan-aplikasi-mobile',
      category: 'Mobile App',
      shortDesc: 'Pembuatan aplikasi Android dan iOS yang responsif, intuitif, dan terintegrasi dengan sistem alur kerja dan API server bisnis Anda.',
      description: {
        intro: 'Aplikasi mobile berperforma mulus untuk menjangkau pengguna di genggaman, dilengkapi fitur push notification dan sinkronisasi server real-time.',
        deliverables: [
          'Aplikasi lintas platform Android & iOS',
          'Desain antarmuka pengguna interaktif',
          'Sistem notifikasi & keamanan data',
          'Bantuan publikasi ke Google Play Store & Apple App Store',
        ],
      },
      features: ['Android & iOS', 'Push Notification', 'Integrasi Payment Gateway', 'Sinkronisasi Real-Time'],
      icon: 'MobileIcon',
      ctaLabel: 'Konsultasi Mobile App',
      ctaHref: '/kontak',
      sortOrder: 4,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  ];

  for (const svc of servicesData) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }
  console.log(`✅ ${servicesData.length} Layanan (Services) tersimpan.`);

  // ---------------------------------------------------------------------------
  // 4. PORTOFOLIO (STUDI KASUS)
  // ---------------------------------------------------------------------------
  const portfolioData = [
    {
      title: 'Karsa Logistics Hub - Portal Operasional & Inventaris',
      slug: 'karsa-logistics',
      category: 'Aplikasi Web Internal',
      clientSector: 'Logistik & Pergudangan',
      summary: 'Sistem dasbor terpusat untuk memantau pergerakan stok multi-gudang, rekapitulasi transaksi otomatis, dan pembagian hak akses bertingkat bagi staf hingga manajemen.',
      description: {
        problem: 'Pencatatan inventaris antar 4 gudang masih manual menggunakan spreadsheet terpisah, menyebabkan duplikasi data stok dan selisih laporan hingga 12% setiap akhir bulan.',
        solution: 'Membangun aplikasi web dasbor terpusat dengan database PostgreSQL dan otentikasi bertingkat, memungkinkan sinkronisasi mutasi barang secara instan.',
        result: 'Konsolidasi laporan operasional harian dipercepat hingga 65% dan selisih pencatatan inventaris berhasil ditekan mendekati nol.',
      },
      tech: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
      impact: 'Menghilangkan pencatatan ganda antar-cabang dan mempercepat konsolidasi laporan operasional harian hingga 65%.',
      metric: 'Efisiensi +65%',
      imageAlt: 'Tampilan antarmuka dasbor operasional inventaris multi-gudang Karsa Logistics Hub pada layar laptop',
      sortOrder: 1,
      featured: true,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Nusa Mandiri Precast - Portal Bisnis & Katalog B2B',
      slug: 'nusa-precast',
      category: 'Website Bisnis',
      clientSector: 'Manufaktur & Konstruksi B2B',
      summary: 'Website profil usaha manufaktur beton pracetak dengan katalog produk digital terstruktur, formulir permintaan penawaran harga otomatis, serta optimasi SEO halaman spesifikasi.',
      description: {
        problem: 'Calon kontraktor kesulitan mengunduh lembar spesifikasi teknis produk dan proses pengajuan penawaran tender berlangsung lambat lewat email bolak-balik.',
        solution: 'Merancang website B2B dengan navigasi katalog produk terstruktur, lembar spesifikasi instan, dan formulir permintaan harga terverifikasi.',
        result: 'Penerimaan permintaan penawaran harga terverifikasi meningkat hingga 3x lipat dalam kurun waktu 3 bulan pertama.',
      },
      tech: ['React', 'Next.js', 'SEO Engine', 'Headless CMS'],
      impact: 'Mempermudah eksplorasi katalog produk bagi mitra kontraktor dan meningkatkan penerimaan penawaran harga terverifikasi hingga 3x lipat.',
      metric: 'Konversi B2B 3x',
      imageAlt: 'Pratinjau website bisnis dan katalog spesifikasi beton pracetak B2B Nusa Mandiri Precast pada layar monitor',
      sortOrder: 2,
      featured: true,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'MedikaLink Express - Aplikasi Pelacakan Pengantaran Resep',
      slug: 'medikalink-express',
      category: 'Aplikasi Mobile',
      clientSector: 'Layanan Kesehatan & Farmasi',
      summary: 'Aplikasi mobile bagi armada pengiriman obat yang dilengkapi konfirmasi tanda tangan digital penerima, pelacakan rute kurir real-time, dan notifikasi jadwal pengantaran pasien.',
      description: {
        problem: 'Pengiriman obat resep membutuhkan akurasi tinggi dan bukti serah terima sah yang tidak bisa diwakilkan tanpa konfirmasi penerima.',
        solution: 'Mengembangkan aplikasi kurir mobile dengan validasi koordinat GPS dan tanda tangan digital terenkripsi.',
        result: 'Akurasi serah terima obat mencapai 99.8% dan verifikasi administrasi pengantaran dapat diselesaikan saat itu juga.',
      },
      tech: ['React Native', 'REST API', 'E-Signature', 'Mapbox'],
      impact: 'Memastikan bukti serah terima terdokumentasi akurat dan memangkas waktu verifikasi lapangan tanpa sengketa pengantaran.',
      metric: 'Akurasi 99.8%',
      imageAlt: 'Mockup dua smartphone menampilkan rute GPS kurir dan tanda tangan serah terima digital MedikaLink Express',
      sortOrder: 3,
      featured: true,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'FinOps Enterprise - Dasbor Konsolidasi Keuangan & Pajak',
      slug: 'finops-dashboard',
      category: 'Aplikasi Web Internal',
      clientSector: 'Finansial & Akuntansi Multi-Cabang',
      summary: 'Platform analisis keuangan real-time untuk memantau cash flow 12 kantor cabang, rekonsiliasi bank otomatis, dan ekspor laporan perpajakan compliant.',
      description: {
        problem: 'Proses penutupan buku kas akhir bulan untuk 12 kantor cabang memakan waktu 7 hari kerja karena rekonsiliasi bank masih dilakukan manual.',
        solution: 'Membangun dashboard konsolidasi keuangan dengan parser rekening koran otomatis dan kalkulator pajak terintegrasi.',
        result: 'Waktu tutup buku berhasil dipangkas dari 7 hari kerja menjadi hanya 1.5 hari.',
      },
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      impact: 'Memangkas waktu tutup buku bulanan dari 7 hari kerja menjadi hanya 1.5 hari berkat rekonsiliasi otomatis terpadu.',
      metric: 'Tutup Buku 4x Cepat',
      imageAlt: 'Tampilan dasbor analisis cash flow dan rekonsiliasi bank otomatis FinOps Enterprise pada laptop',
      sortOrder: 4,
      featured: false,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Artha POS Cloud - Sistem Kasir & Manajemen Stok Multi-Outlet',
      slug: 'artha-retail-pos',
      category: 'Sistem Web & PWA',
      clientSector: 'Ritel & Waralaba',
      summary: 'Sistem kasir cloud point-of-sale berbasis PWA yang tetap dapat beroperasi saat koneksi internet terputus, dilengkapi sinkronisasi stok otomatis saat online.',
      description: {
        problem: 'Outlet sering mengalami antrean kasir macet saat sinyal internet drop dan sering terjadi selisih stok fisik.',
        solution: 'Membangun sistem PWA dengan dukungan offline-first menggunakan IndexedDB lokal yang otomatis sync saat tersambung kembali ke internet.',
        result: 'Tingkat ketersediaan sistem kasir mencapai 99.9% dan kebocoran stok ritel berhasil dieliminasi.',
      },
      tech: ['PWA', 'React', 'PostgreSQL', 'IndexedDB'],
      impact: 'Mencegah kebocoran stok ritel hingga 0% dan memastikan antrean kasir tetap berjalan lancar tanpa terganggu kendala sinyal.',
      metric: 'Uptime 99.9%',
      imageAlt: 'Tampilan tablet kasir ritel Artha POS Cloud dengan katalog produk dan sinkronisasi transaksi online',
      sortOrder: 5,
      featured: false,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      title: 'Aura Living Studio - E-Commerce Furnitur Kustom B2C & B2B',
      slug: 'aura-living',
      category: 'Website & E-Commerce',
      clientSector: 'Home Decor & Furnitur Ekspor',
      summary: 'Platform e-commerce katalog furnitur desainer dengan kalkulator ongkos kirim kargo otomatis, integrasi payment gateway multi-metode, dan fitur request custom order.',
      description: {
        problem: 'Penjualan produk furnitur kustom sebelumnya hanya mengandalkan chat WhatsApp tanpa katalog varian material yang terstruktur.',
        solution: 'Mengembangkan platform belanja modern dengan visualisasi varian material, kalkulasi kargo volume otomatis, dan pembayaran Midtrans.',
        result: 'Pertumbuhan transaksi pemesanan kustom meningkat 120% dan jangkauan pasar meluas ke skala nasional.',
      },
      tech: ['Next.js', 'Midtrans', 'Tailwind CSS', 'PostgreSQL'],
      impact: 'Membuka jalur penjualan langsung ke konsumen nasional dan mencatatkan kenaikan transaksi pemesanan kustom sebesar 120%.',
      metric: 'Penjualan +120%',
      imageAlt: 'Tampilan katalog e-commerce furnitur kayu kustom Aura Living Studio dengan pilihan material pada layar laptop',
      sortOrder: 6,
      featured: false,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  ];

  for (const item of portfolioData) {
    await prisma.portfolio.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }
  console.log(`✅ ${portfolioData.length} Portofolio tersimpan.`);

  // ---------------------------------------------------------------------------
  // 5. PAKET HARGA (PRICING PLANS)
  // ---------------------------------------------------------------------------
  const pricingPlansData = [
    {
      name: 'Website Landing Page',
      priceLabel: 'Rp 750.000',
      priceNote: 'Mulai dari',
      description: 'Pembuatan landing page untuk mempromosikan produk, layanan, acara, atau kampanye promosi dengan alur konten yang fokus pada konversi.',
      features: [
        'Layout landing page responsif terstruktur sesuai alur konten',
        'Desain visual responsif mobile & desktop sesuai identitas brand',
        'Integrasi tombol WhatsApp resmi & formulir kontak langsung',
        'Optimasi dasar judul halaman & metadata SEO Google',
        'Termasuk Dashboard Analitik Tingkat Dasar buatan NAIKON',
        'Lacak klik tombol WhatsApp & grafik kunjungan 30 hari',
        'Garansi teknis 14 hingga 30 hari & pendampingan penyesuaian konten',
      ],
      badge: 'Cepat & Efektif',
      ctaLabel: 'Pilih Landing Page',
      ctaHref: '/kontak',
      sortOrder: 1,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      name: 'Website Company Profile',
      priceLabel: 'Rp 1.750.000',
      priceNote: 'Mulai dari',
      description: 'Pembuatan website profil resmi untuk memperkenalkan bisnis, UMKM, atau penyedia jasa melalui profil, layanan, dan portofolio.',
      features: [
        'Struktur halaman lengkap (Beranda, Profil Usaha, Layanan, Kontak, Galeri)',
        'Desain responsif mobile-first & integrasi peta lokasi Google Maps',
        'Integrasi tombol WhatsApp, formulir pesan, & media sosial',
        'Optimasi struktur SEO Google & Google Search Console',
        'Termasuk Dashboard Analitik Tingkat Dasar (Pantau layanan terpopuler)',
        'Fleksibel di-upgrade langsung ke modul CMS NAIKON kapan saja',
        'Garansi teknis 30 hari & pendampingan penyesuaian konten',
      ],
      badge: 'Paling Populer',
      ctaLabel: 'Pilih Company Profile',
      ctaHref: '/kontak',
      sortOrder: 2,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      name: 'Website Portofolio Personal',
      priceLabel: 'Rp 1.000.000',
      priceNote: 'Mulai dari',
      description: 'Website personal untuk menampilkan profil profesional, keahlian, riwayat pendidikan/pengalaman, sertifikasi, dan katalog karya.',
      features: [
        'Showcase profil profesional, katalog karya, & pencapaian proyek',
        'Bagian keahlian, pengalaman, sertifikasi, & riwayat kerja terstruktur',
        'Integrasi tautan profesional (LinkedIn, GitHub, Resume/CV, Kontak)',
        'Desain visual elegan & responsif sesuai identitas personal',
        'Termasuk Dashboard Analitik Tingkat Dasar (Pantau karya paling diminati)',
        'Optimasi metadata SEO agar profil mudah ditemukan di pencarian',
        'Garansi teknis 30 hari & pendampingan penyesuaian konten',
      ],
      badge: 'Personal Branding',
      ctaLabel: 'Pilih Portofolio Personal',
      ctaHref: '/kontak',
      sortOrder: 3,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      name: 'Website Sekolah & Institusi',
      priceLabel: 'Rp 2.500.000',
      priceNote: 'Mulai dari',
      description: 'Website informasi resmi untuk sekolah atau lembaga pendidikan guna menyampaikan profil, fasilitas, agenda, dan pengumuman.',
      features: [
        'Halaman informasi terpadu (Profil sekolah, visi-misi, fasilitas, & guru)',
        'Publikasi berita berkala, agenda kegiatan, galeri, & pengumuman',
        'Navigasi ramah & mudah diakses orang tua, siswa, & masyarakat',
        'Integrasi media sosial resmi & peta lokasi Google Maps',
        'Termasuk Dashboard Analitik Tingkat Dasar (Upgrade Menengah jika ada CMS)',
        'Panduan penggunaan & pelatihan pengelolaan bagi admin sekolah',
        'Garansi teknis 30 hingga 45 hari & dukungan pemeliharaan awal',
      ],
      badge: 'Edukasi Terpusat',
      ctaLabel: 'Konsultasi Web Sekolah',
      ctaHref: '/kontak',
      sortOrder: 4,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      name: 'Website Komunitas & Organisasi',
      priceLabel: 'Rp 2.000.000',
      priceNote: 'Mulai dari',
      description: 'Website untuk organisasi mahasiswa, komunitas sosial/hobi, lembaga kepemudaan, atau asosiasi profesi.',
      features: [
        'Profil organisasi, visi-misi, struktur pengurus, & kontak resmi',
        'Informasi program kerja, agenda kegiatan, & dokumentasi galeri',
        'Pusat informasi berita & pengumuman resmi lintas periode',
        'Desain responsif & terhubung ke kanal media sosial komunitas',
        'Termasuk Dashboard Analitik Tingkat Dasar (Upgrade Menengah jika ada CMS)',
        'Panduan operasional dasar bagi tim pengurus organisasi',
        'Garansi teknis 30 hingga 45 hari & dukungan penyesuaian konten',
      ],
      badge: 'Publikasi Terstruktur',
      ctaLabel: 'Konsultasi Web Komunitas',
      ctaHref: '/kontak',
      sortOrder: 5,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      name: 'Website Portal Berita (CMS)',
      priceLabel: 'Rp 5.500.000',
      priceNote: 'Mulai dari',
      description: 'Website dengan Content Management System (CMS) mandiri untuk menerbitkan dan mengelola berita, artikel, dan pengumuman secara dinamis.',
      features: [
        'Dashboard Admin CMS mandiri (Kelola artikel, kategori, & gambar)',
        'Halaman daftar & detail artikel dinamis dengan fitur pencarian cepat',
        'Manajemen status publikasi terstruktur & profil penulis',
        'Termasuk Dashboard Analitik Tingkat Menengah (Satu panel dengan CMS)',
        'Statistik real-time, artikel terpopuler, durasi baca, & ekspor data CSV',
        'Optimasi SEO On-Page dinamis untuk setiap publikasi artikel',
        'Panduan penggunaan sistem & garansi teknis 30 hingga 45 hari',
      ],
      badge: 'CMS & Analitik Lengkap',
      ctaLabel: 'Pilih Portal Berita CMS',
      ctaHref: '/kontak',
      sortOrder: 6,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  ];

  for (const plan of pricingPlansData) {
    const existing = await prisma.pricingPlan.findFirst({ where: { name: plan.name } });
    if (existing) {
      await prisma.pricingPlan.update({ where: { id: existing.id }, data: plan });
    } else {
      await prisma.pricingPlan.create({ data: plan });
    }
  }
  console.log(`✅ ${pricingPlansData.length} Paket Harga (Pricing Plans) tersimpan.`);

  // ---------------------------------------------------------------------------
  // 6. PERTANYAAN UMUM (FAQS)
  // ---------------------------------------------------------------------------
  const faqsData = [
    {
      question: 'Berapa lama estimasi waktu pengerjaan proyek di NAIKON?',
      answer: 'Waktu pengerjaan bergantung pada skala proyek. Untuk paket Website Landing Page atau Portofolio Personal, pengerjaan biasanya berkisar antara 3 hingga 5 hari kerja. Untuk Website Company Profile, Komunitas, atau Sekolah berkisar 5 hingga 10 hari kerja. Sementara untuk Portal Berita CMS atau aplikasi kustom, jadwal disesuaikan dengan ruang lingkup yang disepakati bersama tim kami sejak awal.',
      sortOrder: 1,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      question: 'Apakah ada garansi setelah website atau aplikasi selesai diluncurkan?',
      answer: 'Ya, setiap proyek NAIKON dilindungi garansi teknis resmi mulai dari 14 hingga 45 hari pasca-peluncuran sesuai paket layanan. Jika ditemukan kendala, bug, atau error dari kode yang tim kami bangun, kami akan memperbaikinya secara cepat tanpa biaya tambahan.',
      sortOrder: 2,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      question: 'Apa saja materi yang perlu disiapkan oleh pihak klien?',
      answer: 'Secara umum, materi awal mencakup logo usaha, profil singkat bisnis, daftar layanan/produk, dan kontak resmi. Namun jika Anda belum memiliki konten yang tersusun rapi, tim kami siap membantu menyusun arsitektur informasi dan memberikan template materi yang mudah diisi.',
      sortOrder: 3,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      question: 'Apakah website yang dibangun sudah mobile-friendly dan ramah SEO?',
      answer: 'Tentu. Seluruh website yang tim kami rancang menggunakan pendekatan Mobile-First yang responsif di semua perangkat (smartphone, tablet, monitor lebar). Kode kami juga terstruktur dengan tag semantik SEO, open graph social media, dan Core Web Vitals berkecepatan tinggi agar mudah terindeks mesin pencari Google.',
      sortOrder: 4,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      question: 'Bagaimana skema pembayaran dan tahapan pengerjaan di NAIKON?',
      answer: 'Tim kami menerapkan skema pembayaran bertahap yang transparan dan aman bagi kedua pihak: Uang Muka (Down Payment) sebesar 40 hingga 50% saat proyek dimulai, dan pelunasan dilakukan setelah proses revisi disetujui serta website siap ditayangkan (Go-Live).',
      sortOrder: 5,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    {
      question: 'Apakah saya bisa mengelola atau mengubah isi konten website sendiri?',
      answer: 'Bisa. Pada paket Website Portal Berita (CMS) maupun paket website yang ditambahkan modul CMS NAIKON, kami menyediakan panel admin intuitif sehingga Anda dapat mengubah teks, menambah galeri gambar, maupun menerbitkan artikel baru tanpa perlu memahami koding.',
      sortOrder: 6,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  ];

  for (const faq of faqsData) {
    const existing = await prisma.faq.findFirst({ where: { question: faq.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: faq });
    } else {
      await prisma.faq.create({ data: faq });
    }
  }
  console.log(`✅ ${faqsData.length} FAQ tersimpan.`);

  // ---------------------------------------------------------------------------
  // 7. ARTIKEL BLOG PERDANA
  // ---------------------------------------------------------------------------
  const articlesData = [
    {
      title: 'Mengapa Kecepatan Loading Website Sangat Menentukan Konversi Bisnis B2B',
      slug: 'mengapa-kecepatan-loading-website-menentukan-konversi-b2b',
      excerpt: 'Memahami bagaimana performa Core Web Vitals dan arsitektur frontend modern berdampak langsung pada kredibilitas bisnis di mata calon klien.',
      content: {
        type: 'doc',
        body: 'Di era digital yang serba cepat, waktu tunggu lebih dari 3 detik dapat menyebabkan 53% calon pengunjung meninggalkan website. Bagi bisnis B2B, website bukan sekadar brosur digital, melainkan etalase kredibilitas pertama yang dinilai oleh calon mitra atau klien.',
      },
      categorySlug: 'arsitektur-web',
      coverAlt: 'Ilustrasi kecepatan loading website dan performa tinggi pada perangkat desktop dan mobile',
      readingTime: 5,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
    },
    {
      title: 'Kapan Bisnis Anda Perlu Beralih dari Spreadsheet ke Dashboard Kustom?',
      slug: 'kapan-bisnis-perlu-beralih-dari-spreadsheet-ke-dashboard-kustom',
      excerpt: 'Tanda-tanda operasional bisnis mulai membutuhkan sistem terpusat untuk menghindari duplikasi data dan mempercepat laporan lintas cabang.',
      content: {
        type: 'doc',
        body: 'Spreadsheet adalah alat yang hebat untuk tahap awal. Namun, saat tim bertambah dan kantor cabang meluas, risiko salah input, formula yang terhapus, serta lambatnya rekonsiliasi data menjadi hambatan besar yang membutuhkan sistem dasbor berbasis web terpusat.',
      },
      categorySlug: 'sistem-internal',
      coverAlt: 'Antarmuka dasbor analitik bisnis modern dengan visualisasi data real-time',
      readingTime: 6,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
    },
    {
      title: 'Panduan Memilih Teknologi Website Bisnis yang Aman dan Mudah Dikembangkan',
      slug: 'panduan-memilih-teknologi-website-bisnis-yang-aman-dan-skalabel',
      excerpt: 'Hal-hal teknis yang perlu diperhatikan manajemen saat merencanakan pembangunan ulang website agar investasi digital bertahan jangka panjang.',
      content: {
        type: 'doc',
        body: 'Memilih fondasi teknologi bukan sekadar mengikuti tren. Arsitektur yang tepat seperti Next.js, database relasional PostgreSQL, dan type-safe TypeScript memastikan sistem Anda mudah dipelihara, aman dari kerentanan umum, dan siap diskalakan seiring pertumbuhan bisnis.',
      },
      categorySlug: 'rekayasa-perangkat-lunar',
      coverAlt: 'Arsitektur perangkat lunak modern dan diagram alur sistem web terintegrasi',
      readingTime: 7,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
    },
  ];

  for (const art of articlesData) {
    const category = categories[art.categorySlug] || categories['umum'];
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        excerpt: art.excerpt,
        content: art.content,
        coverAlt: art.coverAlt,
        readingTime: art.readingTime,
        status: art.status,
        publishedAt: art.publishedAt,
        authorId: art.authorId,
        categoryId: category.id,
      },
      create: {
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        coverAlt: art.coverAlt,
        readingTime: art.readingTime,
        status: art.status,
        publishedAt: art.publishedAt,
        authorId: art.authorId,
        categoryId: category.id,
      },
    });
  }
  console.log(`✅ ${articlesData.length} Artikel Blog perdana tersimpan.`);

  // ---------------------------------------------------------------------------
  // 8. SITE SETTING (PENGATURAN UMUM SITUS)
  // ---------------------------------------------------------------------------
  await prisma.siteSetting.upsert({
    where: { key: 'site_profile' },
    update: {
      value: {
        name: 'NAYKON Solution Digital',
        tagline: 'Solusi Teknologi & Rekayasa Perangkat Lunak',
        email: 'contact@naykon.id',
        workHours: 'Senin - Jumat, 09.00 - 18.00 WIB',
        responseCommitment: 'Balasan maksimal dalam 1x24 jam kerja',
        whatsapp: '+6282212345678',
        location: 'Bandung, Jawa Barat, Indonesia',
      },
    },
    create: {
      key: 'site_profile',
      value: {
        name: 'NAYKON Solution Digital',
        tagline: 'Solusi Teknologi & Rekayasa Perangkat Lunak',
        email: 'contact@naykon.id',
        workHours: 'Senin - Jumat, 09.00 - 18.00 WIB',
        responseCommitment: 'Balasan maksimal dalam 1x24 jam kerja',
        whatsapp: '+6282212345678',
        location: 'Bandung, Jawa Barat, Indonesia',
      },
    },
  });
  console.log(`✅ Pengaturan profil situs (Site Setting) tersimpan.`);

  console.log('🎉 Seeding database selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
