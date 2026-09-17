"use client";

import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setIsVisible(true);

    let rafId: number;
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows exactly
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    // Smooth laggy cursor (outer ring)
    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX - 20}px, ${curY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    // Hover detection
    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const attachListeners = () => {
      document.querySelectorAll("a, button, [role='button'], label, input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    attachListeners();
    // Re-attach on DOM changes (route navigations in Next.js)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer glow ring — smooth, laggy */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgba(6,182,212,0.7)" : "rgba(255,255,255,0.2)"}`,
          boxShadow: isHovering
            ? "0 0 18px 4px rgba(6,182,212,0.35)"
            : "0 0 8px 1px rgba(255,255,255,0.06)",
          transition: "border-color 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s",
          backgroundColor: isClicking ? "rgba(6,182,212,0.08)" : "transparent",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
        }}
      />
      {/* Inner dot — snappy */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isHovering ? "#06b6d4" : "rgba(255,255,255,0.8)",
          boxShadow: isHovering ? "0 0 8px 3px rgba(6,182,212,0.6)" : "none",
          transition: "background-color 0.15s, box-shadow 0.15s",
          scale: isClicking ? "0.6" : "1",
        }}
      />
    </>
  );
};
