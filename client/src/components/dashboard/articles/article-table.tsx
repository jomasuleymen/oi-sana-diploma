
import { DataTable } from "@/components/data-table/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { filterableColumns, generateColumns, searchableColumns } from "./article-columns";
import { Post } from "@/services/post.service";

const POSTS_API_ENDPOINT = "/api/post";
const POSTS_QUERY_KEY = "posts";

const deleteBlog = async (data: any) => {
  return axios.delete(POSTS_API_ENDPOINT, {
    data,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const ArticlesTable: React.FC = () => {
  const queryClient = useQueryClient();

  const deleteRowsAction = useCallback(
    async (posts: Post[]) => {
      const ids = posts.map((post) => post.id);

      await deleteBlog(ids).finally(() => {
        queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      });
    },
    [queryClient, POSTS_QUERY_KEY]
  );

  const deleteRowAction = useCallback(
    async (product: Post) => {
      await deleteBlog({ id: product.id })
        .catch((err) => {})
        .finally(() => {
          queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
        });
    },
    [queryClient, POSTS_QUERY_KEY]
  );

  const columns = useMemo(
    () => generateColumns({ onRowDeleteAction: deleteRowAction }),
    [deleteRowAction]
  );

  return (
    <div className={cn("h-full flex-1 space-y-4 pt-6")}>
      <div className="flex items-start justify-between">
        <Heading title="Products" description="Manage blogs" />
      </div>
      <Separator />
      <DataTable
        columns={columns}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        deleteRowsAction={deleteRowsAction}
        url={POSTS_API_ENDPOINT}
        queryKey={POSTS_QUERY_KEY}
      />
    </div>
  );
};
