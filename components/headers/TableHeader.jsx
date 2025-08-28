import { downArrow,searchBtn } from "@/lib/links/linkicons";
import React from "react";

const TableHeader = ({title,btnText,text1,text2}) => {
    return (
    <div className="mb-4 grid grid-cols-1 items-start gap-3 md:grid-cols-[1fr_auto]">
      {/* LEFT: Title + Filters */}
      <div className="flex flex-col gap-3">
        <h1 className="text-[22px] font-semibold text-neutral-900">{title}</h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            {text1}
            <span className="text-neutral-400">{downArrow}</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
          >
            {text2}
            <span className="text-neutral-400">{downArrow}</span>
          </button>
        </div>
      </div>

      {/* RIGHT: CTA + Search */}
      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          className="h-10 rounded-full bg-[#874F00] px-4 text-white hover:bg-[#A65E00]"
        >
          <span className="mr-2 text-base leading-none">+</span>
          {btnText}
        </button>

        <div className="relative w-[280px]">
          <input
            type="text"
            placeholder="Search by name"
            className="h-9 w-full rounded-md border border-neutral-200 pl-8 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
          />
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
            {searchBtn}
          </span>
        </div>
      </div>
    </div>
  )
};

export default TableHeader;
