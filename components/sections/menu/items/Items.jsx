"use client";

import React, { useEffect, useState } from "react";
import { searchBtn, trash, pen } from "@/lib/links/linkicons";
import { useRouter } from "next/navigation";
import FilterButton from "@/components/filterbutton/FIlterButton";
import api from "@/utils/axios";
import { SkeletonTable } from "@/components/dialogShadcn/TableSkeleton";
import TablePagination from "../tables/TablePagination";
import { SkeletonPagination } from "@/components/dialogShadcn/SkeletonPagination";

const PAGE_SIZE = 10;

export default function Items() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await api.get("/items");
        const data = Array.isArray(res.data?.items) ? res.data.items : res.data;
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filtering + search
  let filtered = [...items];
  if (search.trim()) {
    const term = search.trim().toLowerCase();
    filtered = filtered.filter((i) =>
      String(i?.name ?? "").toLowerCase().includes(term)
    );
  }

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const current = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  return (
    <section className="mx-3 rounded-md bg-white p-3 md:p-6">
      {/* Title */}
      <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827] md:text-[22px]">
          All Items
        </h2>
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#7a4500] px-3.5 py-2.5 text-[14px] font-medium text-white shadow-sm hover:opacity-95 md:w-auto"
          onClick={() => router.push("/menu/add-item")}
        >
          <span className="inline-flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          Add New Item
        </button>
      </div>

      {/* Search / Filters */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton label="By Date" />
          <FilterButton label="By Category" />
          <FilterButton label="In Stock" />
        </div>
        <div className="relative w-full sm:w-[280px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {searchBtn}
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[14px] text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-300"
          />
        </div>
      </div>

      {/* Error */}
      {err && <div className="mb-3 text-sm text-red-600">{err}</div>}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[980px] border-collapse text-sm">
          <thead className="bg-[#f7f7f9] text-[#111827]">
            <tr className="text-[13px]">
              <Th>Name</Th>
              <Th className="w-[120px]">Price</Th>
              <Th className="w-[160px]">Category</Th>
              <Th>Modifier(s)</Th>
              <Th className="w-[80px] text-center">Qty</Th>
              <Th className="w-[140px]">In Stock</Th>
              <Th className="w-[120px] text-center" />
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <SkeletonTable rows={5} />
            </tbody>
          ) : (
            <tbody>
              {current.length === 0 ? (
                <tr>
                  <Td colSpan={7} className="py-10 text-center text-gray-500">
                    No items found.
                  </Td>
                </tr>
              ) : (
                current.map((r) => (
                  <tr
                    key={r._id || r.name}
                    className="border-t border-gray-200 text-[14px] text-[#111827]"
                  >
                    <Td>{r?.name ?? "-"}</Td>
                    <Td className="text-gray-700">
                      {typeof r?.price === "number"
                        ? r.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })
                        : "-"}
                    </Td>
                    <Td className="text-gray-700">
                      {typeof r?.category === "string"
                        ? r.category
                        : r?.category?.name || "-"}
                    </Td>
                    <Td>{renderModifiers(r?.modifiers)}</Td>
                    <Td className="text-center text-gray-700">{r?.qty ?? 0}</Td>
                    <Td>
                      <StatusBadge status={r?.isActive ? "active" : "inactive"} />
                    </Td>
                    <Td>
                      <div className="flex items-center justify-center gap-7">
                        {pen}
                        {trash}
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>

        {loading ? <SkeletonPagination /> : <TablePagination />}
      </div>
    </section>
  );
}

/* helpers */

function Th({ children, className = "" }) {
  return <th className={`px-4 py-2 text-left font-medium ${className}`}>{children}</th>;
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-4 ${className}`}>{children}</td>;
}

function renderModifiers(mods) {
  const arr = Array.isArray(mods) ? mods : [];
  if (!arr.length) return <span className="text-gray-400">—</span>;
  return arr.map((m, i) => (
    <Pill key={i} label={typeof m === "string" ? m : m?.name || "-"} />
  ));
}

function Pill({ label }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-gray-200 bg-white px-2 text-[12px] text-gray-700">
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const active = status === "active";
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[12px] text-gray-700">
      <span className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-red-500"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}
