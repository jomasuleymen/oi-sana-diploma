import { memo } from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/header";

const ChatLayout: React.FC = memo(() => {
	return (
		<>
			<div className="flex flex-col h-screen !overflow-hidden">
				<Header className="h-16" />
				<div className="flex flex-1 !overflow-hidden">
					<main className="flex-1 overflow-y-auto paragraph">
						<Outlet />
					</main>
				</div>
			</div>
		</>
	);
});

export default ChatLayout;
