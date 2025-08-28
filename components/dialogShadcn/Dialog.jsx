"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { crossIcon, uploadIcon } from "@/lib/links/linkicons"

export function DialogDemo() {
  const [files, setFiles] = useState([]) // [{file, url}]
  const [dragActive, setDragActive] = useState(false)
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB

  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.url))
    }
  }, [files])

  const addFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList ?? [])
      .filter(f => f.type.startsWith("image/") && f.size <= MAX_SIZE)

    const withUrls = incoming.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }))

    setFiles(prev => [...prev, ...withUrls])
  }, [])

  const onInputChange = (e) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ""
  }

  const onDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragActive) setDragActive(true)
  }

  const onDragLeave = () => setDragActive(false)

  const removeAt = (i) => {
    setFiles(prev => {
      const copy = [...prev]
      const [removed] = copy.splice(i, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return copy
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log("Submitting", files.map(f => f.file))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#874F00] hover:bg-[#A65E00] text-white px-1 md:px-6">
          + Add New Category
        </Button>
      </DialogTrigger>

      <DialogContent
        // responsive sheet + scrollable body
        className="w-[95vw] max-w-[520px] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-h-[85vh] overflow-y-auto"
      >
        {/* Close (top-right) */}
        <DialogClose asChild/>

        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-lg sm:text-xl font-semibold">New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitForm}>
          <div className="mt-4 grid gap-5 sm:gap-6">
            {/* Category name */}
            <div className="grid gap-2">
              <Label htmlFor="category-name" className="text-sm">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category-name"
                placeholder="Iced Mocha"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Dropzone + Picker */}
            <div className="grid gap-2">
              <Label className="text-sm">Attach Image(s)</Label>

              <label
                htmlFor="file-input"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={[
                  "cursor-pointer select-none flex flex-col items-center justify-center",
                  "rounded-lg sm:rounded-xl border-2 border-dashed py-8 sm:py-10 text-center",
                  "transition-colors",
                  dragActive
                    ? "border-[#874F00]/60 bg-[#874F00]/5"
                    : "border-muted-foreground/30 bg-muted/20",
                ].join(" ")}
              >
                {uploadIcon}
                <p className="mt-1 text-sm">
                  <span className="font-semibold">Browse</span> or drag images here
                </p>
                <p className="text-xs text-muted-foreground">Max size 10MB</p>
              </label>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={onInputChange}
                className="sr-only"
              />

              {/* Thumbnails */}
              {files.length > 0 && (
                <div className="mt-3 grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8">
                  {files.map((f, i) => (
                    <div key={i} className="relative aspect-square w-full overflow-hidden rounded-md sm:rounded-xl">
                      <Image src={f.url} alt="" fill sizes="80px" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeAt(i)}
                        className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/95 shadow"
                        aria-label="Remove image"
                      >
                        {crossIcon || <span className="text-sm">×</span>}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky footer on mobile for easy action */}
          <DialogFooter className="mt-6 sm:mt-8">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00]"
            >
              Add New Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
