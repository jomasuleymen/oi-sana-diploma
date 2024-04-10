import { useChatStore } from "../store/chat.store";
import ChatBottombar from "./chat-bottombar";
import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";
import RoomNotSelected from "./room-not-selected";

interface ChatProps {}

export function Chat({}: ChatProps) {
	const [room] = useChatStore((state) => [state.selectedRoom]);
	if (!room) return <RoomNotSelected />;

	return (
		<div className="flex flex-col justify-between w-full h-full">
			<ChatTopbar selectedUser={room.user} />
			<ChatList />
			<ChatBottombar room={room} />
		</div>
	);
}
