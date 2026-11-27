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

const SITEMAP_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border-structural bg-surface-primary mt-auto transition-colors">
      <div className="max-w-dense mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-primary text-fg-on-emphasis border border-accent-border flex items-center justify-center font-bold text-xs tracking-tight shrink-0 shadow-button">
              KH
            </div>
            <div>
              <div className="font-semibold text-sm text-text-primary">Kamil Hisham</div>
              <div className="text-xs font-mono text-text-secondary">Software Engineer</div>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {SITEMAP_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-text-secondary hover:text-fg-accent hover:underline transition-colors min-h-[44px] inline-flex items-center">
                {link.label}
              </Link>
            ))}
            <QuickDrawerTrigger className="text-text-secondary hover:text-fg-accent hover:underline transition-colors min-h-[44px] inline-flex items-center gap-1.5" />
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/kamilhisham3124" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors">
              <GithubBrandIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/kamilhisham" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors">
              <LinkedinBrandIcon className="w-4 h-4" />
            </a>
            <a href="mailto:kamil.hisham3124@gmail.com" aria-label="Email Address" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-fg-accent hover:bg-surface-secondary transition-colors">
              <PhosphorEnvelopeSimple className="w-4 h-4" />
            </a>
            <BackToTopButton />
          </div>
        </div>

        <div className="border-t border-border-structural pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-text-secondary" suppressHydrationWarning>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-status-success-bg text-status-success-fg border border-status-success-border w-fit">
              <PhosphorCheckCircle className="w-3 h-3" />
              <span>WCAG 2.2 AA</span>
            </span>
            <span className="leading-relaxed">Built with Next.js, TypeScript, and clean software engineering principles.</span>
          </div>
          <span className="shrink-0">&copy; {new Date().getFullYear()} Kamil Hisham</span>
        </div>
      </div>
    </footer>
  );
}
