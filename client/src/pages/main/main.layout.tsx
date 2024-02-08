import { memo } from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/header";

const MainLayout: React.FC = memo(() => {
	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-16">
				<Outlet />
			</main>
		</>
	);
});

export default MainLayout;
