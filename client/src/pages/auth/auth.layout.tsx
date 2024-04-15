import { memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "@components/layout/header";
import { useAuthStore } from "@store/auth.store";
import Loading from "@components/loading";

const AuthLayout: React.FC = memo(() => {
	const [user, loading] = useAuthStore((store) => [store.isAuth, store.loading]);
	const navigate = useNavigate();

	if (user) {
		navigate("/");
	}

	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-20">{loading || user ? <Loading /> : <Outlet />}</main>
		</>
	);
});

export default AuthLayout;
