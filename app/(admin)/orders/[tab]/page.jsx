import DataTable from "@/components/datatable/DataTable";
import OrderTable from "@/components/ordertable/OrderTable";
import Pages from "@/components/pagination/Pages";
import { Pagination } from "@/components/ui/pagination";
import { getOrdersByStatus } from "@/lib/static-data/orders-data";

import React from "react";

const OrdersPage = async ({ params }) => {
  const { tab } = await params;
  const orders = await getOrdersByStatus(tab);

  console.log("Orders", orders);

  return (
    <>
      {/* <DataTable /> */}
      <OrderTable/>
      {/* <Pages page = {page} totalPages={totalPages} pageSafe={pageSafe} /> */}
    </>
  );
};

export default OrdersPage;
