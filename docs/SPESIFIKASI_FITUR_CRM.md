# Spesifikasi & Daftar Fitur CRM (Tahap Awal & Multiplatform)
**Next Karya Digital Solutions**  
*Dokumen Arsitektur & Perencanaan Fitur Sistem Manajemen Hubungan Klien & Jadwal Proyek*  
*Versi: 2.0 (Lean, Multiplatform Ready, & Resource Timeline)*  
*Tanggal: 30 Oktober 2026*

---

## 1. Ringkasan Eksekutif & Filosofi Desain

Sistem CRM (Customer Relationship Management) Next Karya dirancang khusus untuk **tahap awal agensi digital yang bergerak lincah (*Lean & Agile Agency*)**. 

Fokus utamanya bukan birokrasi penjualan yang rumit, melainkan:
1. **Menutup Kesepakatan Lebih Cepat (*Fast Deal Closing*):** Merespons calon klien dari website dan WhatsApp dengan cepat tanpa ada prospek yang terlewat.
2. **Visibilitas Beban Kerja Tim (*Team Resource Timeline*):** Mengetahui ketersediaan jadwal tim pengembang dan desainer secara visual agar estimasi waktu ke klien selalu akurat dan tidak terjadi bentrok pengerjaan.
3. **Penyimpanan Riwayat Klien Terpusat (*Single Client Profile*):** Menampung data kontak, catatan diskusi, nilai proyek, status pengerjaan, hingga batas akhir garansi purnajual dalam satu kartu klien.

```
                         ┌─────────────────────────────────────────────────────┐
                         │  LEADS MASUK (Website, WhatsApp, Rekomendasi)       │
                         └──────────────────────────┬──────────────────────────┘
                                                    │
                                                    ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ALUR STATUS PENJUALAN (SALES PIPELINE)                                                          │
│  [ 1. BARU ] ──▶ [ 2. DIHUBUNGI ] ──▶ [ 3. PROPOSAL ] ──▶ [ 4. DEAL / MENANG ]                  │
│                                                      └──▶ [ 5. BATAL ]                           │
└───────────────────────────────────────────┬──────────────────────────────────────────────────────┘
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

### Pilar 1: Kotak Masuk Prospek (*Leads Inbox*)

Menampung seluruh calon klien yang masuk secara otomatis dari formulir website, klik WhatsApp, maupun input manual oleh tim:

* **Informasi Kontak Lengkap:**
  - Nama Calon Klien (*Contact Person*).
  - Nomor WhatsApp / Telepon aktif.
  - Alamat Email resmi.
  - Nama Bisnis, Usaha, atau Perusahaan Klien.
* **Kebutuhan Layanan & Anggaran:**
  - Kategori Layanan yang diminati (Website Bisnis, Portal Berita CMS, Redesign, Aplikasi Mobile, atau Sistem Kustom).
  - Ringkasan Kebutuhan Proyek (pesan awal mengenai kendala atau fitur yang diinginkan).
  - Estimasi Nilai Proyek (*Deal Value*, misal: Rp 5.000.000 atau Rp 15.000.000) untuk memantau potensi omset.
* **Sumber Prospek (*Lead Source*):**
  - Website Publik, Chat WhatsApp Langsung, Rujukan Teman, Instagram, atau LinkedIn.

---

### Pilar 2: Alur Status Penjualan Sederhana (*5-Stage Sales Pipeline*)

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

### Pilar 3: Catatan Tindak Lanjut & Aksi Cepat (*Follow-up & Quick Actions*)

Memastikan komunikasi dengan calon klien tetap terjaga dan tidak ada yang terlupakan:

* **Catatan Internal Tim (*Interaction Notes*):**
  - Kotak catatan singkat untuk mencatat hasil pembicaraan per tanggal.
  - *Contoh: "30 Okt: Diskusi via Google Meet lancar, klien minta revisi fitur pembayaran QRIS, proposal final dikirim besok siang"*.
* **Pengingat Jadwal Follow-up (*Follow-up Reminder Date*):**
  - Menyetel tanggal pengingat untuk menghubungi kembali klien yang sedang menimbang proposal.
* **Aksi Cepat 1-Klik (*One-Click Actions*):**
  - **Tombol "Chat di WhatsApp":** Langsung membuka WhatsApp Web atau aplikasi WhatsApp di HP menuju nomor klien dengan template sapaan pembuka otomatis.
  - **Tombol "Kirim Email":** Membuka aplikasi email dengan subjek resmi konsultasi Next Karya.

---

### Pilar 4: Timeline Jadwal Proyek & Alokasi Tim (*Team Resource Timeline*)

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

### Pilar 5: Informasi Purnajual & Garansi Proyek (*Post-Sales & Warranty*)

Setelah proyek klien berhasil diluncurkan (*Go-Live*), data tetap dipantau untuk menjaga kepuasan klien:

* **Tautan Penting Proyek:**
  - Tautan Lingkungan Percobaan (*Staging URL*).
  - Tautan Website Resmi yang Sudah Live (*Production URL*).
  - Tautan File Desain Figma atau Repositori Dokumentasi.
* **Pelacak Masa Garansi Purnajual (*Warranty Expiry*):**
  - Mencatat tanggal berakhirnya garansi perbaikan bug teknis (misal: 30 hingga 45 hari pasca-peluncuran).
  - Memberikan notifikasi saat masa garansi mendekati akhir, sehingga tim dapat menawarkan paket perpanjangan pemeliharaan website berkala (*maintenance contract*).

---

### Pilar 6: Pencarian, Filter & Integrasi API Multiplatform

* **Pencarian Cepat:** Mencari data klien seketika berdasarkan nama, nomor telepon, atau nama perusahaan.
* **Filter Status:** Memfilter tampilan pipeline (hanya melihat prospek *Baru*, prospek *Proposal*, atau proyek *Deal*).
* **Integrasi API Multiplatform:**
  - `POST /api/v1/leads`: Endpoint yang menerima data saat pengunjung mengirim formulir di website publik Next.js.
  - `GET /api/v1/crm/pipeline`: Endpoint yang menampilkan alur status untuk aplikasi web admin dan mobile app.
  - `GET /api/v1/crm/schedule`: Endpoint yang menyediakan data jadwal alokasi tim untuk tampilan timeline kalender.

---

## 3. Matriks Prioritas Rilis Fitur CRM

| No | Modul / Fitur | Prioritas | Manfaat bagi Bisnis |
| :--- | :--- | :---: | :--- |
| **1** | Kotak Masuk Prospek (*Leads Inbox*) | **Fase 1 (MVP)** | Menampung calon klien dari website publik |
| **2** | 5 Tahapan Alur Status (*Pipeline*) | **Fase 1 (MVP)** | Memantau posisi negosiasi dengan klien |
| **3** | Tombol Chat WhatsApp 1-Klik | **Fase 1 (MVP)** | Mempercepat waktu respons tim ke calon klien |
| **4** | Catatan Singkat & Nilai Proyek (*Deal Value*) | **Fase 1 (MVP)** | Mencatat hasil diskusi dan estimasi omset |
| **5** | Timeline Beban Kerja Tim (*Schedule View*) | **Fase 1 (MVP)** | Mengetahui alokasi jadwal tim pengembang |
| **6** | Pelacak Masa Garansi Purnajual | **Fase 1 (MVP)** | Menjaga kepuasan klien dan peluang perpanjangan |
| **7** | Filter & Pencarian Cepat | **Fase 1 (MVP)** | Menemukan data kontak klien seketika |
| **8** | Pengingat Otomatis via Kalender/Email | **Fase 2** | Notifikasi jadwal follow-up ke ponsel staf |
| **9** | Pembuatan Invoice & Faktur Otomatis | **Fase 2** | Otomasi tagihan termin pembayaran proyek |

---

## 4. Kesimpulan

Dengan spesifikasi sederhana ini, **Sistem CRM** Next Karya menjadi sangat ramping, mudah dioperasikan sehari-hari oleh tim, dan langsung memecahkan kebutuhan riil agensi: **mengelola calon klien hingga deal** dan **memastikan proyek dikerjakan tepat waktu melalui timeline tim yang terukur**.
