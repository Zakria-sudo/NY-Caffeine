"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { downArrow, leftArrow, rightArrow } from "@/lib/links/linkicons";
import { Tag } from "@/components/tag/Tag";
import { headers } from "@/lib/static-data/orders-data";
import api, { apiWithAuth } from "@/utils/axios";
import { SkeletonTable } from "@/components/dialogShadcn/TableSkeleton";
import TablePagination from "../menu/tables/TablePagination";

const TABS = [
  { key: "all", label: "All Orders" },
  { key: "pending", label: "Pending" },
  { key: "cancelled", label: "Cancelled" },
  { key: "completed", label: "Completed" },
];

// Colors for status labels
const STATUS_TONE = {
  pending: "bg-white text-[#545454]",
  completed: "bg-white text-[#545454]",
  cancelled: "bg-white text-[#545454]",
};
const STATUS_DOT = {
  pending: "bg-amber-500",
  completed: "bg-emerald-500",
  cancelled: "bg-rose-500",
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateSort, setDateSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(""); // API error message
  const pageSize = 5;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setLoadError("");

        const res = await fetch("/api/auth/orders", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        // data = { success, message, orders: [...] }
        setOrders(Array.isArray(data?.orders) ? data.orders : []);
      } catch (e) {
        setLoadError(e?.message || "failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const rows = orders.map((o) => {
    const id = o.orderNumber;
    const date = o.createdAt
      ? new Date(o.createdAt).toLocaleString() // or .toLocaleDateString()
      : "";
    const qty = o.itemsQuantity ?? 0;

    const prods = Array.isArray(o.products)
      ? o.products.map((p) => p?.item?.name).filter(Boolean)
      : [];

    const price = `${o.totalPrice ?? 0} $`;
    const status = String(o.pickupStatus || "").toLowerCase() || "pending";

    return { id, date, qty, prods, price, status };
  });

  // Step 2: Apply filters (tab, status, search)
  let filtered = [...rows];

  if (activeTab !== "all") {
    filtered = filtered.filter((r) => r.status?.toLowerCase() === activeTab);
  }
  if (statusFilter) {
    filtered = filtered.filter((r) => r.status?.toLowerCase() === statusFilter);
  }

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    filtered = filtered.filter((r) =>
      String(r.id).toLowerCase().includes(term)
    );
  }

  // Step 3: Apply sorting (by ID here, you can switch to createdAt if needed)
  filtered.sort((a, b) =>
    dateSort === "newest"
      ? String(b.id).localeCompare(String(a.id))
      : String(a.id).localeCompare(String(b.id))
  );

  // Step 4: Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const slice = filtered.slice((pageSafe - 1) * pageSize, pageSafe * pageSize);

  return (
    <div className="bg-[#F5F6F8] min-h-screen p-4 sm:p-6">
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-4 text-[14px] sm:text-[14px]">
          {TABS.map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => {
                  setActiveTab(t.key);
                  setPage(1);
                }}
                className={`relative py-1 font-medium ${
                  active
                    ? "text-[#7B4606] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#7B4606]"
                    : "text-[#545454] hover:text-gray-800"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Filters (Date sort, Status filter, Search) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {/* Date Sort Dropdown */}
            <div className="relative">
              <select
                value={dateSort}
                onChange={(e) => setDateSort(e.target.value)}
                className="appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-[14px] text-[#89868D] focus:outline-none"
              >
                <option value="newest">By Date</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                {downArrow}
              </span>
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-[14px] text-[#89868D] focus:outline-none"
              >
                <option value="">By Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">CancelLed</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                {downArrow}
              </span>
            </div>
          </div>

          {/* Search by Order ID */}
          <div className="relative w-full sm:w-72">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src="/searchbold.png"
                width={18}
                height={18}
                alt="search"
              />
            </span>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by ID"
              className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-3">
            <thead className="bg-[#F5F6F8]">
              <tr className="text-xs text-gray-600 border-b border-gray-200">
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-5 py-3.5">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <SkeletonTable rows={5} />
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-3">
              <thead className="bg-[#F5F6F8]">
                <tr className="text-xs text-gray-600 border-b border-gray-200">
                  {headers.map((header) => (
                    <th key={header} scope="col" className="px-5 py-3.5">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((row) => (
                  <tr key={row.id} className="bg-white shadow-sm rounded-xl">
                    <td className="px-5 py-3 text-[13px] text-gray-900">
                      {row.id}
                    </td>
                    <td className="px-5 py-3 text-[13px] text-gray-700">
                      {row.date}
                    </td>
                    <td className="px-5 py-3 text-[13px] text-gray-700">
                      {row.qty}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-2">
                        {row.prods.map((p) => (
                          <Tag key={p} tone="slate">
                            {p}
                          </Tag>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-gray-900">
                      {row.price}
                    </td>
                    <td className="px-5 py-3">
                      <div className="relative group inline-flex items-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md border border-[#D5D7DA] font-semibold px-1 py-1 text-xs ${
                            STATUS_TONE[row.status] || "bg-white text-[#545454]"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              STATUS_DOT[row.status] || "bg-amber-500"
                            }`}
                          />
                          {row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)}
                        </span>

                        <span className="absolute -right-1 top-1/2 hidden -translate-y-1/2 translate-x-full whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[11px] text-white shadow group-hover:block">
                          Change Status
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-5 text-gray-500">
                        <button
                          aria-label="Delete"
                          className="hover:opacity-80 active:scale-95"
                        >
                          <Image
                            src="/trash.png"
                            alt=""
                            width={18}
                            height={18}
                          />
                        </button>
                        <button
                          aria-label="View"
                          className="hover:opacity-80 active:scale-95"
                        >
                          <Image src="/eye.png" alt="" width={18} height={18} />
                        </button>
                        <button
                          aria-label="Share"
                          className="hover:opacity-80 active:scale-95"
                        >
                          <Image
                            src="/share.png"
                            alt=""
                            width={18}
                            height={18}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* No orders fallback */}
                {!loading && slice.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-[13px] text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TablePagination />
        </div>
      )}
      {loadError && !loading && (
        <div className="px-5 -mt-2 text-sm text-red-600">{loadError}</div>
      )}
    </div>
  );
}
