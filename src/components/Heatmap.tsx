"use client";

import { Fragment } from "react";
import { TimelineStep } from "@/lib/types";

interface HeatmapProps {
  timeline: TimelineStep[];
  metric: "understanding" | "attention";
}

function getColor(score: number): { bg: string; text: string } {
  if (score <= 2) return { bg: "#FEE2E2", text: "#991B1B" };
  if (score <= 4) return { bg: "#FFEDD5", text: "#9A3412" };
  if (score <= 6) return { bg: "#FEF9C3", text: "#854D0E" };
  if (score <= 8) return { bg: "#DCFCE7", text: "#166534" };
  return { bg: "#CCFBF1", text: "#115E59" };
}

const groupLabels: Record<string, string> = {
  high: "High",
  mid: "Mid",
  low: "Low",
};

const groups = ["high", "mid", "low"] as const;

export function Heatmap({ timeline, metric }: HeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-px bg-stone-200 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `72px repeat(${timeline.length}, minmax(80px, 1fr))`,
        }}
      >
        {/* Header row */}
        <div className="bg-stone-50 p-2 text-xs font-medium text-stone-400" />
        {timeline.map((step) => (
          <div
            key={step.step}
            className="bg-stone-50 px-2 py-2.5 text-center"
            title={step.topic}
          >
            <div className="text-xs font-medium text-stone-700 truncate">
              {step.topic}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">
              {step.duration_minutes}min
            </div>
          </div>
        ))}

        {/* Data rows */}
        {groups.map((group) => (
          <Fragment key={group}>
            <div className="bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600 flex items-center">
              {groupLabels[group]}
            </div>
            {timeline.map((step) => {
              const groupData = step.groups.find((g) => g.group === group);
              const score = groupData ? groupData[metric] : 0;
              const { bg, text } = getColor(score);
              return (
                <div
                  key={`${group}-${step.step}`}
                  className="flex items-center justify-center text-sm font-semibold transition-transform hover:scale-105 cursor-default"
                  style={{ backgroundColor: bg, color: text }}
                  title={`${groupLabels[group]} / ${step.topic}: ${score}/10`}
                >
                  {score}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-stone-500">
        <span className="text-stone-400">Score:</span>
        {[
          { label: "1-2 Critical", bg: "#FEE2E2" },
          { label: "3-4 Low", bg: "#FFEDD5" },
          { label: "5-6 Medium", bg: "#FEF9C3" },
          { label: "7-8 Good", bg: "#DCFCE7" },
          { label: "9-10 Excellent", bg: "#CCFBF1" },
        ].map(({ label, bg }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: bg }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
