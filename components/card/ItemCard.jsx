import Image from "next/image";
import React from "react";

const ItemCard = ({
  img,
  title,
  desc,
  price = "$10",
  qty = 1,
  className = "",
}) => {
  return (
    <div
      className={`w-full rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Image */}
        <div className="relative w-full h-40 sm:h-28 sm:w-28 overflow-hidden rounded-lg ring-1 ring-black/5 shrink-0">
          <Image src={img} alt={title || "Item image"} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-[15px] sm:text-[16px] font-medium text-gray-900 line-clamp-1">
            {title}
          </div>
          <p className="mt-1 text-[13px] sm:text-[14px] leading-snug text-gray-500 line-clamp-2 sm:line-clamp-none">
            {desc}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[15px] sm:text-[16px] font-semibold text-gray-900">
              {price}
            </span>
            <span className="text-[12px] sm:text-[14px] text-gray-500">
              Qty: {qty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
