import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const MarketingLayout = lazy(() => import("./marketing.layout"));

export const marketingRoutes: RouteObject = {
	path: "/",
	element: <MarketingLayout />,
};
