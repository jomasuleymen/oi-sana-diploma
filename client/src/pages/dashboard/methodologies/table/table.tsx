import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./columns";
import { Methodology } from "@pages/main/methodology/methodology.service";

const API_ENDPOINT = "/methodologies";
const QUERY_KEY = "methodologies";

const deleteMethodologies = async (methodologies: Methodology | Methodology[]) => {
	const id = Array.isArray(methodologies)
		? methodologies.map((methodology) => methodology.id)
		: methodologies.id;
	return $api.delete(API_ENDPOINT + "/many", { data: { id } });
};

export const MethodologiesTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (methodology: Methodology | Methodology[]) => {
			await deleteMethodologies(methodology)
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
				<Heading
					title="Methodologies"
					description="Manage methodologies"
					addNewLink="/dashboard/methodologies/new"
				/>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
