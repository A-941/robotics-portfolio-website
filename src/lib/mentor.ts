/* ================================================================
   MENTOR — AI Mentor Abstraction Layer
   
   Phase 1: Deterministic mock responses based on mission state.
   Phase 2: Replace getResponse() internals with an API call.
   The interface stays identical — callers don't need to change.
   
   The mentor does NOT immediately give solutions.
   It asks guiding questions and gives progressive hints.
   ================================================================ */

import type { MissionState, MissionStage } from "@/hooks/useMissionState";

// ---------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------

export interface MentorMessage {
  role: "mentor";
  content: string;
  type: "question" | "direction" | "encouragement" | "explanation" | "acknowledgement";
  suggestHint?: boolean;  // If true, show "Get a Hint" button after this message
}

export interface MentorContext {
  missionId: string;
  stage: MissionStage;
  hintsRevealed: number[];
  attemptCount: number;
  lastAttemptPassed?: boolean;
  failedItems?: string[];
  completedSteps: number[];
  totalSteps: number;
}

// ---------------------------------------------------------------
// RESPONSE TREE — deterministic per mission/stage/state
// ---------------------------------------------------------------

// Responses for Mission 01 (led-blink)
const LED_BLINK_RESPONSES = {
  // Student says "I'm stuck" during the workspace BUILD stage
  stuckInWorkspace: (hintsUsed: number, completedSteps: number, totalSteps: number): MentorMessage => {
    if (hintsUsed === 0) {
      return {
        role: "mentor",
        type: "question",
        content: `Before opening a hint: you've completed ${completedSteps} of ${totalSteps} wiring steps. Can you trace the full electrical path from Pin 13 → through each component → back to GND? Where does the path break?`,
        suggestHint: true,
      };
    }
    if (hintsUsed === 1) {
      return {
        role: "mentor",
        type: "direction",
        content: "Check the LED specifically. Which leg is longer? That's the anode (+). It should be on the same row as the resistor's output lead.",
        suggestHint: true,
      };
    }
    if (hintsUsed >= 2) {
      return {
        role: "mentor",
        type: "direction",
        content: "Let's narrow it down. Look at the circuit image and compare each step to your actual breadboard. Which step looks different from the reference?",
        suggestHint: true,
      };
    }
    return {
      role: "mentor",
      type: "encouragement",
      content: "You're close. Try the next hint — it'll point you to exactly where to look.",
    };
  },

  // After a failed test
  afterFailedAttempt: (failedItems: string[]): MentorMessage => {
    if (failedItems.includes("led-polarity")) {
      return {
        role: "mentor",
        type: "direction",
        content: "The LED polarity is the most common issue. Pick up the LED: look for the longer leg. That's the anode (+). It must point toward the resistor — toward Pin 13, not toward GND.",
        suggestHint: false,
      };
    }
    if (failedItems.includes("gnd-complete")) {
      return {
        role: "mentor",
        type: "explanation",
        content: "Think of electricity like water in a pipe — it needs a complete loop. If the GND connection is missing, current has nowhere to go and the LED won't turn on. Check that a wire connects from the LED cathode row back to any Arduino GND pin.",
        suggestHint: false,
      };
    }
    if (failedItems.includes("resistor-series")) {
      return {
        role: "mentor",
        type: "direction",
        content: "The resistor must sit IN BETWEEN Pin 13 and the LED — not after the LED, not on the GND side. Check: does the resistor share a row with your Pin 13 wire on one side, and a row with the LED anode on the other?",
        suggestHint: false,
      };
    }
    if (failedItems.includes("code-uploaded")) {
      return {
        role: "mentor",
        type: "acknowledgement",
        content: "Almost there — the circuit looks right. Now upload the code using Arduino IDE. Copy it from the 'Code' tab in the side panel and paste it into a new sketch.",
        suggestHint: false,
      };
    }
    return {
      role: "mentor",
      type: "encouragement",
      content: "You found what's not working — that's the first step in debugging. Fix the items you marked, then test again. Mistakes are just data.",
      suggestHint: true,
    };
  },

  // After multiple failed attempts
  multipleFailures: (attemptCount: number): MentorMessage => {
    if (attemptCount === 2) {
      return {
        role: "mentor",
        type: "direction",
        content: "Second attempt. Let's be systematic: disconnect everything, go back to Step 1, and rebuild following the checklist one step at a time. Don't skip any step.",
        suggestHint: true,
      };
    }
    return {
      role: "mentor",
      type: "acknowledgement",
      content: "This is normal — most engineers need multiple attempts on their first circuit. Each attempt teaches you something. Use a hint to narrow down exactly where the problem is.",
      suggestHint: true,
    };
  },

  // After passing the test
  afterSuccess: (): MentorMessage => ({
    role: "mentor",
    type: "acknowledgement",
    content: "The circuit works. Now the important part: understanding WHY it works. Answer the next question correctly and you've demonstrated the skill — not just followed steps.",
  }),

  // Asking about WHY (general fallback)
  whyStagePrompt: (): MentorMessage => ({
    role: "mentor",
    type: "question",
    content: "Your LED is on. Before moving on: why did we need that resistor? Think about what happens without one. Then pick the answer that makes physical sense.",
  }),

  // After wrong WHY answer
  wrongWhyAnswer: (): MentorMessage => ({
    role: "mentor",
    type: "explanation",
    content: "Think about it physically: if you connect a wire directly from 5V to GND with nothing in between, what happens? Maximum current flows. The resistor's job is to reduce that current to a safe level for both the LED and the Arduino pin.",
  }),
};

// ---------------------------------------------------------------
// GENERIC FALLBACK RESPONSES
// ---------------------------------------------------------------

const GENERIC_RESPONSES: Record<string, MentorMessage> = {
  encouragement: {
    role: "mentor",
    type: "encouragement",
    content: "This is how engineers learn — by building, testing, and debugging. You're doing exactly the right thing.",
  },
  stuck_generic: {
    role: "mentor",
    type: "question",
    content: "Good instinct to ask for help. Before I give you a direction: what have you already tried? That tells me where to point you.",
    suggestHint: true,
  },
};

// ---------------------------------------------------------------
// MAIN INTERFACE
// ---------------------------------------------------------------

interface GetResponseOptions {
  trigger: "stuck" | "failed_test" | "multiple_failures" | "success" | "why_wrong" | "general";
  context: MentorContext;
  failedItems?: string[];
}

export function getMentorResponse(options: GetResponseOptions): MentorMessage {
  const { trigger, context, failedItems = [] } = options;
  const { missionId, hintsRevealed, attemptCount, completedSteps, totalSteps } = context;
  const hintsUsed = hintsRevealed.length;

  // Mission-specific responses
  if (missionId === "led-blink") {
    switch (trigger) {
      case "stuck":
        return LED_BLINK_RESPONSES.stuckInWorkspace(hintsUsed, completedSteps.length, totalSteps);
      case "failed_test":
        if (attemptCount >= 2) return LED_BLINK_RESPONSES.multipleFailures(attemptCount);
        return LED_BLINK_RESPONSES.afterFailedAttempt(failedItems);
      case "multiple_failures":
        return LED_BLINK_RESPONSES.multipleFailures(attemptCount);
      case "success":
        return LED_BLINK_RESPONSES.afterSuccess();
      case "why_wrong":
        return LED_BLINK_RESPONSES.wrongWhyAnswer();
      case "general":
        return LED_BLINK_RESPONSES.whyStagePrompt();
    }
  }

  // Generic fallback (for future missions before they get specific responses)
  return trigger === "stuck"
    ? GENERIC_RESPONSES.stuck_generic
    : GENERIC_RESPONSES.encouragement;
}

/* ================================================================
   PHASE 2 UPGRADE PATH:
   
   When you have an AI API key:
   
   export async function getMentorResponseAI(
     options: GetResponseOptions
   ): Promise<MentorMessage> {
     const systemPrompt = buildSystemPrompt(options.context);
     const response = await fetch("http://localhost:20128/v1/chat/completions", {
       method: "POST",
       headers: { "Authorization": "Bearer sk-...", "Content-Type": "application/json" },
       body: JSON.stringify({
         model: "auto",
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: buildUserMessage(options) },
         ],
       }),
     });
     // ... parse and return
   }
   
   The existing getMentorResponse() stays as fallback if API fails.
   ================================================================ */
