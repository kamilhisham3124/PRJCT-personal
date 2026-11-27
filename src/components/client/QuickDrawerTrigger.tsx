"use client";

import React from "react";
import { PhosphorSidebarSimple } from "../icons";

export function QuickDrawerTrigger({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-quick-drawer"));
        }
      }}
      className={className}
      aria-label="Open Quick Reference: Overview & Contact"
    >
      {children || (
        <>
          <PhosphorSidebarSimple className="w-3.5 h-3.5 shrink-0" />
          <span>Quick Reference</span>
        </>
      )}
    </button>
  );
}
