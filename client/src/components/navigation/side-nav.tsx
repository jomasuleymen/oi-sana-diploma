import { NavItem } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardNavProps {
	items: NavItem[];
	onItemClick?: () => void;
}

export function SideNav({ items, onItemClick: onClickItem }: DashboardNavProps) {
	const { pathname } = useLocation();

	if (!items?.length) {
		return null;
	}

	return (
		<nav>
			{items.map((item, index) => {
				const Icon = item.icon || Link2;

				return (
					<Link
						key={index}
						to={item.disabled ? "/" : item.href}
						onClick={() => {
							if (onClickItem) onClickItem();
						}}
					>
						<span
							className={cn(
								"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
								pathname === item.href ? "bg-accent" : "transparent",
								item.disabled && "cursor-not-allowed opacity-80"
							)}
						>
							{Icon && <Icon className="mr-2 h-4 w-4" />}
							<span>{item.title}</span>
						</span>
					</Link>
				);
			})}
		</nav>
	);
}
