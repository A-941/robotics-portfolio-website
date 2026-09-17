"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { WhyQuestion } from "@/data/missionsData";
import { getMentorResponse } from "@/lib/mentor";

interface StageWhyProps {
  whyQuestion: WhyQuestion;
  missionId: string;
  hintsRevealed: number[];
  attemptCount: number;
  onAnswered: (optionIndex: number) => void;
}

export const StageWhy: React.FC<StageWhyProps> = ({
  whyQuestion,
  missionId,
  hintsRevealed,
  attemptCount,
  onAnswered,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const handleContinue = () => {
    if (selected === null) return;
    onAnswered(selected);
  };

  const isCorrect = selected !== null && whyQuestion.options[selected]?.isCorrect;
  const wrongMentorMsg = getMentorResponse({
    trigger: "why_wrong",
    context: {
      missionId,
      stage: "why",
      hintsRevealed,
      attemptCount,
      completedSteps: [],
      totalSteps: 0,
    },
  });

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="label" style={{ color: "var(--accent)" }}>
          Your circuit works. Now understand why.
        </p>
        <h2
          className="text-lg sm:text-xl font-semibold leading-snug"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {whyQuestion.question}
        </h2>
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Concept: {whyQuestion.concept}
        </p>
      </motion.div>

      {/* Options */}
      <div className="flex-grow space-y-3">
        {whyQuestion.options.map((opt, i) => {
          const isSelected = selected === i;
          const showResult = revealed && isSelected;
          const optIsCorrect = opt.isCorrect;

          let borderColor = "var(--border)";
          let bgColor = "var(--surface)";

          if (isSelected && !revealed) {
            borderColor = "var(--accent)";
            bgColor = "var(--accent-dim)";
          }
          if (showResult) {
            borderColor = optIsCorrect ? "rgba(74,222,128,0.6)" : "#f97316";
            bgColor = optIsCorrect ? "rgba(74,222,128,0.05)" : "rgba(249,115,22,0.05)";
          }

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="w-full text-left border disabled:cursor-default"
              style={{ borderColor, backgroundColor: bgColor }}
              aria-pressed={isSelected}
            >
              <div className="p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 border shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      borderColor: isSelected ? (revealed ? (optIsCorrect ? "#4ade80" : "#f97316") : "var(--accent)") : "var(--border)",
                      backgroundColor: isSelected ? (revealed ? (optIsCorrect ? "rgba(74,222,128,0.2)" : "rgba(249,115,22,0.2)") : "var(--accent-dim)") : "transparent",
                    }}
                  >
                    {isSelected && revealed && (
                      <span className="text-xs" style={{ color: optIsCorrect ? "#4ade80" : "#f97316" }}>
                        {optIsCorrect ? "✓" : "✗"}
                      </span>
                    )}
                    {isSelected && !revealed && (
                      <span className="text-xs" style={{ color: "var(--accent)" }}>•</span>
                    )}
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {opt.text}
                  </p>
                </div>

                {/* Explanation — only shown after submit */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t pt-2 pl-8"
                      style={{ borderColor: optIsCorrect ? "rgba(74,222,128,0.3)" : "rgba(249,115,22,0.3)" }}
                    >
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {opt.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Mentor message for wrong answer */}
      <AnimatePresence>
        {revealed && !isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border p-4 space-y-1"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
          >
            <p className="label" style={{ color: "var(--accent)" }}>
              Mentor
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {wrongMentorMsg.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div>
        {!revealed ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="px-6 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "#000" }}
          >
            Submit answer
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="px-6 py-3 text-sm font-bold transition-transform active:scale-95"
            style={{ backgroundColor: "var(--accent)", color: "#000" }}
          >
            {isCorrect ? "Understood — continue to Proof Task →" : "OK, I understand — continue →"}
          </button>
        )}
      </div>
    </div>
  );
};
