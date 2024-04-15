import Container from "@components/ui/container";
import { socket } from "@lib/socket";
import { useVideoStore } from "@pages/call/store/video.store";
import { X } from "lucide-react";
import { toast } from "sonner";

type IncomeCall = {
	roomId: string;
	host: {
		id: number;
		profileImage?: string;
		username: string;
	};
	receiver: {
		id: number;
		profileImage?: string;
		username: string;
	};
};

if (!socket.hasListeners("created-video-room")) {
	socket.on("created-video-room", async (data: IncomeCall) => {
		useVideoStore.getState().addVideoRoom(data.roomId);
		toast.custom(
			(id) => {
				return (
					<Container className="shadow-none select-none cursor-pointer relative p-4">
						<div className="flex gap-2">
							<span className="pt-1">{data.host.username} created video room</span>
							<div
								className="absolute top-2 right-2"
								onClick={() => toast.dismiss(id)}
							>
								<X size={12} />
							</div>
						</div>
					</Container>
				);
			},
			{
				closeButton: true,
				duration: 5000,
				position: "top-center",
				style: {
					boxShadow: "none",
				},
			}
		);
	});
}

if (!socket.hasListeners("closed-video-room")) {
	socket.on("closed-video-room", async (data: Pick<IncomeCall, "roomId">) => {
		useVideoStore.getState().removeVideoRoom(data.roomId);
	});
}
