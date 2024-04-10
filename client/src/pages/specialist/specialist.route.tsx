import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/shared/components/protected-route";
import SpecialistProfile from "./profile";
import SpecialistsLayout from "./specialist.layout";

export const specialistRoutes: RouteObject = {
	path: "/specialists",
	element: <SpecialistsLayout />,
	children: [
		{
			path: ":id",
			element: <ProtectedRoute element={<SpecialistProfile />} />,
		},
	],
};
