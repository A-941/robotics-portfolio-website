"use client";

import React from "react";
import { motion } from "motion/react";
import type { ProofTask } from "@/data/missionsData";

interface StageProofProps {
  proofTask: ProofTask;
  checkedItems: string[];
  onToggleItem: (item: string) => void;
  onSubmit: () => void;
}

export const StageProof: React.FC<StageProofProps> = ({
  proofTask,
  checkedItems,
  onToggleItem,
  onSubmit,
}) => {
  const allDone = proofTask.checkItems.every((item) => checkedItems.includes(item));

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <p className="label" style={{ color: "var(--accent)" }}>
          {proofTask.badge}
        </p>
        <h2
          className="text-lg sm:text-xl font-semibold"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {proofTask.title}
        </h2>
      </motion.div>

      {/* Situation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-l-2 pl-4"
        style={{ borderColor: "var(--accent)" }}
      >
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          {proofTask.situation}
        </p>
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {proofTask.objective}
        </p>
      </motion.div>

      {/* What's different */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border p-4"
        style={{
          borderColor: "var(--accent-border)",
          backgroundColor: "var(--accent-dim)",
        }}
      >
        <p className="label mb-1" style={{ color: "var(--accent)" }}>
          What's different this time
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {proofTask.whatChanged}
        </p>
      </motion.div>

      {/* Proof checklist */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-grow space-y-2"
      >
        <p className="label mb-2" style={{ color: "var(--text-subtle)" }}>
          Check off each item when done on your actual hardware
        </p>
        {proofTask.checkItems.map((item, i) => {
          const isDone = checkedItems.includes(item);
          return (
            <button
              key={i}
              onClick={() => onToggleItem(item)}
              className="w-full text-left border transition-colors"
              style={{
                borderColor: isDone ? "rgba(232,255,0,0.35)" : "var(--border)",
                backgroundColor: isDone ? "var(--accent-dim)" : "var(--surface)",
              }}
              aria-pressed={isDone}
            >
              <div className="flex items-start gap-4 px-4 py-3">
                <div
                  className="w-5 h-5 border shrink-0 flex items-center justify-center mt-0.5 transition-colors"
                  style={{
                    borderColor: isDone ? "var(--accent)" : "var(--border)",
                    backgroundColor: isDone ? "var(--accent)" : "transparent",
                  }}
                >
                  {isDone && (
                    <span className="text-xs font-bold" style={{ color: "#000" }}>
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: isDone ? "var(--text-secondary)" : "var(--text-primary)" }}>
                  {item}
                </p>
              </div>
            </button>
          );
        })}

        <p className="label pt-1" style={{ color: "var(--text-subtle)" }}>
          {checkedItems.length}/{proofTask.checkItems.length} items complete
        </p>
      </motion.div>

      {/* Note: this is self-guided */}
      <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
        This is self-verified. The skill becomes "Demonstrated" when you submit — commit to actually doing it on your hardware.
      </p>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={!allDone}
        className="w-full sm:w-auto px-6 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95"
        style={{ backgroundColor: "var(--accent)", color: "#000" }}
      >
        I've completed the proof task →
      </button>
    </div>
  );
};
