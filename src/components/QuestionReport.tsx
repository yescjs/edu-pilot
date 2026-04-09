"use client";

import { Question } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface QuestionReportProps {
  questions: Question[];
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy: { bg: "#DCFCE7", text: "#166534" },
  medium: { bg: "#FEF9C3", text: "#854D0E" },
  hard: { bg: "#FEE2E2", text: "#991B1B" },
};

const groupColors: Record<string, { bg: string; text: string }> = {
  high: { bg: "#CCFBF1", text: "#115E59" },
  mid: { bg: "#E0E7FF", text: "#3730A3" },
  low: { bg: "#FFEDD5", text: "#9A3412" },
};

const chartColors: Record<string, string> = {
  Easy: "#16A34A",
  Medium: "#CA8A04",
  Hard: "#DC2626",
};

export function QuestionReport({ questions }: QuestionReportProps) {
  const distribution = [
    {
      name: "Easy",
      count: questions.filter((q) => q.difficulty === "easy").length,
    },
    {
      name: "Medium",
      count: questions.filter((q) => q.difficulty === "medium").length,
    },
    {
      name: "Hard",
      count: questions.filter((q) => q.difficulty === "hard").length,
    },
  ];

  return (
    <div>
      {/* Difficulty distribution chart */}
      <div className="mb-5 bg-white border border-stone-200 rounded-lg p-4">
        <h4 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">
          Difficulty Distribution
        </h4>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={distribution} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E7E5E4"
              horizontal={false}
            />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#78716C" }}
              axisLine={{ stroke: "#D6D3D1" }}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={56}
              tick={{ fontSize: 11, fill: "#78716C" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid #E7E5E4",
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={18}>
              {distribution.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={chartColors[entry.name]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Question cards */}
      <div className="space-y-3">
        {questions.map((q, i) => {
          const diffStyle = difficultyColors[q.difficulty] ?? difficultyColors.medium;
          const groupStyle = groupColors[q.student_type] ?? groupColors.mid;

          return (
            <div
              key={i}
              className="bg-white border border-stone-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 text-[11px] font-semibold rounded-full"
                  style={{ backgroundColor: groupStyle.bg, color: groupStyle.text }}
                >
                  {q.student_type}
                </span>
                <span
                  className="px-2 py-0.5 text-[11px] font-semibold rounded-full"
                  style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
                >
                  {q.difficulty}
                </span>
              </div>
              <p className="text-sm font-medium text-stone-800 mb-1.5">
                &ldquo;{q.question}&rdquo;
              </p>
              <p className="text-xs text-stone-500">
                <span className="font-semibold text-stone-600">
                  Misconception:
                </span>{" "}
                {q.misconception}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
