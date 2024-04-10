import RatingStars from "@components/stars";
import { Card } from "@components/ui/card";
import Typography from "@components/ui/typography";
import { useIsVisible } from "@hooks/use-component-visible";
import { cn } from "@utils/utils";
import { LockIcon } from "lucide-react";
import { useRef } from "react";
import { Divider } from "../components/divider";
import { features } from "./features";

const AboutUs: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(ref);

	return (
		<div
			className={cn(
				"transition-opacity ease duration-1000 px-4 max-w-7xl mx-auto",
				isVisible ? "opacity-100" : "opacity-0"
			)}
		>
			<div className="top flex justify-between mb-8" ref={ref}>
				<div className="left">
					<Typography variant="h2">
						В Нашем Портале Вы Найдете Лучших Специалистов.
					</Typography>

					<Divider className="w-12 border-y-2" />

					<p className="m-0 p-0">
						Наша главная миссия показать, что источник энергии, сил, стремление - внутри
						вас самих.
					</p>
					<p className="m-0 p-0">
						Мы здесь для того, чтобы вы научились слышать себя, свое тело, и свой дух.
					</p>
				</div>
				<div className="right max-w-xs flex justify-end min-w-80 min-h-48">
					<Card className="w-full bg-[#F5F99FB] p-6">
						<Typography variant="h2" className="mb-3">
							4.8
						</Typography>
						<div className="stars mb-3">
							<RatingStars maxRating={5} rating={4.8} />
						</div>
						<Typography variant="h6" className="max-w-40">Средняя оценка наших психологов</Typography>
					</Card>
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
