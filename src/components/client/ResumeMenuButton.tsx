"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Download, ChevronDown, FileText, ExternalLink, User } from "lucide-react";

export function ResumeMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Resume options dropdown menu"
        className="inline-flex items-center gap-2 linkhunt-btn-secondary rounded-lg px-4 py-2.5 text-xs font-semibold min-h-[44px]"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Resume Options</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-structural)] shadow-xl z-30 p-1.5 flex flex-col gap-1"
        >
          <a
            href="/resume.pdf?download=true"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] min-h-[44px]"
          >
            <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <span className="block font-semibold">Download PDF</span>
              <span className="block text-[10px] text-[var(--text-secondary)]">Standard A4 / ATS formatted</span>
            </div>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <span className="block font-semibold">View in Browser</span>
              <span className="block text-[10px] text-[var(--text-secondary)]">Opens PDF in a new tab</span>
            </div>
          </a>

          <Link
            href="/about"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] min-h-[44px]"
          >
            <User className="w-4 h-4 text-[var(--text-secondary)]" />
            <div>
              <span className="block font-semibold">Interactive Profile</span>
              <span className="block text-[10px] text-[var(--text-secondary)]">Explore experience &amp; metrics</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
