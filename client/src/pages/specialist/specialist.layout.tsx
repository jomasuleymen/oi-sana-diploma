import { memo } from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/header";

const SpecialistsLayout: React.FC = memo(() => {
	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-16">
				<Outlet />
			</main>
		</>
	);
});

export default SpecialistsLayout;
