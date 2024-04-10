import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./affirmation-columns";
import { Affirmation } from "@pages/main/home/services/affirmation.service";

const API_ENDPOINT = "/affirmations";
const QUERY_KEY = "affirmations";

const deleteAffirmations = async (affirmations: Affirmation | Affirmation[]) => {
	const id = Array.isArray(affirmations)
		? affirmations.map((affirmation) => affirmation.id)
		: affirmations.id;
	return $api.delete(API_ENDPOINT + "/many", { data: { id } });
};

export const AffirmationsTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (affirmation: Affirmation | Affirmation[]) => {
			await deleteAffirmations(affirmation)
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
					title="Affirmations"
					description="Manage affirmations"
					addNewLink="/dashboard/affirmations/new"
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
