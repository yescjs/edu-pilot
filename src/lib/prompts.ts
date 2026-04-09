export function buildPrompt(lessonPlan: string): string {
  return `You are an experienced classroom simulation engine used by teachers to preview how their lesson plans will perform with real students. Given the lesson plan below, simulate how three proficiency groups would respond throughout each phase.

Student groups:
- high: Top-performing students. Quick to grasp concepts, may get bored with slow pacing, ask advanced or tangential questions.
- mid: Average students. Follow along with clear instruction, struggle with abstract leaps, ask clarifying questions when confused.
- low: Struggling students. Need concrete examples and repetition, lose attention quickly during lecture-heavy sections, carry fundamental misconceptions.

Generate a simulation with these sections:

1. timeline: Break the lesson into its natural steps/phases (typically 4-7 steps). For each step, provide:
   - step number (sequential integer starting from 1)
   - topic (short label for the phase)
   - duration_minutes (estimated duration)
   - each group's understanding score (1-10) and attention score (1-10)

   Scoring guidelines:
   - low group: understanding typically 2-6, rarely above 7
   - mid group: understanding typically 4-8
   - high group: understanding typically 6-10, rarely below 5
   - Attention should decrease during long passive activities for all groups
   - Hands-on activities should boost attention across all groups

2. questions: Generate 6-10 realistic student questions specific to the lesson content. Distribute across all three groups and difficulty levels (easy, medium, hard). Each question must include the specific misconception or knowledge gap that motivates it. These should sound like real student questions, not textbook prompts.

3. risk_areas: Identify 2-4 specific steps where significant learning gaps, attention drops, or confusion are likely. Each risk must include a concrete, actionable teaching suggestion the teacher can implement immediately.

Be specific to the actual lesson content. No generic observations.

LESSON PLAN:
${lessonPlan}`;
}
