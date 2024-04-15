import { create } from "zustand";

type VideoStore = {
	videoRooms: string[];
	addVideoRoom: (roomId: string) => void;
	removeVideoRoom: (roomId: string) => void;
};

export const useVideoStore = create<VideoStore>((set, get) => ({
	videoRooms: [],
	addVideoRoom: (roomId: string) => {
		set({ videoRooms: [...get().videoRooms, roomId] });
	},
	removeVideoRoom: (roomId: string) =>
		set({ videoRooms: get().videoRooms.filter((room) => room !== roomId) }),
}));
