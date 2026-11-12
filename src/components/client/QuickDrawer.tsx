"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, X, ArrowUpRight, PanelRight } from "lucide-react";

export function QuickDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open quick overview panel"
        aria-expanded={isOpen}
        aria-controls="quick-drawer-panel"
        className="min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-lg border border-[var(--border-structural)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
      >
        <PanelRight className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="quick-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Quick Overview Panel"
            className="relative z-10 w-full max-w-sm bg-[var(--surface-primary)] border-l border-[var(--border-structural)] h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-structural)]">
                <div>
                  <span className="text-xs font-mono font-medium text-[var(--text-secondary)]">UI Shell &bull; Right Panel</span>
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">Quick Overview</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close quick overview panel"
                  className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <span className="font-mono uppercase tracking-wider text-[var(--text-secondary)] block">Fast Contact</span>
                <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                  <Mail className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                  <a href="mailto:kamil.hisham3124@gmail.com" className="hover:underline">kamil.hisham3124@gmail.com</a>
                </div>
                <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
                  <Phone className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                  <span>+91-8610333768</span>
                </div>
                <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                  <MapPin className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                  <span>India / Remote Availability</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-structural)] space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] block mb-2">Direct Navigation</span>
                <Link href="/work" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-[var(--text-primary)] hover:underline min-h-[44px]">
                  <span>Selected Case Studies</span><ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                </Link>
                <Link href="/lab" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-[var(--text-primary)] hover:underline min-h-[44px]">
                  <span>Component Lab &amp; Telemetry</span><ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-[var(--text-primary)] hover:underline min-h-[44px]">
                  <span>Engineering Experience</span><ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-structural)]">
              <a
                href="/resume.pdf?download=true"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px]"
              >
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
