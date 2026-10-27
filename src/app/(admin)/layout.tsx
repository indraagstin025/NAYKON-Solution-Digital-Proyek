import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { requireUser } from "@/lib/auth";
import LogoutForm from "@/features/auth/components/LogoutForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Ringkasan Ruang Kerja | NAIKON Internal",
    template: "%s | NAIKON Internal",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const ROLE_LABELS = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
  ANALYST: "Analyst",
} as const;

export default async function AdminWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-[#030711] text-[#F1F5FB] flex flex-col">
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[#2563EB] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#38BDF8]"
      >
        Lewati ke konten utama
      </a>

      <header className="border-b border-[#1E3358] bg-[#0B1730]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl px-2 text-sm font-bold tracking-tight text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <span>NAIKON</span>
              <span className="rounded-md border border-[#4E6E9E] bg-[#12213F] px-2 py-0.5 text-xs font-medium text-[#94A7C4]">
                Ruang Kerja
              </span>
            </Link>

            <nav aria-label="Navigasi ruang kerja" className="flex items-center gap-2">
              <Link
                href="/admin"
                aria-current="page"
                className="inline-flex min-h-11 items-center rounded-xl border border-[#60A5FA] bg-[#12213F] px-3.5 text-sm font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                Ringkasan
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#4E6E9E] px-3.5 text-sm font-medium text-[#94A7C4] transition-colors hover:bg-[#12213F] hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              >
                <span>Situs Publik</span>
                <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold leading-tight text-[#F1F5FB]">
                {user.name}
              </p>
              <p className="text-xs text-[#94A7C4]">
                Peran: {ROLE_LABELS[user.role]}
              </p>
            </div>

            <LogoutForm />
          </div>
        </div>
      </header>

      <main
        id="workspace-main"
        className="mx-auto w-full max-w-[1240px] flex-1 px-5 sm:px-8 py-6 sm:py-9"
      >
        {children}
      </main>
    </div>
  );
}
