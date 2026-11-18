import React from "react";
import Link from "next/link";
import {
  GithubBrandIcon,
  LinkedinBrandIcon,
  PhosphorEnvelopeSimple,
  PhosphorCheckCircle,
} from "../icons";
import { BackToTopButton } from "../client/BackToTopButton";

const SITEMAP_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-structural)] bg-[var(--surface-primary)] mt-auto transition-colors">
      <div className="max-w-dense mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-tight shrink-0">
              KH
            </div>
            <div>
              <div className="font-semibold text-sm text-[var(--text-primary)]">Kamil Hisham</div>
              <div className="text-xs font-mono text-[var(--text-secondary)]">Software Engineer</div>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {SITEMAP_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors min-h-[44px] inline-flex items-center">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/kamilhisham3124" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">
              <GithubBrandIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/kamilhisham" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">
              <LinkedinBrandIcon className="w-4 h-4" />
            </a>
            <a href="mailto:kamil.hisham3124@gmail.com" aria-label="Email Address" className="w-11 h-11 inline-flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors">
              <PhosphorEnvelopeSimple className="w-4 h-4" />
            </a>
            <BackToTopButton />
          </div>
        </div>

        <div className="border-t border-[var(--border-structural)] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[var(--text-secondary)]" suppressHydrationWarning>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 w-fit">
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
