import { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export function useSorting() {
  const [sorting, setSorting] = useState<SortingState>([]);

  return {
    sorting,
    onSortingChange: setSorting,
  };
}
