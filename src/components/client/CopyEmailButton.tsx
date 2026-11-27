"use client";

import React, { useState } from "react";
import { PhosphorCopy, PhosphorCheck } from "../icons";

export interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const defaultClasses =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--border-structural)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors min-h-[44px]";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${email} to clipboard`}
      className={className || defaultClasses}
    >
      {copied ? (
        <>
          <PhosphorCheck className="w-3.5 h-3.5 text-status-success-fg shrink-0" aria-hidden="true" />
          <span className="text-status-success-fg font-semibold" aria-hidden="true">Copied!</span>
        </>
      ) : (
        <>
          <PhosphorCopy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span aria-hidden="true">Copy</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

