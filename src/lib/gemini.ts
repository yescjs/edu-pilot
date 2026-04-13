import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { SimulationResult } from "./types";
import { buildPrompt } from "./prompts";

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return key;
}
const MODEL_PRIMARY = "gemini-2.5-flash-lite";
const MODEL_FALLBACK = "gemini-2.5-flash";

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: { type: SchemaType.STRING },
    readiness_score: { type: SchemaType.INTEGER },
    timeline: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step: { type: SchemaType.INTEGER },
          topic: { type: SchemaType.STRING },
          duration_minutes: { type: SchemaType.INTEGER },
          groups: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                group: { type: SchemaType.STRING },
                understanding: { type: SchemaType.INTEGER, minimum: 1, maximum: 10 },
                attention: { type: SchemaType.INTEGER, minimum: 1, maximum: 10 },
              },
              required: ["group", "understanding", "attention"],
            },
          },
        },
        required: ["step", "topic", "duration_minutes", "groups"],
      },
    },
    questions: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          student_type: { type: SchemaType.STRING },
          question: { type: SchemaType.STRING },
          misconception: { type: SchemaType.STRING },
          difficulty: { type: SchemaType.STRING },
        },
        required: ["student_type", "question", "misconception", "difficulty"],
      },
    },
    risk_areas: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step: { type: SchemaType.INTEGER },
          issue: { type: SchemaType.STRING },
          suggestion: { type: SchemaType.STRING },
        },
        required: ["step", "issue", "suggestion"],
      },
    },
  },
  required: ["summary", "readiness_score", "timeline", "questions", "risk_areas"],
};

async function callGeminiWithRetry(
  modelName: string,
  prompt: string
): Promise<SimulationResult> {
  const genAI = new GoogleGenerativeAI(getApiKey());
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema as Parameters<typeof genAI.getGenerativeModel>[0]["generationConfig"] extends { responseSchema?: infer S } ? S : never,
    },
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const parsed = JSON.parse(text);
      if (
        !parsed ||
        !Array.isArray(parsed.timeline) ||
        !Array.isArray(parsed.questions) ||
        !Array.isArray(parsed.risk_areas)
      ) {
        throw new Error("Unexpected response shape from model.");
      }
      // 이해도/집중도 값이 모두 0이면 모델이 제대로 응답하지 않은 것으로 판단
      const hasValidScores = parsed.timeline.some((step: { groups: Array<{ understanding: number; attention: number }> }) =>
        step.groups?.some((g) => g.understanding > 0 || g.attention > 0)
      );
      if (parsed.timeline.length > 0 && !hasValidScores) {
        throw new Error("Model returned invalid scores (all zeros). Retrying.");
      }
      if (typeof parsed.readiness_score !== "number" || parsed.readiness_score < 0 || parsed.readiness_score > 100) {
        throw new Error("Model returned invalid readiness_score. Retrying.");
      }
      if (!parsed.summary || typeof parsed.summary !== "string" || parsed.summary.trim().length === 0) {
        throw new Error("Model returned empty summary. Retrying.");
      }
      return parsed as SimulationResult;
    } catch (err) {
      if (attempt === 0) {
        console.warn("Attempt 1 failed, retrying:", err instanceof Error ? err.message : err);
        continue;
      }
      throw err;
    }
  }
  throw new Error("Failed after 2 attempts.");
}

export async function simulate(
  lessonPlan: string
): Promise<SimulationResult> {
  const prompt = buildPrompt(lessonPlan);

  try {
    return await callGeminiWithRetry(MODEL_PRIMARY, prompt);
  } catch (primaryError) {
    console.error(`Primary model (${MODEL_PRIMARY}) failed:`, primaryError);
    try {
      return await callGeminiWithRetry(MODEL_FALLBACK, prompt);
    } catch (fallbackError) {
      console.error(`Fallback model (${MODEL_FALLBACK}) failed:`, fallbackError);
      throw new Error("Simulation failed. Please try again.");
    }
  }
}
