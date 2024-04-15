import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import http from "@lib/http";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ResponseData {
	count: string;
	date: string;
}

interface Data {
	name: string;
	total: number;
}

const getDefaultData = () =>
	Array.from({ length: 12 }, (_, month) => ({
		name: new Date(0, month).toLocaleString("default", { month: "short" }),
		total: 0,
	}));

export function OverviewGraph() {
	const [data, setData] = useState<Data[]>(getDefaultData());

	useEffect(() => {
		http.get<ResponseData[]>("payment/statistics/amount/month").then((res) => {
			setData((prev) => {
				const newData = getDefaultData();

				res.data.forEach(({ count, date }) => {
					const month = new Date(date).getMonth();
					newData[month].total = Number(count);
				});

				return newData;
			});
		});
	}, [setData]);

	return (
		<Card className="col-span-4">
			<CardHeader>
				<CardTitle>Overview</CardTitle>
			</CardHeader>
			<CardContent className="pl-2">
				<ResponsiveContainer width="100%" height={350}>
					<BarChart data={data}>
						<XAxis
							dataKey="name"
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							stroke="#888888"
							fontSize={12}
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `${value} ₸`}
						/>
						<Bar
							dataKey="total"
							fill="currentColor"
							radius={[4, 4, 0, 0]}
							className="fill-primary"
						/>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
