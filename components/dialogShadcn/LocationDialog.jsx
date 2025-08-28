"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationDialog() {
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: handle submit
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-md bg-[#874F00] px-4 text-white hover:bg-[#A65E00]">
          <span className="mx-2 text-lg">+</span> Add New Branch
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] rounded-2xl p-6 sm:p-8">
        {/* top-right close */}
        <DialogClose asChild />

        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">
            Add New Branch
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4">
          <div className="grid gap-6">
            {/* Branch Name */}
            <div className="grid gap-2">
              <Label htmlFor="branch-name" className="text-sm">
                Branch Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-name"
                placeholder="NY Caffeine Islamabad"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Branch Code */}
            <div className="grid gap-2">
              <Label htmlFor="branch-code" className="text-sm">
                Branch Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-code"
                placeholder="NY- 9092"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="branch-address" className="text-sm">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-address"
                placeholder="Main Boulevard, Street 18 Downtown Islamabad"
                className="h-11 rounded-xl"
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00]"
            >
              Add Branch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
