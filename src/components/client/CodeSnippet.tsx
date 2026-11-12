"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

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
    <div className="rounded-lg border border-[var(--border-structural)] bg-zinc-950 text-zinc-100 overflow-hidden font-mono text-xs my-3">
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 border-b border-zinc-800 text-[11px] text-zinc-400">
        <span className="font-semibold text-zinc-300">
          {filename || language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={copied ? "Code copied to clipboard" : "Copy code snippet"}
          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors min-h-[44px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-sans">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px] font-sans">Copy</span>
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
