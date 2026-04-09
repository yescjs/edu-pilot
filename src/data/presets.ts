export interface Preset {
  id: string;
  label: string;
  subject: string;
  grade: string;
  duration: string;
  content: string;
}

export const presets: Preset[] = [
  {
    id: "photosynthesis",
    label: "Photosynthesis",
    subject: "Science",
    grade: "Grade 8",
    duration: "45 min",
    content: `Subject: Biology — Photosynthesis
Grade: 8th Grade
Duration: 45 minutes
Objective: Students will explain the process of photosynthesis, identify its inputs and outputs, and describe why it matters for life on Earth.

Phase 1 — Hook (5 min)
Show two photos side by side: a healthy green plant in sunlight and a yellowed plant kept in a dark closet for 2 weeks. Ask: "What happened? Why does the dark plant look different?" Collect 3-4 student responses verbally.

Phase 2 — Direct Instruction (15 min)
Present the photosynthesis equation: 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2
Explain each component:
- Carbon dioxide: enters through stomata in leaves
- Water: absorbed by roots, transported through xylem
- Light energy: captured by chlorophyll in chloroplasts
- Glucose: stored energy the plant uses for growth
- Oxygen: released as a byproduct
Use a labeled cross-section diagram of a leaf to show where the process occurs. Emphasize that photosynthesis happens specifically in chloroplasts, not the whole cell.

Phase 3 — Guided Activity (15 min)
Students work in pairs. Each pair receives a blank diagram of a leaf cell. Tasks:
1. Label the chloroplast, cell wall, vacuole, and stomata
2. Draw arrows showing CO2 entering and O2 leaving
3. Write the simplified photosynthesis equation from memory
Teacher circulates to check diagrams and correct misconceptions in real time.

Phase 4 — Wrap-up & Assessment (10 min)
Quick-write prompt: "Explain to a 5-year-old what photosynthesis is and why we should thank plants."
Share 2-3 responses aloud for peer feedback.
Exit ticket: 3 multiple-choice questions covering inputs, outputs, and location of photosynthesis.`,
  },
  {
    id: "linear-equations",
    label: "Linear Equations",
    subject: "Math",
    grade: "Grade 7",
    duration: "45 min",
    content: `Subject: Mathematics — Solving Linear Equations
Grade: 7th Grade
Duration: 45 minutes
Objective: Students will solve one-variable linear equations with variables on both sides using inverse operations.

Phase 1 — Warm-up (5 min)
Write on the board: "I'm thinking of a number. If I double it and add 3, I get 11. What's my number?"
Students solve mentally and share answers. Reveal that this is the equation 2x + 3 = 11. Connect the word puzzle to algebraic notation.

Phase 2 — Instruction: One-side Equations (10 min)
Model solving 3x + 7 = 22 step by step:
- Subtract 7 from both sides: 3x = 15
- Divide both sides by 3: x = 5
- Check: 3(5) + 7 = 22 (correct)
Emphasize the golden rule: "Whatever you do to one side, you must do to the other."
Work through 2 more examples with increasing difficulty: 5x - 4 = 16, then 2(x + 3) = 14.

Phase 3 — Instruction: Variables on Both Sides (10 min)
Present: 4x + 2 = 2x + 10
- "First, get all x terms on one side." Subtract 2x from both sides: 2x + 2 = 10
- Subtract 2 from both sides: 2x = 8
- Divide by 2: x = 4
- Check: 4(4)+2 = 18, 2(4)+10 = 18 (correct)
Work through one more example: 3x - 1 = x + 7.

Phase 4 — Independent Practice (15 min)
Worksheet with 8 problems in ascending difficulty:
Problems 1-3: One-side equations (e.g., 4x + 5 = 21)
Problems 4-6: Variables on both sides (e.g., 5x - 3 = 2x + 9)
Problems 7-8: Equations with parentheses (e.g., 3(x - 2) = 2x + 1)
Students work independently. Teacher helps struggling students with problems 1-3 while advanced students progress.

Phase 5 — Closure (5 min)
Class discussion: "What is the most important rule when solving equations?"
Preview tomorrow's lesson: word problems that become linear equations.`,
  },
  {
    id: "story-elements",
    label: "Story Elements",
    subject: "Language Arts",
    grade: "Grade 4",
    duration: "40 min",
    content: `Subject: Language Arts — Identifying Story Elements
Grade: 4th Grade
Duration: 40 minutes
Objective: Students will identify and describe the five key story elements (character, setting, plot, conflict, resolution) in a short story.

Phase 1 — Read-Aloud (10 min)
Read "The Paper Bag Princess" by Robert Munsch aloud to the class. Students listen without writing. Use expressive voices for each character. Pause briefly at the climax and ask: "What do you think Elizabeth will do next?"

Phase 2 — Introduction to Story Elements (10 min)
Display an anchor chart with five elements:
- Character: Who is in the story?
- Setting: Where and when does it happen?
- Plot: What happens from beginning to end?
- Conflict: What problem does the main character face?
- Resolution: How is the problem solved?
Walk through each element using "The Paper Bag Princess" as the example. Students help fill in each element verbally as a class.

Phase 3 — Guided Practice (12 min)
Hand out a graphic organizer with five labeled boxes. In pairs, students fill in each box for the story just read:
- Characters: Elizabeth, Prince Ronald, the dragon
- Setting: A kingdom, then a dragon's cave
- Plot: Dragon destroys castle and takes Ronald; Elizabeth outsmarts the dragon to rescue him
- Conflict: The dragon kidnapped Prince Ronald, and Elizabeth must rescue him
- Resolution: Elizabeth tricks the dragon into exhaustion and decides she doesn't need Ronald after all
Teacher visits each pair, asking probing questions: "Is the dragon a main character or a minor character? How do you decide?"

Phase 4 — Independent Practice (8 min)
Each student picks a favorite book or movie and fills in a fresh graphic organizer with its five story elements.
Early finishers write one sentence explaining which element makes their chosen story most interesting and why.`,
  },
];
