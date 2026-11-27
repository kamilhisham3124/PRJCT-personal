"use client";

import React, { useState } from "react";
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
      <div className="flex items-center justify-between px-3.5 py-2 bg-surface-terminal-bar border-b border-border-terminal text-[11px] text-fg-terminal-muted">
        <span className="font-semibold text-fg-terminal">
          {filename || language}
        </span>
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
      <pre className="p-3.5 overflow-x-auto leading-relaxed text-[11px] sm:text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
}
