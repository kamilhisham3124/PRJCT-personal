"use client";

import React, { useEffect, useRef, useState } from "react";
import { PhosphorSun, PhosphorMoon, PhosphorMonitor, PhosphorCheck } from "../icons";

export type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const OPTIONS: Array<{ id: ThemeMode; label: string; hint: string }> = [
  { id: "light", label: "Light", hint: "Daylight canvas" },
  { id: "dark", label: "Dark", hint: "Carbon night" },
  { id: "system", label: "System", hint: "Follows OS" },
];

function applyTheme(mode: ThemeMode): ResolvedTheme {
  const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved: ResolvedTheme = mode === "system" ? (osDark ? "dark" : "light") : mode;
  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.theme = resolved;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  return resolved;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const initial: ThemeMode = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setMode(initial);
    setResolved(applyTheme(initial));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onOsChange = () => { if (mode === "system") setResolved(applyTheme("system")); };
    mq.addEventListener("change", onOsChange);
    return () => mq.removeEventListener("change", onOsChange);
  }, [mode, mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsOpen(false); triggerRef.current?.focus(); }
    };
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const selectTheme = (next: ThemeMode) => {
    setMode(next);
    localStorage.setItem("theme", next);
    const nextResolved = applyTheme(next);
    setResolved(nextResolved);
    setAnnouncement(`Theme set to ${next}${next === "system" ? ` (${nextResolved})` : ""}`);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const renderIcon = (target: ThemeMode, active: boolean) => {
    const cls = `w-4 h-4 shrink-0 ${active ? "text-fg-accent" : "text-text-secondary"}`;
    if (target === "light") return <PhosphorSun className={cls} />;
    if (target === "dark") return <PhosphorMoon className={cls} filled={active} />;
    return <PhosphorMonitor className={cls} />;
  };

  if (!mounted) {
    return <div aria-hidden="true" className="w-11 h-11 rounded-lg border border-border-structural opacity-0" />;
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="theme-selector-menu"
        aria-label={`Color theme: ${mode}${mode === "system" ? ` (${resolved})` : ""}`}
        className="min-w-[44px] min-h-[44px] p-2.5 inline-flex items-center justify-center rounded-lg border border-control-border bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-secondary hover:border-border-highlight transition-colors"
      >
        {renderIcon(mode, true)}
      </button>

      {isOpen && (
        <div
          id="theme-selector-menu"
          role="menu"
          aria-label="Color theme options"
          className="absolute right-0 mt-2 w-48 rounded-xl bg-surface-elevated border border-border-structural shadow-menu z-50 p-1.5 flex flex-col gap-1"
        >
          {OPTIONS.map((opt) => {
            const isSelected = mode === opt.id;
            const hint = opt.id === "system" ? `OS: ${resolved}` : opt.hint;
            return (
              <button
                key={opt.id}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => selectTheme(opt.id)}
                className={`w-full min-h-[44px] px-2.5 py-2 rounded-lg flex items-center justify-between text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-accent-subtle text-fg-accent border border-accent-border font-semibold"
                    : "text-text-primary hover:bg-surface-secondary border border-transparent"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {renderIcon(opt.id, isSelected)}
                  <span>
                    <span className="block leading-tight">{opt.label}</span>
                    <span className="block text-[10px] font-mono text-text-muted font-normal">{hint}</span>
                  </span>
                </span>
                {isSelected && <PhosphorCheck className="w-3.5 h-3.5 text-fg-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
      <span className="sr-only" aria-live="polite">{announcement}</span>
    </div>
  );
}
