import { memo, useEffect } from "react";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";
import { useVideoStore } from "@pages/call/store/video.store";
import { useChatStore } from "./store/chat.store";

const ChatLayout: React.FC = memo(() => {
	const fetchChatRooms = useChatStore((state) => state.fetchRooms);
	const fetchVideoRooms = useVideoStore((store) => store.fetchRooms);

	useEffect(() => {
		fetchChatRooms();
		fetchVideoRooms();
	}, [fetchChatRooms, fetchVideoRooms]);

	return (
		<>
			<div className="flex flex-col h-screen !overflow-hidden">
				<Header className="h-16" />
				<div className="flex flex-1 !overflow-hidden">
					<main className="flex-1 overflow-y-auto paragraph">
						<CustomOutlet />
					</main>
				</div>
			</div>
		</>
	);
});

export default ChatLayout;
