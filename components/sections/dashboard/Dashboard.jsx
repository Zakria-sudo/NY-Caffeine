"use client";

import Card from "@/components/card/Card";
import Chart from "@/components/chart/Chart";
import { StatusChip } from "@/components/statusChip/StatusChip";
import { Tag } from "@/components/tag/Tag";
import { Chip } from "@/components/chip/Chip";
import { arrow, calendarIcon } from "@/lib/links/linkicons";
import Image from "next/image";
import { dashboardRows, dashboardSales } from "@/lib/static-data/orders-data";
import { headers } from "@/lib/static-data/orders-data";


export default function Dashboard() {
  const ordersTotal = 109;
  const ordersToday = 90;
  const pct = Math.min(100, Math.round((ordersToday / ordersTotal) * 100));
  const deg = (pct / 100) * 360;

  const max = 500;


  const progress = Math.max(0, Math.min(1, ordersToday / ordersTotal));
  const R = 50; // radius (SVG units)
  const STROKE = 10; // ring thickness
  const CIRC = 2 * Math.PI * R; // circumference
  const dash = CIRC * progress; // visible arc
  const CENTER_R = Math.max(0, R - STROKE - 8);


  return (
    <div className="bg-[#F5F6F8] p-4 sm:p-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card
          title="Net Income"
          badge={<Chip tone="up"> 3.0%</Chip>}
          className="h-[180px]"
        >
          <div className="flex flex-col gap-5 py-3">
            <p className="text-2xl font-semibold text-[#7B4606]">$1,567.99</p>
            <p className="text-[12px] sm:text-[14px] text-gray-400 mt-1">
              April, 2025
            </p>
          </div>
        </Card>

        <Card
          title="Total Orders"
          badge={<Chip tone="down"> 3.0%</Chip>}
          className="h-[180px]"
        >
          <div className="flex flex-col gap-5 py-3">
            <p className="text-2xl font-semibold text-[#7B4606]">1290</p>
            <p className="text-[12px] sm:text-[14px] text-gray-400 mt-1">
              April, 2025
            </p>
          </div>
        </Card>

        <Card
          title="Total Employees"
          badge={<Chip tone="up"> 3.0%</Chip>}
          className="h-[180px]"
        >
          <div className="flex flex-col gap-5 py-3">
            <p className="text-2xl font-semibold text-[#7B4606]">120</p>
            <p className="text-[12px] sm:text-[14px] text-gray-400 mt-1">
              April, 2025
            </p>
          </div>
        </Card>

        <Card
          title="Locations"
          badge={<Chip tone="active">Active</Chip>}
          className="h-[180px]"
        >
          <div className="flex flex-col gap-5 py-3">
            <p className="text-2xl font-semibold text-[#7B4606]">4</p>
            <p className="text-[12px] sm:text-[14px] text-gray-400 mt-1">
              New York City
            </p>
          </div>
        </Card>
      </div>

      {/* Charts row */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card
          title="Overall Sales"
          badge={<Chip tone="down"> 3.0% this month</Chip>}
          className="lg:col-span-2"
          bodyClass="pt-2"
        >
          <Chart data={dashboardSales} max={max} />
        </Card>

        <Card
          title="Orders Today"
          subtitle="Local Time 12:59 pm"
          icon={calendarIcon}
        >
          <div className="flex items-center justify-center py-2">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
              <svg viewBox="0 0 120 120" className="h-full w-full">
                {/* track */}
                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke="#E6E7EB"
                  strokeWidth={STROKE}
                />

                <circle cx="60" cy="60" r={CENTER_R} fill="#F0F1F4" />

                <circle
                  cx="60"
                  cy="60"
                  r={R}
                  fill="none"
                  stroke="#7B4606"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${CIRC - dash}`}
                  transform="rotate(-90 60 60)"
                />
              </svg>

              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className=" text-[14px] font-semibold text-gray-900">
                    {ordersToday}
                  </div>
                  <div className="text-[12px] sm:text-[12px] text-gray-500">
                    March, 2025
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 top-3">
                <span className="rounded-md bg-gray-900 text-white text-[10px] sm:text-[11px] px-2 py-1 shadow">
                  {ordersTotal} orders
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="mt-4">
        <Card
          title="Recent Orders"
          badge={
            <button className="inline-flex justify-between font-bold items-center gap-0 md:gap-1 text-[10px] md:text-xs text-[#767676] cursor-pointer bg-[#F9F9F9] border border-gray-200 rounded-lg px-1 md:px-3 py-1  hover:bg-gray-50">
              View all <span>{arrow}</span>
            </button>
          }
          bodyClass="pt-3"
        >
          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {dashboardRows.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[14px] font-medium text-gray-900">
                    #{row.id}
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] ${row.status.tone}`}
                  >
                    {row.status.label}
                  </span>
                </div>
                <div className="mt-1 text-[12px] text-gray-600">
                  {row.date} • Qty {row.qty}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {row.prods.slice(0, 3).map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-[#EEF2FF] text-[#4C66E6] text-[11px] px-2.5 py-1"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-[14px] font-medium text-gray-900">
                    {row.price}
                  </div>
                  <div className="flex items-center gap-5">
                    <button aria-label="Delete" className="active:scale-95">
                      <Image src="/trash.png" alt="" width={20} height={20} />
                    </button>
                    <button aria-label="View" className="active:scale-95">
                      <Image src="/eye.png" alt="" width={20} height={20} />
                    </button>
                    <button aria-label="Share" className="active:scale-95">
                      <Image src="/share.png" alt="" width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <table className="min-w-full text-left">
                <thead className="bg-[#F5F6F8]">
                  <tr className="text-xs text-gray-600 border-b border-gray-200">
              {headers.map((header) => (
                <th key={header} scope="col" className="px-5 py-3.5">
                  {header}
                </th>
              ))}
            </tr>
                </thead>

                {/* horizontal lines only */}
                <tbody className="text-[13px] bg-white divide-y divide-gray-200">
                  {dashboardRows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-5 py-4 text-gray-900">{row.id}</td>
                      <td className="px-5 py-4 text-gray-700">{row.date}</td>
                      <td className="px-5 py-4 text-gray-700">{row.qty}</td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Tag tone="violet">Iced Latte</Tag>
                          {row.prods.includes("Donuts") && (
                            <Tag tone="blue">Donuts</Tag>
                          )}
                          {row.prods.includes("Croissant") && (
                            <Tag tone="indigo">Croissant</Tag>
                          )}
                          {row.prods.find((p) => p.startsWith("+")) && (
                            <Tag tone="slate">
                              {row.prods.find((p) => p.startsWith("+"))}
                            </Tag>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-900">{row.price}</td>

                      <td className="px-5 py-4">
                        <StatusChip label={row.status.label} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-5 text-gray-600">
                          <button
                            aria-label="Delete"
                            className="active:scale-95"
                          >
                            <Image
                              src="/trash.png"
                              alt=""
                              width={18}
                              height={18}
                            />
                          </button>
                          <button aria-label="View" className="active:scale-95">
                            <Image
                              src="/eye.png"
                              alt=""
                              width={18}
                              height={18}
                            />
                          </button>
                          <button
                            aria-label="Refresh"
                            className="active:scale-95"
                          >
                            <Image
                              src="/share.png"
                              alt=""
                              width={18}
                              height={18}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
