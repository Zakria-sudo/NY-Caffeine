"use client";

import { useState } from "react";
import Link from "next/link";
// Use your icon constants if you have them:
import { leftArrow, uploadIcon } from "@/lib/links/linkicons"; // replace inline back icon below with {leftArrow} if desired

export default function NewItemPage() {
  // demo option lists (swap with real data)
  const branchOptions   = ["NY California", "NY London", "NY Caffeine HQ"];
  const categoryOptions = ["Iced Coffee", "Milkshake", "Pastry"];
  const modifierOptions = ["Toppings", "Milk Variations", "Syrups"];

  // form state (pre-filled to match mock)
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("46");
  const [branches, setBranches] = useState(["NY California", "NY London"]);
  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState(["Toppings", "Milk Variations"]);
  const [files, setFiles] = useState([]); 
  

  const onPick = (value, list, setList) => {
    if (!value) return;
    if (!list.includes(value)) setList([...list, value]);
  };
  const removeTag = (value, list, setList) =>
    setList(list.filter((v) => v !== value));

  const onFileSelect = (e) => {
    const chosen = Array.from(e.target.files || []).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...chosen]);
    e.target.value = "";
  };
  const removeFile = (url) =>
    setFiles((prev) => prev.filter((f) => f.url !== url));

  const submit = () => {
    // TODO: send to API
    console.log({
      itemName,
      price,
      branches,
      categories,
      modifiers,
      filesCount: files.length,
    });
    alert("Submitted (see console). Wire this to your API.");
  };

  return (
    <section className="p-3 md:p-6">
      {/* Header */}
      
      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-2 md:p-6">
        <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/menu/items"
            className="inline-flex h-5 w-5 items-center rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label="Back"
          >
            {/* Replace with {leftArrow} if you prefer */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Link>
          <h2 className="text-[20px] md:text-[22px] font-semibold text-[#111827]">
            Add New Item
          </h2>
        </div>

        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7a4500] px-4 py-2.5 text-[14px] font-medium text-white shadow-sm hover:opacity-95"
        >
          Add to Inventory
        </button>
      </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            <Field label="Branch" required>
              <Select
                placeholder="Select Branch"
                options={branchOptions}
                onChange={(v) => onPick(v, branches, setBranches)}
              />
              <Chips
                items={branches}
                onRemove={(v) => removeTag(v, branches, setBranches)}
              />
            </Field>

            <Field label="Category" required>
              <Select
                placeholder="Select Category"
                options={categoryOptions}
                onChange={(v) => onPick(v, categories, setCategories)}
              />
              <Chips
                items={categories}
                onRemove={(v) => removeTag(v, categories, setCategories)}
              />
            </Field>

            <Field label="Modifier" required>
              <Select
                placeholder="Select Modifier"
                options={modifierOptions}
                onChange={(v) => onPick(v, modifiers, setModifiers)}
              />
              <Chips
                items={modifiers}
                onRemove={(v) => removeTag(v, modifiers, setModifiers)}
              />
            </Field>

            {/* Images */}
            <div>
              <Label>Attach Image(s)</Label>
              <div className="mt-2 flex flex-wrap items-start gap-4">
                {/* Dropzone */}
                <label className="flex h-[120px] w-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-center">
                  {/* Replace with your upload icon if desired */}
                  <div className="mb-2 text-gray-400">
                    {uploadIcon}
                  </div>
                  <div className="text-[13px] text-gray-600">Browse images here</div>
                  <div className="text-[12px] text-gray-400">Max size 10MB</div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onFileSelect}
                  />
                </label>

                {/* Previews */}
                <div className="flex flex-wrap gap-4">
                  {files.map((f) => (
                    <div key={f.url} className="relative h-[120px] w-[180px] overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.url} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile(f.url)}
                        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow"
                        aria-label="Remove image"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            <Field label="Item Name" required>
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
                className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none focus:border-gray-300"
              />
            </Field>

            <Field label="Set Price(USD)" required>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                inputMode="decimal"
                className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-[14px] outline-none focus:border-gray-300"
              />
            </Field>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- UI bits (JSX) ---------- */

function Field({ label, required, children }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-[14px] font-medium text-[#111827]">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Select({ placeholder, options, onChange }) {
  return (
    <div className="relative">
        <select
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value;
            if (v) onChange(v);
            e.target.value = ""; // reset back to placeholder
          }}
          className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-9 text-[14px] text-gray-700 outline-none focus:border-gray-300"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

      {/* caret */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
    </div>
  );
}

function Chips({ items, onRemove }) {
  if (!items?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-[13px] text-gray-700"
        >
          {t}
          <button
            type="button"
            onClick={() => onRemove(t)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={`Remove ${t}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}
