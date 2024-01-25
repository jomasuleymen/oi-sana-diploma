import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "@/components/layout/header";
import NotFound from "@/components/NotFound";

import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./store/auth.store";
import "@/styles/global.scss";

// const Home = React.lazy(() => import('@/pages/Home'));

const MainLayout: React.FC = React.memo(() => {
	const checkAuth = useAuthStore((store) => store.checkAuth);
	const navigate = useNavigate();

	const checkAuthAndNavigate = React.useCallback(async () => {
		try {
			await checkAuth();
		} catch (e) {
			// navigate("/auth");
		}
	}, [checkAuth, navigate]);

	React.useEffect(() => {
		checkAuthAndNavigate();
	}, []);

	return (
		<>
			<Header />
			{/* <Outlet /> */}
			<Toaster richColors />
		</>
	);
});

const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/profile" element={null} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
