"use server";

import { simulate } from "@/lib/gemini";
import { SimulationResponse } from "@/lib/types";

export async function simulateLesson(
  lessonPlan: string
): Promise<SimulationResponse> {
  if (!lessonPlan || lessonPlan.trim().length < 50) {
    return {
      success: false,
      error: "Lesson plan must be at least 50 characters.",
    };
  }

  try {
    const data = await simulate(lessonPlan.trim());
    return { success: true, data };
  } catch (err) {
    console.error("Simulation error:", err);
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Simulation failed. Please try again.",
    };
  }
}
