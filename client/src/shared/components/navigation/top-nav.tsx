import { cn } from "@utils/tailwind.utils";
import { mainNavItems } from "./nav-items";
import { Link, useLocation } from "react-router-dom";
import { useHeaderStore } from "@/store/header-mode.store";

export function TopNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const { pathname } = useLocation();
	const headerMode = useHeaderStore((s) => s.mode);

	return (
		<nav className={cn("flex items-center space-x-4", className)} {...props}>
			{mainNavItems.map((navItem, idx) => (
				<Link
					key={idx}
					to={navItem.href}
					className={cn(
						"font-medium transition-colors hover:text-primary",
						pathname.startsWith(navItem.href)
							? "text-black dark:text-white"
							: "text-muted-foreground",
						headerMode === "transparent" && "text-white"
					)}
				>
					{navItem.title}
				</Link>
			))}
		</nav>
	);
}
