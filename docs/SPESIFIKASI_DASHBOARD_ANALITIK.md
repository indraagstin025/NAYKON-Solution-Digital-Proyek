# Spesifikasi & Daftar Fitur Dashboard Analitik
**Next Karya Digital Solutions**  
*Dokumen Arsitektur & Perencanaan Fitur Sistem Analitik Kunjungan & Konversi*  
*Versi: 2.0 (Privacy-First, Multiplatform, & Business-Oriented)*  
*Tanggal: 30 Oktober 2026*

---

## 1. Ringkasan Eksekutif & Filosofi Desain

Sistem Dashboard Analitik Next Karya dibangun untuk memberikan visibilitas penuh terhadap performa website dan aplikasi mobile tanpa mengorbankan kecepatan maupun privasi pengunjung. 

Sistem ini menganut 3 prinsip utama:

1. **Ramah Privasi & Bebas Banner Cookie (*Privacy-First & Cookie-Free*):**
   - Tidak menggunakan pelacak pihak ketiga yang membebani browser (seperti Google Analytics lama).
   - Tidak mengumpulkan data pribadi sensitif (PII). Identifikasi pengunjung menggunakan metode anonim (*daily salted IP hash*).
   - Pengunjung mendapatkan pengalaman browsing yang bersih tanpa popup persetujuan cookie yang mengganggu.
2. **Berorientasi pada Hasil Bisnis (*Business-Outcome Oriented*):**
   - Fokus utama bukan sekadar jumlah klik mentah, melainkan **konversi bisnis riil**: berapa pengunjung yang menekan tombol WhatsApp, berapa yang mengisi formulir proyek, dan portofolio mana yang paling menghasilkan prospek klien (*leads*).
3. **Performa Tinggi & Query Cepat (*High Performance Rollups*):**
   - Skrip pelacak di Next.js berukuran sangat kecil (< 2 KB) sehingga tidak memperlambat skor Google Core Web Vitals.
   - Menggunakan sistem agregasi data harian (*daily rollups*) sehingga dashboard terbuka secara instan dalam hitungan milidetik.

```
┌─────────────────────────────────┐
│ WEBSITE NEXT.JS / MOBILE APP    │
│ Skrip Pelacak Ringan (< 2 KB)   │
└───────────────┬─────────────────┘
                │ Kirim Event Ringkas (POST /api/v1/analytics/event)
                ▼
┌────────────────────────────────────────────────────────┐
│ BACKEND API & MESIN AGREGASI                           │
│ - Validasi Event & Anonimisasi IP                      │
│ - Tabel Raw Event & Agregasi Harian (Daily Rollup)     │
└───────────────┬────────────────────────────────────────┘
                │ Data Agregasi Siap Tampil
                ▼
┌────────────────────────────────────────────────────────┐
│ DASHBOARD ANALITIK (WEB ADMIN / MOBILE APP)            │
│ - Visualisasi Tren Trafik & Konversi Leads             │
│ - Laporan Sumber Pengunjung & Halaman Terpopuler       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Rincian Metrik & Fitur Dashboard

### Pilar 1: Metrik Utama Trafik (*Top-Line Overview*)

Kartu indikator utama di bagian atas dashboard yang dilengkapi persentase tren naik/turun dibanding periode sebelumnya:

* **Pengunjung Unik (*Unique Visitors*):**
  Jumlah perangkat atau individu unik yang mengunjungi situs dalam rentang waktu yang dipilih.
* **Total Tayangan (*Pageviews*):**
  Akumulasi total berapa kali halaman website dibuka atau disegarkan (*refresh*).
* **Sesi Kunjungan (*Sessions*):**
  Kunjungan aktif pengunjung (sesi dianggap selesai jika pengunjung tidak beraktivitas selama 30 menit).
* **Rata-rata Durasi Kunjungan (*Average Visit Duration*):**
  Durasi rata-rata yang dihabiskan pengunjung untuk membaca konten dan menjelajahi website.
* **Tingkat Pantulan (*Bounce Rate %*):**
  Persentase pengunjung yang meninggalkan website setelah hanya membuka satu halaman tanpa melakukan interaksi lebih lanjut.

---

### Pilar 2: Pelacakan Konversi & Sasaran Bisnis (*Goal & Conversion Tracking*)

Mengukur efektivitas website dalam menghasilkan calon klien (*leads*):

* **Klik Chat WhatsApp Konsultasi:**
  Mencatat setiap kali tombol *Chat WhatsApp* atau tombol *Konsultasi* ditekan oleh pengunjung di Beranda, Navbar, Layanan, maupun Footer.
* **Pengiriman Formulir Proyek (*Form Submissions*):**
  Jumlah formulir konsultasi yang berhasil dikirim oleh calon klien dari halaman Beranda dan halaman Kontak.
* **Klik Detail Layanan & Portofolio:**
  Menghitung frekuensi klik pada kartu layanan dan studi kasus portofolio untuk mengukur minat pasar terhadap jenis solusi digital tertentu.
* **Rasio Konversi Keseluruhan (*Overall Conversion Rate %*):**
  Kalkulasi persentase perbandingan antara pengunjung yang mengambil tindakan (klik WhatsApp / isi form) terhadap total pengunjung unik:
  $$\text{Conversion Rate} = \left( \frac{\text{Total Aksi Konversi}}{\text{Total Pengunjung Unik}} \right) \times 100\%$$

---

### Pilar 3: Analisis Perilaku & Konten Populer (*Content & Behavior*)

* **Halaman Terpopuler (*Top Pages*):**
  - Tabel peringkat halaman berdasarkan jumlah tayangan (*views*), persentase kontribusi trafik, dan durasi rata-rata baca.
  - Membantu tim konten melihat artikel blog apa atau studi kasus portofolio mana yang paling diminati pembaca.
* **Sumber Rujukan Trafik (*Traffic Sources & Referrers*):**
  - **Pencarian Organik (*Search Engine*):** Pengunjung yang menemukan website dari Google, Bing, atau Yahoo.
  - **Media Sosial (*Social Media*):** Trafik dari Instagram, LinkedIn, TikTok, Facebook, atau WhatsApp Web.
  - **Langsung (*Direct*):** Pengunjung yang mengetik langsung domain `naykon.id` atau membuka dari bookmark browser.
  - **Rujukan (*Referral*):** Tautan dari portal berita, direktori bisnis, atau website mitra luar.
* **Pelacakan Kampanye Promosi (*UTM Campaign Tracking*):**
  - Mendeteksi parameter pelacak URL khusus saat tim membagikan link promosi:
    - `utm_source` (misal: *instagram_bio, newsletter, linkedin_post*)
    - `utm_medium` (misal: *cpc, social, email*)
    - `utm_campaign` (misal: *promo_ramadhan, relaunch_website*)

---

### Pilar 4: Demografi & Spesifikasi Teknologi (*Audience Breakdown*)

* **Proporsi Perangkat (*Device Types*):**
  - Pembagian persentase antara Smartphone (Mobile), Laptop/PC (Desktop), dan Tablet.
  - Sangat berguna untuk memastikan desain antarmuka responsif sudah tepat sasaran.
* **Sistem Operasi & Peramban (*OS & Browsers*):**
  - Android, iOS, Windows, macOS, Linux.
  - Google Chrome, Safari, Microsoft Edge, Mozilla Firefox.
* **Sebaran Wilayah Geografis (*Geographic Location*):**
  - Negara dan kota asal pengunjung (misal: Bandung, Jakarta, Surabaya, Medan, Semarang, dll).
  - Ditentukan secara anonim berbasis database GeoIP tanpa melacak titik koordinat GPS pribadi pengunjung.

---

### Pilar 5: Visualisasi Data, Filter Waktu & Ekspor Laporan

* **Filter Rentang Waktu Fleksibel:**
  - Hari Ini (*Today*)
  - 7 Hari Terakhir (*Last 7 Days*)
  - 30 Hari Terakhir (*Last 30 Days*)
  - Bulan Ini / Bulan Lalu
  - Kustom rentang tanggal (*Custom Date Range*) melalui pemilih kalender.
* **Grafik Visual Interaktif:**
  - **Grafik Garis Tren (*Line Chart*):** Memvisualisasikan fluktuasi pengunjung harian dan jam sibuk kunjungan.
  - **Grafik Batang (*Horizontal Bar Chart*):** Membandingkan halaman terpopuler dan sumber trafik rujukan.
  - **Grafik Donat (*Donut Chart*):** Memperlihatkan proporsi perangkat (HP vs Desktop).
* **Ekspor Laporan Ringkas:**
  - Tombol unduh data ringkasan ke format **CSV** dan **Excel** untuk bahan evaluasi mingguan atau laporan bulanan manajemen.

---

## 3. Arsitektur Teknis Pengumpulan & Pengolahan Data

### 3.1 Skrip Pelacak di Sisi Klien (Next.js & Mobile)

Skrip pelacak di Next.js berjalan tanpa memblokir proses rendering:

```javascript
// Contoh pemanggilan event dari sisi client (Web atau Mobile)
navigator.sendBeacon('/api/v1/analytics/event', JSON.stringify({
  eventName: 'pageview', // atau 'whatsapp_click', 'form_submit'
  path: window.location.pathname,
  referrer: document.referrer || null,
  screenWidth: window.innerWidth,
  utmSource: 'linkedin',
  utmCampaign: 'q4_branding'
}));
```

### 3.2 Desain Database & Skema Agregasi (PostgreSQL)

Untuk menjamin dashboard tetap instan saat memuat rentang data tahunan, database memisahkan data mentah dan data agregasi:

1. **Tabel `AnalyticsEvent` (Data Mentah / Transaksional):**
   - Menyimpan rekaman per event dengan waktu kedatangan (`occurredAt`).
   - Dilengkapi *TTL / Retention Policy* (data mentah otomatis dibersihkan setelah 90 hari untuk menghemat storage database).
2. **Tabel `AnalyticsDaily` (Data Agregasi Harian):**
   - Merangkum metrik harian per halaman, sumber rujukan, dan perangkat:
     - `date`, `path`, `source`, `device`, `pageviews`, `visitors`, `sessions`, `bounces`, `conversions`.
   - Data tabel ini berukuran sangat kecil dan dapat disimpan permanen hingga bertahun-tahun.

### 3.3 Endpoint API Analitik

* `POST /api/v1/analytics/event` (Menerima log event dari Next.js dan Mobile App)
* `GET /api/v1/analytics/overview?from=YYYY-MM-DD&to=YYYY-MM-DD` (Mengambil data ringkasan metrik dashboard)
* `GET /api/v1/analytics/pages?from=YYYY-MM-DD&to=YYYY-MM-DD` (Mengambil daftar top pages)
* `GET /api/v1/analytics/sources?from=YYYY-MM-DD&to=YYYY-MM-DD` (Mengambil daftar sumber rujukan)
* `GET /api/v1/analytics/export?format=csv&from=YYYY-MM-DD&to=YYYY-MM-DD` (Mengunduh file laporan)

---

## 4. Matriks Prioritas Rilis Fitur

| No | Modul / Fitur | Prioritas | Manfaat bagi Bisnis |
| :--- | :--- | :---: | :--- |
| **1** | Metrik Trafik Utama (Visitors, Views, Duration) | **Fase 1 (MVP)** | Mengetahui volume pengunjung harian |
| **2** | Pelacakan Klik WhatsApp & Form Submit | **Fase 1 (MVP)** | Mengetahui jumlah konversi leads yang masuk |
| **3** | Halaman Terpopuler (*Top Pages*) | **Fase 1 (MVP)** | Melihat artikel dan portofolio paling diminati |
| **4** | Sumber Kunjungan (Google, Media Sosial, Direct) | **Fase 1 (MVP)** | Evaluasi saluran pemasaran yang paling efektif |
| **5** | Proporsi Perangkat (Mobile vs Desktop) | **Fase 1 (MVP)** | Memastikan kenyamanan tampilan antarmuka |
| **6** | Filter Rentang Waktu (Hari Ini, 7 & 30 Hari) | **Fase 1 (MVP)** | Analisis perbandingan performa berkala |
| **7** | Sebaran Wilayah / Geografis Kota | **Fase 2** | Pemetaan persebaran lokasi calon klien |
| **8** | Pelacakan UTM Parameters Detail | **Fase 2** | Pengukuran efektivitas kampanye promosi berbayar |
| **9** | Ekspor Laporan CSV / Excel | **Fase 2** | Pelaporan berkala ke manajemen internal |

---

## 5. Kesimpulan

Dengan spesifikasi ini, **Dashboard Analitik** Next Karya akan menjadi alat ukur yang sangat tajam, ringan, dan bermanfaat langsung untuk pertumbuhan bisnis, tanpa memperlambat performa website publik Next.js sedikit pun.
