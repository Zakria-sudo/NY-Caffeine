import React from "react"

const RewardsCard = ({ src, title, desc, points, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white shadow-sm p-2 ${className}`}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={src}
          alt={title || "Reward"}
          className="h-36 w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="px-2 pb-3 pt-3">
        <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug">
          {title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500">{desc}</p>

        <div className="mt-2 flex items-center text-sm text-neutral-700">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-neutral-500" />
          {points} points
        </div>
      </div>
    </div>
  )
}

export default RewardsCard
