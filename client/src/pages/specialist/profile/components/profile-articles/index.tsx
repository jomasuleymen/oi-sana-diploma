import { Button } from "@components/ui/button";
import Container from "@components/ui/container";
import ArticlesListPage from "@pages/main/article/components/article-list";
import { Specialist } from "@pages/specialist/specialist.service";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	specialist: Specialist;
	ownPage?: boolean;
};

const ProfileArticles: React.FC<Props> = ({ specialist, ownPage = false }) => {
	const navigate = useNavigate();

	return (
		<>
			{ownPage && (
				<div className="flex justify-end">
					<Button variant="outline" onClick={() => navigate("/articles/new")}>
						Write an article
					</Button>
				</div>
			)}
			<Container transparent>
				<ArticlesListPage specId={specialist.userId} withOptions={ownPage} />
			</Container>
		</>
	);
};

export default ProfileArticles;
