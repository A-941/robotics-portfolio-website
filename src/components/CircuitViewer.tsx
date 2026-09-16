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
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
              Interactive Circuit Diagram
            </h3>
          </div>

          {/* Toggle buttons if schematic also exists */}
          {schematicImage && (
            <div className="inline-flex rounded-lg bg-zinc-950 p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab("breadboard")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTab === "breadboard"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Tinkercad Breadboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("schematic")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  activeTab === "schematic"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
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
          className="relative group rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950/80 cursor-zoom-in transition-all duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:shadow-2xl"
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10]">
            <Image
              src={currentImage}
              alt={`${title} - ${activeTab}`}
              fill
              className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              priority
            />
          </div>

          {/* Floating Hover Indicator */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-medium shadow-lg">
              <ZoomIn className="w-4 h-4" />
              Click to view high-resolution full screen
            </span>
          </div>

          <div className="absolute bottom-3 left-3 bg-zinc-950/90 border border-zinc-800 px-2.5 py-1 rounded-md text-[11px] text-zinc-300 flex items-center gap-1.5 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeTab === "breadboard" ? "Realistic Breadboard View" : "Schematic View"}</span>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {caption}
        </p>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-zinc-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-semibold text-sm sm:text-base">{title}</span>
                <span className="text-zinc-500 text-xs">— {activeTab}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[75vh] bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex items-center justify-center">
              <Image
                src={currentImage}
                alt={title}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>

            <div className="w-full flex justify-between items-center pt-3 text-xs text-zinc-400">
              <span>Press ESC or click anywhere outside to close</span>
              <span>High-resolution view</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
