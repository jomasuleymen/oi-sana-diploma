import {
	BookIcon,
	BookOpenCheck,
	CreditCard,
	HelpingHand,
	ImageIcon,
	LayoutDashboardIcon,
	Lightbulb,
	LightbulbIcon,
	LucideFlower,
	MessageSquareCode,
	MonitorPlayIcon,
	NewspaperIcon,
	PersonStandingIcon,
	User,
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
				title: "Overview",
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
			{
				title: "Affirmations",
				href: "/dashboard/affirmations",
				icon: ImageIcon,
			},
			{
				title: "News",
				href: "/dashboard/news",
				icon: NewspaperIcon,
			},
			{
				title: "Payments",
				href: "/dashboard/payments",
				icon: CreditCard,
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
				title: "Course reviews",
				href: "/dashboard/course-reviews",
				icon: MessageSquareCode,
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
		title: "Articles",
		href: `/articles`,
		icon: NewspaperIcon,
	},
	{
		title: "Specialists",
		href: `/specialists`,
		icon: PersonStandingIcon,
	},
	{
		title: "Books",
		href: `/books`,
		icon: BookIcon,
	},
	{
		title: "Courses",
		href: `/courses`,
		icon: MonitorPlayIcon,
	},
	{
		title: "Meditations",
		href: `/meditations`,
		icon: LucideFlower,
	},
	{
		title: "Methodologies",
		href: `/methodologies`,
		icon: LightbulbIcon,
	},
	{
		title: "Tests",
		href: `/tests`,
		icon: BookOpenCheck,
	},
];
