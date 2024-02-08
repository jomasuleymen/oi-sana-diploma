import { useState } from "react";

import { MenuIcon } from "lucide-react";

import { SideNav } from "@components/navigation/side-nav";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { GroupNavItems, dashboardGroupNavItems, mainNavItems } from "../navigation/nav-items";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const navGroups: GroupNavItems[] = [
	{
		title: "Overview",
		items: mainNavItems,
	},
	...dashboardGroupNavItems,
];

export function Sidebar({}: SidebarProps) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<MenuIcon />
			</SheetTrigger>
			<SheetContent side="left" className="!px-0 z-[10000000]">
				{navGroups.map((group, idx) => (
					<div key={idx} className="space-y-2 px-4 py-2">
						<h2 className="px-4 text-lg font-semibold tracking-tight">{group.title}</h2>
						<div>
							<SideNav items={group.items} onItemClick={() => setOpen(false)} />
						</div>
					</div>
				))}
			</SheetContent>
		</Sheet>
	);
}
