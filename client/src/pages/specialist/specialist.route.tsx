import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/shared/components/protected-route";
import CabinetPage from "./cabinet";
import SpecialistsLayout from "./specialist.layout";

export const specialistRoutes: RouteObject = {
	path: "/specialist",
	element: <ProtectedRoute specialist element={<SpecialistsLayout />} />,
	children: [
		{
			index: true,
			element: <CabinetPage />,
		},
	],
};
