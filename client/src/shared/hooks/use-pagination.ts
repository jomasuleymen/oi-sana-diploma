import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export type PaginationHookParams = {
  pageSize?: number;
};

export function usePagination({
  pageSize: initPageSize = 5,
}: PaginationHookParams = {}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: initPageSize,
    pageIndex: 0,
  });

  return {
    pagination,
    onPaginationChange: setPagination,
  };
}
