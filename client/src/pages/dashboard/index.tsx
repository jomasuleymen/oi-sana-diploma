import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import Header from "@/components/layout/header";
import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardPage: React.FC<Props> = ({}) => {
	return (
		<div className="flex flex-col h-screen !overflow-hidden">
			<Header />
			<div className="flex flex-1 !overflow-hidden">
				<DashboardSidebar className="overflow-y-auto" />
				<main className="flex-1 overflow-y-auto paragraph p-2">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardPage;
