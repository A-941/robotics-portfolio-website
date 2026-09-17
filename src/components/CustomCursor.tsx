"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CursorLabel = "" | "EXPLORE" | "OPEN" | "VIEW" | "READ";

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<CursorLabel>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only on fine pointer (mouse) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsVisible(true);

    let rafId: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const attachListeners = () => {
      document.querySelectorAll("a[href], button, [role='button']").forEach((el) => {
        const href = (el as HTMLAnchorElement).href || "";
        const text = (el as HTMLElement).innerText?.toLowerCase() || "";
        const ariLabel = (el as HTMLElement).getAttribute("aria-label")?.toLowerCase() || "";

        let cursorLabel: CursorLabel = "OPEN";
        if (href.includes("github") || href.includes("projects") || text.includes("tutorial") || text.includes("explore")) {
          cursorLabel = "EXPLORE";
        } else if (href.includes("about") || href.includes("guide") || text.includes("read") || text.includes("guide")) {
          cursorLabel = "READ";
        } else if (href.includes("contact") || text.includes("contact") || text.includes("message")) {
          cursorLabel = "OPEN";
        } else if ((el as HTMLElement).tagName === "BUTTON") {
          cursorLabel = "OPEN";
        }

        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setLabel(cursorLabel);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setLabel("");
        });
      });

      // Also handle images/cards
      document.querySelectorAll(".cursor-explore").forEach((el) => {
        el.addEventListener("mouseenter", () => { setIsHovering(true); setLabel("EXPLORE"); });
        el.addEventListener("mouseleave", () => { setIsHovering(false); setLabel(""); });
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

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{
        width: isHovering ? 72 : 20,
        height: isHovering ? 72 : 20,
        borderRadius: "50%",
        border: `1px solid ${isHovering ? "#e8ff00" : "rgba(255,255,255,0.35)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "width 0.3s cubic-bezier(0.25,0.46,0.45,0.94), height 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.2s",
        backgroundColor: isHovering ? "rgba(232,255,0,0.06)" : "transparent",
      }}
    >
      {label && (
        <span
          style={{
            fontSize: "8px",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-space-mono)",
            color: "#e8ff00",
            fontWeight: 700,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
