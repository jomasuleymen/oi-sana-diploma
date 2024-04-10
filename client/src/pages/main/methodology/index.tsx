import Loading from "@components/loading";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@components/ui/accordion";
import Container from "@components/ui/container";
import ServerImage from "@components/ui/image";
import { Dot } from "lucide-react";
import React from "react";
import { useMethodologies } from "./hooks/use-methodologies";
import EmptyDataPage from "@components/empty-data";

type Props = {};

const MethodologiesPage: React.FC<Props> = ({}) => {
	const { isLoading, items } = useMethodologies();

	if (isLoading) {
		return <Loading />;
	}

	if (!items.length) {
		return (
			<Container>
				<EmptyDataPage />
			</Container>
		);
	}

	return (
		<Container className="p-8">
			<Accordion type="single" collapsible>
				{items.map((methodology) => (
					<AccordionItem value={methodology.title} key={methodology.id}>
						<AccordionTrigger className="pb-2">
							<div className="flex gap-2 items-center border-none">
								<div className="overflow-hidden rounded-full">
									<ServerImage
										src={methodology.image}
										alt={methodology.title}
										className="w-24 h-24 object-cover rounded-full"
									/>
								</div>
								<div className="text-left">
									<div className="mb-1 text-red-600 text-lg">
										{methodology.title}
									</div>
									<div className="text-[#D57735] text-sm">
										{methodology.behaviour}
									</div>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="ml-28 flex flex-col">
								{methodology.actions.map((action, idx) => (
									<div key={idx} className="flex items-center">
										<Dot className="w-8 min-w-8 h-8 min-h-8" color="#D57735" />
										<span className="text-sm font-semibold">
											{action.action}
										</span>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</Container>
	);
};

export default MethodologiesPage;
