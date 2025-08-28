"use client";

import { detailsBtn, editProfile } from "@/lib/links/linkicons";
import Image from "next/image";

export default function CustomerDetails() {
  // mock rows (same content rendered as cards on mobile and table on desktop)
  const rows = Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    branch: "NY Caffeine London",
    placedOn: "12 April, 2025 – 12:00 am",
    items: ["Chilled latte", "Croissant", "+2"],
    price: "$81.90",
  }));

  const page = 1;
  const pageCount = 10;

  return (
    <main className="bg-[#F5F6F8] p-4 sm:p-6">
      {/* Summary Card */}
      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 sm:p-5">
        {/* Back + title */}
        <div className="mb-3 sm:mb-4">
          <button className="inline-flex items-center gap-1 text-[#1A1A1F]">
            {detailsBtn}
            <span className="font-medium text-[16px] sm:text-[18px]">Details</span>
          </button>
        </div>

        {/* Header: avatar/name + Edit */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/avatar2.png" alt="Martina Roisse" width={44} height={44} className="rounded-full" />
            <div>
              <div className="text-[15px] sm:text-[16px] font-medium text-[#545454]">Martina Roisse</div>
              <div className="text-[13px] sm:text-[14px] text-[#545454]">Since 24 May, 2024</div>
            </div>
          </div>

          <button
            type="button"
            className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[13px] sm:text-[14px] text-[#89868D] hover:bg-gray-50"
          >
            {editProfile}
            Edit Profile
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gray-100" />

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-[#89868D]">
          <div>
            <div className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Contact</div>
            <div className="mt-1 text-[13px] sm:text-[14px] font-semibold">+99 778 89023715</div>
          </div>
          <div>
            <div className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Email</div>
            <div className="mt-1 text-[13px] sm:text-[14px] font-semibold">martha@gmail.com</div>
          </div>
          <div>
            <div className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Orders Placed</div>
            <div className="mt-1 text-[13px] sm:text-[14px] font-semibold">12</div>
          </div>
          <div>
            <div className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Payments</div>
            <div className="mt-1 text-[13px] sm:text-[14px] font-semibold">$6710.08</div>
          </div>
          <div>
            <div className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Canceled Orders</div>
            <div className="mt-1 text-[13px] sm:text-[14px] font-semibold">15</div>
          </div>
        </div>
      </section>

      {/* Order History */}
      <section className="mt-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-5">
          <h2 className="text-[16px] sm:text-[18px] font-medium text-gray-900">Order History</h2>
          <button className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2 text-[13px] sm:text-[14px] text-[#545454] hover:bg-gray-50">
            <Image src="/download.png" alt="" width={16} height={16} />
            Download
          </button>
        </div>

        {/* MOBILE: cards */}
        <div className="sm:hidden space-y-3 px-4 pb-4">
          {rows.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="text-[14px] font-medium text-[#1A1A1F]">{r.branch}</div>
              <div className="mt-1 text-[12px] text-[#535862]">{r.placedOn}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E9D7FE] text-[#6941C6] text-[12px] px-3 py-1">{r.items[0]}</span>
                <span className="rounded-full bg-[#B2DDFF] text-[#175CD3] text-[12px] px-3 py-1">{r.items[1]}</span>
                <span className="rounded-full bg-gray-100 text-[#545454] text-[12px] px-3 py-1">{r.items[2]}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[14px] font-medium text-[#1A1A1F]">{r.price}</div>
                <div className="flex items-center gap-4 text-gray-500">
                  <button aria-label="Delete"><Image src="/trash.png" width={18} height={18} alt="" /></button>
                  <button aria-label="View"><Image src="/eye.png" width={18} height={18} alt="" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-[12px] text-gray-500">
                <th className="px-5 pb-2">Branch</th>
                <th className="px-5 pb-2">Placed on</th>
                <th className="px-5 pb-2">Items</th>
                <th className="px-5 pb-2">Price</th>
                <th className="px-5 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-5 py-4 text-[14px] text-[#535862]">{r.branch}</td>
                  <td className="px-5 py-4 text-[14px] text-[#535862]">{r.placedOn}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9D7FE] text-[#6941C6] text-[12px] px-3 py-1">{r.items[0]}</span>
                      <span className="rounded-full bg-[#B2DDFF] text-[#175CD3] text-[12px] px-3 py-1">{r.items[1]}</span>
                      <span className="rounded-full bg-gray-100 text-[#545454] text-[12px] px-3 py-1">{r.items[2]}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[14px] text-[#535862]">{r.price}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-5 text-gray-500">
                      <button aria-label="Delete"><Image src="/trash.png" width={18} height={18} alt="" /></button>
                      <button aria-label="View"><Image src="/eye.png" width={18} height={18} alt="" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 py-4">
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 font-semibold text-[13px] sm:text-[14px] text-[#545454]">
            <Image src="/chev-left.png" alt="" width={14} height={14} /> Previous
          </button>

          {/* Mobile compact indicator */}
          <div className="sm:hidden text-center text-[13px] text-gray-600">
            Page <span className="font-medium">{page}</span> of {pageCount}
          </div>

          {/* Desktop numeric buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="h-8 w-8 rounded-lg bg-gray-100 text-gray-700 text-[13px]">1</button>
            <button className="h-8 w-8 rounded-lg bg-white  text-gray-700 text-[13px]">2</button>
            <button className="h-8 w-8 rounded-lg bg-white  text-gray-700 text-[13px]">3</button>
            <span className="px-1 text-gray-500">…</span>
            <button className="h-8 w-8 rounded-lg bg-white text-gray-700 text-[13px]">8</button>
            <button className="h-8 w-8 rounded-lg bg-white text-gray-700 text-[13px]">9</button>
            <button className="h-8 w-8 rounded-lg bg-white text-gray-700 text-[13px]">10</button>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2 font-semibold text-[13px] sm:text-[14px] text-[#545454]">
            Next <Image src="/chev-right.png" alt="" width={14} height={14} />
          </button>
        </div>
      </section>
    </main>
  );
}
