import { cn } from "@utils/utils";
import React from "react";
import { Card } from "./card";

type Props = {
	className?: string;
	children: React.ReactNode;
	transparent?: boolean;
};

const Container: React.FC<Props> = ({ className, children, transparent }) => {
	return (
		<Card
			className={cn(
				"max-w-4xl mx-auto p-3",
				transparent && "p-0 bg-transparent border-none shadow-none",
				className
			)}
		>
			{children}
		</Card>
	);
};

export default Container;
