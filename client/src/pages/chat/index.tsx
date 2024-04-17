import React from "react";
import { ChatLayout } from "./components/chat-layout";
import { useChatStore } from "./store/chat.store";
import "@pages/call/pages/video/video-socket";

type Props = {};

const ChatPage: React.FC<Props> = ({}) => {
	const [clearSelectedRoom] = useChatStore((state) => [state.clearSelectedRoom]);

	React.useEffect(() => {
		return () => {
			clearSelectedRoom();
		};
	}, [clearSelectedRoom]);

	return (
		<div className="z-5 w-full h-full text-sm lg:flex mx-auto">
			<ChatLayout navCollapsedSize={8} />
		</div>
	);
};

export default ChatPage;
