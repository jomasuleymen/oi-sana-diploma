import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Button } from "@components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { cn } from "@utils/utils";
import { Room } from "../chat.types";
import { useChatStore } from "../store/chat.store";

interface SidebarProps {
	isCollapsed: boolean;
	rooms: Room[];
	isMobile: boolean;
}

export function ChatSidebar({ rooms, isCollapsed, isMobile }: SidebarProps) {
	const [selectedRoom, setSelectedRoom] = useChatStore((state) => [
		state.selectedRoom,
		state.selectRoom,
	]);

	return (
		<div
			data-collapsed={isCollapsed}
			className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2"
		>
			{!isCollapsed && (
				<div className="flex justify-between p-2 items-center">
					<div className="flex gap-2 items-center text-2xl">
						<p className="font-medium">Chats</p>
						<span className="text-zinc-300">({rooms.length})</span>
					</div>
				</div>
			)}
			<nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
				{rooms
					.toSorted(
						(a, b) =>
							(a.latestMessage &&
								b.latestMessage &&
								a.latestMessage.date.localeCompare(b.latestMessage.date) * -1) ||
							0
					)
					.map((room) => {
						const variant =
							selectedRoom && selectedRoom.id === room.id ? "grey" : "ghost";
						const { user } = room;

						return isCollapsed ? (
							<TooltipProvider key={room.id}>
								<Tooltip key={room.id} delayDuration={0}>
									<TooltipTrigger asChild>
										<Button
											variant={variant}
											size="icon"
											onClick={() => setSelectedRoom(room.id)}
											className={cn(
												"h-11 w-11 md:h-16 md:w-16",
												variant === "grey" &&
													"bg-zinc-100 hover:bg-zinc-100"
											)}
										>
											<AvatarWrapper
												className="flex justify-center items-center"
												src={user.profileImage}
												username={user.username}
											/>{" "}
											<span className="sr-only">{user.username}</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent
										side="right"
										className="flex items-center gap-4"
									>
										{user.username}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<Button
								key={room.id}
								onClick={() => setSelectedRoom(room.id)}
								variant={variant}
								size={"xl"}
								className={cn(
									"justify-start gap-4 text-left outline-none",
									variant === "grey" && "bg-zinc-100 hover:bg-zinc-100"
								)}
							>
								<AvatarWrapper
									className="flex justify-center items-center"
									src={user.profileImage}
									username={user.username}
								/>
								<div className="flex flex-col max-w-28">
									<span>{user.username}</span>
									{room.latestMessage && (
										<span className="text-zinc-300 text-xs truncate">
											{room.latestMessage.content}
										</span>
									)}
								</div>
							</Button>
						);
					})}
			</nav>
		</div>
	);
}
