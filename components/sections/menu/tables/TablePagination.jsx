import React from "react"
import { leftArrow, rightArrow } from "@/lib/links/linkicons"

const TablePagination = () => {
  const pages = ["1", "2", "3", "…", "8", "9", "10"]

  return (
    
    <div className="border-t border-neutral-200 px-4 py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Previous */}
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 sm:w-auto"
          aria-label="Previous page"
        >
          {leftArrow}
          Previous
        </button>

        {/* Pages */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {pages.map((n, i) =>
            n === "1" ? (
              <span
                key={i}
                aria-current="page"
                className="grid h-8 w-8 place-items-center rounded-md border border-neutral-200 bg-white text-xs font-medium text-neutral-900 sm:h-9 sm:w-9 sm:text-sm"
              >
                {n}
              </span>
            ) : (
              <button
                key={i}
                className="grid h-8 w-8 place-items-center rounded-md border border-transparent text-xs text-neutral-600 hover:border-neutral-200 hover:bg-neutral-50 sm:h-9 sm:w-9 sm:text-sm"
                aria-label={`Go to page ${n}`}
              >
                {n}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 sm:w-auto"
          aria-label="Next page"
        >
          Next
          {rightArrow}
        </button>
      </div>
    </div>
    
  )
}

export default TablePagination
