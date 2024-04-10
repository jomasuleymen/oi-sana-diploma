import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";
import { questions } from "./questions";

type Props = {};

const FAQ: React.FC<Props> = ({}) => {
	return (
		<div className="min-h-[500px] bg-accent py-16">
			<div className="w-full h-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between max-w-5xl mx-auto lg:p-4">
				<div className="heading text-primary mb-5 text-[44px] font-bold text-center lg:text-start leading-[1.1]">
					Frequently
					<br />
					Asked Questions
				</div>
				<div className="questions bg-white text-primary rounded-xl w-3/5 max-w-[633px] py-5 px-10">
					{questions.map((question, index) => (
						<Accordion key={index} type="single" collapsible>
							<AccordionItem value="item-1">
								<AccordionTrigger className="text-lg text-start font-semibold">
									{question.question}
								</AccordionTrigger>
								<AccordionContent className="text-base leading-tight">
									{question.answer}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div>
		</div>
	);
};

export default FAQ;
