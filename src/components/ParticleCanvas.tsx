"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaTarget: number;
  alphaDelta: number;
  color: string;
}

interface ParticleCanvasProps {
  count?: number;
  className?: string;
}

/**
 * Lightweight floating particle system.
 * Very subtle — purple micro-dots with faint connecting lines.
 * GPU-friendly: only transforms, no repaints.
 * Automatically halted on mobile / reduced-motion.
 */
export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  count = 60,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;

    // Bail on coarse pointer (mobile) or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight);

    const colors = [
      "rgba(168,85,247,",   // purple
      "rgba(139,92,246,",   // violet
      "rgba(59,130,246,",   // blue
      "rgba(192,132,252,",  // purple-bright
    ];

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      alphaTarget: Math.random() * 0.5 + 0.15,
      alphaDelta: (Math.random() - 0.5) * 0.003,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const CONNECTION_DIST = 80;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Breathe alpha
        p.alpha += p.alphaDelta;
        if (p.alpha <= 0.05 || p.alpha >= 0.55) p.alphaDelta *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }

      // Draw connecting lines between close particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = ((1 - dist / CONNECTION_DIST) * 0.08).toFixed(2);
            ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};
