import http from "@lib/http";

type JoinRoom = {
	roomId: string;
	token: string;
	appId: string;
};

export const generateRoomToken = async (roomId: string) => {
	return (await http.get<JoinRoom>(`/call/${roomId}`)).data;
};

export const findRooms = async () => {
	return (await http.get<string[]>(`/call/rooms`)).data;
};
