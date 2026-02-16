"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function DataTable({ data, columns, tableStyle }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="overflow-hidden rounded-md border border-[#f1f1f159]">
      {/* Table Header */}
      <div className="bg-[#1c1c1c] flex justify-between border-b border-[#f1f1f159] py-2">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="contents">
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className="px-4 py-2 flex-1 font-medium text-sm text-gray-300"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              data-state={row.getIsSelected() ? "selected" : undefined}
              className={`flex justify-between  first:border-t-0 first:mt-0  border-[#f1f1f159]  hover:bg-transparent cursor-pointer last:border-b-0 last:mb-0 ${
                tableStyle == "style2" ? "border-b " : "border-t my-1"
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="px-4 py-2 flex-1 text-sm text-gray-200 self-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1">
            <div className="h-24 flex items-center justify-center text-gray-400 text-sm">
              No results.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DataTable;
