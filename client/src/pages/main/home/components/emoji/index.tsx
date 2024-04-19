import { Button } from "@components/ui/button";
import Typography from "@components/ui/typography";
import { cn } from "@utils/utils";
import React from "react";
import BlushedSmilingFace from "./emojies/Blushed Smiling Emoji.png?url";
import NeutralFace from "./emojies/Neutral Emoji.png?url";
import SlightlySmilingFace from "./emojies/Slightly Smiling Face Emoji.png?url";
import UnhappyFace from "./emojies/Unhappy Emoji.png?url";
import VeryHappyFace from "./emojies/Very Happy Emoji.png?url";

type Props = {};

const feelings = [
	{
		image: NeutralFace,
		description: "Do not be sad! Life is Beautiful!",
	},
	{
		image: UnhappyFace,
		description: "If you start the day with a positive, something good is sure to happen!",
	},
	{
		image: SlightlySmilingFace,
		description: "Keep it up! Have a good day!",
	},
	{
		image: VeryHappyFace,
		description: "May your every day be full of smiles!",
	},
	{
		image: BlushedSmilingFace,
		description: "Let the smile never leave your face",
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
						className={cn("rounded-full text-4xl px-5 py-10", {
							"bg-primary": selectedFeeling === index,
						})}
						onClick={() => setSelectedFeeling(index)}
					>
						<div className="w-10 h-10">
							<img src={feeling.image} alt="emoji" className="w-full h-full" />
						</div>
					</Button>
				))}
			</div>
		</div>
	);
};

export default Feeling;
