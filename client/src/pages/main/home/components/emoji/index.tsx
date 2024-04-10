import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover";
import { Button } from "@components/ui/button";
import Typography from "@components/ui/typography";
import { cn } from "@utils/utils";

type Props = {};

const feelings = [
	{
		code: "😐",
		description: "Neutral Face!",
	},
	{
		code: "🙁",
		description: "Slightly Frowning Face!",
	},
	{
		code: "🙂",
		description: "Slightly Smiling Face!",
	},
	{
		code: "😄",
		description: "Grinning Face with Smiling Eyes!",
	},
	{
		code: "😊",
		description: "Smiling Face with Smiling Eyes!",
	},
];

const Feeling: React.FC<Props> = ({}) => {
	const [selectedFeeling, setSelectedFeeling] = React.useState<number>();

	return (
		<div className="w-full">
			<Typography variant="h2" className="text-center mb-2">
				How are you feeling today?
			</Typography>
			{selectedFeeling !== undefined && (
				<Typography variant="h4" className="text-center text-primary">
					{feelings[selectedFeeling].description}
				</Typography>
			)}
			<div className="flex gap-12 justify-center mt-4">
				{feelings.map((feeling, index) => (
					<Button
						key={index}
						variant="outline-2"
						className={cn("rounded-full text-4xl px-4 py-10", {
							"bg-primary": selectedFeeling === index,
						})}
						onClick={() => setSelectedFeeling(index)}
					>
						{feeling.code}
					</Button>
				))}
			</div>
		</div>
	);
};

export default Feeling;
