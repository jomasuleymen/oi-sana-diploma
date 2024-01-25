import { cn } from "@/lib/utils";
import { dashboardNavItems } from "../navigation/nav-items";
import { SideNav } from "../navigation/side-nav";

type SideBarProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export default function DashboardSidebar({ className }: SideBarProps) {
  return (
    <nav className={cn(`relative hidden border-r md:block w-72`, className)}>
      <div className="px-3 py-2 space-y-1">
        <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
          Overview
        </h2>
        <SideNav items={dashboardNavItems} />
      </div>
    </nav>
  );
}
