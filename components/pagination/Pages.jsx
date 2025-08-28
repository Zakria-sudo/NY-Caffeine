import React from 'react'
import { leftArrow,rightArrow } from '@/lib/links/linkicons'
const Pagination = () => {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            {leftArrow}
            Previous
          </button>

          <div className="flex items-center gap-2">
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

          <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            Next
            {rightArrow}
          </button>
        </div>
  )
}

export default Pagination