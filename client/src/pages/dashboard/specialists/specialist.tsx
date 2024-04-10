import NotFound from "@components/404";
import AvatarWrapper from "@components/ui/avatar-wrapper";
import Container from "@components/ui/container";
import { Input } from "@components/ui/input";
import Typography from "@components/ui/typography";
import { useSpecialist } from "@pages/specialist/hooks/use-specialist";
import { Check, X } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { cn } from "@utils/utils";
import { updateSpecialistStatus } from "@pages/specialist/specialist.service";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@components/loading";

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
				<Typography variant="h4" className="">
					{specialist.user.username}
				</Typography>
			</div>
			<div className="flex flex-col gap-3 mx-auto">
				<div>
					<Typography variant="h6" className="mb-1">
						Username
					</Typography>
					<Input className="w-60" value={specialist.user.username} disabled />
				</div>
				<div>
					<Typography variant="h6" className="mb-1">
						Email
					</Typography>
					<div className="flex items-center gap-2">
						<Input className="w-60" value={specialist.user.email} disabled />
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
