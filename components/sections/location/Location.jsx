"use client"

import React from "react"
import {
  downArrow,
  searchBtn,
  leftArrow,
  rightArrow,
  trash,
  pen,
} from "@/lib/links/linkicons"
import { branches } from "@/lib/links/links"
import { LocationDialog } from "@/components/dialogShadcn/LocationDialog"
import TablePagination from "../menu/tables/TablePagination"

export default function Location() {
  return (
    <div className="m-3 rounded-2xl bg-white p-4 sm:m-4 sm:p-5 shadow-sm ring-1 ring-black/5">
      {/* Header */}
      <div className="mb-4 grid grid-cols-1 items-start gap-3 md:grid-cols-[1fr_auto]">
        {/* Left: title + filters */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[22px] font-semibold text-neutral-900">Branches</h1>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              By Date
              <span className="text-neutral-400">{downArrow}</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              By Location
              <span className="text-neutral-400">{downArrow}</span>
            </button>
          </div>
        </div>

        {/* Right: CTA + search */}
        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:items-end">
          <div className="w-full md:w-auto">
            <LocationDialog />
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

      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {branches.map((row, i) => (
          <div key={i} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-neutral-500">{row.code}</div>
                <div className="mt-1 font-medium text-neutral-900">{row.name}</div>
                <div className="mt-1 text-sm text-neutral-700">{row.address}</div>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-neutral-600">
                <button title="Edit" className="hover:text-neutral-900">{pen}</button>
                <button title="Delete" className="hover:text-neutral-900">{trash}</button>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination (mobile) */}
        <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            {leftArrow} Previous
          </button>
          <div className="flex items-center justify-center gap-2">
            {["1", "2", "3", "…", "8", "9", "10"].map((n, i) =>
              n === "1" ? (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 bg-white text-sm font-medium text-neutral-900"
                >
                  {n}
                </span>
              ) : (
                <button
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-md border border-transparent text-sm text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50"
                >
                  {n}
                </button>
              )
            )}
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            Next {rightArrow}
          </button>
        </div>
      </div>

      {/* Desktop/Tablet: table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[720px] table-auto border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                <th className="px-5 py-3 font-medium">Branch Code</th>
                <th className="px-5 py-3 font-medium">Branch Name</th>
                <th className="px-5 py-3 font-medium">Address</th>
                <th className="w-24 px-5 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200">
              {branches.map((row, i) => (
                <tr key={i} className="text-sm text-neutral-800">
                  <td className="px-5 py-5">{row.code}</td>
                  <td className="px-5 py-5">{row.name}</td>
                  <td className="px-5 py-5 text-neutral-700">{row.address}</td>
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
          <TablePagination/>
        </div>
      </div>
    </div>
  )
}
