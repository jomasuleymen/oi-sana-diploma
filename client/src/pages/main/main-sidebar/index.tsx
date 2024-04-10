import Loading from "@components/loading";
import Typography from "@components/ui/typography";
import { useHomeStore } from "@store/home.store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { memo } from "react";
import styled from "styled-components";
import { useLatestReviews } from "../course/hooks/use-latest-reviews";
import ReviewCard from "./review-card";

const VerticalText = styled.div`
	writing-mode: vertical-rl;
	text-orientation: mixed;
`;

const MainSidebar: React.FC = () => {
	const { isLoading, item: reviews } = useLatestReviews();
	const [hideSideBar, showSideBar, sideBarShown] = useHomeStore((store) => [
		store.hideSideBar,
		store.showSideBar,
		store.isShownSidebar,
	]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="w-full h-full shadow-none">
			{!sideBarShown && (
				<div className="mb-6 cursor-pointer mr-2" onClick={() => showSideBar()}>
					<VerticalText>
						<Typography variant="h4" className="mb-2 mt-4 flex items-center gap-2">
							<ChevronLeft size={17} className="inline-block align-center" />
							<span>Latest Reviews</span>
						</Typography>
					</VerticalText>
				</div>
			)}
			{sideBarShown && (
				<div className="min-w-72 max-w-72">
					<div className="mb-6 cursor-pointer" onClick={() => hideSideBar()}>
						<Typography variant="h4" className="mb-2 mt-4">
							<span>Latest Reviews</span>
							<ChevronRight size={17} className="align-center inline-block ml-1" />
						</Typography>
					</div>
					<div className="mr-1">
						{reviews?.map((review) => (
							<ReviewCard key={review.id} review={review} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(MainSidebar);
