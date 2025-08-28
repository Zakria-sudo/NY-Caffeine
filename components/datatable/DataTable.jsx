"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Column shape (JS, no TS):
 * {
 *   key: "id",                    // optional if you provide header + accessor/render
 *   header: "ID",                 // table header text / node
 *   thClassName: "px-5 py-2",     // optional classes for header cell
 *   tdClassName: "px-5 py-3",     // optional classes for body cell
 *   accessor: (row) => row.id,    // optional function to read cell value
 *   render: (row) => <b>{row.id}</b> // optional full custom renderer (wins over accessor/key)
 * }
 *
 * Props:
 * - data: array of rows
 * - columns: array<Column>
 * - customColumns: array<Column> (appended to columns)
 * - emptyText: string for "no data" row
 * - getRowKey: function(row) -> unique key
 */
export default function DataTable({
  data = [],
  columns = [],
  customColumns = [],
  emptyText = "No data found.",
  getRowKey = (row) => row.id ?? row.key ?? JSON.stringify(row),
}) {
  const cols = [...columns, ...customColumns];

  return (
    <div className="overflow-x-auto bg-[#FAFAFA]">
      <Table className="min-w-full text-left border-separate border-spacing-y-3">
        <TableHeader>
          <TableRow className="text-[12px] text-gray-500">
            {cols.map((col, i) => (
              <TableHead
                key={col.key ?? col.header ?? i}
                className={col.thClassName ?? "px-5 py-2"}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow
                key={getRowKey(row)}
                className="bg-white shadow-sm rounded-xl"
              >
                {cols.map((col, i) => {
                  const value =
                    col.render?.(row) ??
                    col.accessor?.(row) ??
                    (col.key ? row[col.key] : null);

                  return (
                    <TableCell
                      key={(col.key ?? col.header ?? i) + "-cell"}
                      className={col.tdClassName ?? "px-5 py-3 text-[13px]"}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={cols.length || 1}
                className="px-5 py-10 text-center text-[13px] text-gray-500"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
