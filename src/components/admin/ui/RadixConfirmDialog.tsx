"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./RadixDialog";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface RadixConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isPending?: boolean;
  onConfirm: () => unknown | Promise<unknown>;
}

export function RadixConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Lanjutkan",
  cancelLabel = "Batal",
  isDestructive = true,
  isPending = false,
  onConfirm,
}: RadixConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <div className="flex items-start gap-3">
            {isDestructive && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400">
                <ExclamationTriangleIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            )}
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="mt-1.5 leading-relaxed">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E3358]">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-[#041E42] hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] disabled:opacity-50 dark:border-[#4E6E9E] dark:bg-[#0B1730] dark:text-[#F1F5FB] dark:hover:bg-[#12213F] dark:focus-visible:outline-[#38BDF8]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handleConfirm}
            className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700 focus-visible:outline-rose-500 dark:bg-rose-600 dark:hover:bg-rose-700"
                : "bg-[#0066FF] hover:bg-[#0052CC] focus-visible:outline-[#0066FF] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] dark:focus-visible:outline-[#38BDF8]"
            }`}
          >
            {isPending ? "Memproses..." : confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
