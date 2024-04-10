import { cn } from "@utils/utils";
import { dashboardGroupNavItems } from "@components/navigation/nav-items";
import { SideNav } from "@components/navigation/side-nav";

type SideBarProps = {
	className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export default function DashboardSidebar({ className }: SideBarProps) {
	return (
		<nav className={cn(`border-r space-y-4 w-64`, className)}>
			{dashboardGroupNavItems.map((group, idx) => (
				<div className="px-3 py-2" key={idx}>
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						{group.title}
					</h2>
					<SideNav items={group.items} />
				</div>
			))}
		</nav>
	);
}
