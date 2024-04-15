import Container from "@components/ui/container";
import ServerImage from "@components/ui/image";
import Typography from "@components/ui/typography";
import React from "react";
import { useParams } from "react-router-dom";
import { useMeditations } from "../hooks/use-meditations";
import MeditationItem from "./meditation-item";
import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";

type Props = {};

const MeditationsPage: React.FC<Props> = ({}) => {
	const { category } = useParams();
	const { items, isLoading } = useMeditations(category!);

	if (isLoading) {
		return <Loading />;
	}

	if (!items.length) {
		return (
			<Container>
				<NoDataFound />
			</Container>
		);
	}

	return (
		<Container className="overflow-hidden p-2">
			<div className="max-w-full max-h-56 flex flex-col items-center justify-center mt-10 gap-4">
				<ServerImage
					src={items[0].category.image}
					alt={items[0].category.name}
					className="w-36 h-36 rounded-full object-cover"
				/>
				<Typography variant="h2" className="text-center mb-4">
					{items[0].category.name}
				</Typography>
			</div>
			<Container transparent className="flex justify-center flex-col items-center gap-3">
				{items.map((item) => (
					<MeditationItem key={item.id} mediation={item} />
				))}
			</Container>
		</Container>
	);
};

export default MeditationsPage;
