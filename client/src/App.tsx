import { Suspense, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { mainRoutes } from "@/pages/main/main.route";
import { useAuthStore } from "@store/auth.store";

import Loading from "@components/loading";
import { Toaster } from "@components/ui/sonner";
import { authRoutes } from "@pages/auth/auth.route";
import { callRoutes } from "@pages/call/call.route";
import { chatRoutes } from "@pages/chat/chat.route";
import { marketingRoutes } from "@pages/marketing/marketing.route";
import { dashboardRoutes } from "./pages/dashboard/dashboard.route";
import { specialistRoutes } from "./pages/specialist/specialist.route";
import NotFound from "./shared/components/404";
import ScreenLoading from "./shared/components/global-loading-page";

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
			<Suspense fallback={<Loading />}>
				<RouterProvider router={router} />
			</Suspense>
		</>
	);
};

export default App;
