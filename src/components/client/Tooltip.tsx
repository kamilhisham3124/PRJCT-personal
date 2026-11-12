"use client";

import React, { useState } from "react";

export function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <span className="border-b border-dotted border-[var(--text-secondary)]">
        {children}
      </span>
      {isVisible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-2.5 py-1.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-[11px] font-sans font-medium shadow-lg z-50 pointer-events-none text-center"
        >
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
        </span>
      )}
    </span>
  );
}
