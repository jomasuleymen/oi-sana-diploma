import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const ProtectedRoute = lazy(() => import("@/shared/components/protected-route"));
const AffirmationsDashboard = lazy(() => import("./affirmations"));
const AffirmationCreatePage = lazy(() => import("./affirmations/new"));
const ArticlesDashboard = lazy(() => import("./articles"));
const BooksDashboard = lazy(() => import("./books"));
const BookCreatePage = lazy(() => import("./books/new"));
const CourseReviewsDashboard = lazy(() => import("./course-reviews"));
const CoursesDashboard = lazy(() => import("./courses"));
const DashboardLayout = lazy(() => import("./dashboard.layout"));
const MeditationsDashboard = lazy(() => import("./meditations"));
const MeditationCreatePage = lazy(() => import("./meditations/new"));
const MethodologiesDashboard = lazy(() => import("./methodologies"));
const NewMethodologyPage = lazy(() => import("./methodologies/new"));
const NewsDashboard = lazy(() => import("./news"));
const NewsCreatePage = lazy(() => import("./news/new"));
const OverviewDashboard = lazy(() => import("./overview"));
const PaymentsDashboard = lazy(() => import("./payments"));
const SpecialistsDashboard = lazy(() => import("./specialists"));
const SpecialistUpdate = lazy(() => import("./specialists/specialist"));
const UsersDashboard = lazy(() => import("./users"));

export const dashboardRoutes: RouteObject = {
	path: "/dashboard",
	element: <ProtectedRoute admin element={<DashboardLayout />} />,
	children: [
		{
			index: true,
			element: <OverviewDashboard />,
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
			path: "payments",
			element: <PaymentsDashboard />,
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
