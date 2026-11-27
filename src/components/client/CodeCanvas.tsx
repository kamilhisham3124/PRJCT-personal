"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore, CanvasLayout } from "../../lib/stores/canvasStore";
import {
  PhosphorSquaresFour,
  PhosphorRows,
  PhosphorColumns,
  PhosphorArrowCounterClockwise,
  PhosphorTerminalWindow,
  PhosphorArrowRight,
} from "../icons";

export interface CodeCanvasProps {
  initialLayout: CanvasLayout;
  onLayoutChange?: (layout: CanvasLayout) => void;
}

const SAMPLE_MODULES = [
  { id: "mod-1", label: "Auth Middleware", tech: "DRF Session Auth", status: "Active" },
  { id: "mod-2", label: "Audit Logger", tech: "PostgreSQL Trigger", status: "Sync" },
  { id: "mod-3", label: "Task State Machine", tech: "Model Lifecycle", status: "Active" },
  { id: "mod-4", label: "REST Serializer", tech: "DRF ModelSerializer", status: "Ready" },
  { id: "mod-5", label: "Role Dispatcher", tech: "RBAC Controller", status: "Active" },
  { id: "mod-6", label: "Telemetry Probe", tech: "Edge Latency Header", status: "Stream" },
];

export function CodeCanvas({ initialLayout, onLayoutChange }: CodeCanvasProps) {
  const { layout, history, setLayout, reset, initialize } = useCanvasStore();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const isNarrow = typeof window !== "undefined" && window.innerWidth < 1024;
    initialize(isNarrow ? "stack" : initialLayout);
  }, [initialLayout, initialize]);

  const handleLayoutSelect = (next: CanvasLayout) => {
    setLayout(next);
    setAnnouncement(`Layout changed to ${next}`);
    onLayoutChange?.(next);
  };

  const layoutContainerClass =
    layout === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3"
      : layout === "stack"
      ? "flex flex-col gap-2 sm:gap-2.5"
      : "grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3";

  return (
    <div
      role="group"
      aria-label="Interactive layout demonstration"
      className="bg-surface-terminal text-fg-terminal rounded-xl p-3 sm:p-6 border border-border-terminal shadow-card"
    >
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
              <button
                key={mode}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleLayoutSelect(mode)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-[11px] sm:text-xs font-medium transition-colors min-h-[44px] shrink-0 ${
                  isSelected
                    ? "bg-accent-primary text-fg-on-emphasis font-semibold"
                    : "text-fg-terminal-muted hover:text-fg-terminal"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="capitalize">{mode}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={reset}
            title="Reset sandbox"
            aria-label="Reset sandbox layout"
            className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] shrink-0 inline-flex items-center justify-center text-fg-terminal-muted hover:text-fg-terminal rounded transition-colors"
          >
            <PhosphorArrowCounterClockwise className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className={layoutContainerClass}>
        {SAMPLE_MODULES.map((item, idx) => (
          <div
            key={item.id}
            className={`p-2.5 sm:p-3.5 rounded-lg bg-surface-terminal-card border border-border-terminal hover:border-accent-border transition-colors ${
              layout === "split" && idx < 2 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fg-terminal-muted mb-1 sm:mb-1.5">
              <span>node_0{idx + 1}</span>
              <span className="bg-status-success-bg text-status-success-fg px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono border border-status-success-border">
                {item.status}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-fg-terminal mb-0.5">{item.label}</div>
            <div className="text-[10px] sm:text-xs font-mono text-fg-terminal-muted">{item.tech}</div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-3.5 pt-2.5 sm:mt-5 sm:pt-3.5 border-t border-border-terminal flex items-center gap-2 text-xs font-mono text-fg-terminal-muted overflow-x-auto">
          <span>History:</span>
          {history.map((h, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              <span className="bg-surface-terminal-bar border border-border-terminal text-fg-terminal px-2 py-0.5 rounded text-[11px]">{h}</span>
              {i < history.length - 1 && <PhosphorArrowRight className="w-3 h-3 text-fg-terminal-muted shrink-0" aria-hidden="true" />}
            </span>
          ))}
        </div>
      )}

      <div className="sr-only" aria-live="polite">{announcement}</div>
    </div>
  );
}
