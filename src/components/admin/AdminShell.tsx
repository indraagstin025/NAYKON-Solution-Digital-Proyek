"use client";

import React, { useSyncExternalStore } from "react";
import { AdminSidebar, type AdminSidebarProps } from "./AdminSidebar";
import { TooltipProvider } from "@/components/admin/ui/RadixTooltip";

const THEME_KEY = "nk-theme-preference";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getSnapshot() {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light") return false;
  return true; // default dark for admin
}

function getServerSnapshot() {
  return true;
}

export interface AdminShellProps extends AdminSidebarProps {
  children: React.ReactNode;
}

export function AdminShell({
  children,
  userName,
  userEmail,
  userRole,
  unreadMessagesCount,
  canViewMessages,
  canViewContent,
  canManageUsers,
  canViewAudit,
}: AdminShellProps) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <TooltipProvider delayDuration={150}>
      <div
        id="admin-workspace-shell"
        className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-200 ${
          isDark
            ? "theme-dark bg-[#030711] text-[#F1F5FB]"
            : "bg-[#F8FAFC] text-[#041E42]"
        }`}
        suppressHydrationWarning
      >
        <a
          href="#workspace-main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-[#0066FF] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#38BDF8]"
        >
          Lewati ke konten utama
        </a>

        <AdminSidebar
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
          unreadMessagesCount={unreadMessagesCount}
          canViewMessages={canViewMessages}
          canViewContent={canViewContent}
          canManageUsers={canManageUsers}
          canViewAudit={canViewAudit}
        />

        <main
          id="workspace-main"
          className="flex-1 min-w-0 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10 max-w-[1360px] mx-auto w-full"
        >
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
