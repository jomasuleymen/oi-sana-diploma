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
import { callRoutes } from "@pages/call/call.route";

export const router = createBrowserRouter([
	callRoutes,
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
]);

const App = () => {
	const fetchMe = useAuthStore((store) => store.fetchMe);
	useEffect(() => {
		fetchMe();
	}, []);

	return (
		<>
			<ScreenLoading />
			<Toaster richColors />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
