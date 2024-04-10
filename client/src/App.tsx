import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@/styles/global.scss";

import { mainRoutes } from "@/pages/main/main.route";
import { useAuthStore } from "@store/auth.store";

import { Toaster } from "@components/ui/sonner";
import { marketingRoutes } from "@pages/marketing/marketing.route";
import { dashboardRoutes } from "./pages/dashboard/dashboard.route";
import { specialistRoutes } from "./pages/specialist/specialist.route";
import NotFound from "./shared/components/404";
import ScreenLoading from "./shared/components/global-loading-page";
import { chatRoutes } from "@pages/chat/chat.route";
import { authRoutes } from "@pages/auth/auth.route";

const App = () => {
	const fetchMe = useAuthStore((store) => store.fetchMe);
	useEffect(() => {
		fetchMe();
	}, []);

	return (
		<>
			<ScreenLoading />
			<Toaster richColors />
			<RouterProvider
				router={createBrowserRouter([
					marketingRoutes,
					authRoutes,
					specialistRoutes,
					dashboardRoutes,
					chatRoutes,
					mainRoutes,
					{
						path: "*",
						element: <NotFound />,
					},
				])}
			/>
		</>
	);
};

export default App;
