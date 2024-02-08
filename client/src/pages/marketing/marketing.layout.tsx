import { memo } from "react";

import Header from "@components/layout/header";
import MarketingPage from ".";

const MarketingLayout: React.FC = memo(() => {
	return (
		<>
			<Header className="fixed h-16 shadow-sm" />
			<main className="pt-16">
				<MarketingPage />
			</main>
		</>
	);
});

export default MarketingLayout;
