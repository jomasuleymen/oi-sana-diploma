import { useAuthStore } from "@store/auth.store";
import { Navigate } from "react-router-dom";

import Banner from "./banner";

type Props = {};

const MarketingPage = (props: Props) => {
	const user = useAuthStore((store) => store.user);

	if (user) {
		return <Navigate to="/books" replace={true} />;
	}

	return (
		<div>
			<section className="min-h-screen bg-primary">
				<Banner />
			</section>
			<div className="mood"></div>
			<div className="about-us"></div>
			<div className="afirmations"></div>
			<div className="about-application"></div>
			<div className="specialists"></div>
			<div className="feedbacks"></div>
			<div className="news"></div>
			<div className="app-info"></div>
			<div className="faq"></div>
		</div>
	);
};

export default MarketingPage;
