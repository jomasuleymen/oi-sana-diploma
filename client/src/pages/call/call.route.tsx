import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@components/protected-route";
import { lazy } from "react";

const CallLayout = lazy(() => import("./call.layout"));
const VideoCallPage = lazy(() => import("./pages/video"));

export const callRoutes: RouteObject = {
	path: "/call",
	element: <ProtectedRoute element={<CallLayout />} />,
	children: [
		{
			path: "video",
			element: <VideoCallPage />,
		},
	],
};
