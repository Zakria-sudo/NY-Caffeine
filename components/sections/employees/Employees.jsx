"use client";

import React from "react";
import {
  downArrow,
  searchBtn,
  trash,
  pen,
} from "@/lib/links/linkicons";
import { employees } from "@/lib/links/links";
import StatusBadge from "./StatusBadge";
import Pagination from "@/components/pagination/Pages";
import { EmployeeDialog } from "@/components/dialogShadcn/EmployeeDialog";
import TablePagination from "../menu/tables/TablePagination";

const employeeHeaders = [
  { label: "Name", className: "px-5 py-3 font-medium" },
  { label: "Email", className: "px-5 py-3 font-medium" },
  { label: "Added on", className: "px-5 py-3 font-medium" },
  { label: "Status", className: "px-5 py-3 font-medium" },
  { label: "", className: "w-24 px-5 py-3" },
];

export default function Employees() {
  return (
    <div className="m-3 rounded-2xl bg-white p-4 sm:m-4 sm:p-5 shadow-sm ring-1 ring-black/5">
      {/* Header */}
      <div className="mb-4 grid grid-cols-1 items-start gap-3 md:grid-cols-[1fr_auto]">
        {/* Left: title + filters */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[22px] font-semibold text-neutral-900">
            All Employees
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              By Date <span className="text-neutral-400">{downArrow}</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Status <span className="text-neutral-400">{downArrow}</span>
            </button>
          </div>
        </div>

        {/* Right: CTA + search */}
        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:items-end">
          <div className="w-full md:w-auto">
            <EmployeeDialog />
          </div>

          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search by name"
              className="h-9 w-full rounded-md border border-neutral-200 pl-8 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
            />
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
              {searchBtn}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Mobile: Card list ===== */}
      <div className="space-y-3 md:hidden">
        {employees.map((row, i) => (
          <div key={i} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium text-neutral-900">{row.name}</div>
                <div className="mt-1 truncate text-sm text-neutral-600">{row.email}</div>
                <div className="mt-1 text-sm text-neutral-600">{row.date}</div>
                <div className="mt-2">
                  <StatusBadge value={row.status} />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-neutral-600">
                <button className="hover:text-neutral-900" title="Edit">
                  {pen}
                </button>
                <button className="hover:text-neutral-900" title="Delete">
                  {trash}
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination (mobile) */}
        <div className="md:hidden">
          <Pagination />
        </div>
      </div>

      {/* ===== Desktop/Tablet: Table ===== */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[720px] table-auto border-collapse">
              <thead>
      <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
        {employeeHeaders.map((header, index) => (
          <th
            key={index}
            scope="col"
            className={header.className}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
            <tbody className="divide-y divide-neutral-200">
              {employees.map((row, i) => (
                <tr key={i} className="text-sm text-neutral-800">
                  <td className="px-5 py-5">{row.name}</td>
                  <td className="px-5 py-5 text-neutral-600">{row.email}</td>
                  <td className="px-5 py-5 text-neutral-600">{row.date}</td>
                  <td className="px-5 py-5">
                    <StatusBadge value={row.status} />
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-6 text-neutral-600">
                      <button className="hover:text-neutral-900" title="Delete">
                        {trash}
                      </button>
                      <button className="hover:text-neutral-900" title="Edit">
                        {pen}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination (desktop) */}
          <div className="hidden md:block">
            <TablePagination />
          </div>
        </div>
      </div>
    </div>
  );
}
