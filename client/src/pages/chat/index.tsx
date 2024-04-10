import React from "react";
import { ChatLayout } from "./components/chat-layout";

type Props = {};

const ChatPage: React.FC<Props> = ({}) => {
	return (
		<div className="z-5 w-full h-full text-sm lg:flex mx-auto">
			<ChatLayout navCollapsedSize={8} />
		</div>
	);
};

export default ChatPage;
