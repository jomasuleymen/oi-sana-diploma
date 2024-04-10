import Container from "@components/ui/container";
import React from "react";
import Affirmations from "./components/affirmations";
import Feeling from "./components/emoji";
import News from "./components/news";

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
	return (
		<Container transparent className="pb-8">
			<section className="mb-5 mt-2">
				<Affirmations />
			</section>
			<section className="mt-24">
				<Feeling />
			</section>
			<section className="mt-20">
				<News />
			</section>
		</Container>
	);
};

export default HomePage;
