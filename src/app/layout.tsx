import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAYKON - Software House & Solusi Transformasi Digital Indonesia",
  description:
    "Mitra teknologi terpercaya untuk pengembangan aplikasi web, mobile, dan sistem enterprise terintegrasi di Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
