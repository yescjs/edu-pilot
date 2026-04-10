"use client";

import { RiskArea, TimelineStep } from "@/lib/types";

interface RiskAreasProps {
  risks: RiskArea[];
  timeline: TimelineStep[];
}

export function RiskAreas({ risks, timeline }: RiskAreasProps) {
  if (risks.length === 0) {
    return (
      <p className="text-sm text-stone-400 italic">
        No significant risk areas detected.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {risks.map((risk, i) => {
        const step = timeline.find((s) => s.step === risk.step);
        return (
          <div
            key={`risk-${risk.step}-${i}`}
            className="bg-white border border-amber-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                {risk.step}
              </span>
              <span className="text-sm font-semibold text-stone-800">
                {step?.topic ?? `Step ${risk.step}`}
              </span>
            </div>
            <p className="text-sm text-stone-600 mb-3 leading-relaxed">
              {risk.issue}
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-md p-3">
              <p className="text-[11px] font-semibold text-teal-800 uppercase tracking-wide mb-0.5">
                Suggestion
              </p>
              <p className="text-sm text-teal-700 leading-relaxed">
                {risk.suggestion}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
