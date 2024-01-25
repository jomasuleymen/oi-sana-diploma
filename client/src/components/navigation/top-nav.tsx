import { cn } from "@/lib/utils";
import { mainNavItems } from "./nav-items";
import { Link, useLocation } from "react-router-dom";

export function TopNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const { pathname } = useLocation();

	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
			{mainNavItems.map((navItem, idx) => (
				<Link
					key={idx}
					to={navItem.href}
					className={cn(
						"text-sm font-medium transition-colors hover:text-primary",
						pathname.startsWith(navItem.href)
							? "text-black dark:text-white"
							: "text-muted-foreground"
					)}
				>
					{navItem.title}
				</Link>
			))}
		</nav>
	);
}
