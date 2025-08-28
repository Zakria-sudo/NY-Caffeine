"use client";

import Image from "next/image";
import DataTable from "@/components/datatable/DataTable";
import { ordersList, STATUS_DOT, STATUS_TONE } from "@/lib/static-data/orders-data";

export default function OrderTable() {
  // Base columns
  const columns = [
    {
      key: "id",
      header: "ID",
      thClassName: "px-5 py-2",
      tdClassName: "px-5 py-3 text-[13px] text-gray-900",
    },
    {
      key: "date",
      header: "Placed on",
      tdClassName: "px-5 py-3 text-[13px] text-gray-700",
    },
    {
      key: "qty",
      header: "Qty",
      tdClassName: "px-5 py-3 text-[13px] text-gray-700",
    },
    {
      key: "prods",
      header: "Product(s)",
      tdClassName: "px-5 py-3",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.prods.map((p) => (
            <span
              key={p}
              className="rounded-full bg-[#EEF2FF] text-[#4C66E6] text-[12px] px-2.5 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      tdClassName: "px-5 py-3 text-[13px] text-gray-900",
    },
  ];

  // Extra/custom columns
  const customColumns = [
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <div className="relative group inline-flex items-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ${STATUS_TONE[row.status]}`}
          >
            <span className={`h-2 w-2 rounded-full ${STATUS_DOT[row.status]}`} />
            {row.status}
          </span>
          <span className="absolute -right-1 top-1/2 hidden -translate-y-1/2 translate-x-full whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[11px] text-white shadow group-hover:block">
            Change Status
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-5 text-gray-500">
          <button aria-label="Delete" className="hover:opacity-80 active:scale-95">
            <Image src="/trash.png" alt="" width={18} height={18} />
          </button>
          <button aria-label="View" className="hover:opacity-80 active:scale-95">
            <Image src="/eye.png" alt="" width={18} height={18} />
          </button>
          <button aria-label="Share" className="hover:opacity-80 active:scale-95">
            <Image src="/share.png" alt="" width={18} height={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={ordersList}
      columns={columns}
      customColumns={customColumns}
      emptyText="No orders found."
    />
  );
}
