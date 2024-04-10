import { RouteObject } from "react-router-dom";

import ChatLayout from "./chat.layout";
import ChatPage from ".";

export const chatRoutes: RouteObject = {
	path: "/chat",
	element: <ChatLayout />,
	children: [
		{
			index: true,
			element: <ChatPage />,
		},
	],
};
