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

const difficultyConfig: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  easy: { bg: "#DCFCE7", text: "#166534", label: "쉬움" },
  medium: { bg: "#FEF9C3", text: "#854D0E", label: "보통" },
  hard: { bg: "#FEE2E2", text: "#991B1B", label: "어려움" },
};

const groupConfig: Record<
  string,
  { bg: string; text: string; icon: string; label: string }
> = {
  high: { bg: "#CCFBF1", text: "#115E59", icon: "🎯", label: "상위권" },
  mid: { bg: "#E0E7FF", text: "#3730A3", icon: "📝", label: "중위권" },
  low: { bg: "#FFEDD5", text: "#9A3412", icon: "🆘", label: "하위권" },
};

const chartColors: Record<string, string> = {
  쉬움: "#16A34A",
  보통: "#CA8A04",
  어려움: "#DC2626",
};

export function QuestionReport({ questions }: QuestionReportProps) {
  const distribution = [
    {
      name: "쉬움",
      count: questions.filter((q) => q.difficulty === "easy").length,
    },
    {
      name: "보통",
      count: questions.filter((q) => q.difficulty === "medium").length,
    },
    {
      name: "어려움",
      count: questions.filter((q) => q.difficulty === "hard").length,
    },
  ];

  return (
    <div>
      {/* Difficulty distribution chart */}
      <div className="mb-5 bg-card border border-border rounded-xl p-4">
        <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3">
          난이도 분포
        </h4>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={distribution} layout="vertical">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              horizontal={false}
            />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={48}
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
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
              {distribution.map((entry) => (
                <Cell key={entry.name} fill={chartColors[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Question cards */}
      <div className="space-y-3">
        {questions.map((q, i) => {
          const diff = difficultyConfig[q.difficulty] ?? difficultyConfig.medium;
          const group = groupConfig[q.student_type] ?? groupConfig.mid;

          return (
            <div
              key={`${q.student_type}-${q.difficulty}-${i}`}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors duration-200 animate-fade-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-base">{group.icon}</span>
                <span
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
                  style={{ backgroundColor: group.bg, color: group.text }}
                >
                  {group.label}
                </span>
                <span
                  className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
                  style={{ backgroundColor: diff.bg, color: diff.text }}
                >
                  {diff.label}
                </span>
              </div>
              <p className="text-sm font-medium text-text mb-2 leading-relaxed">
                &ldquo;{q.question}&rdquo;
              </p>
              <div className="bg-surface rounded-lg px-3 py-2">
                <p className="text-xs text-text-secondary">
                  <span className="font-semibold text-warning">오개념:</span>{" "}
                  {q.misconception}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
