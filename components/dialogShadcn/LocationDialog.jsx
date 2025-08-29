"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const firstInputRef = useRef(null);

  // Autofocus + clear errors when dialog opens
  useEffect(() => {
    if (open) {
      queueMicrotask(() => firstInputRef.current?.focus());
      setError("");
    } else {
      formRef.current?.reset();
    }
  }, [open]);

  // Small helper for fetch + safe JSON
  const request = async (url, init) => {
    const res = await fetch(url, init);
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok) {
      throw new Error(data?.message || `Request failed (${res.status})`);
    }
    return data;
  };

  // Strong random password (client-side). Prefer server-side if possible.
  const randomPassword = (len = 12) => {
    const bytes = new Uint8Array(len);
    crypto.getRandomValues(bytes);
    // A-Z a-z 0-9 !
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#";
    return Array.from(bytes, b => alphabet[b % alphabet.length]).join("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString().trim();
    const branchCode = (fd.get("branchCode") || "").toString().trim();
    const address = (fd.get("address") || "").toString().trim();

    if (!name || !branchCode || !address) {
      setError("All fields are required");
      return;
    }

    // If your backend requires these fields, keep them here.
    // If not, move them to the API proxy so the UI only sends {name, branchCode, address}.
    const codeSlug = branchCode.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      name,
      branchCode,
      address,
      email: `${codeSlug || "branch"}@nycaffeine.local`,
      password: randomPassword(12),
      image: "avatar.png",
      latitude: 0,
      longitude: 0,
    };

    try {
      setSubmitting(true);
      setError("");

      const data = await request("/api/auth/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const created = data?.data || data?.location || data;
      onCreated?.(created);

      formRef.current?.reset();
      setOpen(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-md bg-[#874F00] px-4 text-white hover:bg-[#A65E00]">
          <span className="mx-2 text-lg">+</span> Add New Branch
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] rounded-2xl p-6 sm:p-8">
        <DialogClose asChild />
        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">Add New Branch</DialogTitle>
        </DialogHeader>

        <form ref={formRef} onSubmit={onSubmit} className="mt-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="branch-name" className="text-sm">
                Branch Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-name"
                name="name"
                placeholder="NY Caffeine Islamabad"
                ref={firstInputRef}
                className="h-11 rounded-xl"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="branch-code" className="text-sm">
                Branch Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-code"
                name="branchCode"
                placeholder="NY- 9092"
                className="h-11 rounded-xl"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="branch-address" className="text-sm">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-address"
                name="address"
                placeholder="Main Boulevard, Street 18 Downtown Islamabad"
                className="h-11 rounded-xl"
                required
              />
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00] disabled:opacity-70"
            >
              {submitting ? "Adding..." : "Add Branch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
