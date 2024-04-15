import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";
import { Card } from "@components/ui/card";
import Container from "@components/ui/container";
import ServerImage from "@components/ui/image";
import React from "react";
import { Link } from "react-router-dom";
import { useMeditationCategories } from "../../hooks/use-meditation-categories";

type Props = {};

const MeditationsListPage: React.FC<Props> = ({}) => {
	const { items, isLoading } = useMeditationCategories();

	if (isLoading) {
		return <Loading />;
	}

	if (items.length === 0) {
		return (
			<Container>
				<NoDataFound />
			</Container>
		);
	}

	return (
		<div className="flex flex-col justify-center gap-4 items-center">
			{items.map((item) => (
				<Link to={`/meditations/${item.id}`} key={item.id}>
					<Card className="w-min p-3 pb-2 hover:bg-slate-50">
						<div
							key={item.id}
							className="w-[550px] h-[150px] flex justify-center items-center mx-auto bg-cover bg-no-repeat bg-center rounded-md overflow-hidden relative"
						>
							<ServerImage
								src={item.image}
								alt={item.name}
								className="object-fill w-full h-full"
							/>
							<div className="absolute bottom-[5px] left-[5px] text-xs text-white bg-gray-600 bg-opacity-60 px-2 py-[1px] rounded-lg">
								{item.meditations.length} sessions
							</div>
						</div>
						<p className="text-lg font-semibold mt-1">{item.name}</p>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default MeditationsListPage;
