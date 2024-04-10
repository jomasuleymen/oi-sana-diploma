import React from "react";
import Typography from "./typography";

type Props = {
	title: string;
};

const Title: React.FC<Props> = ({ title }) => {
	return (
		<Typography variant="h3" className="mb-4 text-center text-3xl">
			{title}
		</Typography>
	);
};

export default Title;
