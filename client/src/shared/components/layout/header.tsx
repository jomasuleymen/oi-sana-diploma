import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "/colored-logo-text.png?url";
import WhiteLogo from "/white-logo-text.png?url";

import { cn } from "@utils/utils";

import { useHeaderStore } from "@/store/header-mode.store";
import { TopNav } from "@components/navigation/top-nav";
import { UserNav } from "@components/navigation/user-nav";
import { useAuthStore } from "@store/auth.store";
import { GroupNavItems, dashboardGroupNavItems, mainNavItems } from "../navigation/nav-items";

type HeaderProps = {
	className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const Header: React.FC<HeaderProps> = ({ className }) => {
	const headerMode = useHeaderStore((s) => s.mode);
	const user = useAuthStore((store) => store.user);
	const [_, setNavGroups] = useState<GroupNavItems[]>([]);

	useEffect(() => {
		if (!user) return;

		const groups = [
			{
				title: "Overview",
				items: mainNavItems,
			},
		];

		if (user.isAdmin) {
			groups.push(...dashboardGroupNavItems);
		}

		setNavGroups(groups);
	}, [user]);

	return (
		<div
			className={cn(
				"w-full border-b z-[9] bg-white flex items-center justify-between px-4 top-0 mb-0 select-none",
				className,
				{ "bg-transparent shadow-none border-none": headerMode === "transparent" }
			)}
		>
			<div className="left items-center justify-start flex">
				<Link to="/">
					<img
						src={headerMode === "transparent" ? WhiteLogo : Logo}
						className="w-30 h-8 relative p-0 m-0"
						alt="logo"
					/>
				</Link>
			</div>

			<div className="right flex items-center justify-center">
				<TopNav className={cn("top-nav block mr-6")} navitems={user ? mainNavItems : []} />
				<UserNav />
			</div>
		</div>
	);
};

export default Header;
