"use client";

import React from "react";
import { motion } from "motion/react";
import type { WiringCheckStep, HintLadder } from "@/data/missionsData";

interface StageWorkspaceProps {
  wiringSteps: WiringCheckStep[];
  completedSteps: number[];
  onToggleStep: (idx: number) => void;
  hints: HintLadder[];
  highestHintRevealed: number;
  hintsRevealed: number[];
  onRevealNextHint: () => void;
  onReadyToTest: () => void;
  attempts: { passed: boolean }[];
}

export const StageWorkspace: React.FC<StageWorkspaceProps> = ({
  wiringSteps,
  completedSteps,
  onToggleStep,
  hints,
  highestHintRevealed,
  hintsRevealed,
  onRevealNextHint,
  onReadyToTest,
  attempts,
}) => {
  const allStepsDone = completedSteps.length === wiringSteps.length;
  const lastFailed = attempts.length > 0 && !attempts[attempts.length - 1].passed;

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Previous attempt feedback banner */}
      {lastFailed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 border text-sm"
          style={{ borderColor: "#f97316", color: "#f97316", backgroundColor: "rgba(249,115,22,0.05)" }}
        >
          <span className="font-semibold">Something isn't right yet.</span>
          {" "}Check the items below, fix what's wrong, then test again.
        </motion.div>
      )}

      {/* Wiring checklist */}
      <div className="flex-grow space-y-2">
        <p className="label mb-3" style={{ color: "var(--text-subtle)" }}>
          Wiring checklist — check each step as you complete it on your breadboard
        </p>

        {wiringSteps.map((step, i) => {
          const isDone = completedSteps.includes(i);
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => onToggleStep(i)}
                className="w-full text-left transition-colors border"
                style={{
                  borderColor: isDone ? "rgba(232,255,0,0.35)" : "var(--border)",
                  backgroundColor: isDone ? "var(--accent-dim)" : "var(--surface)",
                }}
                aria-pressed={isDone}
              >
                <div className="flex items-start gap-4 px-4 py-3.5">
                  {/* Checkbox */}
                  <div
                    className="w-5 h-5 border shrink-0 flex items-center justify-center mt-0.5 transition-colors"
                    style={{
                      borderColor: isDone ? "var(--accent)" : "var(--border)",
                      backgroundColor: isDone ? "var(--accent)" : "transparent",
                    }}
                  >
                    {isDone && (
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#000" }}
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="flex-grow space-y-1">
                    {/* Step label + meta */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="label"
                        style={{ color: "var(--text-subtle)", fontSize: "10px" }}
                      >
                        Step {step.step}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: isDone ? "var(--text-secondary)" : "var(--text-primary)" }}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Connection: from → to */}
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                      <span
                        className="label px-1.5 py-0.5 border"
                        style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
                      >
                        {step.from}
                      </span>
                      <span style={{ color: "var(--text-subtle)" }}>→</span>
                      <span
                        className="label px-1.5 py-0.5 border"
                        style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
                      >
                        {step.to}
                      </span>
                      <span
                        className="label px-1.5 py-0.5"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-space-mono)" }}
                      >
                        {step.wireColor}
                      </span>
                    </div>

                    {/* Description (only when unchecked) */}
                    {!isDone && (
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-subtle)" }}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Progress counter */}
      <p className="label" style={{ color: "var(--text-subtle)" }}>
        {completedSteps.length}/{wiringSteps.length} steps completed
      </p>

      {/* Hint section */}
      <div
        className="border-t pt-4 space-y-3"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Progressive hints — reveals one level at a time
        </p>

        {/* Already revealed hints */}
        {hintsRevealed.map((level) => {
          const hint = hints.find((h) => h.level === level);
          if (!hint) return null;
          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border p-3 space-y-1"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <p className="label" style={{ color: "var(--accent)" }}>
                Hint {level}/5 — {hint.badge}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {hint.content}
              </p>
            </motion.div>
          );
        })}

        {/* Reveal next hint button */}
        {highestHintRevealed < 5 && (
          <button
            onClick={onRevealNextHint}
            className="text-sm border px-4 py-2 transition-colors hover:border-accent"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {highestHintRevealed === 0
              ? "I'm stuck — get first hint"
              : `Get hint ${highestHintRevealed + 1}/5`}
          </button>
        )}
        {highestHintRevealed === 5 && (
          <p className="label" style={{ color: "var(--text-subtle)" }}>
            All hints revealed. Try building based on Hint 5.
          </p>
        )}
      </div>

      {/* Test button */}
      <div className="pt-2">
        <button
          onClick={onReadyToTest}
          disabled={!allStepsDone}
          className="w-full sm:w-auto px-6 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          {allStepsDone ? "Test my circuit →" : `Complete all ${wiringSteps.length} steps first`}
        </button>
        {!allStepsDone && (
          <p className="label mt-2" style={{ color: "var(--text-subtle)" }}>
            Check off each step as you complete it on your real breadboard.
          </p>
        )}
      </div>
    </div>
  );
};
