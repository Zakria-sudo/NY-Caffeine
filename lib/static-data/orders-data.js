export const ordersList = [
  {
    id: "019838",
    date: "14 April,2025",
    qty: 5,
    prods: ["Iced Latte", "Donuts", "Croissant", "+4"],
    price: "$90.00",
    status: "pending",
  },
  {
    id: "820921",
    date: "14 April,2025",
    qty: 2,
    prods: ["Iced Latte", "Croissant"],
    price: "$90.00",
    status: "completed",
  },
  {
    id: "728107",
    date: "14 April,2025",
    qty: 1,
    prods: ["Iced Latte", "Donuts", "Croissant", "+3"],
    price: "$90.00",
    status: "cancelled",
  },
  {
    id: "738117",
    date: "14 April,2025",
    qty: 4,
    prods: ["Iced Latte", "Donuts"],
    price: "$90.00",
    status: "pending",
  },
  {
    id: "904490",
    date: "14 April,2025",
    qty: 6,
    prods: ["Iced Latte"],
    price: "$90.00",
    status: "completed",
  },
  {
    id: "567105",
    date: "14 April,2025",
    qty: 1,
    prods: ["Iced Latte", "Donuts", "Croissant", "+1"],
    price: "$90.00",
    status: "pending",
  },
];

export const STATUS_DOT = {
  pending: "bg-amber-500",
  completed: "bg-emerald-500",
  cancelled: "bg-rose-500",
};

export const STATUS_TONE = {
  pending: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-rose-50 text-rose-700",
};

export const rows = [
  {
    name: "Latte",
    price: 90,
    category: "Iced Coffee",
    qty: 23,
    status: "active",
  },
  {
    name: "Mocha",
    price: 90,
    category: "Iced Coffee",
    qty: 43,
    status: "active",
  },
  {
    name: "Cappuccino",
    price: 90,
    category: "Iced Coffee",
    qty: 10,
    status: "inactive",
  },
  {
    name: "Hot Chocolate",
    price: 90,
    category: "Milkshake",
    qty: 19,
    status: "active",
  },
  {
    name: "Americano",
    price: 90,
    category: "Iced Coffee",
    qty: 4,
    status: "inactive",
  },
  {
    name: "Espresso",
    price: 90,
    category: "Iced Coffee",
    qty: 8,
    status: "active",
  },
];

export const modifierPills = ["Dairy", "Decaf", "Non-Dairy"];

export const getOrdersByStatus = (status) => {
  if (status === "all") {
    return ordersList;
  }
  return ordersList.filter((order) => order.status === status);
};

export const Chip = ({ children, color = "blue" }) => {
  const base =
    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-[15px] font-medium";
  const styles = {
    purple:
      "border-[#E6D7FF] text-[#6B3BD2] bg-gradient-to-r from-[#F7EEFF] to-[#F2F6FF]",
    blue: "border-[#BFE0FF] text-[#0E63C7] bg-gradient-to-r from-[#EAF4FF] to-[#F3FAFF]",
    darkBlue: "border-[#C7D7FE] text-[#3538CD] bg-[#EEF4FF]",
  };
  return <span className={`${base} ${styles[color]}`}>{children}</span>;
};

export const dashboardRows = [
  {
    id: "019838",
    date: "14 April,2025",
    qty: 5,
    prods: ["Iced Latte", "Donuts", "Croissant", "+4"],
    price: "$90.00",
    status: { label: "Pending", tone: "bg-amber-50 text-amber-700" },
  },
  {
    id: "820921",
    date: "14 April,2025",
    qty: 2,
    prods: ["Iced Latte", "Croissant"],
    price: "$90.00",
    status: { label: "Completed", tone: "bg-emerald-50 text-emerald-700" },
  },
  {
    id: "728107",
    date: "14 April,2025",
    qty: 1,
    prods: ["Iced Latte", "Donuts", "Croissant", "+3"],
    price: "$90.00",
    status: { label: "Canceled", tone: "bg-rose-50 text-rose-700" },
  },
];

export const dashboardSales = [
  { m: "Jan", v: 180 },
  { m: "Feb", v: 220 },
  { m: "Mar", v: 140 },
  { m: "Apr", v: 90 },
  { m: "May", v: 420, highlight: true },
  { m: "Jun", v: 120 },
  { m: "Jul", v: 260 },
  { m: "Aug", v: 160 },
  { m: "Sep", v: 240 },
  { m: "Oct", v: 280 },
  { m: "Nov", v: 320 },
  { m: "Dec", v: 260 },
];

export const headers = ["ID", "Placed on", "Qty", "Product(s)", "Price", "Status", "Actions"];

export const OrderROWS = [
  {
    id: "019838",
    date: "14 April,2025",
    qty: 5,
    prods: ["Iced Latte", "Donuts", "Croissant", "+4"],
    price: "$90.00",
    status: "Pending",
  },
  {
    id: "820921",
    date: "14 April,2025",
    qty: 2,
    prods: ["Iced Latte", "Croissant"],
    price: "$90.00",
    status: "Completed",
  },
  {
    id: "728107",
    date: "14 April,2025",
    qty: 1,
    prods: ["Iced Latte", "Donuts", "Croissant", "+3"],
    price: "$90.00",
    status: "Canceled",
  },
  {
    id: "738117",
    date: "14 April,2025",
    qty: 4,
    prods: ["Iced Latte", "Donuts"],
    price: "$90.00",
    status: "Pending",
  },
  {
    id: "904490",
    date: "14 April,2025",
    qty: 6,
    prods: ["Iced Latte"],
    price: "$90.00",
    status: "Completed",
  },
  {
    id: "567105",
    date: "14 April,2025",
    qty: 1,
    prods: ["Iced Latte", "Donuts", "Croissant", "+1"],
    price: "$90.00",
    status: "Pending",
  },
];