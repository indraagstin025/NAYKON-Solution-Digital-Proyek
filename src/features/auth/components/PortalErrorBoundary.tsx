"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface PortalErrorBoundaryProps {
  children: ReactNode;
}

interface PortalErrorBoundaryState {
  hasError: boolean;
}

function isNextControlFlowException(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const digest = (error as { digest?: unknown }).digest;
  return (
    typeof digest === "string" &&
    (digest.startsWith("NEXT_REDIRECT") ||
      digest.startsWith("NEXT_HTTP_ERROR_FALLBACK"))
  );
}

export default class PortalErrorBoundary extends Component<
  PortalErrorBoundaryProps,
  PortalErrorBoundaryState
> {
  constructor(props: PortalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): PortalErrorBoundaryState {
    if (isNextControlFlowException(error)) {
      throw error;
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isNextControlFlowException(error)) {
      throw error;
    }
    console.error("Portal access bar render error:", error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="w-full border-b border-[#1E3358] bg-[#0B1730] px-6 py-3 text-xs text-[#FCA5A5]"
        >
          <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3">
            <span>
              Panel akses internal mengalami kendala tampilan pada peramban ini.
            </span>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#4E6E9E] bg-[#12213F] px-3.5 py-2 text-xs font-semibold text-[#F1F5FB] transition-colors hover:bg-[#192D54] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              Pulihkan Panel
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
