import { Card } from "@components/ui/card";
import Typography from "@components/ui/typography";
import { cn } from "@utils/utils";
import { useRef } from "react";
import { Divider } from "../components/divider";
import { features } from "./features";

const AboutUs: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div className={cn("transition-opacity ease duration-1000 px-4 max-w-7xl mx-auto")}>
			<div className="top flex justify-between mb-8" ref={ref}>
				<div className="left">
					<Typography variant="h2">
						You will find the best specialists on our platform.
					</Typography>

					<Divider className="w-12 border-y-2" />
					<div>
						<p className="m-0 p-0">
							Our main mission is to show that the source of energy, strength, and
							aspiration is within yourself.
						</p>
						<p className="m-0 p-0">
							We are here so that you can learn to hear yourself, your body, and your
							spirit.
						</p>
					</div>
				</div>
			</div>
			<div className="bottom flex gap-6 flex-wrap">
				{features.map((feature, index) => (
					<Card key={index} className="p-6 min-w-64 max-w-xs flex-1 bg-[#F5F99FB]">
						<Typography variant="h5" className="title mb-5">
							{feature.title}
						</Typography>
						<div className="icon rounded-full bg-primary p-3 w-min rounded-bl-none">
							<feature.icon size={18} color="white" />
						</div>
						<Divider />
						<p className="text-sm font-semibold">{feature.description}</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default AboutUs;
