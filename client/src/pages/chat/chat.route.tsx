import { RouteObject } from "react-router-dom";

import ChatLayout from "./chat.layout";
import ChatPage from ".";
import ProtectedRoute from "@components/protected-route";

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
