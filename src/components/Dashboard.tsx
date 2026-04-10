"use client";

import { useState } from "react";
import { SimulationResult } from "@/lib/types";
import { Heatmap } from "./Heatmap";
import { QuestionReport } from "./QuestionReport";
import { RiskAreas } from "./RiskAreas";

interface DashboardProps {
  result: SimulationResult;
}

const stats = [
  { key: "steps", label: "수업 단계", icon: "📋" },
  { key: "questions", label: "예상 질문", icon: "❓" },
  { key: "risks", label: "위험 구간", icon: "⚠️" },
] as const;

export function Dashboard({ result }: DashboardProps) {
  const [heatmapMetric, setHeatmapMetric] = useState<
    "understanding" | "attention"
  >("understanding");

  const values = {
    steps: result.timeline.length,
    questions: result.questions.length,
    risks: result.risk_areas.length,
  };

  return (
    <div className="space-y-8">
      {/* Summary bar — staggered animation */}
      <div className="flex gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            className="bg-card border border-border rounded-xl px-5 py-4 flex-1 animate-fade-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
            <div className="text-3xl font-bold text-text tracking-tight">
              {values[stat.key]}
            </div>
          </div>
        ))}
      </div>

      {/* Heatmap Section */}
      <section
        className="animate-fade-slide-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text">
            이해도 히트맵
          </h3>
          <div className="flex rounded-xl border border-border overflow-hidden">
            {(["understanding", "attention"] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setHeatmapMetric(metric)}
                className={`px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  heatmapMetric === metric
                    ? "bg-primary text-white"
                    : "bg-card text-text-secondary hover:bg-surface"
                }`}
              >
                {metric === "understanding" ? "이해도" : "집중도"}
              </button>
            ))}
          </div>
        </div>
        <Heatmap timeline={result.timeline} metric={heatmapMetric} />
      </section>

      {/* Two-column: Questions + Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: "500ms" }}
        >
          <h3 className="text-base font-semibold text-text mb-4">
            예상 질문
            <span className="text-text-secondary font-normal text-sm ml-2">
              {result.questions.length}
            </span>
          </h3>
          <QuestionReport questions={result.questions} />
        </section>

        <section
          className="animate-fade-slide-up"
          style={{ animationDelay: "600ms" }}
        >
          <h3 className="text-base font-semibold text-text mb-4">
            위험 구간
            <span className="text-text-secondary font-normal text-sm ml-2">
              {result.risk_areas.length}
            </span>
          </h3>
          <RiskAreas risks={result.risk_areas} timeline={result.timeline} />
        </section>
      </div>
    </div>
  );
}
