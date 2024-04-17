import React, { useEffect } from "react";
import { showLoading } from "react-global-loading";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import CustomOutlet from "./customOutlet";

interface ProtectedRouteProps {
	admin?: boolean;
	specialist?: boolean;
	element?: React.ReactNode;
	navigateTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	admin,
	specialist,
	element = <CustomOutlet />,
	navigateTo,
}) => {
	const { user, loading } = useAuth({ admin, specialist });

	useEffect(() => {
		if (loading) {
			showLoading(true);
		} else {
			showLoading(false);
		}

		return () => {
			showLoading(false);
		};
	}, [loading]);

	if (loading) return null;

	if (!user) {
		return <Navigate to={navigateTo || "/auth"} />;
	}

	return element;
};

export default ProtectedRoute;
