// lib/links/links.js
import {
  customersIcon,
  dashboardIcon,
  employeeIcon,
  locationIcon,
  menuIcon,
  ordersIcon,
  rewardIcon,
} from "./linkicons";

export const sidebarLinks = [
  {
    label: "Dashboard",
    desc: "Lets check your statistics today",
    icon: dashboardIcon,
    href: "/",
  },
  {
    label: "Orders",
    desc: "Track all your orders from here",
    icon: ordersIcon,
    href: "/orders",
  },

  {
    label: "Menu",
    desc: "Manage your menu from here",
    icon: menuIcon,
    href: "/menu",
    children: [
      { label: "Item List", desc: "Browse & edit items", href: "/menu/items" },
      {
        label: "Categories",
        desc: "Manage item groups",
        href: "/menu/categories",
      },
      {
        label: "Modifiers",
        desc: "Options & add-ons",
        href: "/menu/modifiers",
      },
    ],
  },

  {
    label: "Employees",
    desc: "Manage your workforce from here",
    icon: employeeIcon,
    href: "/employees",
  },
  {
    label: "Customers",
    desc: "Manage your clients from here",
    icon: customersIcon,
    href: "/customers",
  },
  {
    label: "Location",
    desc: "Manage your store branches from here",
    icon: locationIcon,
    href: "/location",
  },
  {
    label: "Rewards",
    desc: "Manage your rewards from here",
    icon: rewardIcon,
    href: "/rewards",
  },
];

export const demoRows = [
  { id: "#102193", name: "Iced Coffee", qty: 23 },
  { id: "#102193", name: "Pastries", qty: 43 },
  { id: "#102193", name: "Breakfast", qty: 10 },
  { id: "#102193", name: "Shakes", qty: 19 },
  { id: "#102193", name: "Hot Drinks", qty: 4 },
  { id: "#102193", name: "Hot Brew", qty: 8 },
];

export const employees = [
  { name: "Martha Safier", email: "martha@gmail.com", date: "25 April, 2025", status: "Active" },
  { name: "Disha Khan", email: "dishakhan@gmail.com", date: "25 April, 2025", status: "Active" },
  { name: "Ahmed Khan", email: "ahmed45@gmail.com", date: "25 April, 2025", status: "Inactive" },
  { name: "Bob Thier", email: "bobtheir5@gmail.com", date: "25 April, 2025", status: "Active" },
  { name: "Robert Langdon", email: "robertolangd@gmail.com", date: "25 April, 2025", status: "Inactive" },
  { name: "Martina Roisse", email: "martina@gmail.com", date: "25 April, 2025", status: "Active" },
]

export const branches = [
  { code: "NY -8900", name: "NY Caffeine London", address: "Main Boulevard, Street 18, London" },
  { code: "NY -8900", name: "NY Caffeine California", address: "Main Boulevard, Street 18, London" },
  { code: "NY -8900", name: "NY Caffeine Amsterdam", address: "Main Boulevard, Street 18 Downtown Amsterdam" },
  { code: "NY -8900", name: "NY Caffeine Greece", address: "Main Boulevard, Street 18, London" },
  { code: "NY -8900", name: "NY Caffeine Scotland", address: "Langdon Square Area, Lane 5, Scotland" },
  { code: "NY -8900", name: "NY Caffeine London", address: "Main Boulevard, Street 18, London" },
]