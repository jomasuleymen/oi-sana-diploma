import { RouteObject } from "react-router-dom";

import AuthLayout from "./auth.layout";

import EmailVerificationPage from "./pages/email-verification";
import ForgotPasswordPage from "./pages/forgot-password";
import ResetPasswordPage from "./pages/reset-password";
import SpecialistRegisterPage from "./pages/specialist-register";
import AuthPage from ".";

export const authRoutes: RouteObject = {
	path: "/auth",
	element: <AuthLayout />,
	children: [
		{
			index: true,
			element: <AuthPage />,
		},
		{
			path: "specialist",
			element: <SpecialistRegisterPage />,
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
};
