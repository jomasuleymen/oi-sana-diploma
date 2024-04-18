import { memo } from "react";
import { useNavigate } from "react-router-dom";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";
import Loading from "@components/loading";
import { useAuthStore } from "@store/auth.store";

const AuthLayout: React.FC = memo(() => {
	const [user, loading] = useAuthStore((store) => [store.isAuth, store.loading]);
	const navigate = useNavigate();

	if (user) {
		navigate("/");
	}

	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-20 relative">
				{loading || user ? <Loading /> : <CustomOutlet />}
			</main>
		</>
	);
});

export default AuthLayout;
