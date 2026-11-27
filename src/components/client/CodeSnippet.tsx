"use client";

import React, { useEffect, useRef, useState } from "react";
import { PhosphorCheck, PhosphorCopy } from "../icons";

export function CodeSnippet({
  code,
  language = "python",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;

    const update = () => {
      const overflowing = el.scrollWidth > el.clientWidth + 2;
      setHasOverflow(overflowing);
      setCanScrollRight(overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[CodeSnippet] Copy failed:", err);
    }
  };

  return (
    <div className="rounded-lg border border-border-terminal bg-surface-terminal text-fg-terminal overflow-hidden font-mono text-xs my-3 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-surface-terminal-bar border-b border-border-terminal text-[11px] text-fg-terminal-muted">
        <span className="font-semibold text-fg-terminal break-all">
          {filename || language}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          {hasOverflow && (
            <span className="text-[10px] font-mono text-fg-terminal-muted px-1.5 py-0.5 rounded bg-surface-terminal-card border border-border-terminal">
              Scroll &harr;
            </span>
          )}
          <button
            type="button"
            onClick={copyToClipboard}
            aria-label={copied ? "Code copied to clipboard" : "Copy code snippet"}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-terminal-card border border-border-terminal text-fg-terminal-muted hover:text-fg-terminal hover:border-accent-border transition-colors min-h-[44px]"
          >
            {copied ? (
              <>
                <PhosphorCheck className="w-3.5 h-3.5 text-status-success shrink-0" aria-hidden="true" />
                <span className="text-[10px] text-status-success font-sans font-semibold" aria-hidden="true">Copied</span>
              </>
            ) : (
              <>
                <PhosphorCopy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="text-[10px] font-sans" aria-hidden="true">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        <pre
          ref={preRef}
          tabIndex={0}
          aria-label={`${filename || language} code snippet`}
          className="p-3.5 overflow-x-auto terminal-scrollbar leading-relaxed text-[11px] md:text-xs lg:text-[11px] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus:outline-none"
        >
          <code>{code}</code>
        </pre>
        {canScrollRight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 code-fade-right"
          />
        )}
      </div>
    </div>
  );
}
