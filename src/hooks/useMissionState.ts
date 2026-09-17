"use client";

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------

export interface Attempt {
  timestamp: string;
  checkedItems: string[];         // Which testItem IDs the student marked ✓
  failedItems: string[];          // Which testItem IDs the student said ✗
  hintsUsedBefore: number;        // How many hints were used before this attempt
  passed: boolean;
}

export type MissionStage =
  | "context"       // 1. Story + situation
  | "components"    // 2. Component inspector
  | "objective"     // 3. Goal + success criteria
  | "workspace"     // 4. Interactive wiring checklist (BUILD)
  | "test"          // 5. Self-assessment
  | "why"           // 6. Conceptual question (after passing test)
  | "proof"         // 7. Variant challenge
  | "complete";     // 8. Done!

export interface MissionState {
  missionId: string;
  stage: MissionStage;
  completedSteps: number[];       // Wiring steps marked as done (indices)
  hintsRevealed: number[];        // Hint levels revealed (1-5)
  attempts: Attempt[];
  whyAnsweredIndex: number | null; // Which option was selected
  proofCheckedItems: string[];
  proofSubmitted: boolean;
  startedAt: string;
  completedAt?: string;
  lastUpdated: string;
}

// ---------------------------------------------------------------
// STAGE ORDER (for navigation)
// ---------------------------------------------------------------

export const STAGE_ORDER: MissionStage[] = [
  "context",
  "components",
  "objective",
  "workspace",
  "test",
  "why",
  "proof",
  "complete",
];

export const STAGE_LABELS: Record<MissionStage, string> = {
  context: "Situation",
  components: "Your Tools",
  objective: "Objective",
  workspace: "Build It",
  test: "Test",
  why: "Why?",
  proof: "Prove It",
  complete: "Complete",
};

// ---------------------------------------------------------------
// STORAGE KEY
// ---------------------------------------------------------------

function storageKey(missionId: string) {
  return `mission_state_${missionId}`;
}

// ---------------------------------------------------------------
// DEFAULT STATE
// ---------------------------------------------------------------

function createInitialState(missionId: string): MissionState {
  return {
    missionId,
    stage: "context",
    completedSteps: [],
    hintsRevealed: [],
    attempts: [],
    whyAnsweredIndex: null,
    proofCheckedItems: [],
    proofSubmitted: false,
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------
// HOOK
// ---------------------------------------------------------------

export function useMissionState(missionId: string) {
  const [state, setState] = useState<MissionState>(() =>
    createInitialState(missionId)
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(storageKey(missionId));
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as MissionState;
        setState(parsed);
      } catch {
        // Corrupted — start fresh
        setState(createInitialState(missionId));
      }
    }
    setIsLoaded(true);
  }, [missionId]);

  // Persist to localStorage on every change
  const persist = useCallback((next: MissionState) => {
    if (typeof window === "undefined") return;
    const withTimestamp = { ...next, lastUpdated: new Date().toISOString() };
    localStorage.setItem(storageKey(missionId), JSON.stringify(withTimestamp));
    setState(withTimestamp);
  }, [missionId]);

  // ---------------------------------------------------------------
  // ACTIONS
  // ---------------------------------------------------------------

  const advanceStage = useCallback(() => {
    setState((prev) => {
      const currentIdx = STAGE_ORDER.indexOf(prev.stage);
      const nextStage = STAGE_ORDER[Math.min(currentIdx + 1, STAGE_ORDER.length - 1)];
      const next = { ...prev, stage: nextStage };
      if (nextStage === "complete" && !prev.completedAt) {
        next.completedAt = new Date().toISOString();
      }
      persist(next);
      return next;
    });
  }, [persist]);

  const goToStage = useCallback((stage: MissionStage) => {
    setState((prev) => {
      const next = { ...prev, stage };
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleStep = useCallback((stepIndex: number) => {
    setState((prev) => {
      const completed = prev.completedSteps.includes(stepIndex)
        ? prev.completedSteps.filter((i) => i !== stepIndex)
        : [...prev.completedSteps, stepIndex];
      const next = { ...prev, completedSteps: completed };
      persist(next);
      return next;
    });
  }, [persist]);

  const revealNextHint = useCallback(() => {
    setState((prev) => {
      const currentMax = prev.hintsRevealed.length > 0 ? Math.max(...prev.hintsRevealed) : 0;
      const nextLevel = currentMax + 1;
      if (nextLevel > 5) return prev;
      const next = { ...prev, hintsRevealed: [...prev.hintsRevealed, nextLevel] };
      persist(next);
      return next;
    });
  }, [persist]);

  const submitAttempt = useCallback(
    (checkedItems: string[], failedItems: string[]): boolean => {
      const passed = failedItems.length === 0;
      setState((prev) => {
        const attempt: Attempt = {
          timestamp: new Date().toISOString(),
          checkedItems,
          failedItems,
          hintsUsedBefore: prev.hintsRevealed.length,
          passed,
        };
        const next = {
          ...prev,
          attempts: [...prev.attempts, attempt],
          // If passed, advance to WHY stage
          stage: (passed ? "why" : prev.stage) as MissionStage,
        };
        persist(next);
        return next;
      });
      return passed;
    },
    [persist]
  );

  const answerWhy = useCallback((optionIndex: number) => {
    setState((prev) => {
      const next = {
        ...prev,
        whyAnsweredIndex: optionIndex,
        stage: "proof" as MissionStage,
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleProofItem = useCallback((item: string) => {
    setState((prev) => {
      const items = prev.proofCheckedItems.includes(item)
        ? prev.proofCheckedItems.filter((i) => i !== item)
        : [...prev.proofCheckedItems, item];
      const next = { ...prev, proofCheckedItems: items };
      persist(next);
      return next;
    });
  }, [persist]);

  const submitProof = useCallback(() => {
    setState((prev) => {
      const next = {
        ...prev,
        proofSubmitted: true,
        stage: "complete" as MissionStage,
        completedAt: new Date().toISOString(),
      };
      persist(next);
      return next;
    });
  }, [persist]);

  const resetMission = useCallback(() => {
    const fresh = createInitialState(missionId);
    persist(fresh);
  }, [missionId, persist]);

  // ---------------------------------------------------------------
  // COMPUTED
  // ---------------------------------------------------------------

  const stageIndex = STAGE_ORDER.indexOf(state.stage);
  const totalStages = STAGE_ORDER.length;
  const progressPercent = Math.round((stageIndex / (totalStages - 1)) * 100);
  const latestAttempt = state.attempts[state.attempts.length - 1];
  const highestHintRevealed =
    state.hintsRevealed.length > 0 ? Math.max(...state.hintsRevealed) : 0;
  const isComplete = state.stage === "complete";

  return {
    state,
    isLoaded,
    // Navigation
    advanceStage,
    goToStage,
    // BUILD stage
    toggleStep,
    // HINT
    revealNextHint,
    highestHintRevealed,
    // TEST stage
    submitAttempt,
    latestAttempt,
    // WHY stage
    answerWhy,
    // PROOF stage
    toggleProofItem,
    submitProof,
    // Reset
    resetMission,
    // Computed
    stageIndex,
    totalStages,
    progressPercent,
    isComplete,
  };
}

// ---------------------------------------------------------------
// LAB PROGRESS (cross-mission skill tracking)
// ---------------------------------------------------------------

export interface SkillRecord {
  skillId: string;
  level: "not_started" | "learning" | "practicing" | "demonstrated" | "strong";
  missionsCompleted: string[];
  lastUpdated: string;
}

export interface LabProgress {
  skills: Record<string, SkillRecord>;
  totalAttempts: number;
  missionsStarted: string[];
  missionsCompleted: string[];
  conceptsLearned: string[];
}

const LAB_PROGRESS_KEY = "lab_progress";

export function getLabProgress(): LabProgress {
  if (typeof window === "undefined") {
    return {
      skills: {},
      totalAttempts: 0,
      missionsStarted: [],
      missionsCompleted: [],
      conceptsLearned: [],
    };
  }
  const raw = localStorage.getItem(LAB_PROGRESS_KEY);
  if (!raw) {
    return {
      skills: {},
      totalAttempts: 0,
      missionsStarted: [],
      missionsCompleted: [],
      conceptsLearned: [],
    };
  }
  try {
    return JSON.parse(raw) as LabProgress;
  } catch {
    return {
      skills: {},
      totalAttempts: 0,
      missionsStarted: [],
      missionsCompleted: [],
      conceptsLearned: [],
    };
  }
}

export function recordMissionComplete(
  missionId: string,
  skillMappings: string[],
  concepts: string[]
) {
  if (typeof window === "undefined") return;
  const progress = getLabProgress();

  // Update skills
  for (const skillId of skillMappings) {
    const existing = progress.skills[skillId];
    progress.skills[skillId] = {
      skillId,
      level: "demonstrated",
      missionsCompleted: [
        ...(existing?.missionsCompleted ?? []),
        missionId,
      ],
      lastUpdated: new Date().toISOString(),
    };
  }

  // Update mission completion
  if (!progress.missionsCompleted.includes(missionId)) {
    progress.missionsCompleted.push(missionId);
  }

  // Add concepts
  for (const c of concepts) {
    if (!progress.conceptsLearned.includes(c)) {
      progress.conceptsLearned.push(c);
    }
  }

  localStorage.setItem(LAB_PROGRESS_KEY, JSON.stringify(progress));
}
