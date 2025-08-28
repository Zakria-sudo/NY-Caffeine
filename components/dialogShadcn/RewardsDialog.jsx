"use client"

import { useEffect, useState, useCallback } from "react"
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

// use your own icon consts
import { uploadIcon } from "@/lib/links/linkicons"

export function RewardsDialog() {
  const [form, setForm] = useState({
    headline: "",
    description: "",
    points: "",
  })
  const [file, setFile] = useState(null)        // { file, url }
  const MAX = 10 * 1024 * 1024 // 10MB

  useEffect(() => () => file?.url && URL.revokeObjectURL(file.url), [file])

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const addFile = useCallback((f) => {
    if (!f || !f.type?.startsWith("image/") || f.size > MAX) return
    const url = URL.createObjectURL(f)
    setFile({ file: f, url })
  }, [])

  const onInputChange = (e) => {
    const f = e.target.files?.[0]
    if (f) addFile(f)
    e.target.value = "" // allow re-selecting the same file later
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f) addFile(f)
  }
  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const removeFile = () => {
    if (file?.url) URL.revokeObjectURL(file.url)
    setFile(null)
  }

  const submit = (e) => {
    e.preventDefault()
    // TODO: send { ...form, image: file?.file } to your API
    console.log({ ...form, image: file?.file })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-md bg-[#874F00] px-4 text-white hover:bg-[#A65E00]">
          <span className="mr-2 text-lg">+</span> Add Rewards
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[420px] rounded-2xl p-6 sm:p-8">
        {/* top-right close */}
        <DialogClose asChild/>
       

        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">Add New Reward</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="mt-4">
          <div className="grid gap-6">
            {/* Headline */}
            <div className="grid gap-2">
              <Label htmlFor="headline" className="text-sm">
                Add Headline <span className="text-red-500">*</span>
              </Label>
              <Input
                id="headline"
                name="headline"
                value={form.headline}
                onChange={onChange}
                placeholder="Vanilla Latte (Medium)"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm">
                Add Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Applies on orders above $50"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Points */}
            <div className="grid gap-2">
              <Label htmlFor="points" className="text-sm">
                Allocate Points <span className="text-red-500">*</span>
              </Label>
              <Input
                id="points"
                name="points"
                type="number"
                min="0"
                value={form.points}
                onChange={onChange}
                placeholder="200"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Feature Image */}
            <div className="grid gap-2">
              <Label className="text-sm">Feature Image</Label>

              <label
                htmlFor="reward-image"
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="cursor-pointer select-none flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 py-10 text-center"
              >
                {uploadIcon}
                <p className="mt-1 text-sm">
                  <span className="font-semibold">Browse</span> your image here
                </p>
                <p className="text-xs text-muted-foreground">Max size 10MB</p>
              </label>

              <input
                id="reward-image"
                type="file"
                accept="image/*"
                onChange={onInputChange}
                className="sr-only"
              />

              {file && (
                <div className="mt-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                    {/* normal <img> to avoid next/image config constraints */}
                    <img src={file.url} alt="preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white shadow"
                      aria-label="Remove image"
                    >
                      {closeIcon || <span className="text-sm">×</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00]"
            >
              Add Reward
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
