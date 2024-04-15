import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@components/protected-route";
import CallLayout from "./call.layout";
import VideoCallPage from "./pages/video";

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
