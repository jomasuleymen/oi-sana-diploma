import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/shared/components/protected-route";
import ArticlesDashboard from "./articles";
import BooksDashboard from "./books";
import CoursesDashboard from "./courses";
import DashboardLayout from "./dashboard.layout";
import MeditationsDashboard from "./meditations";
import MeditationCreatePage from "./meditations/new";
import MethodologiesDashboard from "./methodologies";
import SpecialistsDashboard from "./specialists";
import UsersDashboard from "./users";
import BookCreatePage from "./books/new";

export const dashboardRoutes: RouteObject = {
	path: "/dashboard",
	element: <ProtectedRoute admin element={<DashboardLayout />} />,
	children: [
		{
			index: true,
			element: <div>Dashboard</div>,
		},
		{
			path: "users",
			element: <UsersDashboard />,
		},
		{
			path: "specialists",
			element: <SpecialistsDashboard />,
		},
		{
			path: "methodologies",
			element: <MethodologiesDashboard />,
		},
		{
			path: "courses",
			element: <CoursesDashboard />,
		},
		{
			path: "articles",
			element: <ArticlesDashboard />,
		},
		{
			path: "meditations",
			children: [
				{
					index: true,
					element: <MeditationsDashboard />,
				},
				{
					path: "new",
					element: <MeditationCreatePage />,
				},
			],
		},
		{
			path: "books",
			children: [
				{
					index: true,
					element: <BooksDashboard />,
				},
				{
					path: "new",
					element: <BookCreatePage />,
				},
			],
		},
	],
};
