import ProtectedRoute from "@/shared/components/protected-route";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const SpecialistProfile = lazy(() => import("./profile"));
const SpecialistsLayout = lazy(() => import("./specialist.layout"));

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
