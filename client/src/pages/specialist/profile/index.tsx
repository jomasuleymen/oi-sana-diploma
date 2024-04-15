import { useAuthStore } from "@/store/auth.store";
import NotFound from "@components/404";
import { Card } from "@components/ui/card";
import Container from "@components/ui/container";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Specialist, getSpecialist } from "../specialist.service";
import ProfileHeader from "./components/layouts/profile-header";
import ProfileArticles from "./components/profile-articles";
import ProfileCourses from "./components/profile-courses";
import Loading from "@components/loading";

const SpecialistProfile: React.FC = () => {
	const me = useAuthStore((store) => store.user);
	const { id: specialistId } = useParams<{ id: string }>();
	const { data: specialist, isLoading } = useQuery<any, any, Specialist>({
		queryKey: ["specialist", specialistId],
		queryFn: () => {
			return specialistId ? getSpecialist(specialistId) : null;
		},
		refetchOnWindowFocus: false,
	});

	const [activeTab, setActiveTab] = useState("articles");

	if (isLoading) return <Loading />;
	if (!specialist) return <NotFound />;

	const ownPage = me?.id === specialist.userId;

	return (
		<Container transparent className="max-w-[960px] h-full my-4">
			<Card className="page-header col-span-2 p-4 pb-0 mb-6">
				<ProfileHeader
					specialist={specialist}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					ownPage={ownPage}
				/>
			</Card>

			<div className="page-content col-span-1 space-y-5">
				{activeTab === "articles" && (
					<ProfileArticles ownPage={ownPage} specialist={specialist} />
				)}
				{activeTab === "courses" && (
					<ProfileCourses ownPage={ownPage} specialist={specialist} />
				)}
			</div>
		</Container>
	);
};

export default SpecialistProfile;
