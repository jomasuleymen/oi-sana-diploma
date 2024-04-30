import { cn } from "@utils/utils";
import React from "react";

type Review = {
	image: string;
	name: string;
	review: string;
};

type Props = {
	review: Review;
	reverse?: boolean;
	colorIndex?: number;
};

const colors = {
	blue: "#BCCCFF",
	green: "#E1F0EE",
	white: "#F4F6FA",
	red: "#F1DDDD",
};

const colorCombines = [
	[colors.blue, colors.green],
	[colors.white, colors.red],
	[colors.green, colors.blue],
	[colors.red, colors.white],
];

const SpecialistReviewCard: React.FC<Props> = ({ review, reverse, colorIndex }) => {
	const color = colorIndex ? colorCombines[colorIndex % colorCombines.length] : colorCombines[0];
	return (
		<div
			className={cn(
				"flex w-[300px] h-[578px] gap-[20px] mx-[10px] text-[#263159]",
				reverse ? "flex-col-reverse" : "flex-col"
			)}
		>
			<div
				className={cn("info rounded-[20px] flex-[12] relative overflow-hidden")}
				style={{
					backgroundColor: color[0],
				}}
			>
				<span className="absolute top-5 left-5 text-sm font-semibold">{review.name}</span>
				{review.image && (
					<img
						alt="Real Talkspace customer"
						src={review.image}
						className="w-full h-full object-cover"
					/>
				)}
			</div>
			<div
				className="review p-4 leading-tight rounded-[20px] flex-[5] flex items-center justify-center text-lg font-bold"
				style={{
					backgroundColor: color[1],
				}}
			>
				“{review.review}”
			</div>
		</div>
	);
};

export default SpecialistReviewCard;
