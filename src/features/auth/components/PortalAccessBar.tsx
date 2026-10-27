"use client";

import React, {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Cross1Icon,
  ExclamationTriangleIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { loginPortalAction } from "../actions";
import type { PortalLoginState } from "../schema";

const INITIAL_LOGIN_STATE: PortalLoginState = {
  status: "idle",
};

interface PortalAccessBarProps {
  onVisibilityChange?: (isOpen: boolean) => void;
}

export default function PortalAccessBar({
  onVisibilityChange,
}: PortalAccessBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    loginPortalAction,
    INITIAL_LOGIN_STATE
  );
  const emailInputRef = useRef<HTMLInputElement>(null);

  const applyOpenState = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (!nextOpen) {
        setShowPassword(false);
      }
      onVisibilityChange?.(nextOpen);
    },
    [onVisibilityChange]
  );

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "f"
      ) {
        event.preventDefault();
        applyOpenState(!isOpen);
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        applyOpenState(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isOpen, applyOpenState]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      emailInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const emailError = state.fieldErrors?.email?.[0];
  const passwordError = state.fieldErrors?.password?.[0];

  return (
    <div
      role="region"
      aria-label="Akses Portal Internal NAIKON"
      className="w-full bg-[#0B1730] text-[#F1F5FB] border-b border-[#1E3358] max-h-[85dvh] overflow-y-auto"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 py-3.5 pb-5 lg:py-3">
        <form
          action={formAction}
          noValidate
          className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-5"
        >
          <div className="flex items-center justify-between gap-3 lg:min-h-11 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#12213F] border border-[#4E6E9E] text-[#60A5FA]">
                <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-[#F1F5FB]">
                  Akses Portal Internal
                </p>
                <p className="text-xs text-[#94A7C4]">
                  Tekan Esc untuk menutup panel ini
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => applyOpenState(false)}
              className="inline-flex lg:hidden min-h-11 min-w-11 items-center justify-center rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
              aria-label="Tutup panel akses internal"
            >
              <Cross1Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start lg:justify-end">
              <div className="flex flex-col gap-1 sm:flex-1 lg:max-w-[250px]">
                <label
                  htmlFor="nk-portal-email"
                  className="text-xs font-medium text-[#94A7C4] lg:sr-only"
                >
                  Email kerja
                </label>
                <input
                  ref={emailInputRef}
                  id="nk-portal-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  disabled={isPending}
                  placeholder="Email kerja"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "nk-portal-email-error" : undefined}
                  className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 py-2 text-sm text-[#F1F5FB] placeholder:text-[#94A7C4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:opacity-60"
                />
                {emailError && (
                  <p
                    id="nk-portal-email-error"
                    className="text-xs font-medium text-[#FCA5A5]"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 sm:flex-1 lg:max-w-[250px]">
                <label
                  htmlFor="nk-portal-password"
                  className="text-xs font-medium text-[#94A7C4] lg:sr-only"
                >
                  Kata sandi
                </label>
                <div className="relative flex items-center">
                  <input
                    id="nk-portal-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                    placeholder="Kata sandi"
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={
                      passwordError ? "nk-portal-password-error" : undefined
                    }
                    className="min-h-11 w-full rounded-xl border border-[#4E6E9E] bg-[#12213F] pl-3.5 pr-12 py-2 text-sm text-[#F1F5FB] placeholder:text-[#94A7C4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isPending}
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                    className="absolute right-0 inline-flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-[#94A7C4] transition-colors hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    {showPassword ? (
                      <EyeNoneIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p
                    id="nk-portal-password-error"
                    className="text-xs font-medium text-[#FCA5A5]"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-11 flex-1 sm:flex-none items-center justify-center rounded-xl bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isPending ? "Memverifikasi..." : "Masuk"}
                </button>

                <button
                  type="button"
                  onClick={() => applyOpenState(false)}
                  disabled={isPending}
                  className="hidden lg:inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 py-2 text-sm font-medium text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <Cross1Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tutup</span>
                </button>
              </div>
            </div>

            {state.status === "error" && state.message && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-[#F87171]/60 bg-[#12213F] px-3 py-2 text-xs font-medium text-[#FCA5A5] lg:self-end"
              >
                <ExclamationTriangleIcon
                  className="h-4 w-4 shrink-0 text-[#F87171]"
                  aria-hidden="true"
                />
                <span>{state.message}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
