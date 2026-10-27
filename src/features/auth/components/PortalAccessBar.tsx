"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { unstable_rethrow } from "next/navigation";
import {
  Cross1Icon,
  ExclamationTriangleIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { submitPortalLoginAction } from "../actions";
import {
  extractPortalFieldErrors,
  portalLoginSchema,
  type PortalLoginState,
} from "../schema";

const INITIAL_LOGIN_STATE: PortalLoginState = {
  status: "idle",
};

const LOGIN_REQUEST_TIMEOUT_MS = 15_000;

class ClientOfflineAbortError extends Error {
  constructor() {
    super("OFFLINE_MID_FLIGHT");
    this.name = "ClientOfflineAbortError";
  }
}

class ClientRequestTimeoutError extends Error {
  constructor() {
    super("LOGIN_REQUEST_TIMEOUT");
    this.name = "ClientRequestTimeoutError";
  }
}

function subscribeOnlineStatus(onStoreChange: () => void): () => void {
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);
  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

function getServerOnlineSnapshot(): boolean {
  return true;
}

function raceWithConnectivityAndTimeout<T>(
  operation: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const handleOffline = () => {
      cleanup();
      reject(new ClientOfflineAbortError());
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new ClientRequestTimeoutError());
    }, timeoutMs);

    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("offline", handleOffline);
    };

    window.addEventListener("offline", handleOffline, { once: true });

    operation.then(
      (result) => {
        cleanup();
        resolve(result);
      },
      (error) => {
        cleanup();
        reject(error);
      }
    );
  });
}

function classifyClientTransportError(error: unknown): PortalLoginState {
  if (error instanceof ClientOfflineAbortError) {
    return {
      status: "error",
      errorKind: "offline",
      message:
        "Koneksi internet tiba-tiba terputus saat memverifikasi akun. Email Anda tetap tersimpan, silakan coba lagi setelah jaringan pulih.",
    };
  }

  if (error instanceof ClientRequestTimeoutError) {
    return {
      status: "error",
      errorKind: "timeout",
      message:
        "Server tidak merespons dalam batas 15 detik. Periksa kestabilan internet Anda lalu coba kembali.",
    };
  }

  const rawMessage = error instanceof Error ? error.message : String(error);

  if (/failed to find server action/i.test(rawMessage)) {
    return {
      status: "error",
      errorKind: "stale_deployment",
      message:
        "Halaman ini masih memakai versi rilis sebelumnya. Muat ulang halaman lalu masuk kembali.",
    };
  }

  if (
    (typeof navigator !== "undefined" && !navigator.onLine) ||
    /failed to fetch|networkerror|load failed|network request failed|fetch failed/i.test(
      rawMessage
    )
  ) {
    return {
      status: "error",
      errorKind: "offline",
      message:
        "Tidak dapat terhubung ke server karena jaringan terputus. Email Anda tetap tersimpan, silakan coba lagi saat online.",
    };
  }

  return {
    status: "error",
    errorKind: "server",
    message:
      "Terjadi gangguan komunikasi dengan server autentikasi. Silakan coba kembali beberapa saat lagi.",
  };
}

interface PortalAccessBarProps {
  onVisibilityChange?: (isOpen: boolean) => void;
}

export default function PortalAccessBar({
  onVisibilityChange,
}: PortalAccessBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginState, setLoginState] = useState<PortalLoginState>(
    INITIAL_LOGIN_STATE
  );

  const isOnline = useSyncExternalStore(
    subscribeOnlineStatus,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const inFlightRef = useRef(false);
  const attemptIdRef = useRef(0);

  const applyOpenState = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (!nextOpen) {
        attemptIdRef.current += 1;
        inFlightRef.current = false;
        setIsSubmitting(false);
        setShowPassword(false);
        setPassword("");
        setLoginState(INITIAL_LOGIN_STATE);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlightRef.current) return;

    if (!isOnline || (typeof navigator !== "undefined" && !navigator.onLine)) {
      setLoginState({
        status: "error",
        errorKind: "offline",
        message:
          "Perangkat Anda sedang tidak terhubung ke internet. Sambungkan jaringan terlebih dahulu sebelum masuk.",
      });
      return;
    }

    const clientValidation = portalLoginSchema.safeParse({ email, password });
    if (!clientValidation.success) {
      const fieldErrors = extractPortalFieldErrors(
        clientValidation.error.issues
      );
      setLoginState({
        status: "error",
        errorKind: "validation",
        message: "Periksa kembali email dan kata sandi yang Anda masukkan.",
        fieldErrors,
      });
      if (fieldErrors.email) {
        emailInputRef.current?.focus();
      } else if (fieldErrors.password) {
        passwordInputRef.current?.focus();
      }
      return;
    }

    const currentAttempt = attemptIdRef.current + 1;
    attemptIdRef.current = currentAttempt;
    inFlightRef.current = true;
    setIsSubmitting(true);
    setShowPassword(false);
    setLoginState(INITIAL_LOGIN_STATE);

    const payload = new FormData();
    payload.set("email", email);
    payload.set("password", password);
    if (honeypot) {
      payload.set("workExtension", honeypot);
    }

    try {
      const result = await raceWithConnectivityAndTimeout(
        submitPortalLoginAction(payload),
        LOGIN_REQUEST_TIMEOUT_MS
      );

      if (attemptIdRef.current !== currentAttempt) {
        return;
      }

      // Undefined means Next.js Server Action redirect stream has taken over navigation.
      if (!result) {
        return;
      }

      inFlightRef.current = false;
      setIsSubmitting(false);
      setLoginState(result);

      if (
        result.errorKind === "credentials" ||
        result.errorKind === "locked" ||
        result.errorKind === "csrf"
      ) {
        setPassword("");
        passwordInputRef.current?.focus();
      } else if (result.fieldErrors?.email) {
        emailInputRef.current?.focus();
      } else if (result.fieldErrors?.password) {
        passwordInputRef.current?.focus();
      }
    } catch (error) {
      unstable_rethrow(error);

      if (attemptIdRef.current !== currentAttempt) {
        return;
      }

      inFlightRef.current = false;
      setIsSubmitting(false);
      setLoginState(classifyClientTransportError(error));
    }
  };

  if (!isOpen) {
    return null;
  }

  const emailError = loginState.fieldErrors?.email?.[0];
  const passwordError = loginState.fieldErrors?.password?.[0];

  return (
    <div
      role="region"
      aria-label="Akses Portal Internal NAIKON"
      className="w-full bg-[#0B1730] text-[#F1F5FB] border-b border-[#1E3358] max-h-[85dvh] overflow-y-auto"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-9 lg:px-14 py-3.5 pb-5 lg:py-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-5"
        >
          <div className="flex items-center justify-between gap-3 lg:min-h-11 lg:shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#12213F] border border-[#4E6E9E] text-[#60A5FA]">
                <LockClosedIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold leading-tight text-[#F1F5FB]">
                    Akses Portal Internal
                  </p>
                  {!isOnline && (
                    <span className="rounded-md border border-[#FBBF24] bg-[#12213F] px-2 py-0.5 text-[11px] font-semibold text-[#FBBF24]">
                      Offline
                    </span>
                  )}
                </div>
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
          >
            <label htmlFor="nk-portal-ext">Nomor ekstensi kerja</label>
            <input
              id="nk-portal-ext"
              name="workExtension"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
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
                  maxLength={120}
                  spellCheck={false}
                  autoCapitalize="none"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (loginState.fieldErrors?.email) {
                      setLoginState((prev) => ({
                        ...prev,
                        fieldErrors: { ...prev.fieldErrors, email: undefined },
                      }));
                    }
                  }}
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
                    ref={passwordInputRef}
                    id="nk-portal-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    maxLength={128}
                    required
                    disabled={isSubmitting}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginState.fieldErrors?.password) {
                        setLoginState((prev) => ({
                          ...prev,
                          fieldErrors: {
                            ...prev.fieldErrors,
                            password: undefined,
                          },
                        }));
                      }
                    }}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className="inline-flex min-h-11 flex-1 sm:flex-none items-center justify-center rounded-xl bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isSubmitting ? "Memverifikasi..." : "Masuk"}
                </button>

                <button
                  type="button"
                  onClick={() => applyOpenState(false)}
                  className="hidden lg:inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 py-2 text-sm font-medium text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <Cross1Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tutup</span>
                </button>
              </div>
            </div>

            {!isOnline && loginState.status === "idle" && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2 rounded-lg border border-[#FBBF24] bg-[#12213F] px-3 py-2 text-xs font-medium text-[#FBBF24] lg:self-end"
              >
                <ExclamationTriangleIcon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Koneksi internet terputus. Periksa jaringan sebelum mengirim
                  kredensial.
                </span>
              </div>
            )}

            {loginState.status === "error" && loginState.message && (
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#F87171] bg-[#12213F] px-3 py-2 text-xs font-medium text-[#FCA5A5] lg:self-end"
              >
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon
                    className="h-4 w-4 shrink-0 text-[#F87171]"
                    aria-hidden="true"
                  />
                  <span>
                    {loginState.message}
                    {loginState.errorKind === "offline" && isOnline
                      ? " Jaringan kini telah aktif kembali, silakan klik Masuk."
                      : ""}
                  </span>
                </div>

                {loginState.errorKind === "stale_deployment" && (
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#4E6E9E] bg-[#0B1730] px-3 py-2 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    <ReloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Muat Ulang</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
