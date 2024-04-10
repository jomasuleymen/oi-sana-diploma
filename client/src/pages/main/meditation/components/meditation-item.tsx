import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import Plyr from "plyr-react";
import React from "react";
import { Meditation } from "../meditation.service";

type Props = {
	mediation: Meditation;
};

const MeditationItem: React.FC<Props> = ({ mediation }) => {
	return (
		<Card className="flex p-3 rounded-xl gap-2 items-center w-[550px]">
			<div className="w-[52px] h-[52px]">
				<ServerImage
					src={mediation.category.image}
					className="w-full h-full rounded-md object-cover"
				/>
			</div>
			<div className="flex-1">
				<Plyr
					width="100%"
					source={{
						type: "audio",
						sources: [
							{
								src:
									import.meta.env.VITE_SERVER_URL +
									"/api/upload/stream/" +
									mediation.audio,
								type: "audio/mp3",
							},
						],
					}}
					options={{
						settings: [],
						controls: ["play", "progress", "play-large", "current-time"],
					}}
				/>
			</div>
		</Card>
	);
};

export default MeditationItem;
