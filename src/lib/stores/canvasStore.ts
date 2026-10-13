import { create } from "zustand";

export type CanvasLayout = "grid" | "stack" | "split";

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
