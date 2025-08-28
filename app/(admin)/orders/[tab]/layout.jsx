import OrdersHeader from "@/components/headers/OrdersHeader";
import React from "react";

const OrdersLayout = async ({ children, params }) => {
  const { tab } = await params;
  return (
    <div className="flex flex-col w-full">
      <OrdersHeader selectedTab={tab} />
      {children}
    </div>
  );
};

export default OrdersLayout;
