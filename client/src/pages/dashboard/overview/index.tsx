import Typography from "@components/ui/typography";
import { CreditCard, MonitorPlayIcon, Users } from "lucide-react";
import React from "react";
import { FaTengeSign } from "react-icons/fa6";
import { OverviewGraph } from "./components/graph";
import OverviewCard from "./components/overview-card";
import { RecentSales } from "./components/recent-sales";

type Props = {};

const OverviewDashboard: React.FC<Props> = ({}) => {
	return (
		<div className="p-4">
			<Typography variant="h2">Dashboard</Typography>
			<div className="space-y-4 pt-6">
				<div className="grid gap-4 grid-cols-4">
					<OverviewCard
						title="Total Revenue"
						urlPath="/payment/statistics/amount"
						prefix="KZT "
						icon={<FaTengeSign size={13} />}
						withPlus={false}
					/>
					<OverviewCard
						title="Sales"
						urlPath="/payment/statistics/sales"
						icon={<CreditCard size={16} />}
					/>
					<OverviewCard
						title="Courses"
						urlPath="/courses/statistics/count"
						icon={<MonitorPlayIcon size={16} />}
					/>
					<OverviewCard
						title="Specialists"
						urlPath="/specialists/statistics/count"
						icon={<Users size={16} />}
					/>
				</div>
				<div className="grid gap-4 grid-cols-7">
					<div className="col-span-4">
						<OverviewGraph />
					</div>
					<div className="col-span-3">
						<RecentSales />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverviewDashboard;
