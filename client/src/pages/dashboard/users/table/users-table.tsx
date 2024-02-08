import { DataTable } from "@components/data-table/data-table";
import { Heading } from "@components/ui/heading";
import { Separator } from "@components/ui/separator";
import $api from "@lib/http";
import { cn } from "@utils/tailwind.utils";
import { User } from "@pages/main/profile/user.service";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./user-columns";

const USERS_API_ENDPOINT = "/users";
const USERS_QUERY_KEY = "users";

const deleteUser = async (users: User | User[]) => {
	const id = Array.isArray(users) ? users.map((user) => user.id) : users.id;
	return $api.delete(USERS_API_ENDPOINT + "/many", { data: { id } });
};

export const UsersTable: React.FC = () => {
	const queryClient = useQueryClient();
	const queryKey = USERS_QUERY_KEY;

	const deleteRowsAction = useCallback(
		async (users: User | User[]) => {
			await deleteUser(users).finally(() => {
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
				<Heading title="Users" description="Manage users" />
			</div>
			<Separator />
			<DataTable
				columns={columns}
				filterableColumns={filterableColumns}
				searchableColumns={searchableColumns}
				deleteRowsAction={deleteRowsAction}
				url={USERS_API_ENDPOINT}
				queryKey={queryKey}
			/>
		</div>
	);
};
