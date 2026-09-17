/* ================================================================
   MISSIONS DATA — Self-Guided Interactive Skill Lab
   
   Architecture note: This schema is designed so you can add a
   new mission by adding one object to this array. No UI rebuild.
   All mission logic reads from this data.
   ================================================================ */

// ---------------------------------------------------------------
// SHARED TYPES
// ---------------------------------------------------------------

export interface MissionComponent {
  name: string;
  quantity: number | string;
  purpose: string;
  beginnerNote: string;  // Plain-English explanation for a newcomer
  symbol?: string;       // Emoji shorthand for quick reference
}

export interface WiringCheckStep {
  step: number;
  label: string;         // Short action label: "Connect Pin 13 to breadboard"
  from: string;
  to: string;
  wireColor: string;
  description: string;   // Full explanation
  hintIfStuck: string;   // Step-specific help without giving it away
}

export type HintType = "THINK" | "DIRECTION" | "SPECIFIC" | "EXPLANATION" | "SOLUTION";

export interface HintLadder {
  level: 1 | 2 | 3 | 4 | 5;
  type: HintType;
  badge: string;         // "Think about it" | "A direction" | "Look here" | "Concept" | "Solution"
  content: string;
}

export interface WhyOption {
  text: string;
  isCorrect: boolean;
  explanation: string;   // Shown after selection — explains WHY it's right or wrong
}

export interface WhyQuestion {
  question: string;
  options: WhyOption[];
  concept: string;       // The core concept being tested
}

export interface ProofTask {
  title: string;
  badge: string;         // "Proof Task"
  situation: string;     // New story context
  objective: string;     // New measurable goal
  whatChanged: string;   // "This time you need to..." — what's different
  checkItems: string[];  // Self-check list for proof task
}

export interface TestCheckItem {
  id: string;
  label: string;
  failureGuidance: string;  // Shown if student says "no" to this item
}

export type MissionType = "BUILD" | "DEBUG" | "REVERSE" | "PREDICT" | "EXPLAIN" | "PROVE";
export type Difficulty = 1 | 2 | 3;  // 1 = absolute beginner

export interface Mission {
  id: string;
  title: string;
  badge: string;
  type: MissionType;
  difficulty: Difficulty;
  estimatedMinutes: number;

  // The narrative hook — this is how we open the mission
  situation: string;         // One-sentence problem statement
  context: string[];         // 2-3 short paragraphs. No walls of text.
  objective: string;         // One sentence: what "done" looks like

  // Resources
  components: MissionComponent[];
  circuitImage: string;
  videoSrc?: string;
  code: string;
  codeFileName: string;
  githubUrl?: string;

  // BUILD stage: interactive wiring checklist
  wiringSteps: WiringCheckStep[];

  // TEST stage: self-assessment
  testItems: TestCheckItem[];

  // HINT system: 5-level progressive ladder
  hints: HintLadder[];

  // WHY stage: conceptual understanding check
  whyQuestion: WhyQuestion;

  // PROOF stage: variant challenge
  proofTask: ProofTask;

  // Metadata for skill tracking
  skillMappings: string[];  // Skills this mission demonstrates
  concepts: string[];        // Concepts introduced

  // Links to existing reference material
  projectId?: string;        // Links to /projects/[id] for reference docs
}

// ---------------------------------------------------------------
// SKILL DEFINITIONS
// (These are all the skills the platform tracks)
// ---------------------------------------------------------------

export const SKILL_DEFINITIONS: Record<string, { name: string; description: string }> = {
  "digital-io": {
    name: "Digital I/O",
    description: "Configure Arduino pins as digital inputs and outputs",
  },
  "breadboard": {
    name: "Breadboard Fundamentals",
    description: "Understand breadboard layout and wire routing",
  },
  "ohms-law": {
    name: "Ohm's Law",
    description: "Calculate resistor values to protect components",
  },
  "led-circuits": {
    name: "LED Circuits",
    description: "Build safe LED circuits with current limiting",
  },
  "circuit-reading": {
    name: "Circuit Reading",
    description: "Interpret circuit diagrams and breadboard layouts",
  },
  "debugging": {
    name: "Debugging",
    description: "Identify and fix problems in circuits and code",
  },
  "arduino-basics": {
    name: "Arduino Basics",
    description: "Upload code and use the Arduino IDE",
  },
};

// ---------------------------------------------------------------
// MISSION 01: EMERGENCY LED SYSTEM
// The first and most important mission. Must work perfectly.
// ---------------------------------------------------------------

const MISSION_LED_BLINK: Mission = {
  id: "led-blink",
  title: "Emergency LED System",
  badge: "Mission 01",
  type: "BUILD",
  difficulty: 1,
  estimatedMinutes: 20,
  projectId: "led-blink",

  // ------- NARRATIVE -------
  situation:
    "The warning LED on your control panel stopped working. You need to wire it back up safely before the system goes live.",

  context: [
    "Every control system needs a status indicator. In real embedded systems, even a simple LED tells an operator whether a circuit is alive or dead.",
    "Your job is to wire an LED to Arduino Pin 13 so it turns on when the pin goes HIGH. But there's a catch — connect it wrong and you'll burn out the LED or damage the Arduino pin.",
    "You have exactly the right components. Figure out the correct circuit before uploading the code.",
  ],

  objective:
    "Wire the LED circuit correctly so it turns on safely when Arduino Pin 13 is HIGH — without exceeding the 20mA pin current limit.",

  // ------- COMPONENTS -------
  components: [
    {
      name: "Arduino Uno R3",
      quantity: 1,
      purpose: "Microcontroller — controls Pin 13 output voltage",
      beginnerNote:
        "Think of it as a tiny computer. Pin 13 is the output we control with code. It switches between 5V (on) and 0V (off).",
      symbol: "🔲",
    },
    {
      name: "Red LED (5mm)",
      quantity: 1,
      purpose: "Light Emitting Diode — the warning indicator",
      beginnerNote:
        "LEDs only work in ONE direction. The longer leg (+) is the anode. The shorter leg (−) is the cathode. Flip it backwards and it won't light up.",
      symbol: "💡",
    },
    {
      name: "220Ω Resistor",
      quantity: 1,
      purpose: "Current limiter — protects the LED and Arduino pin",
      beginnerNote:
        "Without this, too much current flows and the LED burns out in seconds. This resistor absorbs the extra voltage so the LED gets exactly what it needs.",
      symbol: "⚡",
    },
    {
      name: "Solderless Breadboard",
      quantity: 1,
      purpose: "Prototyping platform — connects components without soldering",
      beginnerNote:
        "Holes in the same column are connected inside. The center gap separates the two halves. Blue rail = GND. Red rail = Power.",
      symbol: "📋",
    },
    {
      name: "Jumper Wires (M-M)",
      quantity: 2,
      purpose: "Signal and ground connections",
      beginnerNote:
        "Use red for signal/power, black for ground. This is a convention that will save you hours of debugging later.",
      symbol: "〰️",
    },
  ],

  circuitImage: "/images/led-blink-breadboard.jpg",
  videoSrc: "/videos/led-blink-demo.mp4",
  githubUrl: "https://github.com/A-941/arduino-robotics-journey/tree/main/01-led-blink",

  // ------- WIRING CHECKLIST -------
  // These become an interactive checklist in the workspace
  wiringSteps: [
    {
      step: 1,
      label: "Run signal wire from Pin 13",
      from: "Arduino Digital Pin 13",
      to: "Breadboard row (any empty row)",
      wireColor: "Red wire",
      description:
        "Connect a red jumper from Arduino pin 13 to an empty row on the breadboard. This row will be your signal row — Pin 13 switches it between 5V and 0V.",
      hintIfStuck:
        "Pin 13 is on the digital side of the Arduino. Count from the top — it's the second pin from the top-right.",
    },
    {
      step: 2,
      label: "Insert resistor from signal row",
      from: "Signal row (same as step 1)",
      to: "Resistor second lead (new row)",
      wireColor: "220Ω Resistor",
      description:
        "Insert one end of the 220Ω resistor into the signal row from Step 1. The other end goes to a new row. Resistors have no polarity — either direction works.",
      hintIfStuck:
        "Resistors are non-polarized. Just make sure both leads are in different rows — not the same row, not across the center gap.",
    },
    {
      step: 3,
      label: "Connect LED anode (long leg) to resistor",
      from: "Resistor output row (from step 2)",
      to: "LED long leg (anode +)",
      wireColor: "Direct component lead",
      description:
        "Place the LED's longer leg (anode, +) in the same row as the resistor's second lead. Current will flow: Pin 13 → Resistor → LED anode.",
      hintIfStuck:
        "Compare your two LED legs. The longer one is the anode (+). It should be in the same row as the resistor's output lead.",
    },
    {
      step: 4,
      label: "Connect LED cathode (short leg) to GND row",
      from: "LED short leg (cathode −)",
      to: "Breadboard GND rail or empty row for GND",
      wireColor: "Direct component lead",
      description:
        "Place the LED's shorter leg (cathode, −) in a new row or directly in the blue GND rail. This is where current exits the LED.",
      hintIfStuck:
        "The shorter leg is the cathode (−). If you're not using the blue rail, any empty row works — just remember which one for Step 5.",
    },
    {
      step: 5,
      label: "Run GND wire back to Arduino",
      from: "LED cathode row (from step 4)",
      to: "Arduino GND pin",
      wireColor: "Black wire",
      description:
        "Connect a black jumper from the LED cathode row back to any GND pin on the Arduino. This completes the circuit loop. Without this, no current can flow.",
      hintIfStuck:
        "The Arduino has multiple GND pins (marked 'GND'). Any of them works — they're all connected internally.",
    },
  ],

  // ------- TEST ITEMS -------
  // Student self-reports, system gives targeted feedback
  testItems: [
    {
      id: "led-polarity",
      label: "The LED is inserted the correct way (long leg toward resistor)",
      failureGuidance:
        "LEDs are polarized — they only conduct in one direction. Hold the LED up: the longer leg is the anode (+), the shorter leg is the cathode (−). The anode must face toward the resistor and Pin 13.",
    },
    {
      id: "resistor-series",
      label: "The 220Ω resistor is connected in series between Pin 13 and the LED",
      failureGuidance:
        "The resistor must sit between Pin 13 and the LED's anode. Check that one end of the resistor shares a row with the Pin 13 wire, and the other end shares a row with the LED's long leg.",
    },
    {
      id: "gnd-complete",
      label: "The LED cathode (short leg) connects back to Arduino GND",
      failureGuidance:
        "A circuit needs a complete loop. Current flows from Pin 13 → Resistor → LED anode → LED cathode → back to GND. If the GND connection is missing, no current flows and the LED stays off.",
    },
    {
      id: "code-uploaded",
      label: "The Arduino code is uploaded and running",
      failureGuidance:
        "Use the 'View Code' tab on this page to see the exact firmware. Upload it via Arduino IDE. If the LED blinks but doesn't stay on, check whether the code is the blinking version — use the static version instead.",
    },
  ],

  // ------- HINT LADDER -------
  // 5 progressive hints. Each one reveals a bit more.
  // Student unlocks them one at a time.
  hints: [
    {
      level: 1,
      type: "THINK",
      badge: "Think about it",
      content:
        "Before looking for the problem: electricity needs a complete loop to flow. Can you trace the full path from Pin 13 → through every component → back to GND? Is there a gap anywhere?",
    },
    {
      level: 2,
      type: "DIRECTION",
      badge: "A direction",
      content:
        "Most wiring problems with LEDs fall into two categories: wrong polarity (LED backwards) or a missing connection. Start by confirming which leg of your LED is the anode (+) — it should be facing toward the resistor.",
    },
    {
      level: 3,
      type: "SPECIFIC",
      badge: "Look here",
      content:
        "Check Step 3 and Step 4 in your wiring. The resistor's output lead and the LED's anode must be in the SAME breadboard row. And the LED's cathode must connect to the GND rail or an Arduino GND pin.",
    },
    {
      level: 4,
      type: "EXPLANATION",
      badge: "The concept",
      content:
        "Here's why this matters: A breadboard connects holes in the same column together. If your LED's anode and the resistor's output lead are in DIFFERENT columns, there's no electrical connection between them — even if the components look close. Use the breadboard reference image to verify your rows match.",
    },
    {
      level: 5,
      type: "SOLUTION",
      badge: "Full solution",
      content:
        "Complete circuit path: Arduino Pin 13 → (red wire) → Breadboard row A → 220Ω resistor → Breadboard row B → LED long leg (anode +) in row B → LED short leg (cathode −) → (black wire) → Arduino GND. Compare this against your build step by step.",
    },
  ],

  // ------- WHY QUESTION -------
  // Asked after the test passes. Forces conceptual understanding.
  whyQuestion: {
    question: "Why does this circuit need a resistor between Pin 13 and the LED?",
    concept: "Ohm's Law & Current Limiting",
    options: [
      {
        text: "To slow down the electricity so the LED doesn't flash too fast",
        isCorrect: false,
        explanation:
          "Not quite. Resistors don't control speed — they limit current (measured in milliamps). The blink rate is controlled entirely by the delay() values in code.",
      },
      {
        text: "To limit the current to a safe level and protect both the LED and the Arduino pin",
        isCorrect: true,
        explanation:
          "Exactly right. Without a resistor, the LED would draw too much current — burning itself out and potentially damaging the ATmega328P output pin (max 40mA). The 220Ω resistor limits current to ~13.6mA using Ohm's Law: R = (5V − 2V) / 0.015A = 200Ω → 220Ω standard value.",
      },
      {
        text: "Because LEDs won't work on direct current without a resistor",
        isCorrect: false,
        explanation:
          "LEDs work on DC — that's not the issue. The problem is they have very low resistance once forward voltage is reached, so without a series resistor, they'll draw excess current and burn out.",
      },
      {
        text: "To increase voltage so the LED gets enough power to light up",
        isCorrect: false,
        explanation:
          "Resistors reduce voltage and limit current — they never increase either. The LED gets LESS voltage across it than Pin 13 provides, which is exactly what we want.",
      },
    ],
  },

  // ------- PROOF TASK -------
  // Variant challenge after completing the main mission
  proofTask: {
    title: "Two LEDs, One Arduino",
    badge: "Proof Task",
    situation:
      "The control panel needs a second status LED — a green one on Pin 12 — alongside the red warning LED you just wired.",
    objective:
      "Add a second LED on Pin 12 without removing your first circuit. Both LEDs should turn on when their respective pins go HIGH.",
    whatChanged:
      "You now need two independent LED circuits. Each LED gets its own resistor and connects to a different Arduino pin. The GND can be shared.",
    checkItems: [
      "Green LED is connected to Pin 12 (not Pin 13)",
      "A second 220Ω resistor is in series with the green LED",
      "The green LED cathode connects to GND (can share GND rail with red LED)",
      "Code has pinMode(12, OUTPUT) and digitalWrite(12, HIGH)",
    ],
  },

  // ------- METADATA -------
  skillMappings: ["digital-io", "breadboard", "ohms-law", "led-circuits", "arduino-basics"],
  concepts: ["GPIO digital output", "LED polarity", "Current-limiting resistor", "Ohm's Law", "Breadboard routing", "GND loop"],

  // ------- CODE -------
  codeFileName: "led_blink.ino",
  code: `/*
 * LED Blink — Digital Output & Ohm's Law
 * 
 * Turns an external LED on and off at a 1-second interval
 * using digital pin 13 and a 220Ω current-limiting resistor.
 * 
 * Circuit:
 *   Pin 13 → 220Ω resistor → LED anode (+)
 *   LED cathode (−) → GND
 */

const int LED_PIN = 13;          // Digital pin connected to the LED circuit
const int BLINK_DELAY_MS = 1000; // Delay between ON/OFF transitions (milliseconds)

void setup() {
  // Configure LED_PIN as a digital output so we can drive it HIGH or LOW
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);   // Supply 5V to pin 13 → LED turns ON
  delay(BLINK_DELAY_MS);         // Hold the ON state for 1 second

  digitalWrite(LED_PIN, LOW);    // Pull pin 13 to 0V → LED turns OFF
  delay(BLINK_DELAY_MS);         // Hold the OFF state for 1 second
}`,
};

// ---------------------------------------------------------------
// MISSION REGISTRY
// Add new missions here. The UI reads from this array.
// ---------------------------------------------------------------

export const missionsData: Mission[] = [
  MISSION_LED_BLINK,

  // Future missions (not yet built — listed as placeholder):
  // MISSION_TRAFFIC_LIGHT
  // MISSION_BUTTON_LED
  // MISSION_BROKEN_CIRCUIT_DEBUG
  // MISSION_REVERSE_ENGINEER_COUNTER
];

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------

export function getMissionById(id: string): Mission | undefined {
  return missionsData.find((m) => m.id === id);
}

export function getMissionsByDifficulty(d: Difficulty): Mission[] {
  return missionsData.filter((m) => m.difficulty === d);
}
