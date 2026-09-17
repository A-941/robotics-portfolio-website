"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { TestCheckItem } from "@/data/missionsData";
import type { Attempt } from "@/hooks/useMissionState";
import { getMentorResponse } from "@/lib/mentor";

interface StageTestProps {
  testItems: TestCheckItem[];
  attempts: Attempt[];
  hintsRevealed: number[];
  missionId: string;
  completedSteps: number[];
  totalSteps: number;
  onSubmit: (checked: string[], failed: string[]) => boolean;
  onBackToWorkspace: () => void;
}

type ItemState = "yes" | "no" | "unanswered";

export const StageTest: React.FC<StageTestProps> = ({
  testItems,
  attempts,
  hintsRevealed,
  missionId,
  completedSteps,
  totalSteps,
  onSubmit,
  onBackToWorkspace,
}) => {
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>(
    Object.fromEntries(testItems.map((t) => [t.id, "unanswered"]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);
  const [mentorMessage, setMentorMessage] = useState<string | null>(null);

  const allAnswered = testItems.every((t) => itemStates[t.id] !== "unanswered");
  const failedItems = testItems.filter((t) => itemStates[t.id] === "no").map((t) => t.id);
  const passedItems = testItems.filter((t) => itemStates[t.id] === "yes").map((t) => t.id);

  const handleAnswer = (id: string, answer: "yes" | "no") => {
    if (submitted) return;
    setItemStates((prev) => ({ ...prev, [id]: answer }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    const passed = onSubmit(passedItems, failedItems);
    setResult(passed ? "pass" : "fail");
    setSubmitted(true);

    if (!passed) {
      const msg = getMentorResponse({
        trigger: failedItems.length > 0 ? "failed_test" : "multiple_failures",
        context: {
          missionId,
          stage: "test",
          hintsRevealed,
          attemptCount: attempts.length + 1,
          completedSteps,
          totalSteps,
        },
        failedItems,
      });
      setMentorMessage(msg.content);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="label" style={{ color: "var(--accent)" }}>
          Test your circuit
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Be honest — this is how you learn. For each item, answer whether it's truly done on your breadboard right now.
        </p>
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Attempt {attempts.length + 1}
          {attempts.length > 0 && ` — you've tried ${attempts.length} time${attempts.length > 1 ? "s" : ""} before`}
        </p>
      </motion.div>

      {/* Checklist */}
      <div className="flex-grow space-y-3">
        {testItems.map((item, i) => {
          const state = itemStates[item.id];
          const isFailed = submitted && state === "no";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="border"
              style={{
                borderColor: isFailed
                  ? "#f97316"
                  : state === "yes"
                  ? "rgba(232,255,0,0.35)"
                  : "var(--border)",
                backgroundColor: isFailed
                  ? "rgba(249,115,22,0.05)"
                  : "var(--surface)",
              }}
            >
              <div className="p-4 space-y-3">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {i + 1}. {item.label}
                </p>

                {/* Yes/No buttons */}
                {!submitted && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(item.id, "yes")}
                      className="px-4 py-1.5 text-sm border transition-colors"
                      style={{
                        borderColor: state === "yes" ? "var(--accent)" : "var(--border)",
                        backgroundColor: state === "yes" ? "var(--accent)" : "transparent",
                        color: state === "yes" ? "#000" : "var(--text-secondary)",
                      }}
                    >
                      ✓ Yes, done
                    </button>
                    <button
                      onClick={() => handleAnswer(item.id, "no")}
                      className="px-4 py-1.5 text-sm border transition-colors"
                      style={{
                        borderColor: state === "no" ? "#f97316" : "var(--border)",
                        backgroundColor: state === "no" ? "rgba(249,115,22,0.1)" : "transparent",
                        color: state === "no" ? "#f97316" : "var(--text-secondary)",
                      }}
                    >
                      ✗ Not yet
                    </button>
                  </div>
                )}

                {/* Failure guidance */}
                <AnimatePresence>
                  {isFailed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-3"
                      style={{ borderColor: "rgba(249,115,22,0.3)" }}
                    >
                      <p className="label mb-1" style={{ color: "#f97316" }}>
                        What to check
                      </p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {item.failureGuidance}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mentor message after failure */}
      <AnimatePresence>
        {mentorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border p-4 space-y-1"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <p className="label" style={{ color: "var(--accent)" }}>
              Mentor
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {mentorMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="space-y-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "#000" }}
          >
            Submit self-assessment
          </button>
        ) : result === "fail" ? (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBackToWorkspace}
              className="px-6 py-3 text-sm font-bold transition-transform active:scale-95"
              style={{ backgroundColor: "var(--accent)", color: "#000" }}
            >
              Fix and try again →
            </button>
          </div>
        ) : null}

        {!allAnswered && !submitted && (
          <p className="label" style={{ color: "var(--text-subtle)" }}>
            Answer all {testItems.length} items to submit
          </p>
        )}
      </div>
    </div>
  );
};
