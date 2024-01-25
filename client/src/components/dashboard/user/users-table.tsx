
import { DataTable } from "@/components/data-table/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import {
  filterableColumns,
  generateColumns,
  searchableColumns,
} from "./user-columns";
import { User } from "@/services/user.service";

const deleteUser = async (data: any) => {
  return axios.delete("/api/user", {
    data,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const UsersTable: React.FC = () => {
  const queryClient = useQueryClient();
  const queryKey = "users";

  const deleteRowsAction = useCallback(
    async (users: User[]) => {
      const ids = users.map((user) => user.id);

      await deleteUser(ids).finally(() => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    },
    [queryClient, queryKey]
  );

  const deleteRowAction = useCallback(
    async (user: User) => {
      await deleteUser({ id: user.id })
        .catch((err) => {})
        .finally(() => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
    },
    [queryClient, queryKey]
  );

  const columns = useMemo(
    () => generateColumns({ onRowDeleteAction: deleteRowAction }),
    [deleteRowAction]
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
        url="/api/user"
        queryKey={queryKey}
      />
    </div>
  );
};
