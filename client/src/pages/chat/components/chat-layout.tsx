import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { cn } from "@utils/utils";
import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/chat.store";
import { Chat } from "./chat";
import { ChatSidebar } from "./chat-sidebar";

interface ChatLayoutProps {
	defaultLayout?: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
}

export function ChatLayout({
	defaultLayout = [25, 75],
	defaultCollapsed = false,
	navCollapsedSize,
}: ChatLayoutProps) {
	const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
	const [isMobile, setIsMobile] = useState(false);

	const [rooms, fetchRecentDialogs] = useChatStore((state) => [state.rooms, state.fetchRooms]);

	useEffect(() => {
		fetchRecentDialogs();
	}, [fetchRecentDialogs]);

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check
		checkScreenWidth();

		// Event listener for screen width changes
		window.addEventListener("resize", checkScreenWidth);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	return (
		<ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 0 : 18}
				maxSize={isMobile ? 8 : 30}
				onCollapse={() => {
					setIsCollapsed(true);
				}}
				onExpand={() => {
					setIsCollapsed(false);
				}}
				className={cn(
					isCollapsed &&
						"min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
				)}
			>
				<ChatSidebar
					isCollapsed={isCollapsed || isMobile}
					rooms={rooms}
					isMobile={isMobile}
				/>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				<Chat />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
