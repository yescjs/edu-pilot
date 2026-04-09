"use client";

import { useState } from "react";
import { presets } from "@/data/presets";

interface LessonInputProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export function LessonInput({ onSubmit, loading }: LessonInputProps) {
  const [text, setText] = useState("");

  const isValid = text.trim().length >= 50;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="mb-4">
        <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-3">
          Sample Presets
        </h2>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setText(preset.content)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {preset.label}
              <span className="text-stone-400 ml-1.5">{preset.grade}</span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your lesson plan here (minimum 50 characters)..."
        disabled={loading}
        className="flex-1 min-h-[280px] p-4 text-sm leading-relaxed bg-white border border-stone-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 placeholder:text-stone-400 disabled:opacity-50"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          {text.length} chars{!isValid && text.length > 0 ? " (min 50)" : ""}
        </span>
        <button
          onClick={() => onSubmit(text)}
          disabled={!isValid || loading}
          className="px-5 py-2.5 text-sm font-medium rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Lesson"
          )}
        </button>
      </div>
    </div>
  );
}
