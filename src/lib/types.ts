export interface StudentGroup {
  group: "high" | "mid" | "low";
  understanding: number;
  attention: number;
}

export interface TimelineStep {
  step: number;
  topic: string;
  duration_minutes: number;
  groups: StudentGroup[];
}

export interface Question {
  student_type: "high" | "mid" | "low";
  question: string;
  misconception: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface RiskArea {
  step: number;
  issue: string;
  suggestion: string;
}

export interface SimulationResult {
  summary: string;
  readiness_score: number;
  timeline: TimelineStep[];
  questions: Question[];
  risk_areas: RiskArea[];
}

export interface SimulationResponse {
  success: boolean;
  data?: SimulationResult;
  error?: string;
}
