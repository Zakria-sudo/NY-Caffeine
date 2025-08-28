"use client";

import React, { useEffect, useState } from "react";
import FilterButton from "@/components/filterbutton/FilterButton";
import { searchBtn, pen, trash } from "@/lib/links/linkicons";
import { DialogDemo } from "@/components/dialogShadcn/Dialog";
import TablePagination from "../tables/TablePagination";
import { SkeletonTable } from "@/components/dialogShadcn/TableSkeleton";
import { SkeletonPagination } from "@/components/dialogShadcn/SkeletonPagination";
import api from "@/utils/axios";

const PAGE_SIZE = 6;

export default function Categories() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await api.get("/category");
        const categories = res?.data?.categories ?? [];
        setData(Array.isArray(categories) ? categories : []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const q = query.trim().toLowerCase();
  let filtered = data;
  if (q) {
    filtered = data.filter((c) => {
      const id = String(c?._id || "").toLowerCase();
      const name = String(c?.name || "").toLowerCase();
      return id.includes(q) || name.includes(q);
    });
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  useEffect(() => setPage(1), [query]);

  return (
    <section className="p-3 md:p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-3 md:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[20px] md:text-[22px] font-semibold text-[#111827]">
            All Categories
          </h2>
          <div className="w-full md:w-auto flex md:justify-end">
            <DialogDemo />
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <FilterButton label="By Date" />
            <FilterButton label="By Status" />
          </div>

          {/* Search */}
          <label className="relative h-10 w-full md:w-[280px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {searchBtn}
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[14px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300"
            />
          </label>
        </div>

        {/* Error */}
        {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

        {/* Table */}
        <div className="rounded-xl border border-gray-200">
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full min-w-[720px] md:min-w-0 table-auto text-sm">
              <colgroup>
                <col className="w-40" />
                <col />
                <col className="w-24" />
                <col className="w-24" />
              </colgroup>

              <thead className="bg-[#f7f7f9] text-[#111827]">
                <tr className="text-[13px]">
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th className="text-center">Qty</Th>
                  <Th className="text-center"></Th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <SkeletonTable />
                </tbody>
              ) : (
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <Td colSpan={4} className="py-10 text-center text-gray-500">
                        No categories found.
                      </Td>
                    </tr>
                  ) : (
                    pageRows.map((c) => (
                      <tr key={c._id} className="border-t border-gray-200">
                        <Td className="py-5 text-gray-700">{"#" + c._id.slice(-4)}</Td>
                        <Td className="py-5 text-[#111827]">
                          <span className="block truncate">{c.name || "-"}</span>
                        </Td>
                        <Td className="py-5 text-center text-gray-700">
                          {Array.isArray(c.items) ? c.items.length : 0}
                        </Td>
                        <Td className="py-3">
                          <div className="flex items-center justify-center gap-4 text-gray-600">
                            <IconBtn ariaLabel="Edit">{pen}</IconBtn>
                            <IconBtn ariaLabel="Delete">{trash}</IconBtn>
                          </div>
                        </Td>
                      </tr>
                    ))
                  )}
                </tbody>
              )}
            </table>
          </div>

          {/* Pagination */}
          {loading ? (
            <SkeletonPagination />
          ) : (
            <TablePagination
              page={pageSafe}
              totalPages={totalPages}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              onJump={(n) => setPage(n)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* tiny bits */

function Th({ children, className = "" }) {
  return (
    <th className={`px-4 py-3 text-left font-medium whitespace-nowrap ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "", ...rest }) {
  return (
    <td className={`px-4 ${className}`} {...rest}>
      {children}
    </td>
  );
}

function IconBtn({ children, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="grid h-8 w-8 place-items-center rounded-md text-gray-600 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}
