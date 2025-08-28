"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Cell,
} from "recharts";

/**
 * Reusable bar chart
 *
 * Props:
 * - data:        [{ m: "Jan", v: 120, highlight?: true }, ...]
 * - max:         number (y max)  default 500
 * - height:      container height (px) default 220
 * - valueKey:    key for numeric value default "v"
 * - categoryKey: key for x-axis label  default "m"
 * - highlightKey:key for highlight     default "highlight"
 * - barColor:         default "#E5E7EB" (gray-200)
 * - highlightColor:   default "#7B4606" (brown)
 */
export default function Chart({
  data = [],
  max = 500,
  height = 220,
  valueKey = "v",
  categoryKey = "m",
  highlightKey = "highlight",
  barColor = "#E5E7EB",
  highlightColor = "#7B4606",
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 18, right: 8, left: -10, bottom: 6 }}>
          <CartesianGrid vertical={false} stroke="#EEF0F3" />
          <XAxis
            dataKey={categoryKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
          />
          <YAxis hide domain={[0, max]} />
          <Tooltip
             cursor={{ fill: "rgba(17,24,39,0.06)" }}   // slightly darker hover cursor
  content={({ active, payload }) =>
    active && payload?.length ? (
      <div className="rounded-md bg-white px-2.5 py-1.5 text-[12px] shadow border border-gray-100 text-gray-800">
        ${payload[0].value}
      </div>
    ) : null
  }
          />
          <Bar dataKey={valueKey} radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d?.[highlightKey] ? highlightColor : barColor}
              />
            ))}
            {/* Always-visible value bubble for the highlighted bar */}
            <LabelList
              dataKey={valueKey}
              content={(props) => {
                const { x = 0, y = 0, width = 0, value, payload } = props;
                if (!payload?.[highlightKey]) return null;
                const cx = x + width / 2;
                return (
                  <g>
                    <rect
                      x={cx - 24}
                      y={y - 24}
                      width={48}
                      height={18}
                      rx={6}
                      fill="#111827"
                    />
                    <text
                      x={cx}
                      y={y - 11}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#fff"
                    >
                      ${value}
                    </text>
                  </g>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
