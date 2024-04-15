import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import { cn } from "@utils/utils";
import React, { useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./payments-columns";

const POSTS_API_ENDPOINT = "/payment";
const ARTICLE_QUERY_KEY = "payment";

export const PaymentsTable: React.FC = () => {
	const queryKey = ARTICLE_QUERY_KEY;

	const columns = useMemo(() => generateColumns(), []);

	return (
		<div className={cn("h-full flex-1 space-y-4 pt-6")}>
			<div className="flex items-start justify-between">
				<Heading title="Payments" description="Manage payments" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				url={POSTS_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
