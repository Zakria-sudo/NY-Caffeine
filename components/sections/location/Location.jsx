"use client";

import { useEffect, useState } from "react";
import { downArrow, searchBtn, trash, pen } from "@/lib/links/linkicons";
import { LocationDialog } from "@/components/dialogShadcn/LocationDialog";
import TablePagination from "../menu/tables/TablePagination";
import { SkeletonTable } from "@/components/dialogShadcn/TableSkeleton";
import { LocationEditDialog } from "@/components/dialogShadcn/LocationEditDialog";

export default function Location() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // NEW: sort state
  const [sort, setSort] = useState({ key: "date", dir: "desc" }); // key: "date" | "location", dir: "asc" | "desc"

  const PAGE_SIZE = 8;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setLoadError("");
        const res = await fetch("/api/auth/location", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.locations)
          ? data.locations
          : Array.isArray(data)
          ? data
          : [];
        setLocations(list);
      } catch (e) {
        setLoadError(e?.message || "Failed to load locations");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this branch?"); // replace with toast if you like
    if (!ok) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/auth/location/${id}`, { method: "DELETE" });
      if (!res.ok) {
        let msg = "Failed to delete";
        try {
          msg = (await res.json())?.message || msg;
        } catch {}
        throw new Error(msg);
      }
      setLocations((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // EDIT (called by LocationEditDialog after a successful save)
  const handleEditSaved = (updated) => {
    const updatedId = updated._id;
    setLocations((prev) =>
      prev.map((x) => (x._id === updatedId ? { ...x, ...updated } : x))
    );
  };

  // SORT button handler
  const onSortClick = (key) => {
    setSort((s) => ({
      key,
      dir: s.key === key ? (s.dir === "asc" ? "desc" : "asc") : "asc",
    }));
    setPage(1);
  };

  // filter
  const q = search.trim().toLowerCase();
  const filtered = q
    ? locations.filter((loc) => {
        const name = (loc?.name || "").toLowerCase();
        const code = (loc?.branchCode || "").toLowerCase();
        const addr = (loc?.address || "").toLowerCase();
        return name.includes(q) || code.includes(q) || addr.includes(q);
      })
    : locations;

  // NEW: sort after filtering
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sort.key === "date") {
      const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
      cmp = da - db; // asc by default
    } else if (sort.key === "location") {
      const na = (a.name).toLowerCase();
      const nb = (b.name).toLowerCase();
      cmp = na.localeCompare(nb); // asc by default
    }
    return sort.dir === "asc" ? cmp : -cmp;
  });

  // pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = sorted.slice(start, start + PAGE_SIZE);

  // small helper to style active sort button + arrow rotation
  const sortBtnClasses = (active) =>
    `inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm 
     ${active ? "border-neutral-300 bg-neutral-100 text-neutral-900" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`;

  const arrowClass = (btnKey) =>
    `text-neutral-400 transition-transform ${sort.key === btnKey && sort.dir === "asc" ? "rotate-180" : ""}`;

  return (
    <div className="m-3 rounded-2xl bg-white p-4 sm:m-4 sm:p-5 shadow-sm ring-1 ring-black/5">
      {/* header */}
      <div className="mb-4 grid grid-cols-1 items-start gap-3 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <h1 className="text-[22px] font-semibold text-neutral-900">Branches</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSortClick("date")}
              className={sortBtnClasses(sort.key === "date")}
            >
              By Date <span className={arrowClass("date")}>{downArrow}</span>
            </button>
            <button
              type="button"
              onClick={() => onSortClick("location")}
              className={sortBtnClasses(sort.key === "location")}
            >
              By Location <span className={arrowClass("location")}>{downArrow}</span>
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:items-end">
          <div className="w-full md:w-auto">
            <LocationDialog
              onCreated={(loc) => {
                setLocations((prev) => [loc, ...prev]);
                setPage(1);
              }}
            />
          </div>

          <div className="relative w-full md:w-[300px]">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name / code / address"
              className="h-9 w-full rounded-md border border-neutral-200 pl-8 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
            />
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
              {searchBtn}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      {!loading && !loadError && (
        <div className="space-y-3 md:hidden">
          {slice.map((row) => (
            <div key={row._id} className="rounded-xl border border-neutral-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-neutral-500">{row.branchCode || "-"}</div>
                  <div className="mt-1 font-medium text-neutral-900">{row.name || "-"}</div>
                  <div className="mt-1 text-sm text-neutral-700">{row.address || "-"}</div>
                </div>
                <div className="flex shrink-0 items-center gap-4 text-neutral-600">
                  <button title="Edit" className="hover:text-neutral-900" onClick={() => setEditing(row)}>{pen}</button>
                  <button
                    title="Delete"
                    className="hover:text-neutral-900 disabled:opacity-50"
                    onClick={() => handleDelete(row._id)}
                    disabled={deletingId === row._id}
                  >
                    {trash}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {slice.length === 0 && (
            <div className="rounded-xl border border-dashed border-neutral-200 p-8 text-center text-[13px] text-neutral-500">
              No locations found.
            </div>
          )}
        </div>
      )}

      {/* Desktop table */}
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
              {loading ? (
                <SkeletonTable rows={PAGE_SIZE} />
              ) : slice.length > 0 ? (
                slice.map((row) => (
                  <tr key={row._id} className="text-sm text-neutral-800">
                    <td className="px-5 py-5">{row.branchCode || "-"}</td>
                    <td className="px-5 py-5">{row.name || "-"}</td>
                    <td className="px-5 py-5 text-neutral-700">{row.address || "-"}</td>
                    <td className="px-5 py-5">
                      <div className="flex items-center justify-end gap-6 text-neutral-600">
                        <button
                          className={`hover:text-neutral-900 ${deletingId === row._id ? "opacity-50" : ""}`}
                          title="Delete"
                          onClick={() => handleDelete(row._id)}
                          disabled={deletingId === row._id}
                        >
                          {trash}
                        </button>
                        <button className="hover:text-neutral-900" title="Edit" onClick={() => setEditing(row)}>
                          {pen}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-sm text-neutral-500">
                    No locations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <TablePagination page={currentPage} totalPages={totalPages} onPageChange={(next) => setPage(next)} />
        </div>
      </div>

      {/* Edit dialog portal */}
      <LocationEditDialog
        open={!!editing}
        onOpenChange={(v) => !v && setEditing(null)}
        initial={editing}
        onSaved={handleEditSaved}
      />
    </div>
  );
}
