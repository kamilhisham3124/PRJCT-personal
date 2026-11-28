import React from "react";
import Link from "next/link";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
  PhosphorEnvelopeSimple,
  PhosphorCheckCircle,
} from "../icons";
import { BackToTopButton } from "../client/BackToTopButton";
import { QuickDrawerTrigger } from "../client/QuickDrawerTrigger";
import { MAIN_NAV_ITEMS } from "../../lib/utils/navigation";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-structural bg-surface-primary mt-auto transition-colors">
      <div className="max-w-dense mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col gap-4 sm:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:flex lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-accent-primary text-fg-on-emphasis border border-accent-border flex items-center justify-center font-bold text-xs tracking-tight shrink-0 shadow-button">
              KH
            </div>
            <div className="flex flex-col leading-tight">
              <div className="font-semibold text-sm text-text-primary whitespace-nowrap">Kamil Hisham</div>
              <div className="text-xs font-mono text-text-secondary whitespace-nowrap">Software Engineer</div>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-3 sm:flex sm:flex-wrap lg:flex-nowrap sm:items-center sm:justify-end lg:justify-center gap-x-2 gap-y-1 sm:gap-x-5 lg:gap-5 text-xs font-medium min-w-0"
          >
            {MAIN_NAV_ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-fg-accent hover:underline transition-colors min-h-[44px] inline-flex items-center whitespace-nowrap justify-self-start"
              >
                {link.label}
              </Link>
            ))}
            <QuickDrawerTrigger className="col-span-2 sm:col-span-1 text-text-secondary hover:text-fg-accent hover:underline transition-colors min-h-[44px] inline-flex items-center gap-1.5 whitespace-nowrap justify-self-start" />
          </nav>

          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1 sm:justify-end shrink-0">
            <a href="https://github.com/kamilhisham3124" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors shrink-0">
              <GithubBrandIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/kamilhisham" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors shrink-0">
              <LinkedinBrandIcon className="w-4 h-4" />
            </a>
            <a href="mailto:kamil.hisham3124@gmail.com" aria-label="Email Address" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors shrink-0">
              <PhosphorEnvelopeSimple className="w-4 h-4" />
            </a>
            <BackToTopButton />
          </div>
        </div>

        <div className="border-t border-border-structural pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono text-text-secondary" suppressHydrationWarning>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-status-success-bg text-status-success-fg border border-status-success-border w-fit shrink-0 whitespace-nowrap">
              <PhosphorCheckCircle className="w-3 h-3 shrink-0" />
              <span>WCAG 2.2 AA target</span>
            </span>
            <span className="leading-relaxed">Built with Next.js, TypeScript, and clean software engineering principles.</span>
          </div>
          <span className="shrink-0 whitespace-nowrap">&copy; {new Date().getUTCFullYear()} Kamil Hisham</span>
        </div>
      </div>
    </footer>
  );
}
