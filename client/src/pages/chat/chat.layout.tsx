import { memo } from "react";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";

const ChatLayout: React.FC = memo(() => {
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
