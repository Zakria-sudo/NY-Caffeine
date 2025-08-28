"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { downArrow, searchBtn } from "@/lib/links/linkicons";
import TablePagination from "@/components/sections/menu/tables/TablePagination";
import { SkeletonTable } from "@/components/dialogShadcn/TableSkeleton";

const badgeTone = {
  up: "bg-emerald-50 text-emerald-600",
  down: "bg-rose-50 text-rose-600",
  neutral: "bg-gray-100 text-gray-600",
};

export function StatCard({ title, value, sub, badge, showDivider }) {
  const tone = badge?.tone || "neutral";
  const rotate = tone === "down" ? "rotate-180" : "rotate-0";

  return (
    <div className="relative flex-1 px-8 py-6">
      {showDivider && (
        <span className="pointer-events-none absolute right-0 top-1/2 hidden h-30 -translate-y-1/2 border-r border-dashed border-gray-300 md:block" />
      )}
      <div className="flex flex-col gap-5 px-6">
        <div className="flex items-start gap-4">
          <p className="text-[16px] font-semibold text-gray-700">{title}</p>
          {badge && (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] ${badgeTone[tone]}`}
            >
              <svg
                viewBox="0 0 10 11"
                className={`h-3 w-3 ${rotate}`}
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 7.44583L1.17875 8.625L5.00167 4.73375L8.82125 8.625L10 7.44583L5.00167 2.375L0 7.44583Z" />
              </svg>
              {badge.text}
            </span>
          )}
        </div>
        <div className="mt-2 text-3xl font-semibold text-[#7B4606]">
          {value}
        </div>
        {sub && <p className="mt-1 text-[14px] text-[#89868D]">{sub}</p>}
      </div>
    </div>
  );
}

export default function CustomersOverview() {
  const [users, setUsers] = useState([]); // ← API data lives here
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const pageSize = 4;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setLoadError("");

        const res = await fetch("/api/auth/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        // Your console shows the array at data.data
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.users)
          ? data.users
          : Array.isArray(data)
          ? data
          : [];

        setUsers(list);
      } catch (e) {
        setLoadError(e?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- Filtering (no useMemo) ---
  const q = search.trim().toLowerCase();
  let filtered = q
    ? users.filter(
        (u) =>
          (u?.name || "").toLowerCase().includes(q) ||
          (u?.email || "").toLowerCase().includes(q) ||
          (u?.phone || "").toLowerCase().includes(q)
      )
    : users;

  // --- Pagination ---
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-[#F5F6F8] p-4 sm:p-6">
      {/* Stats */}
      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row">
        <StatCard
          title="Total Customers"
          value={String(users.length)}
          sub="2025"
          badge={{ text: "3.0%", tone: "up" }}
          showDivider
        />
        <StatCard
          title="Total Sales"
          value="$8219.07"
          sub="143 Orders"
          badge={{ text: "3.0%", tone: "down" }}
          showDivider
        />
        <StatCard
          title="Canceled Orders"
          value="45"
          sub="April, 2025"
          badge={{ text: "3.0%", tone: "down" }}
        />
      </section>
      {/* Table/Card container */}
      <section className="mt-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <h2 className="text-[16px] font-medium text-gray-900">
            All Customers
          </h2>

          {/* Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[16px] text-gray-700 flex items-center gap-2">
                By Date <span>{downArrow}</span>
              </button>
              <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[16px] text-gray-700 flex items-center gap-2">
                Status <span>{downArrow}</span>
              </button>
            </div>

            <div className="relative w-full sm:w-80">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {searchBtn}
              </span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name / email / phone"
                className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Loading / Error */}

        {!loading && loadError && (
          <div className="px-6 pb-6 text-sm text-rose-600">{loadError}</div>
        )}

        {/* MOBILE (<sm): cards list */}
        {!loading && !loadError && (
          <div className="sm:hidden space-y-3 px-4 pb-4">
            {slice.map((u, i) => (
              <div
                key={u._id || i}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/avatar.png"}
                      alt={u.name || "Customer"}
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="text-[14px] font-medium text-gray-900">
                        {u.name || "-"}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        {u.email || "-"}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        {u.phone || "-"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 pl-[52px]">
                    <button aria-label="Delete" className="active:scale-95">
                      <Image
                        src="/trash.png"
                        alt="Delete"
                        width={24}
                        height={24}
                        className="w-4 h-4 shrink-0"
                      />
                    </button>
                    <button aria-label="Edit" className="active:scale-95">
                      <Image
                        src="/edit.png"
                        alt="Edit"
                        width={24}
                        height={24}
                        className="w-4 h-4 shrink-0"
                      />
                    </button>
                    <button aria-label="View" className="active:scale-95">
                      <Image
                        src="/eye.png"
                        alt="View"
                        width={24}
                        height={24}
                        className="w-4 h-4 shrink-0"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {slice.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-[13px] text-gray-500">
                No customers found.
              </div>
            )}
          </div>
        )}

        {/* DESKTOP (≥sm): table */}
        <div className="hidden sm:block border mx-5 rounded-xl">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Email Address</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {loading ? (
                // SkeletonTable must return <tr>…</tr> rows (not <tbody>)
                <SkeletonTable rows={pageSize} />
              ) : slice.length > 0 ? (
                slice.map((u, i) => (
                  <tr key={u._id || i} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={"/avatar.png"}
                          alt={u.name || "Customer"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {u.name || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {u.phone || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {u.email || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-5 text-gray-500">
                        <button aria-label="Delete">
                          <Image
                            src="/trash.png"
                            alt=""
                            width={18}
                            height={18}
                          />
                        </button>
                        <button aria-label="Edit">
                          <Image
                            src="/edit.png"
                            alt=""
                            width={18}
                            height={18}
                          />
                        </button>
                        <button aria-label="View">
                          <Image src="/eye.png" alt="" width={18} height={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (hook up if yours accepts props) */}
        <div className="px-4 py-3">
          <TablePagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(next) => setPage(next)}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </section>
    </div>
  );
}
