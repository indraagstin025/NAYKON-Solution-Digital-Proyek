# Next Karya Digital Solutions

Platform digital dan sistem terpadu **Next Karya Digital Solutions** (`nextkarya.web.id`): Mitra rekayasa perangkat lunak modern, pembuatan website performa tinggi, sistem CMS, dan aplikasi mobile untuk bisnis dan UMKM.

Domain Resmi: [https://nextkarya.web.id](https://nextkarya.web.id)  
Kontak Resmi: [contact@nextkarya.web.id](mailto:contact@nextkarya.web.id)

---

## 1. Arsitektur & Teknologi Sistem

* **Frontend Web**: Next.js (App Router), React 19, Tailwind CSS v4, TypeScript
* **Backend API**: Express.js (TypeScript) REST API (`/api/v1`)
* **ORM & Database**: Prisma ORM, Raw SQL untuk agregasi dan pemeliharaan, PostgreSQL
* **Cache & In-Memory**: Redis (rate limiting O(1), verifikasi token darurat, buffer analitik)
* **Mobile App Companion**: Flutter (Android & iOS)

---

## 2. Struktur Rute Website Publik

* `/` : Beranda (Hero, Profil Singkat, Layanan Utama, Alur Kerja, Portofolio, Kontak)
* `/tentang-kami` : Profil Tim, Komitmen Rekayasa, Standar Kualitas
* `/layanan` : Solusi Website Bisnis, Aplikasi Kustom, Desain UI/UX
* `/portofolio` : Studi Kasus Proyek & Hasil Solusi Digital
* `/blog` : Publikasi Artikel, Edukasi Teknologi, dan Panduan Bisnis
* `/kontak` : Saluran Komunikasi Resmi & Formulir Konsultasi (dengan proteksi honeypot & rate limit)

---

## 3. Dokumentasi Kanonik Sistem

Seluruh spesifikasi teknis, skema basis data, dan kontrak API tersentralisasi di dalam direktori `docs/`:

* [docs/README.md](./docs/README.md) : Indeks Utama Dokumentasi Kanonik
* [docs/system-architecture-v1.0.md](./docs/system-architecture-v1.0.md) : Cetak Biru Arsitektur Terintegrasi
* [docs/schema-database-v1.1.md](./docs/schema-database-v1.1.md) : Struktur 20 Tabel PostgreSQL & Prisma
* [docs/api-contracts-v1.0.md](./docs/api-contracts-v1.0.md) : Kontrak REST API /api/v1 & Validasi Zod
* [docs/cms-v2.2.md](./docs/cms-v2.2.md) : Spesifikasi Sistem Manajemen Konten (CMS)
* [docs/analytics-v2.2.md](./docs/analytics-v2.2.md) : Mesin Pengukur Trafik Ringan & Privasi
* [docs/crm-v2.2.md](./docs/crm-v2.2.md) : Manajemen Prospek (Leads) & Agenda Tim
* [docs/architecture-desktop-vs-mobile-v1.1.md](./docs/architecture-desktop-vs-mobile-v1.1.md) : Peran Desktop Web vs Mobile Flutter

---

## 4. Menjalankan Website Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada peramban web untuk melihat antarmuka website.
