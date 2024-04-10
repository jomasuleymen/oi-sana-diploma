import { useAuthStore } from "@store/auth.store";
import { cn } from "@utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { IncomeMessage } from "../chat.types";
import { useChatStore } from "../store/chat.store";
import ChatMessage, { isIncomeMessage } from "./message";

interface ChatListProps {}

export function ChatList({}: ChatListProps) {
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const user = useAuthStore((store) => store.user);
	const messages = useChatStore((store) => store.selectedRoom?.messages);

	if (!user) return null;

	React.useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
		}
	}, [messages?.length]);

	return (
		<div ref={messagesContainerRef} className="w-full h-full my-3 overflow-y-auto overflow-x-hidden">
			<AnimatePresence>
				{messages?.map((message, index) => {
					const myMessage =
						!isIncomeMessage(message) ||
						(message as IncomeMessage)?.senderId == user.id;

					return (
						<motion.div
							key={index}
							layout
							initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
							animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
							exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
							transition={{
								opacity: { duration: 0.1 },
							}}
							style={{
								originX: 0.5,
								originY: 0.5,
							}}
							className={cn(
								"flex items-center whitespace-pre-wrap px-[4%] mb-1",
								myMessage ? "justify-end" : "justify-start"
							)}
						>
							<ChatMessage myMessage={myMessage} message={message} />
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
