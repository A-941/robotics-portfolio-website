"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "explore" | "open" | "read" | "lab";

const STATE_STYLES: Record<
  CursorState,
  { size: number; borderColor: string; bg: string; label: string }
> = {
  default: {
    size: 16,
    borderColor: "rgba(168,85,247,0.5)",
    bg: "transparent",
    label: "",
  },
  explore: {
    size: 68,
    borderColor: "rgba(168,85,247,0.8)",
    bg: "rgba(168,85,247,0.06)",
    label: "EXPLORE",
  },
  open: {
    size: 60,
    borderColor: "rgba(168,85,247,0.8)",
    bg: "rgba(168,85,247,0.06)",
    label: "OPEN",
  },
  read: {
    size: 60,
    borderColor: "rgba(59,130,246,0.7)",
    bg: "rgba(59,130,246,0.05)",
    label: "READ",
  },
  lab: {
    size: 72,
    borderColor: "rgba(232,121,249,0.85)",
    bg: "rgba(232,121,249,0.06)",
    label: "ENTER LAB",
  },
};

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    let rafId: number;
    // Ring (lagging)
    let ringTargetX = 0, ringTargetY = 0;
    let ringX = 0, ringY = 0;
    // Dot (instant)
    let dotX = 0, dotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      ringTargetX = e.clientX;
      ringTargetY = e.clientY;
    };

    const loop = () => {
      ringX += (ringTargetX - ringX) * 0.12;
      ringY += (ringTargetY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const resolveState = (el: Element): CursorState => {
      const tag = el.tagName.toLowerCase();
      const href = (el as HTMLAnchorElement).href || "";
      const text = (el as HTMLElement).innerText?.toLowerCase() || "";
      const cls = (el as HTMLElement).className || "";

      if (cls.includes("lab") || text.includes("enter lab") || text.includes("start mission")) return "lab";
      if (href.includes("github") || text.includes("explore") || text.includes("tutorial")) return "explore";
      if (href.includes("about") || text.includes("read") || text.includes("guide")) return "read";
      return "open";
    };

    const attachListeners = () => {
      document
        .querySelectorAll("a[href], button, [role='button']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setState(resolveState(el)));
          el.addEventListener("mouseleave", () => setState("default"));
        });
    };

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  const s = STATE_STYLES[state];
  const isExpanded = state !== "default";

  return (
    <>
      {/* Outer ring — lagging, expands */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform flex items-center justify-center"
        style={{
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          border: `1px solid ${s.borderColor}`,
          backgroundColor: s.bg,
          transition: [
            "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
            "height 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
            "border-color 0.25s",
            "background-color 0.25s",
          ].join(", "),
        }}
      >
        {s.label && (
          <span
            style={{
              fontSize: "7px",
              letterSpacing: "0.12em",
              fontFamily: "var(--font-space-mono)",
              color: isExpanded ? s.borderColor : "transparent",
              fontWeight: 700,
              textTransform: "uppercase",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </span>
        )}
      </div>

      {/* Inner dot — instant, always purple */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width: isExpanded ? 4 : 4,
          height: isExpanded ? 4 : 4,
          borderRadius: "50%",
          backgroundColor: isExpanded ? s.borderColor : "rgba(168,85,247,0.9)",
          boxShadow: isExpanded ? `0 0 8px ${s.borderColor}` : "0 0 6px rgba(168,85,247,0.5)",
          transition: "background-color 0.2s, box-shadow 0.2s",
        }}
      />
    </>
  );
};
