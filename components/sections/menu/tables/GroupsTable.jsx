import React from 'react'
import TablePagination from './TablePagination'
import { trash, eyeTable, pen } from '@/lib/links/linkicons'
import { Chip } from '@/lib/static-data/orders-data'

const GroupsTable = ({ rows }) => {
  return (
    <>
      {/* Mobile: card list */}
      <div className="space-y-3 md:hidden">
        {rows.map((r, idx) => (
          <div key={idx} className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm text-neutral-500">{r.id}</div>
                <div className="mt-1 font-medium text-neutral-900">{r.name}</div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {r.modifiers.map((m, i) => (
                    <Chip key={i} color={m.color}>
                      {m.label}
                    </Chip>
                  ))}
                  <span className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-600 text-xs px-2.5 py-1">
                    {r.extra}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4 text-neutral-600">
                <button className="hover:text-neutral-900" title="Edit" aria-label="Edit group">
                  {pen}
                </button>
                <button className="hover:text-neutral-900" title="View" aria-label="View group">
                  {eyeTable}
                </button>
                <button className="hover:text-neutral-900" title="Delete" aria-label="Delete group">
                  {trash}
                </button>
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
          <table className="w-full min-w-[720px] table-auto border-collapse">
            <thead>
              <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Modifier Group</th>
                <th className="px-5 py-3 font-medium">No of Modifiers</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {rows.map((r, idx) => (
                <tr key={idx} className="text-sm text-neutral-700">
                  <td className="px-5 py-4 whitespace-nowrap text-neutral-500">{r.id}</td>
                  <td className="px-5 py-4">{r.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {r.modifiers.map((m, i) => (
                        <Chip key={i} color={m.color}>
                          {m.label}
                        </Chip>
                      ))}
                      <span className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-600 text-xs px-2.5 py-1">
                        {r.extra}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-5 text-neutral-600">
                      <button className="hover:text-neutral-900" title="Delete" aria-label="Delete group">
                        {trash}
                      </button>
                      <button className="hover:text-neutral-900" title="Edit" aria-label="Edit group">
                        {pen}
                      </button>
                      <button className="hover:text-neutral-900" title="View" aria-label="View group">
                        {eyeTable}
                      </button>
                    </div>
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

export default GroupsTable
