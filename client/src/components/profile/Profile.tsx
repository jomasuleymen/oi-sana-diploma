import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

const Prodile: React.FC = () => {
	const navigate = useNavigate();
	const user = useAuthStore((store) => store.user);

	if (!user) {
		navigate("/");
	}

	return (
		<Card className="w-[600px] shadow-md">
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">ID</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.id}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Name</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.name}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Email</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.email}
					</p>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
					<p className="text-sm font-medium">Role</p>
					<p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
						{user?.isAdmin ? "Admin" : "User"}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default Prodile;
