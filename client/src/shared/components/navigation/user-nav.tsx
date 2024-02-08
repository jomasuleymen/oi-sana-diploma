import { LogOut, Settings, User as UserIcon } from "lucide-react";

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
import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router-dom";
import AvatarWrapper from "../ui/avatar-wrapper";
import { cn } from "@utils/tailwind.utils";
import { ClassValue } from "clsx";
import { useHeaderStore } from "@/store/header-mode.store";

function LoginButton() {
	const headerMode = useHeaderStore((s) => s.mode);

	return (
		<Link to="/auth">
			<Button
				variant="default"
				className={cn("login-btn text-base border-2 bg-transparent text-primary border-primary rounded-full", {
					"text-white border-white": headerMode === "transparent",
				})}
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
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<AvatarWrapper src={user?.profileImage} username={user?.username} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={cn("w-56 z-[10000000]", className)}
				align="end"
				forceMount
			>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
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
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to={`/profile/${user.id}`}>
						<DropdownMenuItem>
							<UserIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
					</Link>
					{user?.isAdmin && (
						<Link to="/dashboard">
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Dashboard</span>
							</DropdownMenuItem>
						</Link>
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : (
		<LoginButton />
	);
}
