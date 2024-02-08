import React from "react";
import { Link } from "react-router-dom";

import Logo from "/colored-logo-text.png?url";
import WhiteLogo from "/white-logo-text.png?url";

import { cn } from "@utils/tailwind.utils";

import { useHeaderStore } from "@/store/header-mode.store";
import { TopNav } from "@components/navigation/top-nav";
import { UserNav } from "@components/navigation/user-nav";
import { Sidebar } from "./sidebar";

type HeaderProps = {
	className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

const Header: React.FC<HeaderProps> = ({ className }) => {
	const headerMode = useHeaderStore((s) => s.mode);

	return (
		<div
			className={cn(
				"w-full border-b z-[9] bg-white flex items-center justify-between px-4 top-0 mb-0",
				className,
				{ "bg-transparent shadow-none border-none": headerMode === "transparent" }
			)}
		>
			<div className="left hidden items-center justify-start sm:flex">
				<Link to="/">
					<img
						src={headerMode === "transparent" ? WhiteLogo : Logo}
						className="w-30 h-8 relative p-0 m-0"
						alt="logo"
					/>
				</Link>
			</div>

			<div className={cn("block sm:!hidden cursor-pointer")}>
				<Sidebar />
			</div>

			<div className="right flex items-center justify-center">
				<TopNav className={cn("top-nav hidden sm:block mr-6")} />
				<UserNav />
			</div>
		</div>
	);
};

export default Header;
