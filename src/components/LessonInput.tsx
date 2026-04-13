"use client";

import { presets } from "@/data/presets";

export const LESSON_TEMPLATE = `[수업 기본 정보]
- 과목:
- 학년/학급:
- 차시:
- 학습 주제:

[학습 목표]
-

[수업 흐름]
1. 도입 (     분)
   -

2. 전개 (     분)
   -

3. 정리 (     분)
   -

[활동 및 자료]
- 활동:
- 준비물:

[평가 계획]
-
`;

interface LessonInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: (text: string) => void;
  loading: boolean;
}

export function LessonInput({
  text,
  onTextChange,
  onSubmit,
  loading,
}: LessonInputProps) {
  const isValid = text.trim().length >= 50;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="mb-4">
        <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3">
          예시 수업안
        </h2>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onTextChange(preset.content)}
              disabled={loading}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer disabled:opacity-50 ${
                text === preset.content
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border bg-card text-text-secondary hover:border-primary/40 hover:text-text"
              }`}
            >
              {preset.label}
              <span className="text-text-secondary/60 ml-1.5">
                {preset.grade}
              </span>
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
        수업 계획 입력
      </h2>

      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="수업 계획을 입력하세요 (최소 50자)..."
        disabled={loading}
        className="flex-1 min-h-[280px] p-4 text-sm leading-relaxed bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-text-secondary/50 disabled:opacity-50 transition-colors"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-text-secondary">
          {text.length}자{!isValid && text.length > 0 ? " (최소 50자)" : ""}
        </span>
        <button
          onClick={() => onSubmit(text)}
          disabled={!isValid || loading}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
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
              분석 중...
            </span>
          ) : (
            "수업 분석하기"
          )}
        </button>
      </div>
    </div>
  );
}
