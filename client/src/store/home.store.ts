import { create } from "zustand";

type HomeStore = {
	isShownSidebar: boolean;
	hideSideBar: () => void;
	showSideBar: () => void;
};

export const useHomeStore = create<HomeStore>((set, get) => ({
	isShownSidebar: true,
	hideSideBar: () => {
		set({ isShownSidebar: false });
	},
	showSideBar: () => {
		set({ isShownSidebar: true });
	},
}));
