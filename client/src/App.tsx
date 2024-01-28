import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";

import Header from "@/components/layout/header";
import NotFound from "@/components/NotFound";

import "@/styles/global.scss";
import { Toaster } from "./components/ui/sonner";
import AuthPage from "./pages/auth";
import DashboardPage from "./pages/dashboard";
import ArticlesDashboard from "./pages/dashboard/articles";
import UsersDashboard from "./pages/dashboard/users";
import EmailVerificationPage from "./pages/auth/email-verification";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import HomePage from "./pages/main-page";
import ProfilePage from "./pages/profile";
import { useAuthStore } from "./store/auth.store";
import ResetPasswordPage from "./pages/auth/reset-password";

// const Home = React.lazy(() => import('@/pages/Home'));

const MainLayout: React.FC = React.memo(() => {
	const checkAuth = useAuthStore((store) => store.checkAuth);
	const navigate = useNavigate();

	const checkAuthAndNavigate = React.useCallback(async () => {
		try {
			await checkAuth();
		} catch (e) {
			// navigate("/auth");
		}
	}, [checkAuth, navigate]);

	React.useEffect(() => {
		checkAuthAndNavigate();
	}, []);

	return (
		<>
			<Header />
			<Outlet />
			<Toaster richColors />
		</>
	);
});

const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="auth">
					<Route index element={<AuthPage />} />
					<Route path="email-verification" element={<EmailVerificationPage />} />
					<Route path="forgot-password" element={<ForgotPasswordPage />} />
					<Route path="reset-password" element={<ResetPasswordPage />} />
				</Route>
				<Route path="profile" element={<ProfilePage />} />
			</Route>

			<Route path="dashboard" element={<DashboardPage />}>
				<Route index element={<div>asdasd</div>} />
				<Route path="users" element={<UsersDashboard />} />
				<Route path="articles" element={<ArticlesDashboard />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
