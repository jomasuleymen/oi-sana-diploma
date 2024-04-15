import NoDataFound from "@components/empty-data";
import Container from "@components/ui/container";
import React from "react";

const CoursesNotFound: React.FC = () => {
	return (
		<Container>
			<NoDataFound />
		</Container>
	);
};

export default CoursesNotFound;
