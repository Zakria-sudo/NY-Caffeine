"use client"

import { useMemo, useState } from "react"
import {
  downArrow,
  eyeTable,
  groups,
  leftArrow,
  pen,
  rightArrow,
  searchBtn,
  trash,
} from "@/lib/links/linkicons"
import { ModifierDialog } from "@/components/dialogShadcn/ModifierDialog"
import GroupsTable from "../tables/GroupsTable"
import ModifiersTable from "../tables/ModifiersTable"
// ---- Chips (used in Groups table) ----


// ---- Data ----
const modifierRowsInitial = [
  { group: "Iced Coffee", modifier: "Small 7 oz", price: "$12.09", available: false },
  { group: "Iced Coffee", modifier: "Medium 9 oz", price: "$12.09", available: true },
  { group: "Iced Coffee", modifier: "Large 10 oz", price: "$12.09", available: true },
  { group: "Iced Coffee", modifier: "XL 18 oz", price: "$12.09", available: false },
]



// ---- Page ----
export default function ModifierGroupsTable() {
  const [activeTab, setActiveTab] = useState("groups") // "groups" | "modifiers"
  const [modifierRows, setModifierRows] = useState(modifierRowsInitial)

  // existing groups rows
  const groupRows = useMemo(
    () =>
      groups.map((g) => ({
        ...g,
        modifiers: [
          { label: "Small 8 oz", color: "purple" },
          { label: "Large 10 oz", color: "blue" },
          { label: "Medium 9 oz", color: "darkBlue" },
        ],
        extra: "+4",
      })),
    []
  )

  const toggleAvailable = (idx) =>
    setModifierRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, available: !row.available } : row))
    )

  return (
    <div className="m-4 rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-black/5">
      {/* Header (unchanged) */}
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => setActiveTab("groups")}
              className={`pb-1 font-medium ${
                activeTab === "groups"
                  ? "text-[#874F00] border-b-2 border-[#874F00]"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab("modifiers")}
              className={`pb-1 font-medium ${
                activeTab === "modifiers"
                  ? "text-[#874F00] border-b-2 border-[#874F00]"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Modifiers
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              By Date
              {downArrow}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              By Group
              {downArrow}
            </button>
          </div>
        </div>

        {/* Right: CTA + search */}
        <div className="flex flex-col items-end gap-3">
          <ModifierDialog />
          <div className="relative w-[240px]">
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-full rounded-md border border-neutral-200 pl-8 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-300"
            />
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400">
              {searchBtn}
            </span>
          </div>
        </div>
      </div>

      {/* Only the table changes */}
      {activeTab === "groups" ? (
        <GroupsTable rows={groupRows} />
      ) : (
        <ModifiersTable rows={modifierRows} onToggle={toggleAvailable} />
      )}
    </div>
  )
}
