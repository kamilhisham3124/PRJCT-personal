"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "../client/ThemeToggle";
import { QuickDrawer } from "../client/QuickDrawer";

const NAV_ITEMS = [
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/lab", label: "Lab" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
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
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-structural)] bg-[var(--surface-primary)]/80 backdrop-blur-md transition-colors">
      <div className="max-w-dense mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group min-h-[44px] py-1">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-tight transition-transform group-hover:scale-105">
            KH
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)]">Kamil Hisham</span>
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">Software Engineer</span>
          </div>
        </Link>

        {/* Minimal Navigation Bar */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1 bg-[var(--surface-secondary)] p-1 rounded-lg border border-[var(--border-structural)]">
          {NAV_ITEMS.map((item) => {
            const isCurrent = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isCurrent ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-sm font-semibold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Quick Drawer */}
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle />
          <QuickDrawer />
          <Link href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium linkhunt-btn-primary min-h-[44px] group">
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle & Quick Drawer */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <QuickDrawer />
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-structural)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav id="mobile-nav" role="navigation" aria-label="Mobile navigation" className="md:hidden border-t border-[var(--border-structural)] bg-[var(--surface-primary)] p-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isCurrent = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium rounded-lg transition-colors ${
                  isCurrent ? "bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[var(--border-structural)] mt-2">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium linkhunt-btn-primary min-h-[44px]">
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
