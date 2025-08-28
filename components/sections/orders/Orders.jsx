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
      {/* TABS — restored */}

      {/* CARD */}
      <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {/* Card header */}
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-4 text-[14px] sm:text-[14px]">
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
          <div>
            <h2 className="text-[18px] my-3 font-semibold text-neutral-900">
              All Customers
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: dropdowns */}
            <div className="flex items-center gap-3">
              {/* By Date */}
              <div className="relative">
                <select
                  value={dateSort}
                  onChange={(e) => setDateSort(e.target.value)}
                  className="h-9 appearance-none rounded-md border border-neutral-200 bg-white px-3 pr-8 text-sm text-neutral-700 outline-none"
                >
                  <option value="newest">By Date</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400">
                  {downArrow}
                </span>
              </div>

              {/* Status */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-9 appearance-none rounded-md border border-neutral-200 bg-white px-2 text-sm text-neutral-700 outline-none"
                >
                  <option value="">Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400">
                  {downArrow}
                </span>
              </div>
            </div>

            {/* Right: search */}
            <div className="relative w-full sm:w-80">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
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
                className="h-9 w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                  {headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 font-medium"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-200">
                {loading ? (
                  <SkeletonTable rows={5} />
                ) : (
                  <>
                    {slice.map((row) => (
                      <tr key={row.id} className="bg-white hover:bg-neutral-50">
                        <td className="px-6 py-5 text-sm text-neutral-900">
                          {row.id}
                        </td>
                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {row.date}
                        </td>
                        <td className="px-6 py-5 text-sm text-neutral-700">
                          {row.qty}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            {row.prods.map((p) => (
                              <Tag key={p} tone="violet">
                                {p}
                              </Tag>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-neutral-900">
                          {row.price}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium ${
                              STATUS_TONE[row.status] ||
                              "bg-white text-[#545454]"
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
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-6 text-neutral-500">
                            <button
                              aria-label="Delete"
                              className="hover:text-neutral-800 active:scale-95"
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
                              className="hover:text-neutral-800 active:scale-95"
                            >
                              <Image
                                src="/eye.png"
                                alt=""
                                width={18}
                                height={18}
                              />
                            </button>
                            <button
                              aria-label="Share"
                              className="hover:text-neutral-800 active:scale-95"
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

                    {!loading && slice.length === 0 && (
                      <tr>
                        <td
                          colSpan={headers.length}
                          className="px-6 py-10 text-center text-sm text-neutral-500"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer to match screenshot */}
          <div className="border-t border-neutral-200">
            <TablePagination />
          </div>
        </div>

        {/* errors */}
        {loadError && !loading && (
          <div className="px-6 py-3 text-sm text-rose-600">{loadError}</div>
        )}
      </section>
    </div>
  );
}
