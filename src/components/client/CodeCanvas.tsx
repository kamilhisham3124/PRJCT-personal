"use client";

import React, { useEffect, useState } from "react";
import { useCanvasStore, CanvasLayout } from "../../lib/stores/canvasStore";

export interface CodeCanvasProps {
  initialLayout: CanvasLayout;
  onLayoutChange?: (layout: CanvasLayout) => void;
}

const SAMPLE_MODULES = [
  { id: "mod-1", label: "Auth Middleware", tech: "DRF Session Auth" },
  { id: "mod-2", label: "Audit Logger", tech: "PostgreSQL Trigger" },
  { id: "mod-3", label: "Task State Machine", tech: "Django Model Lifecycle" },
  { id: "mod-4", label: "REST Serializer", tech: "DRF ModelSerializer" },
  { id: "mod-5", label: "Role Dispatcher", tech: "RBAC Controller" },
  { id: "mod-6", label: "Telemetry Probe", tech: "Edge Latency Header" },
];

export function CodeCanvas({ initialLayout, onLayoutChange }: CodeCanvasProps) {
  const { layout, history, setLayout, reset, initialize } = useCanvasStore();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    initialize(initialLayout);
  }, [initialLayout, initialize]);

  const handleLayoutSelect = (next: CanvasLayout) => {
    setLayout(next);
    setAnnouncement(`Layout changed to ${next}`);
    onLayoutChange?.(next);
  };

  const layoutContainerClass =
    layout === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
      : layout === "stack"
      ? "flex flex-col gap-3"
      : "grid grid-cols-1 md:grid-cols-3 gap-3";

  return (
    <div
      role="group"
      aria-label="Interactive layout demonstration"
      className="border-structural bg-surface-secondary p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-structural pb-4 mb-4">
        <div>
          <span className="text-xs font-mono uppercase text-text-secondary block">
            Architecture Sandbox
          </span>
          <span className="text-sm font-bold text-text-primary">
            Component Composition Engine
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(["grid", "stack", "split"] as CanvasLayout[]).map((mode) => (
            <button
              key={mode}
              type="button"
              role="button"
              aria-pressed={layout === mode}
              onClick={() => handleLayoutSelect(mode)}
              className={`px-3 py-1.5 text-xs font-mono border-structural ${
                layout === mode
                  ? "bg-text-primary text-surface-primary font-bold"
                  : "bg-surface-primary text-text-primary hover:bg-surface-secondary"
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="px-3 py-1.5 text-xs font-mono border-structural bg-surface-primary text-text-secondary hover:text-text-primary"
          >
            RESET
          </button>
        </div>
      </div>

      <div className={layoutContainerClass}>
        {SAMPLE_MODULES.map((item, idx) => (
          <div
            key={item.id}
            className={`p-3 border-structural bg-surface-primary transition-all duration-150 ${
              layout === "split" && idx < 2 ? "md:col-span-2" : ""
            }`}
          >
            <div className="text-xs font-mono text-text-secondary">
              0{idx + 1} / NODE
            </div>
            <div className="text-sm font-bold font-mono text-text-primary">
              {item.label}
            </div>
            <div className="text-xs font-mono text-text-secondary mt-1">
              {item.tech}
            </div>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-4 pt-3 border-t border-structural text-xs font-mono text-text-secondary">
          <span>State History ({history.length}/10): </span>
          <span>{history.join(" &gt; ")}</span>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
}
