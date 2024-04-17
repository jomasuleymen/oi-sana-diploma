import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const ChatPage = lazy(() => import("."));
const ChatLayout = lazy(() => import("./chat.layout"));
const ProtectedRoute = lazy(() => import("@/shared/components/protected-route"));

export const chatRoutes: RouteObject = {
	path: "/chat",
	element: <ProtectedRoute element={<ChatLayout />} />,
	children: [
		{
			index: true,
			element: <ChatPage />,
		},
	],
};
