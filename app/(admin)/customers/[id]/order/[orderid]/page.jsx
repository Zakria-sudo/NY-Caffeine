"use client";

import Image from "next/image";
import ItemCard from "@/components/card/ItemCard";
import { detailsBtn } from "@/lib/links/linkicons";

export default function OrderDetails() {
  return (
    <div className="bg-[#F5F6F8] p-4 sm:p-6">
      <section className="rounded-2xl bg-white p-4 sm:p-5">
        {/* Top bar */}
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <button className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] text-gray-800">
            
            {detailsBtn}
            <span className="font-medium text-[18px]">Order Details</span>
          </button >

          <span className="rounded-xl bg-[#EDFBEF] px-5 py-2 text-[16px] font-md text-[#34C759]">
            Completed
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* LEFT: General + Payment */}
          <div className="rounded-2xl  bg-white p-5">
                    <div className="mt-6 flex items-center">
  <h3 className="text-[16px] font-semibold text-black">General</h3>
  <span className="ml-4 flex-1 h-px bg-gray-200"></span>
</div>
            

            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-[16px]">
              <dt className="text-[#545454]">Placed on</dt>
              <dd className="text-[#545454] font-medium text-right">27 April, 2025</dd>

              <dt className="text-[#545454]">Order ID</dt>
              <dd className="text-[#545454] font-medium text-right">#881911</dd>

              <dt className="text-[#545454]">Placed By</dt>
              <dd className="text-[#545454] font-medium text-right">Aiza Nadeem</dd>

              <dt className="text-[#545454]">Contact Number</dt>
              <dd className="text-[#545454] font-medium text-right">+99 345 8789199</dd>

              <dt className="text-[#545454]">Branch Details</dt>
              <dd className="text-[#545454] font-medium text-right">NY Caffeine California</dd>
            </dl>

            <div className="mt-6 flex items-center">
  <h3 className="text-[16px] font-semibold text-black">Payment Details</h3>
  <span className="ml-4 flex-1 h-px bg-gray-200"></span>
</div>

            

            <div className="mt-3 space-y-3 text-[16px] text-[#545454]">
              <div className="flex justify-between">
                <span>1x Salted Caramel Latte</span>
                <span className="">$10.90</span>
              </div>
              <div className="flex justify-between">
                <span>1x Vanilla Cappuccino</span>
                <span className="">$12.90</span>
              </div>
              <div className="flex justify-between">
                <span>2x Breakfast Croissants</span>
                <span className="">$12.90</span>
              </div>
              <div className="flex justify-between">
                <span>1x Chocolate Shake</span>
                <span className="">$16.90</span>
              </div>
            </div>

            {/* Totals */}
           {/* Totals – sit in the same right column as the <dd> values */}
<div className="mt-4 border-t border-gray-200 pt-3 grid grid-cols-2">
  <div className="col-start-2 space-y-2 text-[16px]">
    <div className="flex justify-between text-gray-500">
      <span>Total</span>
      <span>$34.80</span>
    </div>
    <div className="flex justify-between text-gray-500">
      <span>GST</span>
      <span>$5.80</span>
    </div>
    <div className="flex justify-between text-[14px] font-semibold text-gray-900 mt-1">
      <span>Subtotal</span>
      <span>$40.80</span>
    </div>
  </div>
</div>

{/* Paid with – also in the right column */}
<div className="mt-6 border-t border-gray-200 pt-3 grid grid-cols-2">
  <div className="col-start-2 text-[12px] text-gray-500">
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-1">

      <span className="text-[12px]">Paid with</span>
      <Image src="/mc.png" width={26} height={16} alt="Mastercard" />
      </div>
      <span className="tracking-widest text-gray-600 text-[13px]">**** **** **** 3455</span>
    </div>
  </div>
</div> 
          </div>

          {/* RIGHT: Item List */}
          <aside className=" rounded-2xl border border-gray-100 bg-[#F5F5F5] px-7 py-10 shadow-sm">
            <div><h1 className="text-[18px] font-medium text-black">Item List(3)</h1></div>

            <div className="mt-3 space-y-5">
              <ItemCard
                img="/macha.png"
                title="Salted Caramel Latte"
                desc="Whipped cream, 2 espresso shots, Sprinkles"
                price="$10"
                qty={1}
              />
              <ItemCard
                img="/macha.png"
                title="Salted Caramel Latte"
                desc="Whipped cream, 2 espresso shots, Sprinkles"
                price="$10"
                qty={1}
              />
              <ItemCard
                img="/macha.png"
                title="Salted Caramel Latte"
                desc="Whipped cream, 2 espresso shots, Sprinkles"
                price="$10"
                qty={1}
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
