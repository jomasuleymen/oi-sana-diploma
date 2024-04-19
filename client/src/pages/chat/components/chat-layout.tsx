import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/resizable";
import { cn } from "@utils/utils";
import React from "react";
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

	return (
		<ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={18}
				maxSize={30}
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
				<ChatSidebar isCollapsed={isCollapsed} />
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				<Chat />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
