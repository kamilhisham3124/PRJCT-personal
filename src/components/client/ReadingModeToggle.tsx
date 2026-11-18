"use client";

import React, { useState, useEffect } from "react";
import { PhosphorEye } from "../icons";

export function ReadingModeToggle() {
  const [isHyperlegible, setIsHyperlegible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("reading-mode");
    const isActive = stored === "hyperlegible";
    setIsHyperlegible(isActive);
    if (isActive) {
      document.documentElement.setAttribute("data-reading-mode", "hyperlegible");
    }
  }, []);

  const handleToggle = () => {
    const nextState = !isHyperlegible;
    setIsHyperlegible(nextState);
    if (nextState) {
      document.documentElement.setAttribute("data-reading-mode", "hyperlegible");
      localStorage.setItem("reading-mode", "hyperlegible");
    } else {
      document.documentElement.removeAttribute("data-reading-mode");
      localStorage.setItem("reading-mode", "default");
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-[44px] flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span className="flex items-center gap-2">
          <PhosphorEye className="w-3.5 h-3.5" />
          <span>Enhanced Legibility</span>
        </span>
        <span className="text-[10px] uppercase font-mono tracking-wider">Default</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isHyperlegible}
      aria-label="Toggle enhanced legibility font mode (Atkinson Hyperlegible Next)"
      className="w-full min-h-[44px] py-2 px-3 flex items-center justify-between rounded-lg border border-[var(--border-structural)] bg-[var(--surface-secondary)] text-xs text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors"
    >
      <span className="flex items-center gap-2 font-medium">
        <PhosphorEye className={`w-3.5 h-3.5 ${isHyperlegible ? "text-[var(--accent-signal)]" : "text-[var(--text-secondary)]"}`} filled={isHyperlegible} />
        <span>Enhanced Legibility</span>
      </span>
      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isHyperlegible ? "bg-[var(--accent-signal)] text-white" : "text-[var(--text-secondary)]"}`}>
        {isHyperlegible ? "Active" : "Default"}
      </span>
    </button>
  );
}
