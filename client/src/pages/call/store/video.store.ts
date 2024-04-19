import { create } from "zustand";
import { findRooms } from "../call.service";

type VideoStore = {
	videoRooms: string[];
	isFetched: boolean;
	addVideoRoom: (roomId: string) => void;
	removeVideoRoom: (roomId: string) => void;
	fetchRooms: () => Promise<void>;
};

export const useVideoStore = create<VideoStore>((set, get) => ({
	videoRooms: [],
	isFetched: false,

	addVideoRoom: (roomId: string) => {
		const isAlreadyIn = get().videoRooms.includes(roomId);
		if (isAlreadyIn) return;

		set({ videoRooms: [...get().videoRooms, roomId] });
	},

	removeVideoRoom: (roomId: string) => {
		set({ videoRooms: get().videoRooms.filter((room) => room !== roomId) });
	},

	fetchRooms: async () => {
		findRooms()
			.then((rooms) => {
				if (rooms && Array.isArray(rooms)) set({ videoRooms: rooms, isFetched: true });
			})
			.finally(() => {
				set({ isFetched: true });
			});
	},
}));
