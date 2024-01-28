
import {
  BookIcon,
  PuzzleIcon,
  SquarePen,
  User
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: React.ComponentType;
}

export interface GroupNavItems {
  title: string;
  items: NavItem[];
}

export const dashboardNavItems: NavItem[] = [
  // {
  //   title: "Dashboard",
  //   href: "/dashboard",
  //   icon: LayoutDashboardIcon,
  // },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: User,
  },
  {
    title: "Posts",
    href: "/dashboard/articles",
    icon: SquarePen,
  },
];

export const mainNavItems: NavItem[] = [
  {
    title: "Lessons",
    href: `/lessons`,
    icon: BookIcon,
  },
  {
    title: "Games",
    href: `/games`,
    icon: PuzzleIcon,
  },
];
