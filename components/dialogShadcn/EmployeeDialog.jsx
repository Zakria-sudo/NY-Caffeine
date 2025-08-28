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

// Use your own icon consts; rename if needed
import { closeIcon, calendarIcon } from "@/lib/links/linkicons"

export function EmployeeDialog() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    doj: "",
  })

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: send `form` to your API
    console.log(form)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-md bg-[#874F00] px-4 text-white hover:bg-[#A65E00]">
          <span className="mr-2 text-lg">+</span> Add New Employee
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] rounded-2xl p-6 sm:p-8">
        {/* top-right close */}
        <DialogClose asChild>
        </DialogClose>

        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="grid gap-6">
            {/* Employee Name */}
            <div className="grid gap-2">
              <Label htmlFor="emp-name" className="text-sm">
                Employee Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emp-name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Ahsan Khan"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Email Address */}
            <div className="grid gap-2">
              <Label htmlFor="emp-email" className="text-sm">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="emp-email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="ahsankhan@gmail.com"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Date of Joining */}
            <div className="grid gap-2">
              <Label htmlFor="emp-doj" className="text-sm">
                Date of Joining <span className="text-red-500"required>*</span>
              </Label>
              <div className="relative">
                <Input
                  id="emp-doj"
                  type="date"
                  name="doj"
                  value={form.doj}
                  onChange={onChange}
                  className="h-11 rounded-xl pr-10"
                  required
                />
                {/* <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  {calendarIcon}
                </span> */}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00]"
            >
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
