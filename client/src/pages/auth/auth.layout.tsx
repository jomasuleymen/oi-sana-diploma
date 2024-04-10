import { memo } from "react";
import { Outlet } from "react-router-dom";

import Header from "@components/layout/header";

const AuthLayout: React.FC = memo(() => {
	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-20">
				<Outlet />
			</main>
		</>
	);
});

export default AuthLayout;
