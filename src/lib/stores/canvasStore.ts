import { create } from "zustand";

export type CanvasLayout = "grid" | "stack" | "split";

export interface CanvasModuleNode {
  id: string;
  label: string;
  tech: string;
  status: string;
}

export const CANVAS_MODULES: CanvasModuleNode[] = [
  { id: "mod-1", label: "Auth Middleware", tech: "DRF Session Auth", status: "Active" },
  { id: "mod-2", label: "Audit Logger", tech: "PostgreSQL Trigger", status: "Sync" },
  { id: "mod-3", label: "Task State Machine", tech: "Model Lifecycle", status: "Active" },
  { id: "mod-4", label: "REST Serializer", tech: "DRF ModelSerializer", status: "Ready" },
  { id: "mod-5", label: "Role Dispatcher", tech: "RBAC Controller", status: "Active" },
  { id: "mod-6", label: "Telemetry Probe", tech: "Edge Latency Header", status: "Stream" },
];

export interface CanvasStoreState {
  layout: CanvasLayout;
  history: CanvasLayout[];
  setLayout: (newLayout: CanvasLayout) => void;
  reset: () => void;
  initialize: (initialLayout: CanvasLayout) => void;
}

export const useCanvasStore = create<CanvasStoreState>((set) => ({
  layout: "grid",
  history: [],
  initialize: (initialLayout) =>
    set(() => ({
      layout: initialLayout,
      history: [],
    })),
  setLayout: (newLayout) =>
    set((state) => {
      if (state.layout === newLayout) return state;
      const updatedHistory = [...state.history, state.layout].slice(-10);
      return {
        layout: newLayout,
        history: updatedHistory,
      };
    }),
  reset: () =>
    set((state) => {
      const initial = state.history.length > 0 ? state.history[0] : "grid";
      return {
        layout: initial,
        history: [],
      };
    }),
}));
