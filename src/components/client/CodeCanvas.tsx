"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore, CanvasLayout, CANVAS_MODULES } from "../../lib/stores/canvasStore";
import {
  PhosphorSquaresFour, PhosphorRows, PhosphorColumns,
  PhosphorArrowCounterClockwise, PhosphorTerminalWindow, PhosphorArrowRight,
} from "../icons";

export interface CodeCanvasProps {
  initialLayout: CanvasLayout;
  onLayoutChange?: (layout: CanvasLayout) => void;
}

export function CodeCanvas({ initialLayout, onLayoutChange }: CodeCanvasProps) {
  const { layout, history, setLayout, reset, initialize } = useCanvasStore();
  const [selectedId, setSelectedId] = useState<string>("mod-1");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    initialize(initialLayout);
  }, [initialLayout, initialize]);

  const handleLayoutSelect = (next: CanvasLayout) => {
    setLayout(next);
    setAnnouncement(`Layout changed to ${next}`);
    onLayoutChange?.(next);
  };

  const handleReset = () => {
    reset();
    setSelectedId("mod-1");
    setAnnouncement("Layout and node selection reset");
  };

  const selectedNode = CANVAS_MODULES.find((m) => m.id === selectedId) ?? CANVAS_MODULES[0];
  const layoutContainerClass =
    layout === "stack"
      ? "flex flex-col gap-1.5 sm:gap-2.5"
      : "grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3";

  const getSplitSpan = (idx: number) => {
    if (layout !== "split") return "";
    if (idx === 0) return "col-span-2";
    if (idx === 3 || idx === 4) return "md:col-span-2";
    if (idx === 5) return "col-span-2 md:col-span-1";
    return "";
  };

  return (
    <div role="group" aria-label="Interactive layout demonstration" className="bg-surface-terminal text-fg-terminal rounded-xl p-3 sm:p-6 border border-border-terminal shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-border-terminal pb-3 mb-3.5 sm:pb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-border-terminal inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-terminal inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary inline-block" />
          </div>
          <div className="h-4 w-px bg-border-terminal" />
          <div className="flex items-center gap-1.5 text-xs font-mono text-fg-terminal-muted">
            <PhosphorTerminalWindow className="w-3.5 h-3.5 text-fg-terminal" />
            <span className="text-fg-terminal font-medium">state_engine.tsx</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 bg-surface-terminal-bar p-0.5 sm:p-1 rounded-lg border border-border-terminal max-w-full overflow-x-auto">
          {(["grid", "stack", "split"] as CanvasLayout[]).map((mode) => {
            const Icon = mode === "grid" ? PhosphorSquaresFour : mode === "stack" ? PhosphorRows : PhosphorColumns;
            const isSelected = layout === mode;
            return (
              <button key={mode} type="button" aria-pressed={isSelected} title={`Switch to ${mode} layout`} onClick={() => handleLayoutSelect(mode)} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-[11px] sm:text-xs font-medium transition-colors min-h-[44px] shrink-0 ${isSelected ? "bg-accent-primary text-fg-on-emphasis font-semibold" : "text-fg-terminal-muted hover:text-fg-terminal"}`}>
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="capitalize">{mode}</span>
              </button>
            );
          })}
          <button type="button" onClick={handleReset} title="Reset sandbox layout" aria-label="Reset sandbox layout" className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 sm:py-2 min-h-[44px] shrink-0 text-[11px] sm:text-xs font-medium text-fg-terminal-muted hover:text-fg-terminal rounded transition-colors">
            <PhosphorArrowCounterClockwise className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className={layoutContainerClass}>
        {CANVAS_MODULES.map((item, idx) => {
          const isNodeActive = selectedId === item.id;
          const isCompactStack = layout === "stack";
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isNodeActive}
              onClick={() => { setSelectedId(item.id); setAnnouncement(`Selected node 0${idx + 1}: ${item.label}`); }}
              className={`group w-full text-left cursor-pointer p-2.5 sm:p-3.5 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${getSplitSpan(idx)} ${isNodeActive ? "bg-surface-terminal-bar border-accent-border" : "bg-surface-terminal-card border-border-terminal hover:border-accent-border hover:bg-surface-terminal-bar"}`}
            >
              <div className="flex items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono text-fg-terminal-muted mb-0.5 sm:mb-1">
                <span className="truncate">
                  node_0{idx + 1}
                  {isCompactStack && <strong className="ml-1.5 font-sans text-xs sm:text-sm font-semibold text-fg-terminal group-hover:text-accent-primary">{item.label}</strong>}
                </span>
                <span className="bg-status-success-bg text-status-success-fg px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono border border-status-success-border shrink-0">
                  {item.status}
                </span>
              </div>
              {!isCompactStack && (
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-fg-terminal group-hover:text-accent-primary transition-colors">{item.label}</span>
                  <span className={`text-[10px] font-mono shrink-0 transition-opacity ${isNodeActive ? "text-accent-primary opacity-100" : "text-fg-terminal-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`} aria-hidden="true">
                    {isNodeActive ? "Active" : "Inspect"}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-fg-terminal-muted mt-0.5">
                <span>{item.tech}</span>
                {isCompactStack && (
                  <span className={`text-[10px] font-mono shrink-0 transition-opacity ${isNodeActive ? "text-accent-primary opacity-100" : "text-fg-terminal-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`} aria-hidden="true">
                    {isNodeActive ? "Active" : "Inspect"}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 pt-2.5 sm:mt-5 sm:pt-3.5 border-t border-border-terminal flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-fg-terminal-muted">
        <span className="text-[11px]">
          Selected: <strong className="text-fg-terminal font-medium">{selectedNode.label}</strong> ({selectedNode.tech})
        </span>
        {history.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            <span>History:</span>
            {history.map((h, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                <span className="bg-surface-terminal-bar border border-border-terminal text-fg-terminal px-2 py-0.5 rounded text-[11px]">{h}</span>
                {i < history.length - 1 && <PhosphorArrowRight className="w-3 h-3 text-fg-terminal-muted shrink-0" aria-hidden="true" />}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="sr-only" aria-live="polite">{announcement}</div>
    </div>
  );
}
