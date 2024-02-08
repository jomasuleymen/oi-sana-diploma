import { RouteObject } from "react-router-dom";

import MainLayout from "./main.layout";

import ProtectedRoute from "@/shared/components/protected-route";
import NewArticlePage from "./article/new-article";
import AuthPage from "./auth";
import EmailVerificationPage from "./auth/pages/email-verification";
import ForgotPasswordPage from "./auth/pages/forgot-password";
import ResetPasswordPage from "./auth/pages/reset-password";
import BooksPage from "./book";
import ProfilePage from "./profile";

export const mainRoutes: RouteObject = {
	path: "/",
	element: <MainLayout />,
	children: [
		{
			path: "articles",
			children: [
				{
					path: "new",
					element: <ProtectedRoute element={<NewArticlePage />} />,
				},
			],
		},
		{
			path: "profile",
			children: [
				{
					path: ":userId",
					element: <ProtectedRoute element={<ProfilePage />} />,
				},
			],
		},
		{
			path: "books",
			element: <BooksPage />,
		},
		{
			path: "auth",
			children: [
				{
					index: true,
					element: <AuthPage />,
				},
				{
					path: "email-verification",
					element: <EmailVerificationPage />,
				},
				{
					path: "forgot-password",
					element: <ForgotPasswordPage />,
				},
				{
					path: "reset-password",
					element: <ResetPasswordPage />,
				},
			],
		},
	],
};
