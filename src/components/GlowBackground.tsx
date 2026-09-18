"use client";

import React, { useEffect, useRef } from "react";

interface GlowBackgroundProps {
  variant?: "hero" | "section" | "lab" | "dark";
  className?: string;
  /** scroll-driven offset so the glow moves with page scroll */
  scrollOffset?: number;
}

/**
 * Reusable layered background system:
 * Layer 1: obsidian base
 * Layer 2: radial purple glow (primary)
 * Layer 3: blue secondary glow (depth)
 * Layer 4: technical grid
 * Layer 5: noise texture (CSS)
 */
export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  variant = "section",
  className = "",
  scrollOffset = 0,
}) => {
  const configs: Record<
    string,
    {
      purplePos: string;
      purpleSize: string;
      purpleOpacity: number;
      bluePos: string;
      blueSize: string;
      blueOpacity: number;
      grid: boolean;
    }
  > = {
    hero: {
      purplePos: "35% 60%",
      purpleSize: "70% 70%",
      purpleOpacity: 0.18,
      bluePos: "75% 30%",
      blueSize: "50% 50%",
      blueOpacity: 0.1,
      grid: true,
    },
    section: {
      purplePos: "20% 50%",
      purpleSize: "55% 80%",
      purpleOpacity: 0.1,
      bluePos: "80% 50%",
      blueSize: "40% 60%",
      blueOpacity: 0.06,
      grid: true,
    },
    lab: {
      purplePos: "50% 40%",
      purpleSize: "80% 90%",
      purpleOpacity: 0.22,
      bluePos: "60% 70%",
      blueSize: "60% 60%",
      blueOpacity: 0.14,
      grid: true,
    },
    dark: {
      purplePos: "50% 50%",
      purpleSize: "40% 40%",
      purpleOpacity: 0.06,
      bluePos: "50% 50%",
      blueSize: "30% 30%",
      blueOpacity: 0.04,
      grid: false,
    },
  };

  const c = configs[variant] ?? configs.section;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Base obsidian — handled by body background */}

      {/* Layer 2: Purple radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse ${c.purpleSize} at ${c.purplePos}, rgba(168,85,247,${c.purpleOpacity}) 0%, transparent 70%)`,
          transform: `translateY(${scrollOffset * 0.15}px)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* Layer 3: Blue secondary glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse ${c.blueSize} at ${c.bluePos}, rgba(59,130,246,${c.blueOpacity}) 0%, transparent 70%)`,
          transform: `translateY(${scrollOffset * 0.08}px)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* Layer 4: Technical grid */}
      {c.grid && (
        <div
          className="absolute inset-0 tech-grid opacity-80"
          style={{
            transform: `translateY(${scrollOffset * 0.05}px)`,
            transition: "transform 0.1s linear",
          }}
        />
      )}

      {/* Layer 5: Vignette — edges fade to obsidian */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(6,4,13,0.6) 100%)",
        }}
      />
    </div>
  );
};
