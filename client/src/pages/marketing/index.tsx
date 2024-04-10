import { useAuthStore } from "@store/auth.store";
import { Navigate } from "react-router-dom";

import AboutUs from "./about-us";
import Banner from "./banner";
import MarketingSpecialists from "./reviews";
import AboutApp from "./about-app";
import FAQ from "./faq";
import DownloadApp from "./about-app/download-app";
import AppReviews from "./reviews/app-reviews";

type Props = {};

const MarketingPage = (props: Props) => {
	const user = useAuthStore((store) => store.user);

	if (user) {
		return <Navigate to="/home" replace={true} />;
	}

	return (
		<div className="space-y-8">
			<section className="banner">
				<Banner />
			</section>
			<section className="about-us">
				<AboutUs />
			</section>
			<section className="specialists">
				<MarketingSpecialists />
			</section>
			<section className="about-application">
				<AboutApp />
			</section>
			<section className="feedbacks">
				<AppReviews />
			</section>
			<section className="app-download">
				<DownloadApp />
			</section>
			<section className="faq">
				<FAQ />
			</section>
		</div>
	);
};

export default MarketingPage;
