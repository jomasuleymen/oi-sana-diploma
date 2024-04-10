import Container from "@components/ui/container";
import Title from "@components/ui/title";
import React from "react";
import MeditationsListPage from "./components/meditations-list";

type Props = {};

const MeditationCategoriesPage: React.FC<Props> = ({}) => {
	return (
		<Container transparent className="py-4">
			<Title title="Categories" />
			<MeditationsListPage />
		</Container>
	);
};

export default MeditationCategoriesPage;
