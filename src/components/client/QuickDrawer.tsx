"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  PhosphorEnvelopeSimple, PhosphorPhone, PhosphorMapPin,
  PhosphorX, PhosphorSidebarSimple,
} from "../icons";
import { ReadingModeToggle } from "./ReadingModeToggle";
import { QUICK_DRAWER_NAV_ITEMS } from "../../lib/utils/navigation";
import { DrawerLinkIcon } from "../shared/DrawerLinkIcon";

type LockProp = "overflow" | "height" | "minHeight";

export function QuickDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const onOpenEvent = () => {
      if (triggerRef.current && triggerRef.current.getClientRects().length > 0) setIsOpen(true);
    };
    window.addEventListener("open-quick-drawer", onOpenEvent);
    return () => window.removeEventListener("open-quick-drawer", onOpenEvent);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    navigatingRef.current = false;
    const savedScrollY = window.scrollY;
    const h = document.documentElement.style;
    const b = document.body.style;
    const shell = document.getElementById("app-shell");
    const lockRules: [CSSStyleDeclaration, LockProp, string][] = [
      [h, "overflow", "hidden"], [b, "overflow", "hidden"],
      ...(shell ? ([[shell.style, "height", "100dvh"], [shell.style, "minHeight", "0"], [shell.style, "overflow", "hidden"]] as [CSSStyleDeclaration, LockProp, string][]) : []),
    ];
    const prev = lockRules.map(([s, k, v]) => { const old = s[k]; s[k] = v; return [s, k, old] as const; });
    if (shell && savedScrollY > 0) shell.scrollTop = savedScrollY;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      prev.forEach(([s, k, old]) => { s[k] = old; });
      if (shell) shell.scrollTop = 0;
      window.removeEventListener("keydown", handleKeyDown);
      if (!navigatingRef.current && savedScrollY > 0) window.scrollTo(0, savedScrollY);
    };
  }, [isOpen]);

  const handleNavClick = () => { navigatingRef.current = true; setIsOpen(false); };

  const drawerContent = isOpen ? (
    <div className="fixed inset-0 z-[70] h-[100dvh] w-full flex justify-end overscroll-none">
      <div className="fixed inset-0 h-[100dvh] w-full bg-surface-overlay backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} aria-hidden="true" />
      <aside id="quick-drawer-panel" role="dialog" aria-modal="true" aria-label="Quick Reference: Overview & Contact" className="relative z-10 w-[calc(100vw-1rem)] max-w-[320px] sm:w-full sm:max-w-sm bg-surface-primary border-l border-border-structural h-full max-h-[100dvh] p-4 sm:p-6 flex flex-col gap-5 shadow-menu overflow-y-auto overscroll-contain">
        <div className="flex items-center justify-between pb-3 border-b border-border-structural">
          <div>
            <span className="text-xs font-mono font-medium text-text-secondary">Quick Reference</span>
            <h2 className="text-base font-semibold text-text-primary">Overview &amp; Contact</h2>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close quick reference panel" className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors">
            <PhosphorX className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 text-xs">
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

        <div className="pt-4 border-t border-border-structural space-y-1">
          <span className="font-mono text-xs uppercase tracking-wider text-text-secondary block mb-1.5">Quick Navigation</span>
          {QUICK_DRAWER_NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleNavClick} {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center justify-between py-2 text-xs font-medium text-text-primary hover:text-fg-accent hover:underline min-h-[44px]">
              <span>{item.label}</span>
              <DrawerLinkIcon isExternal={item.isExternal} className="w-3.5 h-3.5 text-text-secondary shrink-0" />
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-border-structural space-y-3">
          <ReadingModeToggle />
          <a href="/resume.pdf?download=true" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold linkhunt-btn-primary min-h-[44px]">
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)} aria-label="Quick Reference: Overview & Contact" title="Quick Reference: Overview & Contact" aria-expanded={isOpen} aria-controls="quick-drawer-panel" className="min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-lg border border-control-border bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:border-border-highlight transition-colors">
        <PhosphorSidebarSimple className="w-4 h-4" />
      </button>
      {mounted && typeof document !== "undefined" && drawerContent ? createPortal(drawerContent, document.body) : null}
    </>
  );
}
