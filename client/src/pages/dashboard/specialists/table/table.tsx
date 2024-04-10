import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./columns";
import { Specialist } from "@pages/specialist/specialist.service";

const SPECIALISTS_API_ENDPOINT = "/specialists";
const SPECIALISTS_QUERY_KEY = "specialists";

const deleteSpecialists = async (specialists: Specialist | Specialist[]) => {
	const id = Array.isArray(specialists)
		? specialists.map((meditation) => meditation.user.id)
		: specialists.user.id;
	return $api.delete(SPECIALISTS_API_ENDPOINT + "/many", { data: { id } });
};

export const SpecialistsTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = SPECIALISTS_QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (meditation: Specialist | Specialist[]) => {
			await deleteSpecialists(meditation)
				.catch((err) => {})
				.finally(() => {
					queryClient.invalidateQueries({ queryKey: [queryKey] });
				});
		},
		[queryClient, queryKey]
	);

	const columns = useMemo(
		() => generateColumns({ onRowDeleteAction: deleteRowsAction }),
		[deleteRowsAction]
	);

	return (
		<div className={cn("h-full flex-1 space-y-4 pt-6")}>
			<div className="flex items-start justify-between">
				<Heading title="Specialists" description="Manage specialists" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={SPECIALISTS_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
