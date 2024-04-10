import $api from "@lib/http";
import { create } from "zustand";
import { IncomeMessage, Room, RoomState, WriteMessage } from "../chat.types";
import { socket } from "@lib/socket";
import { toast } from "sonner";
import { isIncomeMessage } from "../components/message";

const CHAT_ENDPOINT = "/chats";

type ChatStore = {
	rooms: RoomState[];
	selectedRoom: RoomState | null;
	isRoomsFetched: boolean;

	isLoading: boolean;

	fetchRooms: () => Promise<void>;
	selectRoom: (roomId: string) => Promise<void>;
	sendMessage: (message: string) => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
	rooms: [],
	isLoading: true,
	isRoomsFetched: false,
	selectedRoom: null,

	fetchRooms: async () => {
		set({ isLoading: true });
		const rooms = await $api
			.get<Room[]>(`${CHAT_ENDPOINT}/recent-dialogs`)
			.then((res) => res.data);

		const roomStates: RoomState[] = rooms.map((room) => {
			return {
				...room,
				messagesFetched: false,
				messages: [room.latestMessage],
			};
		});

		set({ rooms: roomStates, isLoading: false, isRoomsFetched: true });
	},

	selectRoom: async (roomId: string) => {
		const { rooms } = get();
		let foundRoom = rooms.find((room) => room.id === roomId);

		if (!foundRoom) {
			const room = await $api
				.get<Room>(`${CHAT_ENDPOINT}/dialogs/${roomId}`)
				.then((res) => res.data);

			foundRoom = {
				...room,
				messagesFetched: false,
				messages: [room.latestMessage],
			};
			rooms.push(foundRoom);
		}

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
				.get(`${CHAT_ENDPOINT}/dialog-messages/${roomId}`, {
					params: { before },
				})
				.then((res) => res.data);

			foundRoom.messages.unshift(...messages);
			foundRoom.messagesFetched = true;
		}

		set({ selectedRoom: foundRoom, rooms });
	},

	sendMessage: async (message: string) => {
		const { selectedRoom } = get();
		if (selectedRoom) {
			const newMessage: WriteMessage = {
				receiverId: selectedRoom.user.id,
				content: message.trim(),
				tempId: Math.random() * 1000,
			};

			selectedRoom.messages.push(newMessage);
			socket.emit("send-message", newMessage);
			set({ selectedRoom });
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
	socket.on("new-message", (message: IncomeMessage) => {
		const { rooms, selectedRoom } = useChatStore.getState();
		const room = rooms.find((r) => r.id === message.roomId);
		if (room) {
			if (message.tempId) {
				const index = room.messages.findIndex((m) => m.tempId === message.tempId);
				if (index > -1) {
					room.messages[index] = message;
				} else {
					room.messages.push(message);
				}
			} else {
				room.messages.push(message);
			}

			room.latestMessage = message;
		}

		if (selectedRoom?.id === message.roomId) {
			useChatStore.setState({ selectedRoom: room, rooms });
		}
	});
}

if (!socket.hasListeners("error")) {
	socket.on("error", (args) => {
		toast.error(args.message, { position: "top-right" });
	});
}
