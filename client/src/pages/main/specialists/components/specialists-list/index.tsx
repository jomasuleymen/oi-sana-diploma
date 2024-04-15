import React, { memo } from "react";
import { useSpecialists } from "../../hooks/use-specialists";
import SpecialistCard from "./card";
import Container from "@components/ui/container";
import NoDataFound from "@components/empty-data";
import Loading from "@components/loading";

type Props = {
	search?: string;
};

const SpecialistsListPage: React.FC<Props> = ({ search }) => {
	const { items, isLoading } = useSpecialists({ search });

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
		<div className="flex flex-col gap-2">
			{items.map((specialist) => (
				<SpecialistCard key={specialist.userId} specialist={specialist} />
			))}
		</div>
	);
};

export default memo(SpecialistsListPage);
