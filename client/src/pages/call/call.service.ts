import http from "@lib/http";

type JoinRoom = {
	roomId: string;
	token: string;
};

export const generateRoomToken = async (roomId: string) => {
	return (await http.get<JoinRoom>(`/call/${roomId}`)).data;
};
