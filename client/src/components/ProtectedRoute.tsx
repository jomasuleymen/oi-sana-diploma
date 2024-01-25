import { useAuthStore } from '@/store/auth.store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {}

const AdminRoute: React.FC<ProtectedRouteProps> = () => {
	const user = useAuthStore((state) => state.user);
	if (!user || !user.isAdmin) {
		return <Navigate to="/" />;
	}

	return <Outlet />;
};

export default AdminRoute;
