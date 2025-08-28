// components/sections/menu/tables/TablePagination.jsx
import React from "react";
import { leftArrow, rightArrow } from "@/lib/links/linkicons";

function getPages(page, total) {
  // window of pages around current + first/last with ellipses
  const pages = [];
  const left = Math.max(1, page - 1);
  const right = Math.min(total, page + 1);

  if (left > 1) {
    pages.push(1);
    if (left > 2) pages.push("…");
  }

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < total) {
    if (right < total - 1) pages.push("…");
    pages.push(total);
  }

  return pages;
}

export default function TablePagination({
  page,
  totalPages,
  onPageChange, // (nextPage:number) => void
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pages = getPages(page, totalPages);

  const baseBtn =
    "grid h-8 w-8 place-items-center rounded-md border text-xs sm:h-9 sm:w-9 sm:text-sm";
  const ghostBtn =
    "border-transparent text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50";
  const solidBtn =
    "border-neutral-200 bg-white text-neutral-900 font-medium";

  return (
    <div className="border-t border-neutral-200 px-4 py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Previous */}
        <button
          type="button"
          onClick={() => canPrev && onPageChange(page - 1)}
          disabled={!canPrev}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm sm:w-auto ${
            canPrev
              ? "text-neutral-700 hover:bg-neutral-50"
              : "text-neutral-400 cursor-not-allowed opacity-60"
          }`}
          aria-label="Previous page"
        >
          {leftArrow}
          Previous
        </button>

        {/* Pages */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {pages.map((n, i) =>
            n === "…" ? (
              <span
                key={`dots-${i}`}
                className={`${baseBtn} ${ghostBtn} select-none`}
              >
                …
              </span>
            ) : (
              <button
                key={`p-${n}`}
                type="button"
                onClick={() => onPageChange(n)}
                aria-current={n === page ? "page" : undefined}
                className={
                  n === page
                    ? `${baseBtn} ${solidBtn}`
                    : `${baseBtn} ${ghostBtn}`
                }
                aria-label={`Go to page ${n}`}
              >
                {n}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => canNext && onPageChange(page + 1)}
          disabled={!canNext}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm sm:w-auto ${
            canNext
              ? "text-neutral-700 hover:bg-neutral-50"
              : "text-neutral-400 cursor-not-allowed opacity-60"
          }`}
          aria-label="Next page"
        >
          Next
          {rightArrow}
        </button>
      </div>
    </div>
  );
}
