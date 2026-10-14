"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/lab", label: "Lab" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-200/80 dark:border-sky-900/60 bg-white/85 dark:bg-[#031B33]/85 backdrop-blur-xl transition-colors shadow-[0_2px_12px_rgba(2,132,199,0.06)]">
      <div className="max-w-dense mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-sky-300 via-sky-500 to-sky-700 p-[1px] shadow-aero-glass transition-all group-hover:scale-105">
            <div className="w-full h-full bg-[#031B33] rounded-[11px] flex items-center justify-center text-white font-extrabold text-sm font-display tracking-tight shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
              KH
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-aero-sky transition-colors">
                Kamil Hisham
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-sky-50 dark:bg-sky-950/60 text-aero-sky dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                [AERO_SYS]
              </span>
            </div>
          </div>
        </Link>

        {/* HyperUI-Style Aero Tab Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 bg-sky-100/60 dark:bg-sky-950/40 p-1.5 rounded-full border border-sky-200/70 dark:border-sky-800/60 shadow-[inset_0_1px_2px_rgba(2,132,199,0.08)]"
        >
          {NAV_ITEMS.map((item) => {
            const isCurrent =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isCurrent
                    ? "aero-btn-primary shadow-sm"
                    : "text-slate-600 dark:text-sky-200 hover:text-sky-600 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold aero-btn-primary group"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-sky-200 dark:border-sky-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav
          id="mobile-nav"
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-sky-200 dark:border-sky-800 bg-white/95 dark:bg-[#031B33]/95 p-4 flex flex-col gap-2 shadow-lg"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-900/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 p-3 text-center rounded-xl font-semibold text-sm aero-btn-primary"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}
