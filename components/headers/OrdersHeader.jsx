import { orderLinks } from "@/lib/links/order-links";
import Link from "next/link";
import React from "react";

const OrdersHeader = ({ selectedTab }) => {
  return (
    <div className="flex items-center gap-7 p-4 bg-gray-300">
      {orderLinks.map((link, index) => {
        const isSelected = link.key === selectedTab;
        return (
          <Link
            href={link.href}
            key={link.key + index}
            className={`${
              isSelected
                ? "text-[#7B4606] font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default OrdersHeader;
