import {
	LogOut,
	MessageSquareIcon,
	MonitorPlayIcon,
	Settings,
	User as UserIcon,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { useHeaderStore } from "@/store/header-mode.store";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { DashboardIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/utils";
import { ClassValue } from "clsx";
import { Link } from "react-router-dom";
import AvatarWrapper from "../ui/avatar-wrapper";

function LoginButton() {
	const headerMode = useHeaderStore((s) => s.mode);

	return (
		<Link to="/auth">
			<Button
				variant="ghost"
				className={cn(
					"login-btn text-base border-2 bg-transparent text-primary border-primary rounded-full",
					{
						"text-white border-white": headerMode === "transparent",
					}
				)}
			>
				Log in
			</Button>
		</Link>
	);
}

type UserNavProps = {
	className?: ClassValue;
};

export function UserNav({ className }: UserNavProps) {
	const logout = useAuthStore((store) => store.logout);
	const user = useAuthStore((store) => store.user);

	return user?.id ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full outline-0">
					<AvatarWrapper src={user?.profileImage} username={user?.username} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 z-[10000000]", className)}
				align="end"
				forceMount
			>
				<DropdownMenuLabel className="font-normal cursor-default">
					<div className="flex items-center gap-2">
						<AvatarWrapper
							src={user?.profileImage}
							className="w-8 h-8"
							username={user?.username}
						/>
						<div className="flex flex-col flex-1 space-y-1">
							{user?.username && (
								<p className="text-sm font-medium leading-none break-all">
									{user.username}
								</p>
							)}
							{user?.email && (
								<p className="text-xs leading-none text-muted-foreground break-all">
									{user.email}
								</p>
							)}
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{user?.isSpecialist && (
						<Link to={`/specialists/${user.id}`}>
							<DropdownMenuItem className="cursor-pointer">
								<UserIcon className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
						</Link>
					)}
					{user?.isAdmin && (
						<Link to="/dashboard">
							<DropdownMenuItem className="cursor-pointer">
								<DashboardIcon className="mr-2 h-4 w-4" />
								<span>Dashboard</span>
							</DropdownMenuItem>
						</Link>
					)}
					{
						<Link to="/courses/my">
							<DropdownMenuItem className="cursor-pointer">
								<MonitorPlayIcon className="mr-2 h-4 w-4" />
								<span>My courses</span>
							</DropdownMenuItem>
						</Link>
					}
					<Link to="/chat">
						<DropdownMenuItem className="cursor-pointer">
							<MessageSquareIcon className="mr-2 h-4 w-4" />
							<span>Chat</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Link to="/settings">
					<DropdownMenuItem className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : (
		<LoginButton />
	);
}
