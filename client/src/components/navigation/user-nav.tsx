import { LogOut, Settings, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router-dom";

function getInitials(name?: string | null): string {
	if (!name) return "US";

	let initials: any = name.split(" ");

	if (initials.length > 1) {
		initials = initials.shift().charAt(0) + initials.pop().charAt(0);
	} else {
		initials = name.substring(0, 2);
	}

	return initials.toUpperCase();
}

function LoginButton() {
	return (
		<Link to="/auth">
			<Button>
				<LogOut className="mr-2 h-4 w-4" />
				<span>Log in</span>
			</Button>
		</Link>
	);
}

interface UserNavProps {}

export function UserNav({}: UserNavProps) {
	const [user, logout] = useAuthStore((store) => [store.user, store.logout]);

	return user?.id ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarImage src={user?.image || undefined} alt="avatar" />
						<AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						{user?.name && (
							<p className="text-sm font-medium leading-none break-all">
								{user.name}
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
					<Link to="/profile">
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
