"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { path: "/work", label: "01 // Work" },
  { path: "/about", label: "02 // About" },
  { path: "/lab", label: "03 // Lab" },
  { path: "/contact", label: "04 // Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-structural bg-surface-primary/95 backdrop-blur sticky top-0 z-40">
      <div className="h-1 hazard-stripe w-full" />
      <div className="max-w-dense mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex gap-1">
            <div className="w-10 h-10 border-element-2 bg-surface-secondary flex flex-col justify-between p-0.5 text-[8px] font-mono leading-none">
              <div className="flex justify-between text-accent-chemical">
                <span>19</span>
                <span>39.1</span>
              </div>
              <div className="text-center font-bold text-sm text-text-primary font-display leading-tight">
                Ka
              </div>
              <div className="text-[7px] text-text-secondary text-center">Kamil</div>
            </div>
            <div className="w-10 h-10 border-element-2 bg-surface-secondary flex flex-col justify-between p-0.5 text-[8px] font-mono leading-none">
              <div className="flex justify-between text-accent-chemical">
                <span>01</span>
                <span>1.01</span>
              </div>
              <div className="text-center font-bold text-sm text-text-primary font-display leading-tight">
                Hi
              </div>
              <div className="text-[7px] text-text-secondary text-center">Hisham</div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider text-text-primary group-hover:text-accent-chemical transition-colors">
              KAMIL HISHAM
            </span>
            <span className="font-mono text-[10px] text-text-secondary tracking-widest">
              SYSTEMS // BATCH 00892-B
            </span>
          </div>
        </Link>

        {/* Desktop persistent bar */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden sm:flex items-center gap-1.5 font-mono text-xs"
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
                className={`px-3 py-1.5 border transition-all ${
                  isCurrent
                    ? "border-element bg-accent-element text-text-primary font-bold shadow-sm"
                    : "border-structural bg-surface-secondary text-text-secondary hover:text-text-primary hover:border-element"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <div className="sm:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="px-2.5 py-1 text-xs font-mono border-element bg-surface-secondary text-accent-chemical"
          >
            {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
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
              className="p-2 border-structural bg-surface-primary text-text-primary hover:border-element"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
