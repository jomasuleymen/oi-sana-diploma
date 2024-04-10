import { buttonVariants } from "@components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { cn } from "@utils/utils";
import { FileImage, Paperclip, PlusCircle, SendHorizontal, ThumbsUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "../chat.types";
import { useChatStore } from "../store/chat.store";

interface ChatBottombarProps {
	room: Room;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ room }: ChatBottombarProps) {
	const [message, setMessage] = useState("");
	const inputRef = useRef<HTMLDivElement>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLDivElement>) => {
		setMessage(event.target.textContent || "");
	};
	const [sendMessage] = useChatStore((state) => [state.sendMessage]);

	const handleThumbsUp = () => {
		sendMessage("👍");
		setMessage("");
		if (inputRef.current) {
			inputRef.current.textContent = "";
		}
	};

	const handleSend = () => {
		if (message.trim()) {
			sendMessage(message);
			setMessage("");

			if (inputRef.current) {
				inputRef.current.focus();
				inputRef.current.textContent = "";
			}
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSend();
		}

		if (event.key === "Enter" && event.shiftKey) {
			event.preventDefault();
			setMessage((prev) => prev + "\n");
		}
	};

	return (
		<div className="p-2 flex justify-between w-full items-center gap-2 border-t-accent border-t-[1px]">
			<div className="flex">
				<Popover>
					<PopoverTrigger asChild>
						<Link
							to="#"
							className={cn(
								buttonVariants({ variant: "ghost", size: "icon" }),
								"h-9 w-9",
								"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
							)}
						>
							<PlusCircle size={20} className="text-muted-foreground" />
						</Link>
					</PopoverTrigger>
					<PopoverContent side="top" className="w-full p-2">
						{BottombarIcons.map((icon, index) => (
							<Link
								key={index}
								to="#"
								className={cn(
									buttonVariants({ variant: "ghost", size: "icon" }),
									"h-9 w-9",
									"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
								)}
							>
								<icon.icon size={20} className="text-muted-foreground" />
							</Link>
						))}
					</PopoverContent>
				</Popover>
			</div>

			<div className="w-full h-full border rounded-md relative flex items-center p-2">
				<div
					contentEditable={true}
					role="textbox"
					ref={inputRef}
					suppressContentEditableWarning={true}
					onKeyDown={handleKeyPress}
					onInput={handleInputChange}
					className="w-full flex-1 outline-0 no-scrollbar overflow-y-auto overflow-x-hidden text-sm min-h-[1.47em] max-h-[8.35em] select-text break-words whitespace-pre-wrap"
				></div>

				{!message && (
					<div className="w-max absolute pointer-events-none">
						<p className="text-gray-700 opacity-80">Type a message</p>
					</div>
				)}
			</div>

			{message.trim() ? (
				<Link
					to="#"
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"h-9 w-9",
						"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
					)}
					onClick={handleSend}
				>
					<SendHorizontal size={20} className="text-muted-foreground" />
				</Link>
			) : (
				<Link
					to="#"
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"h-9 w-9",
						"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
					)}
					onClick={handleThumbsUp}
				>
					<ThumbsUp size={20} className="text-muted-foreground" />
				</Link>
			)}
		</div>
	);
}
