import React from 'react'

const StatusBadge = ({value}) => {
   const isActive = value === "Active"
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/80 px-2.5 py-1 text-xs text-neutral-700">
      <span
        className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {value}
    </span>
  )
}

export default StatusBadge