"use client";

interface ReadinessScoreProps {
  score: number;
}

function getConfig(score: number) {
  if (score >= 80) {
    return {
      bg: "#DCFCE7",
      border: "#86EFAC",
      text: "#166534",
      grade: "우수",
      desc: "수업 진행 준비 완료",
    };
  }
  if (score >= 60) {
    return {
      bg: "#FEF9C3",
      border: "#FDE047",
      text: "#854D0E",
      grade: "양호",
      desc: "일부 구간 보강 필요",
    };
  }
  return {
    bg: "#FEE2E2",
    border: "#FCA5A5",
    text: "#991B1B",
    grade: "주의",
    desc: "수업 전 전면 검토 권장",
  };
}

export function ReadinessScore({ score }: ReadinessScoreProps) {
  const config = getConfig(score);

  return (
    <div
      className="rounded-2xl border-2 p-6 flex items-center gap-6 animate-fade-slide-up"
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      <div className="shrink-0 text-center">
        <div
          className="text-6xl font-black tracking-tight"
          style={{ color: config.text }}
        >
          {score}
        </div>
        <div
          className="text-xs font-semibold mt-0.5 uppercase tracking-wide"
          style={{ color: config.text }}
        >
          / 100
        </div>
      </div>
      <div>
        <div
          className="text-xl font-bold mb-1"
          style={{ color: config.text }}
        >
          수업 준비도 — {config.grade}
        </div>
        <div
          className="text-sm"
          style={{ color: config.text, opacity: 0.8 }}
        >
          {config.desc}
        </div>
      </div>
    </div>
  );
}
