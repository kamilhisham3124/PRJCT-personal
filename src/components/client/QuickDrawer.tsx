"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  PhosphorEnvelopeSimple,
  PhosphorPhone,
  PhosphorMapPin,
  PhosphorX,
  PhosphorArrowUpRight,
  PhosphorSidebarSimple,
} from "../icons";
import { ReadingModeToggle } from "./ReadingModeToggle";

export function QuickDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const drawerContent = isOpen ? (
    <div className="fixed inset-0 z-[70] flex justify-end">
      <div
        className="fixed inset-0 bg-surface-overlay backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="quick-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Quick Reference: Overview & Contact"
        className="relative z-10 w-full max-w-[320px] sm:max-w-sm bg-surface-primary border-l border-border-structural h-screen h-[100dvh] max-h-screen p-4 sm:p-6 flex flex-col justify-between shadow-menu overflow-y-auto"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-structural">
            <div>
              <span className="text-xs font-mono font-medium text-text-secondary">Quick Reference</span>
              <h2 className="text-base font-semibold text-text-primary">Overview &amp; Contact</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close quick reference panel"
              className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            >
              <PhosphorX className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-mono uppercase tracking-wider text-text-secondary block">Contact Details</span>
            <div className="flex items-center gap-2.5 text-text-primary">
              <PhosphorEnvelopeSimple className="w-4 h-4 text-text-secondary shrink-0" />
              <a href="mailto:kamil.hisham3124@gmail.com" className="hover:underline">kamil.hisham3124@gmail.com</a>
            </div>
            <div className="flex items-center gap-2.5 text-text-primary">
              <PhosphorPhone className="w-4 h-4 text-text-secondary shrink-0" />
              <a href="tel:+918610333768" className="hover:underline">+91-8610333768</a>
            </div>
            <div className="flex items-center gap-2.5 text-text-secondary">
              <PhosphorMapPin className="w-4 h-4 text-text-secondary shrink-0" />
              <span>India / Remote Availability</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border-structural space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-2">Quick Navigation</span>
            <Link href="/work" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-text-primary hover:text-fg-accent hover:underline min-h-[44px]">
              <span>Selected Case Studies</span><PhosphorArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
            </Link>
            <Link href="/lab" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-text-primary hover:text-fg-accent hover:underline min-h-[44px]">
              <span>Component Lab &amp; Telemetry</span><PhosphorArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-text-primary hover:text-fg-accent hover:underline min-h-[44px]">
              <span>Engineering Experience</span><PhosphorArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-xs font-medium text-text-primary hover:text-fg-accent hover:underline min-h-[44px]">
              <span>Direct Inquiry Form</span><PhosphorArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-border-structural mt-auto space-y-3">
          <ReadingModeToggle />
          <a
            href="/resume.pdf?download=true"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px]"
          >
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Quick Reference: Overview & Contact"
        title="Quick Reference: Overview & Contact"
        aria-expanded={isOpen}
        aria-controls="quick-drawer-panel"
        className="min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-lg border border-control-border bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:border-border-highlight transition-colors"
      >
        <PhosphorSidebarSimple className="w-4 h-4" />
      </button>

      {mounted && typeof document !== "undefined" && drawerContent
        ? createPortal(drawerContent, document.body)
        : null}
    </>
  );
}
