"use client";

import { Fragment, useState } from "react";
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

function getLabel(score: number): string {
  if (score <= 2) return "매우 낮음";
  if (score <= 4) return "낮음";
  if (score <= 6) return "보통";
  if (score <= 8) return "좋음";
  return "우수";
}

const groupLabels: Record<"high" | "mid" | "low", string> = {
  high: "상위권",
  mid: "중위권",
  low: "하위권",
};

const groups = ["high", "mid", "low"] as const;

interface TooltipData {
  group: string;
  topic: string;
  score: number;
  label: string;
  x: number;
  y: number;
}

export function Heatmap({ timeline, metric }: HeatmapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  function handleCellEnter(
    e: React.MouseEvent,
    group: string,
    topic: string,
    score: number
  ) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      group,
      topic,
      score,
      label: getLabel(score),
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div
          className="grid gap-px bg-border rounded-xl overflow-hidden"
          style={{
            gridTemplateColumns: `80px repeat(${timeline.length}, minmax(80px, 1fr))`,
          }}
        >
          {/* Header row */}
          <div className="bg-surface p-2 text-xs font-medium text-text-secondary" />
          {timeline.map((step, colIdx) => (
            <div
              key={step.step}
              className="bg-surface px-2 py-2.5 text-center animate-fade-in"
              style={{ animationDelay: `${colIdx * 50}ms` }}
            >
              <div className="text-xs font-semibold text-text truncate">
                {step.topic}
              </div>
              <div className="text-[11px] text-text-secondary mt-0.5">
                {step.duration_minutes}분
              </div>
            </div>
          ))}

          {/* Data rows */}
          {groups.map((group, rowIdx) => (
            <Fragment key={group}>
              <div className="bg-surface px-3 py-2 text-xs font-semibold text-text-secondary flex items-center">
                {groupLabels[group]}
              </div>
              {timeline.map((step, colIdx) => {
                const groupData = step.groups.find((g) => g.group === group);
                const score = groupData ? groupData[metric] : 0;
                const { bg, text } = getColor(score);
                const delay = Math.min(rowIdx * timeline.length * 50 + colIdx * 50, 500);
                return (
                  <div
                    key={`${group}-${step.step}`}
                    className="flex items-center justify-center text-sm font-bold cursor-default animate-heatmap-fill hover:brightness-90 transition-all duration-150"
                    style={{
                      backgroundColor: bg,
                      color: text,
                      animationDelay: `${delay}ms`,
                    }}
                    onMouseEnter={(e) =>
                      handleCellEnter(
                        e,
                        groupLabels[group],
                        step.topic,
                        score
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {score}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Custom Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-2 bg-text text-white text-xs rounded-lg shadow-lg pointer-events-none animate-fade-in"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-semibold">{tooltip.group} · {tooltip.topic}</div>
          <div className="mt-0.5">
            {metric === "understanding" ? "이해도" : "집중도"}: {tooltip.score}/10 ({tooltip.label})
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
        <span className="text-text-secondary/60">점수:</span>
        {[
          { label: "1-2 매우 낮음", bg: "#FEE2E2" },
          { label: "3-4 낮음", bg: "#FFEDD5" },
          { label: "5-6 보통", bg: "#FEF9C3" },
          { label: "7-8 좋음", bg: "#DCFCE7" },
          { label: "9-10 우수", bg: "#CCFBF1" },
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
