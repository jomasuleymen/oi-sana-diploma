import $api from "@lib/http";
import { socket } from "@lib/socket";
import { toast } from "sonner";
import { create } from "zustand";
import { IncomeMessage, Room, RoomState, WriteMessage } from "../chat.types";
import { isIncomeMessage } from "../components/message";

const CHAT_ENDPOINT = "/chats";

type ChatStore = {
	rooms: RoomState[];
	selectedRoom: RoomState | null;
	isRoomsFetched: boolean;

	isLoading: boolean;

	fetchRoom: (username: string) => Promise<void>;
	selectRoom: (roomId: string) => Promise<void>;
	clearSelectedRoom: () => void;
	fetchRooms: () => Promise<void>;
	sendMessage: (message: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
	rooms: [],
	isLoading: true,
	isRoomsFetched: false,
	selectedRoom: null,

	fetchRooms: async () => {
		if (get().isRoomsFetched) return;

		set({ isLoading: true });
		const rooms = await $api
			.get<Room[]>(`${CHAT_ENDPOINT}/recent-dialogs`)
			.then((res) => res.data);

		const roomStates: RoomState[] = rooms.map((room) => {
			return {
				...room,
				messagesFetched: false,
				messages: room.latestMessage ? [room.latestMessage] : [],
			};
		});

		set({ rooms: roomStates, isLoading: false, isRoomsFetched: true });
	},

	clearSelectedRoom: () => {
		set({ selectedRoom: null });
	},

	fetchRoom: async (userId) => {
		const { rooms } = get();

		const room = await $api
			.get<Room>(`${CHAT_ENDPOINT}/dialogs?user=${userId}`)
			.then((res) => res.data)
			.catch(() => {
				console.log("Room not found");
			});

		if (!room) {
			return;
		}

		const roomIndex = rooms.findIndex((r) => r.id === room.id);
		if (roomIndex > -1) {
			set({ selectedRoom: rooms[roomIndex] });
			return;
		}

		const foundRoom = {
			...room,
			messagesFetched: false,
			messages: [] as (IncomeMessage | WriteMessage)[],
		};

		if (room.latestMessage) {
			foundRoom.messages.push(room.latestMessage);
		}

		set({ selectedRoom: foundRoom });
	},

	selectRoom: async (roomId: string) => {
		const { rooms } = get();

		const foundRoom = rooms.find((r) => r.id === roomId);
		if (!foundRoom) return;

		if (!foundRoom.messagesFetched) {
			let before = "";

			if (foundRoom.messages.length) {
				// find the oldest message and fetch messages from that date
				const firstIncomeMessage = foundRoom.messages.find((m) =>
					isIncomeMessage(m)
				) as IncomeMessage;

				if (firstIncomeMessage) {
					before = firstIncomeMessage.id;
				}
			}
			const messages = await $api
				.get(`${CHAT_ENDPOINT}/dialog-messages/${foundRoom.id}`, {
					params: { before },
				})
				.then((res) => res.data);

			foundRoom.messages.unshift(...messages);
			foundRoom.messagesFetched = true;
		}

		set({ selectedRoom: foundRoom });
	},

	sendMessage: async (message: string) => {
		const { selectedRoom } = get();
		if (selectedRoom) {
			const newMessage: WriteMessage = {
				receiverId: selectedRoom.user.id,
				content: message.trim(),
				tempId: Date.now(),
				date: new Date(),
			};

			selectedRoom.messages.push(newMessage);
			set({ selectedRoom });
			socket.emit("send-message", newMessage);
		}
	},
}));

if (!socket.hasListeners("connect")) {
	socket.on("connect", () => {
		console.log("Socket connected");
	});
}

if (!socket.hasListeners("disconnect")) {
	socket.on("disconnect", () => {
		console.log("Socket disconnected");
	});
}

if (!socket.hasListeners("new-message")) {
	socket.on("new-message", async (message: IncomeMessage) => {
		const { rooms, selectedRoom } = useChatStore.getState();

		let room = rooms.find((r) => r.id === message.roomId);
		if (!room) {
			const newRoom = await $api
				.get<Room>(`${CHAT_ENDPOINT}/dialogs?room=${message.roomId}`)
				.then((res) => res.data);

			if (newRoom) {
				const newRoomState: RoomState = {
					...newRoom,
					messages: [],
					messagesFetched: true,
				};

				const roomIndex = rooms.findIndex((r) => r.id === newRoom.id);
				if (roomIndex === -1) {
					rooms.push(newRoomState);
				}

				room = newRoomState;
			} else {
				return;
			}
		}

		// if message has tempId, it means it's a message this user sent
		if (message.tempId) {
			const index = room.messages.findLastIndex((m) => m.tempId === message.tempId);
			if (index > -1) {
				room.messages[index] = message;
			} else {
				room.messages.push(message);
			}
		} else {
			room.messages.push(message);
		}

		room.latestMessage = message;
		const newSelectedRoom = selectedRoom?.id === room.id ? room : selectedRoom;
		useChatStore.setState({ rooms, selectedRoom: newSelectedRoom });
	});
}

if (!socket.hasListeners("error")) {
	socket.on("error", (args) => {
		toast.error(args.message, { position: "top-right" });
	});
}
