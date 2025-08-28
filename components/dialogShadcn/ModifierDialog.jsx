"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trash } from "@/lib/links/linkicons" // ← your SVG consts

export function ModifierDialog() {
  const [groupName, setGroupName] = useState("")
  const [mods, setMods] = useState([
    { name: "Small 8 oz", price: "3.99" },
    { name: "", price: "" },
  ])

  const updateMod = (i, key, val) =>
    setMods(prev => prev.map((m, idx) => (idx === i ? { ...m, [key]: val } : m)))

  const addRow = () => setMods(prev => [...prev, { name: "", price: "" }])
  const removeRow = i => setMods(prev => prev.filter((_, idx) => idx !== i))

  const onSubmit = e => {
    e.preventDefault()
    // TODO: send {groupName, mods} to your API
    console.log({ groupName, mods })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#874F00] hover:bg-[#A65E00] text-white px-10 rounded-md" size="lg">
          <span className="mr-2 text-lg">+</span> Add New Group
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] rounded-2xl p-6 sm:p-8">
        {/* Close (top-right) */}
        <DialogClose asChild>
        </DialogClose>

        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">New Modifier Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="grid gap-6">
            {/* Group name */}
            <div className="grid gap-2">
              <Label htmlFor="group-name" className="text-sm" required>
                Modifier Group Name
              </Label>
              <Input
                id="group-name"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Iced Mocha"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Modifiers */}
            <div className="grid gap-2">
              <Label className="text-sm" required>
                Add Modifiers
              </Label>

              <div className="space-y-3">
                {mods.map((m, i) => (
                  <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Name */}
                    <div className="relative">
                      <Input
                        value={m.name}
                        onChange={e => updateMod(i, "name", e.target.value)}
                        placeholder="Name"
                        className="h-11 rounded-xl pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeRow(i)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                        aria-label="Remove"
                        title="Remove"
                      >
                        {trash}
                      </button>
                    </div>

                    {/* Price */}
                    <div className="relative">
                      <Input
                        value={m.price}
                        onChange={e => updateMod(i, "price", e.target.value)}
                        placeholder="Price (USD)"
                        className="h-11 rounded-xl pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeRow(i)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                        aria-label="Remove"
                        title="Remove"
                      >
                        {trash}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

                <div>
              <button
                type="button"
                onClick={addRow}
                className="mt-1 text-sm font-medium text-neutral-500 hover:text-neutral-800"
              >
                + Add new
              </button>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <div className="w-full">
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00]"
              >
                Add New Group
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
