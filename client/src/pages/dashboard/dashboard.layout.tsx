import React from "react";

import CustomOutlet from "@components/customOutlet";
import Header from "@components/layout/header";
import DashboardSidebar from "@pages/dashboard/components/dashboard-sidebar";

type Props = {};

const DashboardLayout: React.FC<Props> = ({}) => {
	return (
		<div className="flex flex-col h-screen !overflow-hidden">
			<Header className="h-16" />
			<div className="flex flex-1 !overflow-hidden">
				<DashboardSidebar className="overflow-y-auto" />
				<main className="flex-1 overflow-y-auto paragraph p-2">
					<CustomOutlet />
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
