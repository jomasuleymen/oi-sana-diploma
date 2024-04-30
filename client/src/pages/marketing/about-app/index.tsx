import Typography from "@components/ui/typography";
import React from "react";
import { steps } from "./steps";

type Step = {
	image: string;
	title: string;
	description: string;
	color: string;
};

type Props = {};

const AboutApp: React.FC<Props> = ({}) => {
	const [step, setStep] = React.useState<Step>(steps[0]);

	const handleStepChange = (step: Step) => {
		setStep(step);
	};

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 1440 80"
			>
				<path
					d="M1442 14.1785C1258.2 39.0801 1059.94 36.2115 1059.94 36.2115C1059.94 36.2115 1170.53 35.2382 1310.83 18.7393C1237.07 23.7177 1129.94 28.2258 983.846 28.2258C888.518 28.2258 774.837 22.0473 639.165 14.6737C585.958 11.7819 529.368 8.70634 469.177 5.74752C206.103 -7.1844 -1 5.74752 -1 5.74752V94.1454H1442V14.1785Z"
					fill="#E1F0EE"
				/>
			</svg>
			<div className="bg-[#E1F0EE] min-h-screen flex gap-5 px-5 flex-wrap select-none">
				<div className="left flex-1 relative p-2">
					<div className="absolute inset-0 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-[596px] h-[596px]"
							viewBox="0 0 597 596"
							fill="none"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M527.453 493.455C415.466 607.156 218.197 634.157 97.5838 531.17C32.2449 475.379 -9.06779 395.698 1.78715 303.424C10.9701 225.363 63.4715 134.599 108.753 79.6625C207.56 -40.2138 367.356 -13.0632 487.969 89.9243C608.583 192.912 639.44 379.755 527.453 493.455Z"
								fill={step.color}
							></path>
						</svg>
					</div>
					<div className="absolute inset-0 flex items-center overflow-hidden justify-center transition-all duration-1000 ease-in">
						<img
							src={step.image}
							className="max-w-[280px] min-w-[190px] w-full rounded-lg"
							alt={step.title}
						></img>
					</div>
				</div>
				<div className="right flex-1 flex flex-col items-center justify-center text-[#314d5c]">
					<Typography variant="h1" className="text-center mb-5">
						How Oi-Sana works
					</Typography>
					<div>
						<div>
							{steps.map((step, index) => (
								<div
									key={index}
									onMouseEnter={() => handleStepChange(step)}
									onClick={() => handleStepChange(step)}
									className="flex hover:shadow-muted hover:shadow-md rounded-2xl py-4 px-8 hover:bg-white gap-5 cursor-pointer w-[468px]"
								>
									<div className="relative flex items-start justify-center text-2xl">
										{index}
									</div>
									<div>
										<div className="text-[22px] mb-1 font-bold leading-5">
											{step.title}
										</div>
										<div className="">{step.description}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutApp;
