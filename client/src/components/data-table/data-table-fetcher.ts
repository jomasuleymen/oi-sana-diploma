import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import axios from "axios";
import { keyBy, mapValues } from "lodash";
import { toast } from "sonner";

export const dataTableFetch = async ({
  url,
  pagination,
  sorting,
  columnFilters,
}: {
  url: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
}) => {
  const body = {
    pagination: {
      pageIndex: pagination.pageIndex,
      size: pagination.pageSize,
    },
    orderBy: sorting.map((sort) => ({
      field: sort.id,
      desc: sort.desc,
    })),

    filter: mapValues(keyBy(columnFilters, "id"), "value"),
  };

  const response = await axios
    .post(url, body, {
      withCredentials: true,
    })
    .catch((err: any) => {
      toast.error(err?.message || "Error while fetching data from server!");
    });

  return await response?.data;
};
