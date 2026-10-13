import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-structural bg-surface-primary mt-auto">
      <div className="max-w-dense mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono text-text-secondary">
        <div>
          <span className="font-bold text-text-primary">Kamil Hisham</span>
          <span className="mx-2">/</span>
          <span>Full-Stack Systems Engineer</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/kamilhisham3124"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/kamilhisham"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:kamil.hisham3124@gmail.com"
            className="hover:text-text-primary underline"
          >
            kamil.hisham3124@gmail.com
          </a>
          <Link href="/about" className="hover:text-text-primary underline">
            WCAG 2.2 AA Conformance
          </Link>
        </div>

        <div>
          <span>Deterministic Edge Deployment</span>
        </div>
      </div>
    </footer>
  );
}
