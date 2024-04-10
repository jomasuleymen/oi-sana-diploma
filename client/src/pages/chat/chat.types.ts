import { User } from "@pages/main/user/user.service";

export type Room = {
	id: string;
	user: Pick<User, "id" | "profileImage" | "username">;
	unReadMessagesCount: number;
	latestMessage: IncomeMessage;
};

export type RoomState = Room & {
	messages: (IncomeMessage | WriteMessage)[];
	messagesFetched: boolean;
};

export interface IncomeMessage {
	id: string;
	content: string;
	date: string;
	read: boolean;
	delivered: boolean;
	senderId: number;
	roomId: string;
	tempId?: number;
}

export interface WriteMessage {
	tempId: number;
	receiverId: number;
	content: string;
}
