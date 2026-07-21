import { create } from "zustand";
type UIState = { taskOpen: boolean; openTask: () => void; closeTask: () => void };
export const useUIStore = create<UIState>(set => ({ taskOpen: false, openTask: () => set({ taskOpen: true }), closeTask: () => set({ taskOpen: false }) }));
