import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/tailwind.utils";
import { Meditation } from "@pages/main/meditation/meditation.service";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./columns";

const MEDITATIONS_API_ENDPOINT = "/meditations";
const MEDITATIONS_QUERY_KEY = "meditations";

const deleteMeditations = async (meditations: Meditation | Meditation[]) => {
	const id = Array.isArray(meditations)
		? meditations.map((meditation) => meditation.id)
		: meditations.id;
	return $api.delete(MEDITATIONS_API_ENDPOINT, { data: { id } });
};

export const MeditationsTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = MEDITATIONS_QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (meditation: Meditation | Meditation[]) => {
			await deleteMeditations(meditation)
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
				<Heading title="Meditations" description="Manage meditations" addNewLink="/dashboard/meditations/new" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={MEDITATIONS_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
