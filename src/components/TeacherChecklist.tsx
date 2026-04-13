"use client";

import { useState } from "react";
import { RiskArea, TimelineStep } from "@/lib/types";

interface TeacherChecklistProps {
  risks: RiskArea[];
  timeline: TimelineStep[];
}

export function TeacherChecklist({ risks, timeline }: TeacherChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  if (risks.length === 0) return null;

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  const doneCount = checked.size;
  const total = risks.length;

  return (
    <section className="animate-fade-slide-up" style={{ animationDelay: "700ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-text">
          수업 전 확인 사항
          <span className="text-text-secondary font-normal text-sm ml-2">
            {doneCount}/{total} 완료
          </span>
        </h3>
        {doneCount === total && total > 0 && (
          <span className="text-xs font-semibold text-success px-3 py-1 bg-green-50 rounded-full border border-green-200">
            모두 완료 ✓
          </span>
        )}
      </div>
      <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
        {risks.map((risk, i) => {
          const step = timeline.find((s) => s.step === risk.step);
          const isChecked = checked.has(i);
          return (
            <label
              key={i}
              className="flex items-start gap-4 p-4 cursor-pointer hover:bg-surface transition-colors duration-150"
            >
              <div className="mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(i)}
                  className="w-4 h-4 rounded border-border text-primary cursor-pointer accent-blue-600"
                />
              </div>
              <div className={isChecked ? "opacity-50" : ""}>
                <p className="text-xs font-semibold text-text-secondary mb-1">
                  Step {risk.step} · {step?.topic ?? `단계 ${risk.step}`}
                </p>
                <p className={`text-sm leading-relaxed ${isChecked ? "line-through text-text-secondary" : "text-text"}`}>
                  {risk.suggestion}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
