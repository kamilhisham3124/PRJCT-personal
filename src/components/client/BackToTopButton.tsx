"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] rounded-lg border border-[var(--border-structural)] min-h-[44px] transition-colors"
    >
      <ArrowUp className="w-3.5 h-3.5" />
      <span>Top</span>
    </button>
  );
}
