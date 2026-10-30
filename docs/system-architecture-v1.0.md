# Cetak Biru Arsitektur Sistem Terintegrasi (Master System Architecture)
**Next Karya Digital Solutions**  
*Spesifikasi Arsitektur Backend Golang, Basis Data PostgreSQL, Cache Redis, Web Next.js, dan Mobile Flutter*  
*Dokumen Versi: 1.0 (Arsitektur Final Multiplatform & High-Performance Core)*  
*Tanggal Berlaku: 31 Oktober 2026*

> [!IMPORTANT]
> **Batasan Lingkup & Hak Akses (Fase 1 vs Fase Berikutnya):**  
> Fase 1 (MVP) dibangun khusus untuk operasional internal tim Next Karya Digital Solutions dengan partisi data `site_id: "nextkarya-main"` dan satu peran setara (`STAFF`) untuk 3 anggota tim (Staf A - Programmer, Staf B - Desainer, Staf C - Project Lead). Seluruh arsitektur skema database, partisi cache, dan endpoint API telah disiapkan sejak hari pertama untuk mendukung multi-tenant skala besar pada Fase berikutnya (Fase 2) saat portal mandiri klien resmi dirilis.

---

## 1. Daftar Dokumen Kanonik Sistem (*Single Source of Truth*)

Seluruh pengembangan rekayasa perangkat lunak, pemodelan basis data, kontrak antarmuka API, dan implementasi kode mengacu secara mengikat pada 7 dokumen kanonik final berikut:

| No | Nama Berkas Kanonik | Status Versi | Cakupan Domain Arsitektur | Target Pengguna & Perangkat |
| :---: | :--- | :---: | :--- | :--- |
| **1** | [`system-architecture-v1.0.md`](./system-architecture-v1.0.md) | **v1.0 Final** | Cetak Biru Arsitektur 5 Pilar (Golang, Postgres, Redis, Next.js, Flutter), Topologi, & SLA. | Seluruh Tim Rekayasa & Arsitek |
| **2** | [`schema-database-v1.1-3.md`](./schema-database-v1.1-3.md) | **v1.1-3 Kanonik** | Struktur 20 Tabel PostgreSQL, Relasi, Indeks Konkurensi, Cron Maintenance, & Representasi Go. | Pengembang Backend & Database |
| **3** | [`api-contracts-v1.0-6.md`](./api-contracts-v1.0-6.md) | **v1.0-6 Kanonik** | Kontrak REST API `/api/v1`, Format Respons Tunggal, Aturan Validasi Struct Go, & Integrasi. | Seluruh Tim Pengembang (Backend, Web & Mobile) |
| **4** | [`cms-v2.2-2.md`](./cms-v2.2-2.md) | **v2.2-2 Kanonik** | Manajemen Konten Headless, Snapshot FIFO 5 Versi, Webhook Cache (`action: "update"`), & Takedown. | Tim Internal (Desktop & Mobile) |
| **5** | [`analytics-v2.2.md`](./analytics-v2.2.md) | **v2.2 Kanonik** | Mesin Pengukur Trafik Ringan (< 2 KB), Proteksi Bot, Konversi WA, Ingesti Redis, & Rollup Jam. | Tim Internal (Desktop & Mobile) |
| **6** | [`crm-v2.2.md`](./crm-v2.2.md) | **v2.2 Kanonik** | Kotak Masuk Prospek (*Leads*), Agenda Follow-Up Harian, Pipeline 5 Tahap, & Timeline Proyek. | Tim Internal (Desktop & Mobile) |
| **7** | [`architecture-desktop-vs-mobile-v1.1-2.md`](./architecture-desktop-vs-mobile-v1.1-2.md) | **v1.1-2 Kanonik** | Pembagian Peran Desktop Web vs Mobile Flutter (*Action Companion*), Emergency Toolkit Fase 1. | Seluruh Tim Pengembang (Web & Mobile Flutter) |

---

## 2. Diagram Topologi & Alur Komunikasi Sistem

```mermaid
flowchart TD
    subgraph KlienEksternal["Pengguna Eksternal (Publik & Prospek)"]
        BrowserPublik["Peramban Web Pengunjung<br>(Desktop / Mobile Browser)"]
        WhatsAppUser["Aplikasi WhatsApp Calon Klien"]
    end

    subgraph TimInternal["Tim Internal Next Karya (3 Staf - Single Role STAFF)"]
        DesktopStaf["Laptop / PC Monitor Lebar<br>(Desktop Command Center)"]
        MobileStaf["Smartphone Android & iOS<br>(Flutter Companion App)"]
    end

    subgraph WebTier["Lapisan Web & Presentasi (Next.js App Router)"]
        NextPublic["Website Publik Next.js<br>(SSR / ISR Cache)"]
        NextAdmin["CMS & CRM Web Panel<br>(Desktop Command Center)"]
        NextWebhook["Webhook Receiver<br>POST /api/revalidate"]
    end

    subgraph BackendCore["Lapisan Inti Backend (Golang Engine)"]
        GoGateway["API Router & Middleware<br>(CORS, Auth JWT, Rate Limit)"]
        GoCMS["Modul Layanan CMS & Media"]
        GoCRM["Modul Layanan CRM & Timeline"]
        GoAnalytics["Modul Ingesti & Rollup Analitik"]
        GoEmergency["Modul Tanggap Darurat & Audit"]
        GoWorkers["Background Workers & Cron Jobs<br>(Rollup 1 Jam, Purge 02:00 WIB, FIFO Prune)"]
    end

    subgraph DataTier["Lapisan Data & Akselerasi (Stateful Storage)"]
        RedisStore[("Redis In-Memory<br>- Counter Rate Limiting Live<br>- Token Version (Cek O1)<br>- Query Caches Publik<br>- Buffer Ingesti Analitik")]
        PostgresDB[("PostgreSQL Database<br>- 20 Tabel Relasional<br>- 17 Tabel Berpartisi site_id<br>- ACID Transactions<br>- Waktu Murni UTC & Tanggal DATE")]
    end

    BrowserPublik -->|"1. Akses Halaman Web (HTTPS)"| NextPublic
    BrowserPublik -->|"2. Kirim Beacon Analitik & Form Kontak"| GoGateway
    WhatsAppUser <-->|"Komunikasi Penjualan Langsung"| MobileStaf

    DesktopStaf -->|"Kelola Konten & Pipeline Penuh"| NextAdmin
    NextAdmin -->|"Kueri & Mutasi Data (REST JSON)"| GoGateway
    MobileStaf -->|"Aksi Cepat & Emergency (Bearer JWT)"| GoGateway
    MobileStaf -->|"1-Klik Buka Obrolan WhatsApp"| WhatsAppUser

    GoGateway <-->|"Verifikasi Rate Limit & Cek Token Version"| RedisStore
    GoGateway --> GoCMS & GoCRM & GoAnalytics & GoEmergency
    GoCMS & GoCRM & GoAnalytics & GoEmergency <-->|"Cache Read / Invalidation"| RedisStore
    GoCMS & GoCRM & GoAnalytics & GoEmergency <-->|"Query & Mutasi Data (SQL)"| PostgresDB
    GoWorkers <-->|"Agregasi Data & Pembersihan Berkala"| PostgresDB

    GoCMS -->|"Picu Pembersihan Cache (action: update)"| NextWebhook
    NextWebhook -->|"Penyegaran Cache Instan (< 3s)"| NextPublic
```

---

## 3. Rincian Peran & Tanggung Jawab per Lapisan

### 3.1 Backend Engine (Golang)
Backend Golang berperan sebagai gerbang sentral yang melayani seluruh endpoint RESTful JSON `/api/v1`:

* **Kompilasi Biner Native & Kinerja Tinggi:** Menghasilkan biner tunggal mandiri tanpa dependensi runtime eksternal, dengan jejak memori (*memory footprint*) rendah dan waktu mulai (*startup time*) instan.
* **Model Konkurensi Efisien (*Goroutines & Channels*):** Menangani ribuan request simultan secara paralel, terutama saat menerima semburan beacon analitik (`navigator.sendBeacon`) dan request formulir publik tanpa memblokir thread sistem operasi.
* **Lapisan Autentikasi & Otorisasi:**
  - Menerbitkan dan memvalidasi JSON Web Token (JWT) dengan algoritma HMAC-SHA256.
  - Memeriksa keabsahan `tokenVersion` secara mikrodetik ke Redis pada setiap request terproteksi.
  - Menolak akses dengan HTTP `403 Forbidden` jika `tokenVersion` pada klaim JWT lebih rendah dari nilai aktif di Redis/DB (fitur pemutusan darurat sesi HP hilang `REVOKE_SESSION`).
* **Validasi Masukan Baku & Sanitasi:**
  - Seluruh payload request divalidasi ketat menggunakan struct tag validator Go (padanan validasi skema Zod pada kontrak kanonik [`api-contracts-v1.0-6.md`](./api-contracts-v1.0-6.md)).
  - Sanitasi teks terhadap potensi XSS, pemangkasan whitespace, dan penolakan payload liar.
* **Proteksi Bot & Anti-Spam Publik:**
  - Memeriksa field honeypot tersembunyi `website_url` pada endpoint kontak publik. Request otomatis diabaikan (*silent reject*) jika field terisi.
  - Menghitung batasan laju request berbasis IP menggunakan Redis sliding-window:
    - Form kontak publik: Maksimal 5 kiriman per 15 menit per IP.
    - Beacon analitik: Maksimal 60 event per menit per IP.
    - Kueri baca publik: Maksimal 120 request per menit per IP.
* **Pencegahan Konflik Konkurensi (*Optimistic Locking*):**
  - Pada setiap operasi mutasi entitas CMS dan CRM, backend memverifikasi nilai header atau body `updatedAt`.
  - Jika stempel waktu di database telah berubah akibat perubahan oleh rekan tim lain, backend mengembalikan status HTTP `409 Conflict`.
* **Pengelolaan Transaksi ACID (PostgreSQL):**
  - Seluruh mutasi terkait multi-tabel (misal: penambahan catatan prospek sekaligus pembaruan status pipeline dan pembuatan log aktivitas) dibungkus dalam blok `BEGIN ... COMMIT / ROLLBACK`.
* **Pekerja Latar Belakang (*Background Cron Workers*):**
  - **Pukul 02:00 WIB Setiap Hari:** Menjalankan pembersihan rekaman `analytics_events` mentah yang berusia lebih dari 90 hari.
  - **Inkremental Tiap Jam:** Menjalankan rollup analitik dari event mentah ke `analytics_daily` menggunakan CTE `session_summary` yang presisi.
  - **Rolling FIFO 5 Versi:** Memangkas riwayat snapshot konten pada tabel `content_snapshots` agar tepat tersisa maksimal 5 versi terakhir per entitas.
* **Pengiriman Webhook Revalidasi Cache:**
  - Setiap kali ada data konten yang diterbitkan, diperbarui, atau diarsipkan, backend Golang mengirimkan HTTP POST ke endpoint website Next.js `https://nextkarya.id/api/revalidate` dengan header `x-webhook-secret` dan muatan baku:
    ```json
    {
      "tag": "articles",
      "action": "update"
    }
    ```
  - Menjalankan percobaan ulang otomatis sebanyak 3 kali dengan jeda eksponensial (*exponential backoff: 2s, 4s, 8s*) jika koneksi gagal atau timeout.

---

### 3.2 Lapisan Cache & Fast Ingestion (Redis)

#### Batasan Peran Redis di Fase 1 (MVP):
Di Fase 1, Redis difungsikan secara terarah khusus untuk empat kebutuhan kritis:
1. **Counter Live Rate Limiting per IP:** Pencatatan sliding-window request publik secara in-memory untuk latensi instan O(1). Tabel PostgreSQL `rate_limits` difungsikan sebagai media persistensi rekam jejak dan cadangan (*fallback*) jika Redis offline, bukan keduanya berjalan paralel secara membingungkan.
2. **Cache `tokenVersion` Pengguna:** Menyimpan nilai integer `tokenVersion` aktif untuk verifikasi keabsahan JWT O(1). Fitur daftar perangkat individual yang dapat dicabut satu per satu (*device session manager*) dialokasikan untuk Fase 2, sehingga kunci blacklist token individual `auth:revoked_tokens:{jti}` ditiadakan dari Fase 1.
3. **Cache Kueri Baca Publik CMS:** Menyimpan serialisasi JSON hasil kueri publik artikel, portofolio, layanan, dan FAQ. Kunci `cache:cms:{site_id}:pricing` merupakan proyeksi turunan dari data tabel `services` (katalog paket harga layanan), karena data harga tersimpan di dalam tabel `services` tanpa tabel harga terpisah.
4. **Buffer Ingesti Event Analitik:** Event pelacak ditampung sementara dalam antrean Redis (*List / Stream*) dan di-flush ke tabel PostgreSQL `analytics_events` secara berkala setiap interval **30 detik** atau setelah **100 event** terkumpul. Jika Redis mengalami gangguan atau mati sebelum proses flush, backend Golang secara *graceful* langsung menuliskan (*direct write*) event analitik ke PostgreSQL tanpa membuang request pengunjung.

#### Skema Struktur Kunci Redis Fase 1 (*Keyspace Conventions*):

| Pola Kunci Redis | Tipe Data | Waktu Kedaluwarsa (TTL) | Fungsi & Kegunaan |
| :--- | :---: | :---: | :--- |
| `rl:ip:{ip}:{endpoint}` | `String (Counter)` | 60 - 900 detik | *Rate limiting live* pembatasan frekuensi request publik per IP. |
| `auth:token_ver:{userId}` | `String (Integer)` | 30 hari | Versi token pengguna aktif untuk verifikasi JWT O(1). |
| `cache:cms:{site_id}:services` | `String (JSON)` | 1 jam / On-demand purge | Cache daftar katalog layanan untuk mempercepat response API publik. |
| `cache:cms:{site_id}:faqs` | `String (JSON)` | 1 jam / On-demand purge | Cache daftar FAQ publik aktif. |
| `cache:cms:{site_id}:pricing` | `String (JSON)` | 1 jam / On-demand purge | Cache proyeksi paket harga (agregasi turunan dari tabel `services`). |
| `cache:crm:{site_id}:today_summary` | `String (JSON)` | 60 detik | Cache 4 angka ringkasan agenda CRM dan metrik hari ini. |
| `analytics:buffer:{site_id}` | `List / Stream` | Dikosongkan per interval 30s / 100 event | Penampung event analitik sebelum batch-insert ke PostgreSQL. |

#### Kebijakan Pembersihan Cache (*Cache Invalidation Strategy*):
* **Pembersihan Berbasis Mutasi (*Event-Driven Invalidation*):** Begitu backend Golang mengeksekusi operasi `INSERT`, `UPDATE`, atau `DELETE` pada tabel CMS, kunci cache terkait di Redis langsung dihapus (`DEL`), bersamaan dengan penembakan webhook ke Next.js.
* **Pencabutan Sesi Seketika (`REVOKE_SESSION`):**
  Saat aksi darurat pencabutan sesi dieksekusi, backend menaikkan nilai `auth:token_ver:{userId}` di Redis dengan perintah `INCR` secara atomik, lalu memperbarui kolom `tokenVersion` di PostgreSQL. Seluruh perangkat staf dengan token lama seketika tertolak dengan status HTTP `403 Forbidden` pada request milidetik berikutnya.

---

### 3.3 Basis Data Relasional (PostgreSQL)
PostgreSQL bertindak sebagai repositori data permanen sistem dengan konfigurasi terstandar:

* **Partisi Data Multi-Tenant (`site_id`):**
  Dari total 20 tabel entitas sistem, sebanyak 17 tabel data memuat kolom `site_id: "nextkarya-main"` yang terindeks secara ketat. Tiga tabel yang dikecualikan dari kolom `site_id` adalah:
  1. `sites`: Merupakan tabel master penyedia identitas situs (kolom utama `id` sebagai referensi induk).
  2. `users`: Merupakan master kredensial 3 staf internal tingkat sistem lintas domain.
  3. `rate_limits`: Merupakan tabel operasional teknis berbasis kombinasi IP dan endpoint.
* **Standar Waktu Murni UTC & Pemisahan Tanggal:**
  - Kolom stempel waktu operasional (`createdAt`, `updatedAt`, `publishedAt`, `occurredAt`) disimpan dalam tipe `TIMESTAMPTZ(3)` berbasis UTC murni (`Z`).
  - Kolom penanggalan murni kalender tanpa jam (`nextFollowUpDate` pada `leads`, serta `startDate`, `targetEndDate`, dan `warrantyExpiryDate` pada `project_schedules`) disimpan menggunakan tipe data `DATE`.
  - Seluruh penyesuaian zona waktu Indonesia Barat (WIB / UTC+7) ditangani di lapisan antarmuka pengguna (Next.js dan Flutter).
* **Indeks Konkurensi & Performa Tinggi:**
  - CRM: Indeks komposit `[site_id, nextFollowUpDate, status, assignedToId]` untuk query agenda follow-up berkecepatan < 10ms.
  - CMS: Indeks komposit `[site_id, status, publishedAt]` dan unique constraint `[site_id, slug]` untuk kueri artikel publik.
  - Analitik: Indeks komposit `[site_id, sessionId, occurredAt]` pada raw events, dan unique composite `[site_id, date, path, source, device]` pada tabel rollup harian.
* **Empat Tabel Inti Modul CRM:**
  Modul CRM dimodelkan secara bersih menjadi 4 tabel terelasi:
  1. `leads`: Menyimpan identitas calon klien, nilai estimasi proyek, tahap pipeline 5 status, dan `nextFollowUpDate` (DATE).
  2. `interaction_logs`: Menyimpan riwayat catatan kualitatif follow-up staf.
  3. `activity_logs`: Menyimpan jejak audit perubahan otomatis status pipeline, pengalihan penanggung jawab, dan pergeseran timeline.
  4. `project_schedules`: Menyimpan timeline pengerjaan proyek (Gantt Chart), balok durasi pengerjaan, dan masa garansi `warrantyExpiryDate` (DATE).
* **Integritas Relasi (*Referential Integrity*):**
  Seluruh relasi foreign key dilindungi dengan kebijakan `ON DELETE RESTRICT` untuk mencegah terhapusnya entitas induk secara tidak sengaja (misal: kategori artikel tidak dapat dihapus jika masih memuat artikel). Penghapusan konten menerapkan pola *Soft Delete* ke status `ARCHIVED`.

---

### 3.4 Frontend Web (Next.js App Router)
Next.js menjalankan dua peran antarmuka komputer yang memanfaatkan keunggulan App Router:

#### A. Website Profil Publik (`nextkarya.id`):
* **React Server Components (RSC):** Merender halaman secara server-side untuk memastikan skor performa Google Core Web Vitals optimal dan SEO metadata terindeks sempurna oleh mesin pencari.
* **Incremental Static Regeneration (ISR):**
  - Halaman portofolio dan blog di-cache statis di edge/server.
  - Rute Route Handler `app/api/revalidate/route.ts` menerima sinyal webhook dari backend Golang:
    ```typescript
    export async function POST(request: NextRequest) {
      const secret = request.headers.get("x-webhook-secret");
      if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: "Akses ditolak" }, { status: 401 });
      }
      const body = await request.json();
      if (body.action === "update" && body.tag) {
        revalidateTag(body.tag);
        return NextResponse.json({ revalidated: true, now: Date.now() });
      }
      return NextResponse.json({ message: "Payload tidak valid" }, { status: 400 });
    }
    ```
  - Cache halaman publik terhapus dan terbarui dalam waktu kurang dari 3 detik tanpa jeda.

#### B. Desktop Command Center (Web CMS & CRM):
* **Workspace Khusus Komputer:** Dikhususkan untuk layar lebar desktop (resolusi >= 1280px).
* **Studio Penulisan Konten:** Editor teks kaya (*Rich Text / Markdown Editor*), pratinjau split-screen desktop vs mobile, pengelola unggah media multi-gambar, dan pemulihan snapshot riwayat FIFO 5 versi.
* **Gantt Chart Timeline Proyek:** Tampilan diagram balok horizontal melintasi multi-minggu dari tabel `project_schedules` untuk menata alokasi tugas ketiga staf secara visual.
* **Dashboard Analitik Komprehensif:** Grafik tren multi-minggu, matriks halaman terpopuler, perbandingan saluran rujukan (Google vs Media Sosial), dan rasio konversi WhatsApp.

---

### 3.5 Aplikasi Mobile (Flutter Companion)
Aplikasi mobile dibangun dengan framework Flutter (Dart) sebagai alat aksi cepat tim internal:

* **Satu Basis Kode (*Single Codebase*):** Dikompilasi secara native ke berkas APK/AAB Android dan IPA iOS dengan performa rendering halus 60 frame per detik (fps).
* **Arsitektur State Management Bersih (*Clean Architecture + Riverpod / BLoC*):**
  Memisahkan antara lapisan presentasi (*Widgets*), logika bisnis (*Controllers / Notifiers*), dan penyedia data (*Repositories / API Clients*).
* **Koneksi REST API Golang:**
  Mengonsumsi endpoint `/api/v1` dengan HTTP client teroptimasi (`dio` package) yang menyertakan interceptor penyemat token `Authorization: Bearer <token>` dan penanganan error terpusat.
* **Keamanan Penyimpanan Lokal:**
  Menggunakan `flutter_secure_storage` yang memanfaatkan *Android Keystore* dan *Apple Keychain* untuk mengenkripsi token JWT pada ponsel staf.
* **Fitur Respon Cepat & Emergency:**
  - **Halaman Agenda Follow-Up Hari Ini:** Menampilkan prospek yang jatuh tempo hari ini (*due*) atau terlambat (*overdue*).
  - **1-Tap WhatsApp Launcher:** Menggunakan package `url_launcher` untuk membuka percakapan WhatsApp resmi ke nomor prospek calon klien seketika tanpa jeda.
  - **Emergency Toolkit Mobile:** Tombol 1 sentuhan untuk menurunkan konten sensitif (*Emergency Unpublish*), sakelar darurat kunci form kontak saat serangan spam, sakelar banner pengumuman darurat, pengalihan penanggung jawab prospek darurat, serta tombol darurat pemutusan sesi HP hilang (`REVOKE_SESSION`).

---

## 4. Matriks Pembagian Tugas Antar-Platform

| Domain Fitur | Backend Golang | Database Postgres & Redis | Frontend Web Next.js | Mobile Flutter App |
| :--- | :--- | :--- | :--- | :--- |
| **Autentikasi & Sesi** | • Penerbitan JWT<br>• Verifikasi tokenVersion | • Postgres: Simpan passwordHash & tokenVersion<br>• Redis: Cek versi token O(1) | • Form login desktop<br>• Penyimpanan cookie sesi aman | • Form login mobile<br>• Secure Storage ponsel |
| **Tanggap Darurat (Revoke)** | • Logika endpoint revoke<br>• Naikkan tokenVersion | • Redis: INCR tokenVersion O(1)<br>• Postgres: Catat audit entitas USER | • Tampilan audit log darurat di dashboard desktop | • **Tombol aksi darurat putus sesi HP hilang (Fase 1 MVP)** |
| **Katalog Konten (CMS)** | • Validasi struct tag Go<br>• Optimistic Locking check<br>• Picu Webhook Revalidate | • Postgres: 7 tabel konten, FIFO 5 snapshot<br>• Redis: Cache daftar kueri publik | • Desktop: Studio editor, pratinjau konten<br>• Publik: ISR render & SEO | • Pemantauan status terbit<br>• 1-Tap Emergency Unpublish |
| **Prospek & Timeline (CRM)** | • Validasi struct prospek<br>• Anti-spam bot honeypot<br>• Hitung beban tugas staf | • Postgres: 4 tabel CRM (`leads`, `interaction_logs`, `activity_logs`, `project_schedules`) | • Desktop: Visual pipeline penjualan & Gantt Chart lebar | • **Agenda Follow-Up Hari Ini**<br>• **1-Klik Chat WhatsApp**<br>• Kartu tugas harian vertikal |
| **Trafik & Metrik (Analitik)** | • Intake beacon pelacak<br>• Rollup inkremental harian<br>• Cron purge data > 90 hari | • Redis: Buffer ingesti 30s/100 event<br>• Postgres: Raw events (TTL 90h) & Daily Rollup | • Desktop: Grafik tren multi-minggu & analisis saluran | • Sekilas 4 angka metrik hari ini (*Quick Pulse Check*) |
| **Proteksi Spam & Rate Limit** | • Evaluasi honeypot website_url<br>• Penolakan bot otomatis | • Redis: Counter live sliding-window<br>• Postgres: Tabel rate_limits (cadangan/audit) | • Tampilan form publik aman | • Notifikasi internal & sakelar kunci form darurat |

---

## 5. Protokol Komunikasi & Format Data

### 5.1 Format Respons Tunggal (*Single Envelope Pattern*)
Seluruh komunikasi API antara backend Golang, frontend Next.js, dan aplikasi mobile Flutter menggunakan format amplop JSON seragam:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 105,
    "totalPages": 6
  },
  "error": null
}
```

Format respons gagal (*Error Response*):
```json
{
  "success": false,
  "data": null,
  "meta": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input data tidak valid.",
    "details": [
      {
        "field": "whatsappNumber",
        "message": "Nomor WhatsApp wajib diawali format 62 atau 08."
      }
    ]
  }
}
```

### 5.2 Standar Kode Status HTTP
* `200 OK`: Permintaan berhasil diproses.
* `201 Created`: Entitas baru berhasil dibuat (misal: lead baru atau upload media).
* `400 Bad Request`: Validasi skema input gagal (dengan rincian field pada objek `error.details`).
* `401 Unauthorized`: Token tidak disertakan atau telah kedaluwarsa.
* `403 Forbidden`: Token valid namun hak akses tidak mencukupi, atau token valid namun nilai `tokenVersion` di klaim token sudah usang akibat eksekusi pencabutan sesi darurat (`REVOKE_SESSION`), sesuai kontrak resmi.
* `404 Not Found`: Entitas ID atau rute tidak ditemukan.
* `409 Conflict`: Konflik stempel waktu konkurensi (*Optimistic Locking* `updatedAt`).
* `429 Too Many Requests`: Batasan frekuensi request (*Rate Limit*) terlampaui. Disertai header `Retry-After`.
* `500 Internal Server Error`: Kesalahan internal pada server Golang.

---

## 6. Standar Kinerja, Toleransi & Service Level Agreement (SLA)

Untuk menjamin kepastian performa teknis, batas SLA dipisahkan secara tegas antara latensi kueri database internal dan waktu respons endpoint HTTP penuh (selaras dengan target pada [`api-contracts-v1.0-6.md`](./api-contracts-v1.0-6.md)):

1. **Latensi Operasi Data Internal (Database & Cache):**
   - Kueri baca ter-cache di Redis: **< 15 milidetik**.
   - Kueri baca basis data PostgreSQL: **< 60 milidetik**.
   - Transaksi penulisan basis data PostgreSQL umum: **< 120 milidetik**.
2. **Latensi Respons Penuh Endpoint HTTP (End-to-End API SLA):**
   - Endpoint kueri baca ter-cache (`GET /api/v1/posts`, `GET /api/v1/services`): **< 30 milidetik**.
   - Endpoint kueri baca database terproteksi internal: **< 80 milidetik**.
   - Endpoint penerimaan formulir prospek publik (`POST /api/v1/leads`): **< 100 milidetik** penuh (termasuk verifikasi honeypot, rate limit Redis, dan insert PostgreSQL). Target endpoint < 100ms ini mengikat dan tidak boleh dikalahkan oleh angka latensi database write umum.
   - Endpoint penerimaan beacon analitik (`POST /api/v1/analytics/collect`): **< 50 milidetik** (diterima ke antrean buffer Redis O(1)).
3. **Pembersihan Cache Website Publik Next.js:**
   - Webhook revalidasi cache wajib tuntas dalam waktu **< 3 detik** sejak tombol terbit/simpan ditekan di CMS.
4. **Eksekusi Tindakan Darurat Mobile (*Emergency Toolkit*):**
   - Waktu dari tombol aksi darurat ditekan di Flutter hingga konten turun atau form terkunci di database: **< 2 detik**.
5. **Kinerja Render Aplikasi Mobile Flutter:**
   - Menjaga laju bingkai antarmuka konsisten pada **60 frame per detik (fps)** tanpa freeze atau lag.
6. **Ukuran Skrip Pelacak Analitik di Browser:**
   - Bobot skrip pelacak publik: **< 2 Kilobyte (KB)** gzip, memicu pengiriman event via `navigator.sendBeacon` secara asinkron tanpa memblokir thread rendering browser.

---

## 7. Roadmap Transisi Menuju Fase 2 (Kesiapan Multi-Tenant Klien)

Arsitektur Fase 1 (MVP) sengaja mengunci akses hanya untuk internal Next Karya dengan `site_id: "nextkarya-main"`. Daftar pada kontrak kanonik [`api-contracts-v1.0-6.md`](./api-contracts-v1.0-6.md) Bab 7 bersifat otoritatif untuk fitur-fitur yang dialokasikan ke Fase 2:

1. **Multi-Tenancy Penuh:**
   Penyediaan `site_id` baru untuk klien eksternal (contoh: `site_id: "klien-sekolah-01"`).
2. **Portal Mandiri Klien (*Client Self-Service Portal*):**
   Sub-domain antarmuka web Next.js khusus klien untuk memantau progres pengerjaan proyek dan statistik pengunjung situs mereka sendiri.
3. **Manajemen Sesi Lanjutan Berbasis Redis:**
   Pemantauan daftar perangkat aktif pengguna (*Device Session Manager*) dengan kapabilitas pencabutan izin akses perangkat secara individual.
4. **Push Notification Native:**
   Integrasi Firebase Cloud Messaging (FCM) dan Apple Push Notification service (APNs) pada aplikasi Flutter untuk pengiriman peringatan prospek baru dan tenggat follow-up secara real-time.
5. **Penjadwalan Terbit Otomatis (*Scheduled Publishing*):**
   Worker terjadwal di Golang untuk mempublikasikan draf konten secara otomatis pada tanggal dan jam mendatang.
6. **Otomatisasi 301 Permanent Redirects:**
   Pencatatan otomatis ke tabel `redirects` saat staf mengubah slug judul artikel yang telah berstatus terbit.
7. **Pelacakan Parameter Kampanye UTM Mendalam:**
   Penguraian detail parameter `utm_source`, `utm_medium`, dan `utm_campaign` pada modul analitik.
8. **Deteksi Lokasi Kota GeoIP:**
   Pemetaan data geografis kota pengunjung berbasis pangkalan data GeoIP lokal.
9. **Ekspor Laporan CSV / Excel:**
   Fitur unduhan berkas spreadsheet untuk data prospek CRM dan laporan performa trafik analitik.
10. **Pembuatan Faktur & Tagihan Termin Otomatis:**
    Sistem pembuatan invoice termin otomatis berdasarkan progres milestone di tabel `project_schedules`.
11. **Visual Diff Riwayat Revisi Konten:**
    Tampilan visual perbandingan kata-per-kata antar-snapshot konten pada studio CMS.

---

## 8. Riwayat Pembaruan Dokumen (*Changelog*)

### Versi 1.0 (31 Oktober 2026)
* Penyusunan cetak biru resmi arsitektur sistem terintegrasi (*Master System Architecture*).
* Menetapkan dan mengunci 5 pilar teknologi resmi: Backend Golang, Basis Data PostgreSQL, Lapisan Akselerasi Redis, Frontend Web Next.js, dan Mobile Flutter.
* Menetapkan daftar 7 dokumen kanonik resmi yang menjadi acuan tunggal pengembangan.
* Menyusun diagram topologi sistem terintegrasi lengkap menggunakan format Mermaid.
* Mengunci batasan peran Redis Fase 1 (counter live rate limit, tokenVersion cache, query cache publik, dan buffer analitik 30s/100 event) serta mekanisme fallback graceful saat Redis offline.
* Menyelaraskan nama field honeypot `website_url`, amplop meta `total`, field error `whatsappNumber`, dan status penolakan usang `403 Forbidden`.
* Menegaskan 17 dari 20 tabel berpartisi `site_id` (mengecualikan `sites`, `users`, `rate_limits`), memetakan kolom tanggal murni `DATE`, dan 4 tabel CRM resmi.
* Mengunci standar performa SLA dengan pemisahan tegas antara latensi kueri database dan latensi respon penuh endpoint HTTP (< 100ms untuk lead intake).
* Melengkapi roadmap Fase 2 selaras dengan daftar otoritatif kontrak API.
