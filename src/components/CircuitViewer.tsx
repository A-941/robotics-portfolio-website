"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Cpu, Layers } from "lucide-react";

interface CircuitViewerProps {
  breadboardImage: string;
  schematicImage?: string;
  title: string;
  caption?: string;
}

export const CircuitViewer: React.FC<CircuitViewerProps> = ({
  breadboardImage,
  schematicImage,
  title,
  caption = "Tinkercad-style physical breadboard wiring diagram. Click to enlarge for pin-level inspection.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"breadboard" | "schematic">("breadboard");

  const currentImage = activeTab === "breadboard" || !schematicImage ? breadboardImage : schematicImage;

  return (
    <>
      <div
        className="rounded-2xl border p-5 sm:p-7 relative overflow-hidden"
        style={{
          backgroundColor: "#080612",
          borderColor: "rgba(168, 85, 247, 0.16)",
          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.8), 0 0 30px -5px rgba(168,85,247,0.06)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <Cpu className="w-4 h-4 text-purple-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              Interactive Circuit Manifest
            </h3>
          </div>

          {/* Toggle buttons if schematic also exists */}
          {schematicImage && (
            <div
              className="inline-flex rounded-lg p-1 border"
              style={{
                backgroundColor: "rgba(6,4,13,0.9)",
                borderColor: "rgba(168, 85, 247, 0.15)",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveTab("breadboard")}
                className={`px-3 py-1 text-xs font-mono tracking-wider uppercase rounded transition-all ${
                  activeTab === "breadboard"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Physical Breadboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("schematic")}
                className={`px-3 py-1 text-xs font-mono tracking-wider uppercase rounded transition-all ${
                  activeTab === "schematic"
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Schematic
              </button>
            </div>
          )}
        </div>

        {/* Image Display Area with Hover Overlay */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative group rounded-xl overflow-hidden border cursor-zoom-in transition-all duration-300"
          style={{
            backgroundColor: "#040208",
            borderColor: "rgba(168, 85, 247, 0.15)",
          }}
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src={currentImage}
              alt={`${title} - ${activeTab}`}
              fill
              className="object-contain p-3 sm:p-5 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              priority
            />
          </div>

          {/* Floating Hover Indicator */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider border shadow-xl"
              style={{
                backgroundColor: "rgba(10, 7, 22, 0.95)",
                borderColor: "rgba(168, 85, 247, 0.4)",
                color: "#f0ebff",
              }}
            >
              <ZoomIn className="w-4 h-4 text-purple-400" />
              EXPAND HIGH-RES INSPECTION
            </span>
          </div>

          <div
            className="absolute bottom-3 left-3 border px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(6, 4, 13, 0.9)",
              borderColor: "rgba(168, 85, 247, 0.2)",
              color: "var(--text-secondary)",
            }}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>{activeTab === "breadboard" ? "PHYSICAL BREADBOARD VIEW" : "SCHEMATIC VIEW"}</span>
          </div>
        </div>

        <p className="mt-3.5 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {caption}
        </p>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-zinc-200">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                <span className="font-semibold text-white">{title}</span>
                <span className="text-purple-400/60">— {activeTab.toUpperCase()}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white border transition-colors"
                style={{
                  backgroundColor: "rgba(16, 13, 30, 0.8)",
                  borderColor: "rgba(168, 85, 247, 0.25)",
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative w-full h-[78vh] rounded-xl border overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: "#05030a",
                borderColor: "rgba(168, 85, 247, 0.2)",
              }}
            >
              <Image
                src={currentImage}
                alt={title}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>

            <div className="w-full flex justify-between items-center pt-3 text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
              <span>PRESS ESC OR CLICK ANYWHERE TO EXIT</span>
              <span>100% SCALE PIN-LEVEL RENDER</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
