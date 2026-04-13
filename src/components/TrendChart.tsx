"use client";

import { TimelineStep } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendChartProps {
  timeline: TimelineStep[];
  metric: "understanding" | "attention";
}

const lineColors = {
  상위권: "#115E59",
  중위권: "#3730A3",
  하위권: "#9A3412",
};

export function TrendChart({ timeline, metric }: TrendChartProps) {
  const chartData = timeline.map((step) => ({
    name: step.topic,
    상위권: step.groups.find((g) => g.group === "high")?.[metric] ?? 0,
    중위권: step.groups.find((g) => g.group === "mid")?.[metric] ?? 0,
    하위권: step.groups.find((g) => g.group === "low")?.[metric] ?? 0,
  }));

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 5, right: 16, left: -16, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          />
          {(["상위권", "중위권", "하위권"] as const).map((group) => (
            <Line
              key={group}
              type="monotone"
              dataKey={group}
              stroke={lineColors[group]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
