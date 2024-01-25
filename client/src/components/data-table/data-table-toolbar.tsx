
import { Cross2Icon, TrashIcon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";
import * as React from "react";

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteAlertModal from "../ui/delete-alert-modal";
import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "./data-table.types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  deleteRowsAction?: (rows: TData[]) => Promise<any>;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  deleteRowsAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [deleteData, setDeleteData] = React.useState<TData[]>([]);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {deleteRowsAction && (
        <DeleteAlertModal
          isOpen={open}
          onDelete={async () => {
            await deleteRowsAction(deleteData);
            table.toggleAllPageRowsSelected(false);
            setDeleteData([]);
            setOpen(false);
          }}
          title="Are you sure for deleting?"
          setOpen={setOpen}
        />
      )}
      <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 &&
            searchableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={
                      (table
                        .getColumn(String(column.id))
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn(String(column.id))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                )
            )}
          {filterableColumns.length > 0 &&
            filterableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : "") && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(column.id ? String(column.id) : "")}
                    title={column.title}
                    options={column.options}
                  />
                )
            )}
          {isFiltered && (
            <Button
              aria-label="Reset filters"
              variant="ghost"
              className="h-8 px-2 lg:px-3"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
            <Button
              aria-label="Delete selected rows"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => {
                const rows = table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original);
                setDeleteData(rows);
                setOpen(true);
              }}
            >
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}
