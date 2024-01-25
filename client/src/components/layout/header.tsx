import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import React from "react";
import { TopNav } from "../navigation/top-nav";
import { UserNav } from "../navigation/user-nav";
import { Sidebar } from "./sidebar";
import Logo from "/logo-with-text.svg?url";
import { Link } from "react-router-dom";

type HeaderProps = {
	className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const Header: React.FC<HeaderProps> = ({ className }) => {
	return (
		<div className={cn("w-full border-b", className)}>
			<nav className="flex h-14 items-center justify-between px-4">
				<div className="left hidden items-center justify-start sm:flex">
					<Link to="/">
						<img src={Logo} className="w-28 h-12 relative p-0 m-0" alt="logo" />
					</Link>
					<TopNav className="mx-6" />
				</div>

				<div className={cn("block sm:!hidden cursor-pointer")}>
					<Sidebar />
				</div>

				<div className="right flex items-center justify-end space-x-4">
					<UserNav />
					<ThemeToggle />
				</div>
			</nav>
		</div>
	);
};

export default Header;
