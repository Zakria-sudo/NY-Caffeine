"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationEditDialog({ open, onOpenChange, initial, onSaved }) {
  const [name, setName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initial && open) {
      setName(initial.name || "");
      setBranchCode(initial.branchCode || "");
      setAddress(initial.address || "");
      setError("");
    }
  }, [initial, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: name.trim(), branchCode: branchCode.trim(), address: address.trim() };
    try {
      setSaving(true);
      setError("");

    // inside handleSubmit
const url = `/api/auth/location/${initial._id}`;
console.log("Editing via:", url);

let res = await fetch(url, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: name.trim(), branchCode: branchCode.trim(), address: address.trim() }),
});

// Fallback if server rejects PATCH OR route missing (404) or method not allowed (405)
if (res.status === 404 || res.status === 405) {
  res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim(), branchCode: branchCode.trim(), address: address.trim() }),
  });
}

if (!res.ok) {
  let msg = "Failed to update branch";
  try { msg = (await res.json())?.message || msg; } catch {}
  throw new Error(msg);
}


      const data = await res.json();
      const updated = data?.data || data?.location || data;
      onSaved?.(updated);
      onOpenChange(false);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] rounded-2xl p-6 sm:p-8">
        <DialogHeader className="space-y-1 pr-8">
          <DialogTitle className="text-xl font-semibold">Edit Branch</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" className="text-sm">Branch Name</Label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code" className="text-sm">Branch Code</Label>
              <Input id="edit-code" value={branchCode} onChange={(e) => setBranchCode(e.target.value)} className="h-11 rounded-xl" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address" className="text-sm">Address</Label>
              <Input id="edit-address" value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 rounded-xl" required />
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={saving} className="h-12 w-full rounded-xl bg-[#874F00] text-white hover:bg-[#A65E00] disabled:opacity-70">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
