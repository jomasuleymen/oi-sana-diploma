import { CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import React from "react";

export type CardWrapperHeaderProps = {
	title: string | React.ReactNode;
	description?: string;
};

const CardWrapperHeader: React.FC<CardWrapperHeaderProps> = ({ title, description }) => (
	<CardHeader className="p-2 mb-10">
		<div className="flex flex-col gap-0">
			<CardTitle className="text-4xl text-left font-bold text-primary">{title}</CardTitle>
		</div>
		{description && <CardDescription>{description}</CardDescription>}
	</CardHeader>
);

export default CardWrapperHeader;
