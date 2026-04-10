"use client";

import { useState } from "react";
import { RiskArea, TimelineStep } from "@/lib/types";

interface RiskAreasProps {
  risks: RiskArea[];
  timeline: TimelineStep[];
}

export function RiskAreas({ risks, timeline }: RiskAreasProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (risks.length === 0) {
    return (
      <p className="text-sm text-text-secondary italic animate-fade-in">
        감지된 위험 구간이 없습니다.
      </p>
    );
  }

  function toggle(step: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {risks.map((risk, i) => {
        const step = timeline.find((s) => s.step === risk.step);
        const isOpen = expanded.has(risk.step);

        return (
          <div
            key={`risk-${risk.step}-${i}`}
            id={`risk-step-${risk.step}`}
            className="bg-card border border-warning/30 rounded-xl overflow-hidden hover:border-warning/50 transition-colors duration-200 animate-fade-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <button
              onClick={() => toggle(risk.step)}
              className="w-full p-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-lg bg-warning/10 text-warning text-xs font-bold flex items-center justify-center shrink-0">
                  {risk.step}
                </span>
                <span className="text-sm font-semibold text-text flex-1">
                  {step?.topic ?? `Step ${risk.step}`}
                </span>
                <svg
                  className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {risk.issue}
              </p>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 animate-fade-in">
                <div className="bg-primary-light/50 border border-primary/20 rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-wide mb-1">
                    개선 제안
                  </p>
                  <p className="text-sm text-primary/80 leading-relaxed">
                    {risk.suggestion}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
