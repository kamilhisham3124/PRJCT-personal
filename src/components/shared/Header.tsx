"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="border-b border-structural bg-surface-primary sticky top-0 z-40">
      <div className="max-w-dense mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-text-primary inline-block" />
          Kamil Hisham / Systems
        </Link>

        {/* Desktop persistent bar (BP-02+) */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden sm:flex items-center gap-1 font-mono text-xs"
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
                className={`px-3 py-1.5 border-structural transition-colors ${
                  isCurrent
                    ? "bg-text-primary text-surface-primary font-bold"
                    : "text-text-primary hover:bg-surface-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle (BP-01) */}
        <div className="sm:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="px-2.5 py-1 text-xs font-mono border-structural bg-surface-secondary text-text-primary"
          >
            {isOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile expanded drawer */}
      {isOpen && (
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-structural bg-surface-secondary p-4 flex flex-col gap-2 font-mono text-xs"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="p-2 border-structural bg-surface-primary text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
