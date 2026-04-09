"use client";

import { useState } from "react";
import { SimulationResult } from "@/lib/types";
import { Heatmap } from "./Heatmap";
import { QuestionReport } from "./QuestionReport";
import { RiskAreas } from "./RiskAreas";

interface DashboardProps {
  result: SimulationResult;
}

export function Dashboard({ result }: DashboardProps) {
  const [heatmapMetric, setHeatmapMetric] = useState<
    "understanding" | "attention"
  >("understanding");

  return (
    <div className="space-y-8">
      {/* Summary bar */}
      <div className="flex gap-4">
        {[
          { label: "Lesson Steps", value: result.timeline.length },
          { label: "Questions Predicted", value: result.questions.length },
          { label: "Risk Areas", value: result.risk_areas.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-stone-200 rounded-lg px-5 py-3 flex-1"
          >
            <div className="text-2xl font-bold text-stone-900 tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Heatmap Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-stone-900">
            Comprehension Heatmap
          </h3>
          <div className="flex rounded-lg border border-stone-200 overflow-hidden">
            {(["understanding", "attention"] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setHeatmapMetric(metric)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  heatmapMetric === metric
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-500 hover:bg-stone-50"
                }`}
              >
                {metric === "understanding" ? "Understanding" : "Attention"}
              </button>
            ))}
          </div>
        </div>
        <Heatmap timeline={result.timeline} metric={heatmapMetric} />
      </section>

      {/* Two-column: Questions + Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h3 className="text-base font-semibold text-stone-900 mb-4">
            Expected Questions
            <span className="text-stone-400 font-normal text-sm ml-2">
              {result.questions.length}
            </span>
          </h3>
          <QuestionReport questions={result.questions} />
        </section>

        <section>
          <h3 className="text-base font-semibold text-stone-900 mb-4">
            Risk Areas
            <span className="text-stone-400 font-normal text-sm ml-2">
              {result.risk_areas.length}
            </span>
          </h3>
          <RiskAreas risks={result.risk_areas} timeline={result.timeline} />
        </section>
      </div>
    </div>
  );
}
