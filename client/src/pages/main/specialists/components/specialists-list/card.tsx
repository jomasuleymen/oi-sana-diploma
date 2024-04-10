import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import ServerImage from "@components/ui/image";
import { Specialist } from "@pages/specialist/specialist.service";
import { formatDate } from "@utils/utils";
import { Calendar } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
	specialist: Specialist;
};

const SpecialistCard: React.FC<Props> = ({ specialist }) => {
	return (
		<Card className="w-full p-4 overflow-hidden flex gap-3">
			<div className="left flex flex-col w-40">
				<div className="w-40">
					<Link to={String(specialist.userId)}>
						<ServerImage
							src={specialist.user.profileImage}
							alt="Profile image"
							className="w-full h-40 object-fill"
						/>
					</Link>
					<Link to={String(specialist.userId)}>
						<Button className="w-full mt-4 rounded-md hover:opacity-90">
							View Profile
						</Button>
					</Link>
				</div>
			</div>

			<div className="px-2">
				<div className="right flex flex-col justify-between flex-1 mb-4">
					<Link to={String(specialist.userId)}>
						<div className="text-primary font-semibold">
							{specialist.user.firstname} {specialist.user.lastname}
						</div>
					</Link>
					<Link to={String(specialist.userId)}>
						<div className="text-sm text-gray-500">@{specialist.user.username}</div>
					</Link>
					<div className="flex gap-1 text-xs text-gray-500 items-center mt-2">
						<Calendar size={16} />
						Toptal Member Since {formatDate(specialist.user.createdAt)}
					</div>
				</div>
				<div>
					<p className="line-clamp-4 text-[#455065] text-sm">{specialist.about}</p>
				</div>
			</div>
		</Card>
	);
};

export default SpecialistCard;
