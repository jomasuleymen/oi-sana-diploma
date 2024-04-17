import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const MainLayout = lazy(() => import("./main.layout"));
const ProtectedRoute = lazy(() => import("@/shared/components/protected-route"));
const ArticlesPage = lazy(() => import("./article"));
const ArticlePage = lazy(() => import("./article/components/article-item"));
const CreateArticlePage = lazy(() => import("./article/components/new"));
const BooksPage = lazy(() => import("./book"));
const CoursesPage = lazy(() => import("./course"));
const CoursePage = lazy(() => import("./course/components/course-page"));
const CourseViewPage = lazy(() => import("./course/components/course-view-page"));
const CreateCoursePage = lazy(() => import("./course/components/new"));
const ReviewCoursePage = lazy(() => import("./course/components/review"));
const HomePage = lazy(() => import("./home"));
const MeditationCategoriesPage = lazy(() => import("./meditation"));
const MeditationsPage = lazy(() => import("./meditation/components/meditations"));
const MethodologiesPage = lazy(() => import("./methodology"));
const NewsPage = lazy(() => import("./news"));
const SettingsPage = lazy(() => import("./settings"));
const SpecialistsPage = lazy(() => import("./specialists"));
const TestsPage = lazy(() => import("./tests"));

export const mainRoutes: RouteObject = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			path: "home",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
			],
		},
		{
			path: "articles",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <ArticlesPage />,
				},
				{
					path: ":slug",
					element: <ArticlePage />,
				},
				{
					path: "new",
					element: <CreateArticlePage />,
				},
			],
		},
		{
			path: "news",
			element: <ProtectedRoute />,
			children: [
				{
					path: ":slug",
					element: <NewsPage />,
				},
			],
		},
		{
			path: "courses",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <CoursesPage />,
				},
				{
					path: "my",
					element: <CoursesPage myEnrolledCourses />,
				},
				{
					path: "new",
					element: <CreateCoursePage />,
				},
				{
					path: "view",
					children: [
						{
							path: ":slug",
							children: [
								{
									index: true,
									element: <CourseViewPage />,
								},
								{
									path: "review",
									element: <ReviewCoursePage />,
								},
							],
						},
					],
				},
				{
					path: ":slug",
					children: [
						{
							index: true,
							element: <CoursePage />,
						},
					],
				},
			],
		},
		{
			path: "settings",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <SettingsPage />,
				},
			],
		},
		{
			path: "books",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <BooksPage />,
				},
			],
		},
		{
			path: "specialists",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <SpecialistsPage />,
				},
			],
		},
		{
			path: "tests",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <TestsPage />,
				},
			],
		},
		{
			path: "meditations",
			element: <ProtectedRoute />,
			children: [
				{ index: true, element: <MeditationCategoriesPage /> },
				{
					path: ":category",
					element: <MeditationsPage />,
				},
			],
		},
		{
			path: "methodologies",
			element: <ProtectedRoute />,
			children: [{ index: true, element: <MethodologiesPage /> }],
		},
	],
};
