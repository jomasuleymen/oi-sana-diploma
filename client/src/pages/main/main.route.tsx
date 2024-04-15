import { RouteObject } from "react-router-dom";

import MainLayout from "./main.layout";

import ProtectedRoute from "@/shared/components/protected-route";
import ArticlesPage from "./article";
import ArticlePage from "./article/components/article-item";
import CreateArticlePage from "./article/components/new";
import BooksPage from "./book";
import CoursesPage from "./course";
import CoursePage from "./course/components/course-page";
import CourseViewPage from "./course/components/course-view-page";
import CreateCoursePage from "./course/components/new";
import ReviewCoursePage from "./course/components/review";
import HomePage from "./home";
import MeditationCategoriesPage from "./meditation";
import MeditationsPage from "./meditation/components/meditations";
import MethodologiesPage from "./methodology";
import NewsPage from "./news";
import SettingsPage from "./settings";
import SpecialistsPage from "./specialists";
import TestsPage from "./tests";

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
