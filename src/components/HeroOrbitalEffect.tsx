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

    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left - width / 2;
      targetMouseY = e.clientY - rect.top - height / 2;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Purple/violet/magenta energy palette
    const colors = [
      "rgba(168, 85, 247, ",   // electric purple
      "rgba(139, 92, 246, ",   // violet
      "rgba(192, 132, 252, ",  // purple-bright
      "rgba(232, 121, 249, ",  // magenta
      "rgba(59, 130, 246, ",   // blue (depth)
    ];

    const particleCount = prefersReducedMotion ? 40 : 110;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const dist = Math.random() * (Math.min(width, height) * 0.46) + 50;
      particles.push({
        x: 0,
        y: 0,
        radius: Math.random() * 1.6 + 0.5,
        angle: Math.random() * Math.PI * 2,
        distance: dist,
        speed: (0.001 + Math.random() * 0.0025) * (Math.random() > 0.5 ? 1 : 1.15),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.55 + 0.15,
        pulseSpeed: 0.018 + Math.random() * 0.028,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseX * 0.06;
      const centerY = height / 2 + mouseY * 0.06;

      // Ambient glow — deep purple
      const ambientGlow = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, Math.min(width, height) * 0.52
      );
      ambientGlow.addColorStop(0, "rgba(168, 85, 247, 0.12)");
      ambientGlow.addColorStop(0.3, "rgba(139, 92, 246, 0.07)");
      ambientGlow.addColorStop(0.65, "rgba(59, 130, 246, 0.03)");
      ambientGlow.addColorStop(1, "rgba(6, 4, 13, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Orbital rings — purple
      const ringRadii = [70, 130, 200, 290, 380];
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        const alpha = idx % 2 === 0 ? 0.06 : 0.04;
        ctx.strokeStyle = idx % 2 === 0
          ? `rgba(168, 85, 247, ${alpha})`
          : `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Core — deep void with purple rim
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 60);
      coreGrad.addColorStop(0, "rgba(6, 4, 13, 0.98)");
      coreGrad.addColorStop(0.7, "rgba(10, 6, 20, 0.92)");
      coreGrad.addColorStop(0.9, "rgba(168, 85, 247, 0.15)");
      coreGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Luminous rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(168, 85, 247, 0.9)";
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner bright ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(192, 132, 252, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Particles + connections
      const visiblePositions: { x: number; y: number }[] = [];
      particles.forEach((p, index) => {
        if (!prefersReducedMotion) p.angle += p.speed;

        const tilt = 0.5;
        const px = centerX + Math.cos(p.angle) * p.distance;
        const py = centerY + Math.sin(p.angle) * (p.distance * tilt);
        p.x = px;
        p.y = py;

        if (index % 3 === 0) visiblePositions.push({ x: px, y: py });

        const currentAlpha = p.alpha * (0.65 + 0.35 * Math.sin(frame * p.pulseSpeed));
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      });

      // Circuit-trace connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < visiblePositions.length; i++) {
        for (let j = i + 1; j < visiblePositions.length; j++) {
          const dx = visiblePositions[i].x - visiblePositions[j].x;
          const dy = visiblePositions[i].y - visiblePositions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const lineAlpha = (1 - dist / 60) * 0.1;
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
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
        className="w-full h-full opacity-80 mix-blend-screen"
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(6,4,13,0.8) 100%)",
        }}
      />
    </div>
  );
};
