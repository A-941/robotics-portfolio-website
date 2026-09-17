"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CodeBlock } from "@/components/CodeBlock";
import type { Mission } from "@/data/missionsData";

interface CircuitReferenceProps {
  mission: Pick<Mission, "circuitImage" | "title" | "code" | "codeFileName" | "githubUrl">;
}

type Tab = "circuit" | "code";

export const CircuitReference: React.FC<CircuitReferenceProps> = ({ mission }) => {
  const [tab, setTab] = useState<Tab>("circuit");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div
      className="flex flex-col h-full border"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      {/* Tab bar */}
      <div
        className="flex border-b"
        style={{ borderColor: "var(--border)" }}
      >
        {(["circuit", "code"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 label transition-colors"
            style={{
              color: tab === t ? "var(--accent)" : "var(--text-subtle)",
              borderBottom: tab === t ? "1px solid var(--accent)" : "none",
            }}
          >
            {t === "circuit" ? "Circuit Reference" : "View Code"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-grow overflow-auto">
        {tab === "circuit" && (
          <div className="p-3 space-y-3 h-full flex flex-col">
            <p className="label" style={{ color: "var(--text-subtle)" }}>
              Reference diagram — use this while building
            </p>
            <div
              className="relative flex-grow cursor-zoom-in border"
              style={{ borderColor: "var(--border)", minHeight: "200px" }}
              onClick={() => setLightboxOpen(true)}
              title="Click to enlarge"
            >
              <Image
                src={mission.circuitImage}
                alt={`${mission.title} circuit diagram`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div
                className="absolute bottom-2 right-2 label px-2 py-1"
                style={{ backgroundColor: "var(--bg)", color: "var(--text-subtle)", border: "1px solid var(--border)" }}
              >
                Click to enlarge
              </div>
            </div>
            {mission.githubUrl && (
              <a
                href={mission.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label transition-colors hover:text-white"
                style={{ color: "var(--text-subtle)" }}
              >
                View on GitHub ↗
              </a>
            )}
          </div>
        )}

        {tab === "code" && (
          <div className="p-3">
            <p className="label mb-3" style={{ color: "var(--text-subtle)" }}>
              Reference firmware — upload this to your Arduino
            </p>
            <CodeBlock
              fileName={mission.codeFileName}
              code={mission.code}
              language="Arduino C++"
            />
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-10 label px-3 py-1 border"
              style={{ color: "var(--text-primary)", borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
            >
              ✕ Close
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={mission.circuitImage}
                alt={mission.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
