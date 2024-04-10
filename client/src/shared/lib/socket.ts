import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SERVER_URL, {
	withCredentials: true,
	autoConnect: true,
	reconnectionDelay: 2500,
});
