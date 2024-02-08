import {
	BookIcon,
	HelpingHand,
	LayoutDashboardIcon,
	Lightbulb,
	LucideFlower,
	MonitorPlayIcon,
	NewspaperIcon,
	PuzzleIcon,
	User
} from "lucide-react";

export interface NavItem {
	title: string;
	href: string;
	disabled?: boolean;
	icon?: React.ComponentType;
	group?: string;
}

export interface GroupNavItems {
	title: string;
	items: NavItem[];
}

export const dashboardGroupNavItems: GroupNavItems[] = [
	{
		title: "Admin",
		items: [
			{
				title: "Dashboard",
				href: "/dashboard",
				icon: LayoutDashboardIcon,
			},
			{
				title: "Users",
				href: "/dashboard/users",
				icon: User,
			},
			{
				title: "Methodologies",
				href: "/dashboard/methodologies",
				icon: Lightbulb,
			},
			{
				title: "Meditations",
				href: "/dashboard/meditations",
				icon: LucideFlower,
			},
			{
				title: "Books",
				href: "/dashboard/books",
				icon: BookIcon,
			},
		],
	},
	{
		title: "Specialists",
		items: [
			{
				title: "Specialists",
				href: "/dashboard/specialists",
				icon: HelpingHand,
			},
			{
				title: "Courses",
				href: "/dashboard/courses",
				icon: MonitorPlayIcon,
			},
			{
				title: "Articles",
				href: "/dashboard/articles",
				icon: NewspaperIcon,
			},
		],
	},
];

export const mainNavItems: NavItem[] = [
	{
		title: "Lessons",
		href: `/lessons`,
		icon: BookIcon,
	},
	{
		title: "Books",
		href: `/books`,
		icon: PuzzleIcon,
	},
	{
		title: "About",
		href: `/about-us`,
		icon: BookIcon,
	},
	{
		title: "Meditation",
		href: `/meditation`,
		icon: BookIcon,
	},
];
