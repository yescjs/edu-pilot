"use client";

import { useState } from "react";
import { SimulationResult } from "@/lib/types";
import { LessonInput } from "@/components/LessonInput";
import { Dashboard } from "@/components/Dashboard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { simulateLesson } from "./actions/simulate";

export default function Home() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(text: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await simulateLesson(text);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.error || "An unexpected error occurred.");
      }
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[400px] shrink-0 border-r border-stone-200 bg-white flex flex-col">
        <div className="p-6 border-b border-stone-100">
          <h1 className="text-lg font-bold text-stone-900 tracking-tight">
            Edu-Pilot
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            AI lesson diagnostic dashboard
          </p>
        </div>
        <div className="p-6 flex-1 flex flex-col min-h-0">
          <LessonInput onSubmit={handleSubmit} loading={loading} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {error && (
          <div className="mx-8 mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-3">
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
        )}

        {loading && (
          <div className="p-8">
            <LoadingSkeleton />
          </div>
        )}

        {!loading && result && (
          <div className="p-8">
            <Dashboard result={result} />
          </div>
        )}

        {!loading && !result && !error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-sm">
              <svg
                className="w-16 h-16 mx-auto text-stone-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-base font-medium text-stone-500">
                No analysis yet
              </p>
              <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                Enter a lesson plan or select a preset to simulate classroom
                responses.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
