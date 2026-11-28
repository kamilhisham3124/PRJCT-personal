"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhosphorListDashes,
  PhosphorX,
  PhosphorSidebarSimple,
} from "../icons";
import { ThemeToggle } from "../client/ThemeToggle";
import { QuickDrawer } from "../client/QuickDrawer";
import { MAIN_NAV_ITEMS, QUICK_DRAWER_TRIGGER_META, CONTACT_CTA_ITEM } from "../../lib/utils/navigation";
import { DrawerLinkIcon } from "./DrawerLinkIcon";

const NAV_ITEMS = MAIN_NAV_ITEMS;

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
    <header className="sticky top-0 z-50 w-full border-b border-border-structural bg-surface-header backdrop-blur-md transition-colors">
      <div className="max-w-dense mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-h-[44px] py-1 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent-primary text-fg-on-emphasis border border-accent-border flex items-center justify-center font-bold text-xs tracking-tight transition-transform group-hover:scale-105 shrink-0 shadow-button">
            KH
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-text-primary">Kamil Hisham</span>
            <span className="text-[11px] font-mono text-text-secondary hidden min-[380px]:block">Software Engineer</span>
          </div>
        </Link>

        {/* Minimal Desktop Navigation */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1 bg-surface-secondary p-1 rounded-lg border border-border-structural">
          {NAV_ITEMS.map((item) => {
            const isCurrent = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isCurrent ? "bg-surface-elevated text-fg-accent border border-accent-border shadow-card font-semibold" : "text-text-secondary hover:text-text-primary border border-transparent"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Quick Drawer (Desktop >= 768px) */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <QuickDrawer />
          <Link href={CONTACT_CTA_ITEM.href} {...(CONTACT_CTA_ITEM.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs linkhunt-btn-primary min-h-[44px] group">
            <span>{CONTACT_CTA_ITEM.label}</span>
            <DrawerLinkIcon isExternal={CONTACT_CTA_ITEM.isExternal} className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Mobile Toggle & Quick Drawer (< 768px, covers all phones & portrait tablets) */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <QuickDrawer />
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-control-border bg-surface-elevated text-text-primary hover:bg-surface-secondary transition-colors"
          >
            {isOpen ? <PhosphorX className="w-5 h-5" /> : <PhosphorListDashes className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav id="mobile-nav" role="navigation" aria-label="Mobile navigation" className="md:hidden border-t border-border-structural bg-surface-primary p-4 flex flex-col gap-2 shadow-menu">
          {NAV_ITEMS.map((item) => {
            const isCurrent = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-3 py-2.5 min-h-[44px] flex items-center text-sm font-medium rounded-lg transition-colors ${isCurrent ? "bg-accent-subtle text-fg-accent border border-accent-border font-semibold" : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-quick-drawer"));
              }
            }}
            className="w-full px-3 py-2.5 min-h-[44px] flex items-center justify-between text-sm font-medium rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary border border-border-structural transition-colors text-left"
          >
            <span className="flex items-center gap-2">
              <PhosphorSidebarSimple className="w-4 h-4 text-fg-accent shrink-0" />
              <span>{QUICK_DRAWER_TRIGGER_META.label}</span>
            </span>
            <DrawerLinkIcon isExternal={QUICK_DRAWER_TRIGGER_META.isExternal} className="w-3.5 h-3.5 text-text-secondary shrink-0" />
          </button>
          <div className="pt-2 border-t border-border-structural mt-1">
            <Link href={CONTACT_CTA_ITEM.href} onClick={() => setIsOpen(false)} {...(CONTACT_CTA_ITEM.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs linkhunt-btn-primary min-h-[44px]">
              <span>{CONTACT_CTA_ITEM.label}</span>
              <DrawerLinkIcon isExternal={CONTACT_CTA_ITEM.isExternal} className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
