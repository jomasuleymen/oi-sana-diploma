import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "./loading";

const CustomOutlet: React.FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Outlet />
		</Suspense>
	);
};

export default CustomOutlet;
