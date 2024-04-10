import { cn } from "@utils/utils";
import React from "react";
import EmptyImage from "/images/empty-box.svg";
import Typography from "./ui/typography";

type Props = {
	className?: string;
};

const EmptyDataPage: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("p-4 w-[900px]", className)}>
			<img src={EmptyImage} alt="Empty data" className="w-1/2 mx-auto mb-8" />
			<Typography variant="h3" className="text-center">
				No data found
			</Typography>
		</div>
	);
};

export default EmptyDataPage;
