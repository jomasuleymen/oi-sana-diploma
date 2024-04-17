import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const AuthLayout = lazy(() => import("./auth.layout"));
const EmailVerificationPage = lazy(() => import("./pages/email-verification"));
const ForgotPasswordPage = lazy(() => import("./pages/forgot-password"));
const ResetPasswordPage = lazy(() => import("./pages/reset-password"));
const SpecialistRegisterPage = lazy(() => import("./pages/specialist-register"));
const AuthPage = lazy(() => import("."));

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
