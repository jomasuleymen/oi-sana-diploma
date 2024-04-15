import NotFound from "@components/404";
import Loading from "@components/loading";
import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import Container from "@components/ui/container";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import Typography from "@components/ui/typography";
import { useSpecialist } from "@pages/specialist/hooks/use-specialist";
import { updateSpecialistStatus } from "@pages/specialist/specialist.service";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@utils/utils";
import { Check, X } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const SpecialistUpdate: React.FC = () => {
	const params = useParams<{ id: string }>();
	if (!params.id) return <NotFound />;

	const { isLoading, item: specialist } = useSpecialist(params.id);
	const queryClient = useQueryClient();
	const [isUpdating, setIsUpdating] = React.useState(false);

	if (isLoading) return <Loading />;

	if (!specialist) return <NotFound />;

	return (
		<Container className="px-8 flex flex-col gap-6">
			<div className="flex flex-col justify-center items-center">
				<AvatarWrapper
					src={specialist.user.profileImage}
					username={specialist.user.username}
					className="w-20 h-20"
				/>
			</div>
			<div className="flex flex-col gap-3 mx-auto text-sm">
				<div>
					<Typography variant="h6" className="mb-1">
						Username
					</Typography>
					<Card className="w-60 p-2">{specialist.user.username}</Card>
				</div>
				<div>
					<Typography variant="h6" className="mb-1">
						Firstname
					</Typography>
					<Card className="w-60 p-2">{specialist.user.firstname}</Card>
				</div>
				<div>
					<Typography variant="h6" className="mb-1">
						Lastname
					</Typography>
					<Card className="w-60 p-2">{specialist.user.lastname}</Card>
				</div>
				<div>
					<Typography variant="h6" className="mb-1">
						Phone
					</Typography>
					<Card className="w-60 p-2">{specialist.phone}</Card>
				</div>
				<div>
					<Typography variant="h6" className="mb-1">
						Email
					</Typography>
					<div className="flex items-center gap-2">
						<Card className="w-60 p-2">{specialist.user.email}</Card>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<div>
										{specialist.user.emailVerified ? (
											<Check color="green" />
										) : (
											<X color="red" />
										)}
									</div>
								</TooltipTrigger>
								<TooltipContent>
									{specialist.user.emailVerified
										? "Email verified"
										: "Email not verified"}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				<div className="">
					<Button
						variant="black"
						size="sm"
						onClick={() => {
							const a = document.createElement("a");
							a.target = "_blank";
							a.href =
								import.meta.env.VITE_SERVER_URL + "/uploads/" + specialist.resume;
							a.click();
						}}
					>
						Open resume
					</Button>
				</div>

				<div className="flex justify-end">
					<Button
						variant="black"
						className={cn("min-w-24", {
							"bg-green-700": !specialist.isVerified,
							"bg-red-700": specialist.isVerified,
						})}
						disabled={isUpdating}
						onClick={() => {
							setIsUpdating(true);
							updateSpecialistStatus(
								specialist.userId.toString(),
								!specialist.isVerified
							)
								.then(() => {
									queryClient.invalidateQueries({
										queryKey: ["specialist", params.id],
									});
								})
								.finally(() => {
									setIsUpdating(false);
								});
						}}
					>
						{specialist.isVerified ? "Refuse" : "Verify"}
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default SpecialistUpdate;
