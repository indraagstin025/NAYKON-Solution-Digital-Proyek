import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAYKON - Software House & Solusi Digital Indonesia",
  description:
    "Tim rekayasa digital terpercaya untuk pengembangan website, aplikasi web, dan aplikasi mobile modern di Indonesia.",
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
