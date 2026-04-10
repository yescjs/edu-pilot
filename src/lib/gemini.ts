import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { SimulationResult } from "./types";
import { buildPrompt } from "./prompts";

const API_KEY = process.env.GEMINI_API_KEY!;
const MODEL_PRIMARY = "gemini-3.1-flash-lite-preview";
const MODEL_FALLBACK = "gemini-2.5-flash-lite";

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
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
                understanding: { type: SchemaType.INTEGER },
                attention: { type: SchemaType.INTEGER },
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
  required: ["timeline", "questions", "risk_areas"],
};

async function callGeminiWithRetry(
  modelName: string,
  prompt: string
): Promise<SimulationResult> {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema as never,
    },
  });

  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    try {
      return JSON.parse(text) as SimulationResult;
    } catch {
      if (attempt === 0) {
        console.warn("JSON parse failed, retrying...");
        continue;
      }
      throw new Error("Failed to parse simulation response.");
    }
  }
  throw new Error("Failed to parse simulation response.");
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
