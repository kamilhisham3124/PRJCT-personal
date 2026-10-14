"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#080D1A]/80 backdrop-blur-xl transition-colors">
      <div className="max-w-dense mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] via-[#7A73FF] to-[#00D4FF] p-[1.5px] shadow-sm group-hover:shadow-[0_4px_16px_rgba(99,91,255,0.4)] transition-all">
            <div className="w-full h-full bg-[#0A2540] dark:bg-[#080D1A] rounded-[10px] flex items-center justify-center text-white font-extrabold text-sm font-display tracking-tight">
              KH
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-[#0A2540] dark:text-white group-hover:text-[#635BFF] dark:group-hover:text-indigo-400 transition-colors">
                Kamil Hisham
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-[#635BFF] dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/60">
                Systems
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1 rounded-full border border-slate-200/60 dark:border-slate-800/60"
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
                    ? "bg-white dark:bg-slate-800 text-[#635BFF] dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-[#0A2540] dark:hover:text-white"
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#635BFF] hover:bg-[#5349e0] shadow-[0_4px_12px_rgba(99,91,255,0.35)] hover:shadow-[0_6px_20px_rgba(99,91,255,0.45)] transition-all group"
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
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#080D1A]/95 p-4 flex flex-col gap-2"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl font-medium text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 p-3 text-center rounded-xl font-semibold text-sm text-white bg-[#635BFF]"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}
