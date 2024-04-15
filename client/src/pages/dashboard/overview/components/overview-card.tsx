import Loading from "@components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import http from "@lib/http";
import React, { useEffect, useState } from "react";

type Props = {
	title: string;
	icon?: React.ReactNode;
	urlPath: string;
	prefix?: string | React.ReactNode;
	withPlus?: boolean;
};

type DataType = {
	thisMonth: number;
	lastMonth: number;
};

const calculatePercentage = (thisMonth: number, lastMonth: number) => {
	if (!thisMonth || !lastMonth) return "0.00";

	let value = 100;

	if (lastMonth > 0) {
		value = ((thisMonth - lastMonth) / lastMonth) * 100;
	}

	return value >= 0 ? "+" + value.toFixed(2) : "-" + value.toFixed(2);
};

const OverviewCard: React.FC<Props> = ({ title, urlPath, icon, prefix, withPlus = true }) => {
	const [data, setData] = useState<DataType>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		http.get(urlPath)
			.then((res) => {
				setData(res.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [urlPath]);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				{loading ? (
					<Loading />
				) : !data ? (
					"Error"
				) : (
					<>
						<div className="text-2xl font-bold">
							{prefix}
							{data.thisMonth > 0
								? withPlus
									? "+" + data.thisMonth
									: data.thisMonth.toLocaleString("en-US")
								: "0.00"}
						</div>
						<p className="text-xs text-muted-foreground">
							{calculatePercentage(data.thisMonth, data.lastMonth)}% from last month
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default OverviewCard;
