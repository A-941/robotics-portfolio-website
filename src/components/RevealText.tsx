"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface RevealTextProps {
  text: string;
  /** Animates each character with stagger */
  charStagger?: boolean;
  /** Gradient purple text */
  gradient?: boolean;
  /** Electric purple glow on reveal */
  glow?: boolean;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

/**
 * Text reveal animation component.
 * Default: word-by-word slide+fade from below.
 * charStagger: individual character animation.
 * gradient: purple gradient fill.
 * glow: purple text-shadow on entry.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  charStagger = false,
  gradient = false,
  glow = false,
  delay = 0,
  className = "",
  as: Tag = "span",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  const Comp = Tag as React.ElementType;

  if (charStagger) {
    const chars = text.split("");
    return (
      <Comp
        ref={ref}
        className={`inline-block overflow-hidden ${gradient ? "gradient-text" : ""} ${className}`}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: "0.5em", filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.03,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
            style={char === " " ? { minWidth: "0.3em" } : {}}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Comp>
    );
  }

  // Word-by-word reveal
  const words = text.split(" ");
  return (
    <Comp
      ref={ref}
      className={`${gradient ? "gradient-text" : ""} ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
            style={
              glow && isInView
                ? { textShadow: "0 0 30px rgba(192,132,252,0.6), 0 0 60px rgba(168,85,247,0.2)" }
                : {}
            }
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
};
