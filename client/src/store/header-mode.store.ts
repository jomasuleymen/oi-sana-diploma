import { create } from "zustand";

export type HeaderMode = "transparent" | "normal";

type HeaderStore = {
	mode: HeaderMode;
	addClassName: (mode: HeaderMode) => void;
};

export const useHeaderStore = create<HeaderStore>((set, get) => ({
	mode: "normal",
	addClassName: (mode: HeaderMode) => set({ mode }),
}));
