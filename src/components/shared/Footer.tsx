import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-structural bg-surface-secondary mt-auto">
      <div className="max-w-dense mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono text-text-secondary">
        <div>
          <span className="font-bold text-text-primary">Kamil Hisham</span>
          <span className="mx-2 text-accent-chemical">//</span>
          <span>Full-Stack Systems Engineer</span>
          <span className="mx-2 text-border-highlight">|</span>
          <span className="text-text-secondary">BATCH 00892-B</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/kamilhisham3124"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-chemical underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kamilhisham"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-chemical underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kamil.hisham3124@gmail.com"
            className="hover:text-accent-chemical underline"
          >
            kamil.hisham3124@gmail.com
          </a>
          <Link href="/about" className="hover:text-accent-chemical underline">
            WCAG 2.2 AA Conformance
          </Link>
        </div>

        <div className="text-[11px] text-text-secondary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent-barrel rounded-full inline-block" />
          <span>34.5920° N, 106.3652° W</span>
          <span className="text-accent-chemical">:: 99.1% Purity</span>
        </div>
      </div>
      <div className="h-0.5 hazard-stripe w-full opacity-60" />
    </footer>
  );
}
