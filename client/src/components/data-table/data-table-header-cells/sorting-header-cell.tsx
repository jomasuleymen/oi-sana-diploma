import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeaderContext } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortingHeaderCellProps<TData, TValue> {
  headerContext: HeaderContext<TData, TValue>;
  name: string;
}

export function SortingHeaderCell<TData, TValue>({
  headerContext: { column },
  name,
}: SortingHeaderCellProps<TData, TValue>) {
  const isSorted = column.getIsSorted();
  const isAsc = isSorted === "asc";

  return (
    <Button
      variant="ghost"
      className={cn(isSorted && "text-accent-foreground")}
      onClick={() => {
        if (isSorted && !isAsc) column.clearSorting();
        else column.toggleSorting(isAsc, true);
      }}
    >
      {name}
      {isSorted ? (
        isAsc ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
