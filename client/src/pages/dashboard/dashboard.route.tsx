import { RouteObject } from "react-router-dom";

import ProtectedRoute from "@/shared/components/protected-route";
import AffirmationsDashboard from "./affirmations";
import AffirmationCreatePage from "./affirmations/new";
import ArticlesDashboard from "./articles";
import BooksDashboard from "./books";
import BookCreatePage from "./books/new";
import CourseReviewsDashboard from "./course-reviews";
import CoursesDashboard from "./courses";
import DashboardLayout from "./dashboard.layout";
import MeditationsDashboard from "./meditations";
import MeditationCreatePage from "./meditations/new";
import MethodologiesDashboard from "./methodologies";
import NewMethodologyPage from "./methodologies/new";
import NewsDashboard from "./news";
import NewsCreatePage from "./news/new";
import SpecialistsDashboard from "./specialists";
import SpecialistUpdate from "./specialists/specialist";
import UsersDashboard from "./users";

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
			children: [
				{
					index: true,
					element: <SpecialistsDashboard />,
				},
				{
					path: ":id",
					element: <SpecialistUpdate />,
				},
			],
		},
		{
			path: "methodologies",
			children: [
				{
					index: true,
					element: <MethodologiesDashboard />,
				},
				{
					path: "new",
					element: <NewMethodologyPage />,
				},
			],
		},
		{
			path: "courses",
			element: <CoursesDashboard />,
		},
		{
			path: "course-reviews",
			element: <CourseReviewsDashboard />,
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
		{
			path: "affirmations",
			children: [
				{
					index: true,
					element: <AffirmationsDashboard />,
				},
				{
					path: "new",
					element: <AffirmationCreatePage />,
				},
			],
		},
		{
			path: "news",
			children: [
				{
					index: true,
					element: <NewsDashboard />,
				},
				{
					path: "new",
					element: <NewsCreatePage />,
				},
			],
		},
	],
};
