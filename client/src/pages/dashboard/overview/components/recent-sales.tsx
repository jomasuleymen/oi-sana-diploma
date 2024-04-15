import Loading from "@components/loading";
import AvatarWrapper from "@components/ui/avatar-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card";
import { getLatestPayments } from "@pages/dashboard/payments/payments.service";
import { useQuery } from "@tanstack/react-query";
import { FaTengeSign } from "react-icons/fa6";

export function RecentSales() {
	const { data, isSuccess, isLoading } = useQuery({
		queryKey: ["recent-sales", "latest"],
		queryFn: async () => await getLatestPayments(),
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Sales</CardTitle>
				<CardDescription>Was made {data?.totalItems} sales this month.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-8">
					{isLoading ? (
						<Loading />
					) : isSuccess ? (
						data?.items.map((order, idx) => {
							const { user } = order;
							return (
								<div className="flex items-center" key={idx}>
									<AvatarWrapper
										className="h-9 w-9"
										src={user.profileImage}
										rounded={true}
										username={user.username}
									/>
									<div className="ml-4 space-y-1">
										<p className="text-sm font-medium leading-none">
											{user.firstname} {user.lastname}
										</p>
										<p className="text-sm text-muted-foreground">
											{user.email}
										</p>
									</div>
									<div className="ml-auto font-medium flex items-center gap-1">
										+{order.amount} <FaTengeSign size={12} />
									</div>
								</div>
							);
						})
					) : null}
				</div>
			</CardContent>
		</Card>
	);
}
