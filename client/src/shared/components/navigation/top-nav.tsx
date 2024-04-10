import { useHeaderStore } from "@/store/header-mode.store";
import { cn } from "@utils/utils";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./nav-items";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	navitems: NavItem[];
}

export function TopNav({ className, navitems, ...props }: Props) {
	const { pathname } = useLocation();
	const headerMode = useHeaderStore((s) => s.mode);

	return (
		<nav className={cn("flex items-center space-x-4", className)} {...props}>
			{navitems.map((navItem, idx) => (
				<Link
					key={idx}
					to={navItem.href}
					className={cn(
						"font-medium transition-colors hover:text-primary",
						pathname.startsWith(navItem.href)
							? "text-primary dark:text-white"
							: "text-muted-foreground",
						headerMode === "transparent" && "text-white hover:text-white"
					)}
				>
					{navItem.title}
				</Link>
			))}
		</nav>
	);
}
