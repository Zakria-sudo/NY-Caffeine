import React from "react"
import TablePagination from "./TablePagination"

const ModifiersTable = ({ rows, onToggle }) => {
  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {rows.map((r, idx) => (
          <div key={idx} className="rounded-xl border border-neutral-200 p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-neutral-500">Group</div>
                <div className="font-medium text-neutral-900">{r.group}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-neutral-500">Price</div>
                <div className="font-medium text-neutral-900">{r.price}</div>
              </div>

              <div className="col-span-2">
                <div className="text-xs text-neutral-500">Modifier</div>
                <div className="text-neutral-800">{r.modifier}</div>
              </div>

              <div className="col-span-2 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Available</span>
                <label className="relative inline-flex h-5 w-10 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={r.available}
                    onChange={() => onToggle(idx)}
                    aria-label={`Toggle availability for ${r.modifier}`}
                  />
                  <span className="h-5 w-10 rounded-full bg-neutral-200 transition-colors peer-checked:bg-[#874F00]" />
                  <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination (mobile) */}
        <TablePagination />
      </div>

      {/* Desktop/Tablet: table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[640px] table-auto border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                <th className="px-5 py-3 font-medium">Group</th>
                <th className="px-5 py-3 font-medium">Modifier</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {rows.map((r, idx) => (
                <tr key={idx} className="text-sm text-neutral-700">
                  <td className="px-5 py-4">{r.group}</td>
                  <td className="px-5 py-4">{r.modifier}</td>
                  <td className="px-5 py-4">{r.price}</td>
                  <td className="px-5 py-4">
                    <label className="relative inline-flex h-5 w-10 cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={r.available}
                        onChange={() => onToggle(idx)}
                        aria-label={`Toggle availability for ${r.modifier}`}
                      />
                      <span className="h-5 w-10 rounded-full bg-neutral-200 transition-colors peer-checked:bg-[#874F00]" />
                      <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination (desktop) */}
          <TablePagination />
        </div>
      </div>
    </>
  )
}

export default ModifiersTable
