"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  distance: number;
  speed: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const HeroOrbitalEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse coordinates relative to canvas center
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) - width / 2;
      targetMouseY = (e.clientY - rect.top) - height / 2;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Color palette for accretion particles
    const colors = [
      "rgba(6, 182, 212, ",   // Cyan
      "rgba(59, 130, 246, ",  // Blue
      "rgba(139, 92, 246, ",  // Violet / Purple
      "rgba(45, 212, 191, ",  // Teal
    ];

    const particleCount = prefersReducedMotion ? 40 : 120;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const dist = Math.random() * (Math.min(width, height) * 0.48) + 40;
      particles.push({
        x: 0,
        y: 0,
        radius: Math.random() * 1.8 + 0.6,
        angle: Math.random() * Math.PI * 2,
        distance: dist,
        speed: (0.0015 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : 1.1),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseX * 0.08;
      const centerY = height / 2 + mouseY * 0.08;

      // Draw outer ambient glow
      const ambientGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        Math.min(width, height) * 0.55
      );
      ambientGlow.addColorStop(0, "rgba(6, 182, 212, 0.08)");
      ambientGlow.addColorStop(0.35, "rgba(139, 92, 246, 0.04)");
      ambientGlow.addColorStop(0.7, "rgba(15, 23, 42, 0.02)");
      ambientGlow.addColorStop(1, "rgba(8, 8, 12, 0)");

      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital rings (event horizon guide lines)
      const ringRadii = [80, 140, 220, 310];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? "rgba(6, 182, 212, 0.05)" : "rgba(139, 92, 246, 0.04)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Black Hole / Gravitational Center Core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 65);
      coreGradient.addColorStop(0, "rgba(0, 0, 0, 0.98)");
      coreGradient.addColorStop(0.7, "rgba(4, 5, 12, 0.9)");
      coreGradient.addColorStop(0.9, "rgba(6, 182, 212, 0.15)");
      coreGradient.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 65, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Draw accretion luminous rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Draw orbiting particles & connections
      const visiblePositions: { x: number; y: number }[] = [];

      particles.forEach((p, index) => {
        if (!prefersReducedMotion) {
          p.angle += p.speed;
        }

        // Elliptical perspective orbit with slight tilt
        const tilt = 0.55; // 3D slant
        const px = centerX + Math.cos(p.angle) * p.distance;
        const py = centerY + Math.sin(p.angle) * (p.distance * tilt);

        p.x = px;
        p.y = py;

        if (index % 3 === 0) {
          visiblePositions.push({ x: px, y: py });
        }

        // Pulse alpha
        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(frame * p.pulseSpeed));

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      });

      // Connect nearby particles with subtle circuit-like lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < visiblePositions.length; i++) {
        for (let j = i + 1; j < visiblePositions.length; j++) {
          const dx = visiblePositions[i].x - visiblePositions[j].x;
          const dy = visiblePositions[i].y - visiblePositions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const lineAlpha = (1 - dist / 65) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(visiblePositions[i].x, visiblePositions[i].y);
            ctx.lineTo(visiblePositions[j].x, visiblePositions[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-75 mix-blend-screen"
      />
      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c]/30 via-transparent to-[#08080c]" />
    </div>
  );
};
