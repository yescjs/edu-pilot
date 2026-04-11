"use client";

import { useState, useRef } from "react";
import { SimulationResult } from "@/lib/types";
import { LessonInput } from "@/components/LessonInput";
import { Dashboard } from "@/components/Dashboard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { simulateLesson } from "./actions/simulate";
import { presets } from "@/data/presets";

export default function Home() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const loadingRef = useRef(false);

  async function handleSubmit(input: string) {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await simulateLesson(input);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "예기치 못한 오류가 발생했습니다.");
      }
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  function handleDemo() {
    if (loading) return;
    const preset = presets[0];
    setText(preset.content);
    handleSubmit(preset.content);
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[400px] shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-bold text-text tracking-tight">
            Edu-Pilot
          </h1>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">
            수업 전 AI 시뮬레이션 — 가르치기 전에, 먼저 예측하세요
          </p>
        </div>
        <div className="p-6 flex-1 flex flex-col min-h-0">
          <LessonInput
            text={text}
            onTextChange={setText}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-surface">
        {error && (
          <div className="mx-8 mt-8 max-w-5xl animate-fade-in">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-3">
              <svg
                className="w-5 h-5 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {loading && (
          <div className="p-8 max-w-5xl mx-auto animate-fade-in">
            <LoadingSkeleton />
          </div>
        )}

        {!loading && result && (
          <div className="p-8 max-w-5xl mx-auto animate-fade-slide-up">
            <Dashboard result={result} />
          </div>
        )}

        {!loading && !result && !error && (
          <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-light flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text mb-2">
                수업을 시뮬레이션해보세요
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                수업 계획을 입력하면 AI가 학생 그룹별 이해도, 집중도, 예상 질문,
                위험 구간을 예측합니다.
              </p>
              <button
                onClick={handleDemo}
                disabled={loading}
                className="px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-blue-700 transition-colors disabled:opacity-40 cursor-pointer shadow-sm"
              >
                Demo Mode — 한번에 체험하기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
