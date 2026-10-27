'use server';

import { prisma } from '@/lib/db';

export interface SubmitContactInput {
  name: string;
  email: string;
  service?: string;
  message: string;
  sourcePage?: string;
}

export interface SubmitContactResult {
  success: boolean;
  message: string;
}

export async function submitContactMessage(
  data: SubmitContactInput
): Promise<SubmitContactResult> {
  const { name, email, service, message, sourcePage = '/kontak' } = data;

  // 1. Validasi server-side
  if (!name || name.trim().length === 0) {
    return { success: false, message: 'Nama wajib diisi.' };
  }
  if (!email || !email.includes('@') || email.trim().length < 5) {
    return { success: false, message: 'Format email tidak valid.' };
  }
  if (!message || message.trim().length < 5) {
    return { success: false, message: 'Pesan minimal 5 karakter.' };
  }

  // 2. Simpan ke database via Prisma
  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim().slice(0, 100),
        email: email.trim().toLowerCase().slice(0, 100),
        service: service?.trim().slice(0, 50) || null,
        message: message.trim().slice(0, 2000),
        sourcePage: sourcePage.slice(0, 100),
        status: 'NEW',
      },
    });

    return {
      success: true,
      message:
        'Terima kasih! Pesan Anda telah kami terima dan tersimpan di database. Tim NAIKON akan menghubungi Anda dalam waktu 1x24 jam kerja.',
    };
  } catch (error: unknown) {
    console.error('Gagal menyimpan pesan kontak ke database:', error);

    // Jika database belum tersambung (masih dummy connection string), beri pesan informatif
    const isConnectionError =
      error instanceof Error &&
      (error.message.includes('Can\'t reach database server') ||
        error.message.includes('authentication failed') ||
        error.message.includes('P1001') ||
        error.message.includes('P1000'));

    if (isConnectionError) {
      return {
        success: false,
        message:
          'Koneksi database PostgreSQL/Neon belum terhubung. Pastikan DATABASE_URL di .env.local sudah diisi dengan benar.',
      };
    }

    return {
      success: false,
      message:
        'Mohon maaf, terjadi kendala saat menyimpan pesan Anda. Silakan coba kembali sesaat lagi atau hubungi via WhatsApp.',
    };
  }
}
