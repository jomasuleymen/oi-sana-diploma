import { Table, flexRender } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
}

export function DataTableBody<TData>({ table }: DataTableBodyProps<TData>) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table._getColumnDefs().length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default DataTableBody;
