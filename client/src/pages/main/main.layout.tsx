import { memo } from "react";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";
import MainSidebar from "./main-sidebar";

const MainLayout: React.FC = memo(() => {
	return (
		<div className="flex flex-col h-screen !overflow-hidden">
			<Header className="h-16 shadow-sm" />
			<div className="flex flex-1 !overflow-auto px-1 mt-1">
				<main className="flex-1 p-2">
					<CustomOutlet />
				</main>
				<div className="sticky top-0 overflow-y-auto no-scrollbar">
					<MainSidebar />
				</div>
			</div>
		</div>
	);
});

export default MainLayout;
