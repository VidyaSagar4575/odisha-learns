import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SAMPLE_HISTORY, type QuizAttempt } from "@/data/mock";

interface AppState {
  selectedClass: number | null;
  onboarded: boolean;
  darkMode: boolean;
  history: QuizAttempt[];
  setClass: (c: number) => void;
  setOnboarded: (v: boolean) => void;
  toggleDark: () => void;
  addAttempt: (a: QuizAttempt) => void;
  clearLocal: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      selectedClass: null,
      onboarded: false,
      darkMode: false,
      history: SAMPLE_HISTORY,
      setClass: (c) => set({ selectedClass: c }),
      setOnboarded: (v) => set({ onboarded: v }),
      toggleDark: () =>
        set((s) => {
          const next = !s.darkMode;
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", next);
          }
          return { darkMode: next };
        }),
      addAttempt: (a) => set((s) => ({ history: [a, ...s.history] })),
      clearLocal: () => set({ selectedClass: null, onboarded: false, history: [] }),
    }),
    { name: "c6-10-store" },
  ),
);
