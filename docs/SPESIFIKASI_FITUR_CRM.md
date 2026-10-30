# Spesifikasi & Daftar Fitur CRM (Tahap Awal & Multiplatform)
**Next Karya Digital Solutions**  
*Dokumen Arsitektur & Perencanaan Fitur Sistem Manajemen Hubungan Klien & Jadwal Proyek*  
*Versi: 2.1 (Agenda Follow-up Hari Ini, Anti-Spam Leads, & Resource Timeline)*  
*Tanggal: 30 Oktober 2026*

---

## 1. Ringkasan Eksekutif & Filosofi Desain

Sistem CRM (Customer Relationship Management) Next Karya Digital Solutions dirancang khusus untuk **tahap awal agensi digital yang bergerak lincah (*Lean & Agile Agency*)**. 

Fokus utamanya bukan birokrasi penjualan yang rumit, melainkan:
1. **Menutup Kesepakatan Lebih Cepat (*Fast Deal Closing*):** Merespons calon klien dari website resmi `nextkarya.id` dan WhatsApp dengan cepat tanpa ada prospek yang terlewat.
2. **Agenda Follow-Up Harian Terpantau (*Daily Follow-Up Discipline*):** Menyediakan halaman kerja khusus setiap pagi agar tim langsung tahu siapa calon klien yang harus dihubungi hari ini.
3. **Visibilitas Beban Kerja Tim (*Team Resource Timeline*):** Mengetahui ketersediaan jadwal tim pengembang dan desainer secara visual agar estimasi waktu ke klien selalu akurat dan tidak terjadi bentrok pengerjaan.
4. **Penyimpanan Riwayat Klien Terpusat (*Single Client Profile*):** Menampung data kontak, catatan diskusi, nilai proyek, status pengerjaan, hingga batas akhir garansi purnajual dalam satu kartu klien.

```
                         ┌────────────────────────────────────────────────────────┐
                         │  LEADS MASUK (Website nextkarya.id, WhatsApp, Rujukan) │
                         │  - Dilindungi Honeypot & Rate Limiter Anti-Spam        │
                         └───────────────────────────┬────────────────────────────┘
                                                     │
                                                     ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  AGENDA FOLLOW-UP HARI INI (DIBUKA TIM SETIAP PAGI)                                              │
│  - Daftar Prospek Jatuh Tempo Hari Ini (Due Today) & Terlewat (Overdue)                          │
│  - Tombol 1-Klik: Chat WhatsApp / Kirim Email / Jadwalkan Ulang                                  │
└────────────────────────────────────────────┬─────────────────────────────────────────────────────┘
                                             │
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ALUR STATUS PENJUALAN (SALES PIPELINE)                                                          │
│  [ 1. BARU ] ──▶ [ 2. DIHUBUNGI ] ──▶ [ 3. PROPOSAL ] ──▶ [ 4. DEAL / MENANG ]                  │
│                                                      └──▶ [ 5. BATAL ]                           │
└────────────────────────────────────────────┬─────────────────────────────────────────────────────┘
                                             │ Prospek Deal / Resmi Jadi Proyek
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  TIMELINE BEBAN KERJA & JADWAL TIM (GANTT SCHEDULE VIEW)                                         │
│  - Baris per Anggota Tim (Assignee)                                                              │
│  - Balok Durasi Proyek Klien (Tanggal Mulai hingga Tanggal Selesai)                              │
│  - Pemantauan Garansi Purnajual & Tautan Proyek (Staging / Live)                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Rincian Modul & Fitur CRM

### Pilar 1: Kotak Masuk Prospek (*Leads Inbox*) & Anti-Spam

Menampung seluruh calon klien yang masuk secara otomatis dari formulir website, klik WhatsApp, maupun input manual oleh tim:

* **Informasi Kontak Lengkap:**
  - Nama Calon Klien (*Contact Person*).
  - Nomor WhatsApp / Telepon aktif.
  - Alamat Email resmi.
  - Nama Bisnis, Usaha, atau Perusahaan Klien.
  - Identitas Asal Situs (`site_id: "nextkarya-main"`).
* **Kebutuhan Layanan & Anggaran:**
  - Kategori Layanan yang diminati (Website Bisnis, Portal Berita CMS, Redesign, Aplikasi Mobile, atau Sistem Kustom).
  - Ringkasan Kebutuhan Proyek (pesan awal mengenai kendala atau fitur yang diinginkan).
  - Estimasi Nilai Proyek (*Deal Value*, misal: Rp 5.000.000 atau Rp 15.000.000) untuk memantau potensi omset.
* **Pengamanan Anti-Spam pada Endpoint `POST /api/v1/leads`:**
  - **Honeypot Protection:** Menyediakan field tersembunyi `website_url` yang tidak terlihat oleh pengunjung biasa. Jika bot spam mengisi field ini, pengiriman formulir langsung diabaikan secara otomatis.
  - **Rate Limiting Ketat:** Maksimal 5 pengiriman pesan per IP per 15 menit untuk mencegah serangan spam formulir.
  - **Validasi Asal Domain (*Origin Check*):** Hanya menerima pengiriman formulir dari domain resmi yang terdaftar (contoh: `https://nextkarya.id`).
  - **Validasi Zod & Sanitasi Karakter Kontrol:** Mencegah injeksi kode berbahaya dan membatasi panjang teks pesan.

---

### Pilar 2: Halaman "Agenda Follow-Up Hari Ini" (Fitur Unggulan MVP)

Untuk memastikan tanggal pengingat tidak terlewat meskipun belum ada notifikasi otomatis ke ponsel pada tahap awal:

* **Halaman Kerja Rutin Pagi Hari:**
  - Halaman khusus di dashboard CRM yang dibuka oleh tim setiap pagi saat memulai jam kerja operasional.
* **Penyaringan Otomatis (*Smart Filtering*):**
  - Menampilkan semua prospek yang memiliki jadwal follow-up pada hari ini atau tanggal sebelumnya yang belum sempat dihubungi, dengan status masih aktif (*Baru*, *Dihubungi*, atau *Kirim Proposal*).
* **Indikator Visual Prioritas:**
  - 🟡 **Jatuh Tempo Hari Ini (*Due Today*):** Prospek yang dijadwalkan untuk dihubungi hari ini.
  - 🔴 **Terlewat (*Overdue*):** Prospek yang tanggal jadwalnya sudah terlewat lebih dari 1 hari dan belum ada catatan perkembangan baru.
* **Tindakan Cepat:**
  - Tombol 1-klik "Chat WhatsApp" langsung membuka obrolan ke nomor klien.
  - Tombol "Tandai Sudah Dihubungi" untuk memperbarui status dan memasukkan catatan hasil obrolan.
  - Tombol "Jadwalkan Ulang (*Reschedule*)" jika klien meminta dihubungi kembali di hari lain.

---

### Pilar 3: Alur Status Penjualan Sederhana (*5-Stage Sales Pipeline*)

Alur kerja prospek dibuat sangat jelas dan tanpa tahapan birokrasi yang berbelit:

1. **Baru (*New Lead*):**
   Pesan baru masuk dari website atau chat WhatsApp, belum direspons atau ditindaklanjuti oleh tim.
2. **Dihubungi (*In Discussion / Contacted*):**
   Tim sudah menghubungi calon klien dan sedang menggali kebutuhan teknis atau proses bisnis mereka.
3. **Kirim Proposal (*Proposal Sent*):**
   Rancangan lingkup kerja (*scope of work*) dan rincian estimasi biaya resmi sudah dikirimkan ke klien.
4. **Deal / Menang (*Won & Active*):**
   Klien menyetujui penawaran, uang muka (DP) dibayarkan, dan proyek resmi masuk ke antrean pengerjaan tim.
5. **Batal (*Lost*):**
   Klien belum jadi mengambil layanan, anggaran belum sesuai, atau menunda pengerjaan proyek.

---

### Pilar 4: Catatan Riwayat Klien & Tindak Lanjut (*Interaction Log*)

* **Catatan Internal Tim (*Interaction Notes*):**
  - Kolom catatan singkat untuk mencatat hasil pembicaraan per tanggal.
  - *Contoh: "30 Okt: Diskusi via WhatsApp lancar, klien minta revisi fitur pembayaran online, proposal final dikirim besok siang"*.
* **Aksi Cepat 1-Klik (*One-Click Actions*):**
  - **Tombol "Chat di WhatsApp":** Langsung membuka WhatsApp Web atau aplikasi WhatsApp di HP menuju nomor klien dengan template sapaan pembuka otomatis dari Next Karya Digital Solutions.
  - **Tombol "Kirim Email":** Membuka aplikasi email dengan subjek resmi konsultasi (`contact@nextkarya.id`).

---

### Pilar 5: Timeline Jadwal Proyek & Alokasi Tim (*Team Resource Timeline*)

Fitur visual kalender horizontal yang menampilkan alokasi jadwal pengerjaan proyek per anggota tim:

* **Tampilan Baris per Anggota Tim (*Group by: Team Member*):**
  - Setiap baris mewakili satu anggota tim desainer atau programmer *(contoh: Brayan, Jane, Alice)* lengkap dengan foto profil.
* **Balok Jadwal Proyek (*Task Duration Bar*):**
  - Balok memanjang secara visual dari Tanggal Mulai (*Start Date*) hingga Tanggal Selesai (*End Date*) melintasi kolom hari/tanggal kalender.
  - Setiap balok memuat nama proyek klien dan tahapan kerja *(contoh: "Desain UI Web PT ABC", "Koding Toko Online X")*.
* **Kode Warna Status Proyek:**
  - **Biru:** Draf / Persiapan materi konten.
  - **Kuning:** Sedang dalam proses desain atau pengerjaan aktif.
  - **Hijau:** Selesai dikerjakan dan sudah diuji coba.
  - **Ungu:** Tahap uji coba atau revisi akhir bersama klien.
* **Manfaat Operasional:**
  - Mengetahui secara instan siapa tim yang sedang memiliki jadwal kosong saat ada penawaran proyek baru.
  - Menghindari risiko salah satu staf kelebihan beban kerja (*overload*).

---

### Pilar 6: Informasi Purnajual & Garansi Proyek (*Post-Sales & Warranty*)

Setelah proyek klien berhasil diluncurkan (*Go-Live*), data tetap dipantau untuk menjaga kepuasan klien:

* **Tautan Penting Proyek:**
  - Tautan Lingkungan Percobaan (*Staging URL*).
  - Tautan Website Resmi yang Sudah Live (*Production URL*).
  - Tautan File Desain Figma atau Repositori Dokumentasi.
* **Pelacak Masa Garansi Purnajual (*Warranty Expiry*):**
  - Mencatat tanggal berakhirnya garansi perbaikan bug teknis (misal: 30 hingga 45 hari pasca-peluncuran).
  - Memberikan notifikasi pada halaman dashboard saat masa garansi mendekati akhir, sehingga tim dapat menawarkan paket perpanjangan pemeliharaan website berkala (*maintenance contract*).

---

## 3. Matriks Prioritas Rilis Fitur CRM

| No | Modul / Fitur | Prioritas | Manfaat bagi Bisnis |
| :--- | :--- | :---: | :--- |
| **1** | Kotak Masuk Prospek (*Leads Inbox*) | **Fase 1 (MVP)** | Menampung calon klien dari website publik |
| **2** | Pengamanan Anti-Spam (Honeypot & Rate Limit) | **Fase 1 (MVP)** | Mencegah form website dibanjiri pesan spam bot |
| **3** | Agenda Follow-Up Hari Ini (*Due Today*) | **Fase 1 (MVP)** | Menjamin tidak ada calon klien yang lupa dihubungi |
| **4** | 5 Tahapan Alur Status (*Pipeline*) | **Fase 1 (MVP)** | Memantau posisi negosiasi dengan klien |
| **5** | Tombol Chat WhatsApp 1-Klik | **Fase 1 (MVP)** | Mempercepat waktu respons tim ke calon klien |
| **6** | Catatan Singkat & Nilai Proyek (*Deal Value*) | **Fase 1 (MVP)** | Mencatat hasil diskusi dan estimasi omset |
| **7** | Timeline Beban Kerja Tim (*Schedule View*) | **Fase 1 (MVP)** | Mengetahui alokasi jadwal tim pengembang |
| **8** | Pelacak Masa Garansi Purnajual | **Fase 1 (MVP)** | Menjaga kepuasan klien dan peluang perpanjangan |
| **9** | Filter & Pencarian Cepat | **Fase 1 (MVP)** | Menemukan data kontak klien seketika |
| **10** | Notifikasi Pengingat Otomatis via HP/Email | **Fase 2** | Notifikasi jadwal follow-up ke ponsel staf |
| **11** | Pembuatan Invoice & Faktur Otomatis | **Fase 2** | Otomasi tagihan termin pembayaran proyek |

---

## 4. Kesimpulan

Dengan spesifikasi yang disempurnakan ini, **Sistem CRM Next Karya Digital Solutions**:
1. Menggunakan identitas resmi brand `nextkarya.id` dan `contact@nextkarya.id`.
2. Menghadirkan halaman kerja harian **"Agenda Follow-Up Hari Ini"** di MVP, sehingga tidak ada prospek yang terlewat meskipun belum ada push notification HP.
3. Terlindungi dari spam bot melalui Honeypot, validasi Origin, dan Rate Limiting.
4. Memberikan visibilitas alokasi pengerjaan proyek yang jelas bagi tim melalui **Timeline Beban Kerja Tim**.
