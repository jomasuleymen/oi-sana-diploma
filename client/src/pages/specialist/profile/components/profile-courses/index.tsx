import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import Container from "@components/ui/container";
import CoursesListPage from "@pages/main/course/components/course-list";
import { Specialist } from "@pages/specialist/specialist.service";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
	specialist: Specialist;
	ownPage?: boolean;
};

const ProfileCourses: React.FC<Props> = ({ specialist, ownPage = false }) => {
	const navigate = useNavigate();

	return (
		<>
			{ownPage && (
				<div className="flex justify-end">
					<Button variant="outline" onClick={() => navigate("/courses/new")}>
						Add new course
					</Button>
				</div>
			)}
			<Container transparent>
				<CoursesListPage specialistId={specialist.userId} withOptions={ownPage} />
			</Container>
		</>
	);
};

export default ProfileCourses;
