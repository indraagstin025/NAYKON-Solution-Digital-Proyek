# Spesifikasi & Daftar Fitur CMS (Headless & Multiplatform)
**Next Karya Digital Solutions**  
*Dokumen Arsitektur & Perencanaan Fitur Sistem Manajemen Konten*  
*Versi: 2.0 (Arsitektur Terpisah & Multiplatform Ready)*  
*Tanggal: 30 Oktober 2026*

---

## 1. Ringkasan Eksekutif & Konsep Arsitektur

Sistem CMS (Content Management System) Next Karya dirancang dengan pendekatan **Headless / Decoupled Architecture**. CMS ini berdiri sebagai **Web Aplikasi Terpisah** yang bertindak sebagai **Pusat Data (Central API Provider)** untuk melayani berbagai platform klien (*Multiplatform*):

1. **Website Publik (Next.js):** Mengonsumsi data artikel, portofolio, layanan, dan FAQ berkecepatan tinggi melalui REST API publik dan sistem *cache* instan (*On-Demand Revalidation*).
2. **Aplikasi Mobile (Android & iOS):** Mengakses data CMS dan operasional tim melalui REST API berotentikasi token.
3. **Integrasi Eksternal:** Menghubungkan aset media ke *Cloud Object Storage* dan mengirimkan *webhook* pembaruan data secara *real-time*.

```
                         ┌────────────────────────────────────────┐
                         │  WEB CMS & BACKEND API TERPISAH        │
                         │  (Pusat Database & Pengelolaan Konten) │
                         └───────────────────┬────────────────────┘
                                             │
                          RESTful JSON API / Webhook Sinyal
                                             │
           ┌─────────────────────────────────┴─────────────────────────────────┐
           ▼                                                                   ▼
┌──────────────────────────────────────┐             ┌──────────────────────────────────────┐
│  WEBSITE PUBLIK (Next.js)            │             │  APLIKASI MOBILE (Android & iOS)     │
│  - Konsumen Konten Publik            │             │  - Platform Mobile Multiplatform     │
│  - Rendering Ultra Cepat & Ramah SEO │             │  - Akses Tim & Pengelolaan Konten    │
└──────────────────────────────────────┘             └──────────────────────────────────────┘
```

---

## 2. Rincian Modul & Fitur CMS

### Pilar 1: Manajemen Konten Inti (*Core Content Management*)

#### 1.1 Artikel & Blog (*Technology Insights*)
* **Editor Teks Modern:** Mendukung format heading, teks tebal/miring, daftar berpoin/nomor, blok kutipan (*quotes*), penyisipan gambar, dan blok kode pemrograman (*code syntax*).
* **Manajemen Metadata:**
  - Judul artikel dan slug URL yang otomatis terbuat ramah SEO.
  - Ringkasan singkat (*excerpt*) untuk cuplikan kartu artikel.
  - Penandaan Kategori (*misal: Web Development, Mobile Apps, UI/UX, Cloud*).
  - Penandaan Tag dinamis untuk pencarian topik.
  - Gambar Sampul (*Cover Image*) dengan teks alternatif (*alt text*) untuk aksesibilitas.
  - Estimasi waktu baca (*reading time*) yang dihitung otomatis dari jumlah kata.
  - Penulis artikel (*Author*) dan kurasi artikel terkait (*Related Articles*).

#### 1.2 Portofolio & Studi Kasus Proyek (*Case Studies*)
* **Identitas Proyek:** Nama proyek, nama klien, dan sektor industri klien (*misal: FinTech, Kesehatan, E-Commerce, Manufaktur*).
* **Kategori Solusi:** Website Bisnis, Portal CMS, Aplikasi Web Kustom, atau Mobile App.
* **Dampak Bisnis (*Business Impact*):** Pernyataan ringkas dampak nyata solusi digital terhadap bisnis klien (*contoh: "Meningkatkan transaksi online sebesar 150%"*).
* **Metrik Keberhasilan (*Key Metrics*):** Angka capaian kuantitatif (*contoh: 99.9% Uptime, +40k Pengguna Aktif*).
* **Tumpukan Teknologi (*Tech Stack*):** Label teknologi yang dipakai (*contoh: Next.js, Flutter, PostgreSQL, Docker*).
* **Galeri Antarmuka:** Mockup tampilan layar desktop, tablet, dan smartphone dalam resolusi tinggi.
* **Proyek Unggulan (*Featured*):** Tombol sorotan agar proyek terpilih tampil otomatis di halaman depan beranda.
* **Tautan Langsung:** URL demo langsung atau tautan website live klien.

#### 1.3 Katalog Layanan & Paket Harga
* **Katalog Layanan:**
  - Judul layanan, ikon representasi, dan deskripsi manfaat bisnis.
  - Daftar poin keunggulan layanan (*feature checklist*).
  - Urutan prioritas tampil (*sort priority*).
  - Tombol aksi (*Call-to-Action*) kustom per layanan.
* **Paket Harga Website & Aplikasi:**
  - Nama paket, label harga, dan catatan durasi/tipe pembayaran.
  - Daftar fitur yang didapatkan klien pada paket tersebut.
  - Penanda paket rekomendasi (*Most Popular / Recommended Badge*).

#### 1.4 FAQ (*Frequently Asked Questions*)
* **Pengelompokan Topik:** Kategori pertanyaan (Teknis & Hosting, Skema Biaya, Garansi Purnajual, Durasi Pengerjaan).
* **Pertanyaan & Jawaban:** Jawaban lengkap dan mudah dipahami.
* **Kontrol Tampil:** Tombol aktif/nonaktif dan pengurutan posisi pertanyaan secara fleksibel.

#### 1.5 Testimoni Klien (*Social Proof*)
* **Data Klien:** Nama pemberi testimoni, jabatan, nama brand/perusahaan, dan logo perusahaan.
* **Ulasan:** Teks ulasan hasil kerja tim, rating bintang (skala 1 sampai 5).
* **Relasi:** Tautan ke portofolio studi kasus proyek terkait.

#### 1.6 Halaman Statis Kustom (*Pages*)
* Pengelolaan teks dan informasi untuk halaman seperti Kebijakan Privasi (*Privacy Policy*), Syarat Ketentuan (*Terms of Service*), maupun halaman promo khusus.

---

### Pilar 2: Alur Penerbitan Konten (*Editorial Workflow*)

* **Status Publikasi Lengkap:**
  1. **Draf (*Draft*):** Konten masih dalam penulisan dan belum ingin ditampilkan ke publik.
  2. **Tinjauan (*Review*):** Konten sudah selesai ditulis dan siap diperiksa sebelum tayang.
  3. **Terjadwal (*Scheduled*):** Konten disetel untuk terbit otomatis pada tanggal dan jam tertentu di masa depan.
  4. **Terbit (*Published*):** Konten aktif secara live dan langsung dapat diakses publik.
  5. **Arsip (*Archived*):** Konten disembunyikan dari publik tanpa menghapus data historisnya dari database.
* **Riwayat Revisi (*Version History*):**
  - Mencatat *snapshot* perubahan konten (waktu modifikasi dan akun pengubah).
  - Kemampuan mengembalikan isi konten ke versi sebelumnya (*rollback*) jika ada kekeliruan pengeditan.

---

### Pilar 3: Pengelola Media Terpusat (*Media Asset Manager*)

* **Pustaka Media Universal:**
  - Pengunggahan gambar (WebP, PNG, JPG, SVG) dan dokumen digital (PDF brosur, infografis).
  - Pencarian file berdasarkan nama dan filter berdasarkan tanggal atau tipe file.
* **Optimasi Gambar Otomatis:**
  - Kompresi ukuran file otomatis saat diunggah untuk menghemat ruang dan mempercepat loading pengunjung.
  - Ekstraksi metadata otomatis (resolusi lebar, tinggi, dan ukuran file).
* **Integrasi Cloud Storage:**
  - Penyimpanan file media terintegrasi ke *Cloud Object Storage* performa tinggi (seperti Cloudflare R2, AWS S3, atau Supabase Storage) dengan CDN global.

---

### Pilar 4: Pengaturan SEO & Pratinjau Media Sosial

* **SEO On-Page per Konten:**
  - Kustomisasi *Meta Title* dan *Meta Description* untuk mengoptimalkan peringkat di Google Search.
  - Gambar pratinjau media sosial (*Open Graph Image*) agar tampilan link di WhatsApp, LinkedIn, dan media sosial terlihat profesional dan rapi.
  - Pengaturan tag kanonikal (*Canonical URL*).
* **Pengalihan Otomatis (*301 Redirects*):**
  - Jika judul artikel diubah sehingga alamat slug URL berubah, CMS otomatis mencatat aturan pengalihan (*301 Permanent Redirect*). Hal ini mencegah link lama yang sudah tersebar menghasilkan error 404.
* **Sitemap XML Otomatis:**
  - Memperbarui daftar URL publik secara otomatis untuk diserahkan ke Google Search Console.

---

### Pilar 5: Integrasi Headless API & Sinyal Webhook

* **RESTful JSON API:**
  - **Endpoint Publik (Tanpa Otentikasi):** Cepat, aman, dan dapat di-*cache* oleh Next.js untuk membaca artikel, portofolio, layanan, dan FAQ:
    - `GET /api/v1/articles` dan `GET /api/v1/articles/:slug`
    - `GET /api/v1/portfolios` dan `GET /api/v1/portfolios/:slug`
    - `GET /api/v1/services`
    - `GET /api/v1/faqs`
  - **Endpoint Terlindungi (Bearer Token):** Digunakan oleh aplikasi mobile tim untuk mengelola konten dan upload media secara aman.
* **Penyegaran Cache Instan (*On-Demand Revalidation Webhook*):**
  - Setiap kali ada data yang diterbitkan, diperbarui, atau dihapus di CMS, sistem otomatis menembak webhook ke website Next.js:
    `POST https://naykon.id/api/revalidate?tag=articles&secret=KUNCI_RAHASIA`
  - Next.js langsung memperbarui halaman terkait secara instan tanpa perlu membebani server backend secara terus-menerus.

---

### Pilar 6: Sistem Pengguna & Hak Akses Sederhana (*Single Role Access*)

Untuk menjaga sistem tetap gesit, efisien, dan bebas dari *overengineering*:

* **Model 1 Role Tunggal (*Flat Access*):**
  - Seluruh anggota tim Next Karya yang memiliki akun terdaftar memiliki hak akses penuh dan setara.
  - Setiap staf dapat membuat draf, mengunggah media, mengedit konten, dan langsung mempublikasikan data tanpa alur birokrasi persetujuan berbelit.
* **Keamanan Akun:**
  - Login menggunakan alamat email kerja dan kata sandi yang di-hash dengan standar keamanan industri (Argon2id atau Bcrypt).
  - Manajemen sesi login yang aman dengan perlindungan brute force.

---

## 3. Matriks Kebutuhan & Prioritas Rilis

| No | Modul / Fitur | Prioritas | Keterangan |
| :--- | :--- | :---: | :--- |
| **1** | Artikel & Blog | **Fase 1 (MVP)** | Sangat penting untuk pemasaran konten & SEO Google |
| **2** | Portofolio & Studi Kasus | **Fase 1 (MVP)** | Etalase karya dan bukti kredibilitas bagi calon klien |
| **3** | Katalog Layanan & Paket Harga | **Fase 1 (MVP)** | Menampilkan penawaran jasa dan struktur harga transparan |
| **4** | FAQ (Tanya Jawab) | **Fase 1 (MVP)** | Menjawab pertanyaan umum seputar teknis dan garansi |
| **5** | Pengelola Media (Cloud R2 / S3) | **Fase 1 (MVP)** | Media penyimpanan terpusat gambar dan mockup |
| **6** | Headless API & Webhook Next.js | **Fase 1 (MVP)** | Jalur distribusi data ke website publik dan mobile app |
| **7** | Status Draf & Terbit Langsung | **Fase 1 (MVP)** | Alur kerja penulisan konten yang cepat dan praktis |
| **8** | Akun Tim 1 Role Tunggal | **Fase 1 (MVP)** | Akses langsung tanpa hierarki berbelit |
| **9** | Testimoni Klien | **Fase 1 (MVP)** | Bukti sosial (*social proof*) dari klien sebelumnya |
| **10** | Penjadwalan Terbit Otomatis | **Fase 2** | Otomasi tanggal dan jam terbit di masa depan |
| **11** | Riwayat Revisi (*Rollback*) | **Fase 2** | Pelacak riwayat perubahan konten tingkat lanjut |
| **12** | Otomatisasi 301 Redirects | **Fase 2** | Pencegah tautan rusak jika slug URL diganti |

---

## 4. Kesimpulan & Langkah Selanjutnya

Dokumentasi ini menjadi cetak biru (*blueprint*) resmi untuk pembangunan Web CMS terpisah Next Karya. 

Dengan arsitektur ini:
1. **Website Publik Next.js** tetap ringan, super cepat, dan fokus pada konversi bisnis.
2. **Web CMS Terpisah** menjadi pusat komando konten yang fleksibel dan siap melayani aplikasi mobile di masa depan tanpa harus merombak ulang struktur website publik.
