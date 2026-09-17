"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { MissionComponent } from "@/data/missionsData";

interface StageComponentsProps {
  components: MissionComponent[];
  onContinue: () => void;
}

export const StageComponents: React.FC<StageComponentsProps> = ({
  components,
  onContinue,
}) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [seenComponents, setSeenComponents] = useState<Set<number>>(new Set());

  const handleExpand = (i: number) => {
    setExpandedIdx(expandedIdx === i ? null : i);
    setSeenComponents((prev) => new Set(prev).add(i));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="label mb-1" style={{ color: "var(--accent)" }}>
            Your tools
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Tap each component to understand what it does before you build.
          </p>
        </motion.div>

        {/* Component list */}
        <div className="space-y-2">
          {components.map((comp, i) => {
            const isExpanded = expandedIdx === i;
            const isSeen = seenComponents.has(i);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => handleExpand(i)}
                  className="w-full text-left border transition-colors"
                  style={{
                    borderColor: isExpanded
                      ? "var(--accent)"
                      : isSeen
                      ? "rgba(232,255,0,0.25)"
                      : "var(--border)",
                    backgroundColor: isExpanded
                      ? "var(--accent-dim)"
                      : "var(--surface)",
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center justify-between px-4 py-3 gap-3">
                    <div className="flex items-center gap-3">
                      {comp.symbol && (
                        <span className="text-lg" aria-hidden="true">
                          {comp.symbol}
                        </span>
                      )}
                      <div>
                        <span
                          className="text-sm font-semibold block"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {comp.name}
                        </span>
                        <span className="label" style={{ color: "var(--text-subtle)" }}>
                          × {comp.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isSeen && !isExpanded && (
                        <span
                          className="label px-2 py-0.5"
                          style={{ color: "var(--accent)", borderColor: "var(--accent-border)", border: "1px solid" }}
                        >
                          ✓
                        </span>
                      )}
                      <span
                        className="text-sm transition-transform duration-200"
                        style={{
                          color: "var(--text-subtle)",
                          display: "inline-block",
                          transform: isExpanded ? "rotate(90deg)" : "none",
                        }}
                      >
                        ›
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-4 pb-4 pt-1 border-t"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <p
                            className="text-sm leading-relaxed mb-2"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {comp.beginnerNote}
                          </p>
                          <p className="label" style={{ color: "var(--text-subtle)" }}>
                            Role: {comp.purpose}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Seen counter */}
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          {seenComponents.size}/{components.length} components inspected
        </p>
      </div>

      {/* Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-6"
      >
        <button
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3 text-sm font-bold transition-transform active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          I have my components →
        </button>
        {seenComponents.size < components.length && (
          <p className="label mt-2" style={{ color: "var(--text-subtle)" }}>
            Tip: tap each component before continuing
          </p>
        )}
      </motion.div>
    </div>
  );
};
