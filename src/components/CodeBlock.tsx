"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  fileName?: string;
  code: string;
  language?: string;
  /** Optional second file (e.g. Processing .pde) */
  secondFileName?: string;
  secondCode?: string;
  secondLanguage?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  fileName = "sketch.ino",
  code,
  language = "Arduino C++",
  secondFileName,
  secondCode,
  secondLanguage = "Processing 4",
}) => {
  const hasSecond = Boolean(secondFileName && secondCode);
  const [activeTab, setActiveTab] = useState<"primary" | "second">("primary");
  const [copied, setCopied] = useState(false);

  const activeCode = activeTab === "second" && secondCode ? secondCode : code;
  const activeFile = activeTab === "second" && secondFileName ? secondFileName : fileName;
  const activeLang = activeTab === "second" ? secondLanguage : language;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // ── Syntax Highlighters ────────────────────────────────────────────────────

  const highlightArduinoLine = (line: string) => {
    const keywords = ["const", "int", "void", "for", "if", "else", "return", "unsigned", "long", "float", "char", "bool", "include"];
    const functions = ["setup", "loop", "pinMode", "digitalWrite", "delay", "digitalRead", "analogRead", "analogWrite", "Serial", "begin", "print", "println", "attach", "write", "pulseIn", "delayMicroseconds"];
    const constants = ["OUTPUT", "INPUT", "HIGH", "LOW", "true", "false", "NULL", "PI", "TWO_PI"];

    const tokens = line.split(/(\s+|[(){}[\];,.<>&|!+\-*\/=])/);

    return tokens.map((token, i) => {
      if (keywords.includes(token))
        return <span key={i} className="font-semibold" style={{ color: "#c084fc" }}>{token}</span>;
      if (functions.includes(token))
        return <span key={i} className="font-medium" style={{ color: "#60a5fa" }}>{token}</span>;
      if (constants.includes(token))
        return <span key={i} className="font-medium" style={{ color: "#f97316" }}>{token}</span>;
      if (/^\d+(\.\d+)?$/.test(token))
        return <span key={i} style={{ color: "#e879f9" }}>{token}</span>;
      if (token.startsWith("//"))
        return <span key={i} style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>{token}</span>;
      return <span key={i} style={{ color: "var(--text-primary)" }}>{token}</span>;
    });
  };

  const highlightProcessingLine = (line: string) => {
    // Processing is Java-based — reuse Arduino keywords + Processing-specific ones
    const keywords = ["void", "int", "float", "String", "boolean", "char", "long", "try", "catch", "if", "else", "for", "import", "new", "return", "null", "true", "false"];
    const functions = [
      "setup", "draw", "size", "smooth", "fill", "noFill", "stroke", "noStroke",
      "strokeWeight", "arc", "line", "rect", "text", "textSize", "textFont",
      "pushMatrix", "popMatrix", "translate", "rotate", "resetMatrix",
      "cos", "sin", "radians", "sqrt",
      "readStringUntil", "indexOf", "substring", "length", "println",
      "drawRadar", "drawLine", "drawObject", "drawText",
      "serialEvent", "bufferUntil",
    ];
    const constants = ["PI", "TWO_PI", "width", "height", "Serial"];
    const processingTypes = ["Serial", "Exception"];

    const tokens = line.split(/(\s+|[(){}[\];,.<>&|!+\-*\/=*])/);

    return tokens.map((token, i) => {
      if (keywords.includes(token))
        return <span key={i} className="font-semibold" style={{ color: "#86efac" }}>{token}</span>;
      if (functions.includes(token))
        return <span key={i} className="font-medium" style={{ color: "#67e8f9" }}>{token}</span>;
      if (constants.includes(token) || processingTypes.includes(token))
        return <span key={i} className="font-medium" style={{ color: "#fde68a" }}>{token}</span>;
      if (/^\d+(\.\d+)?$/.test(token))
        return <span key={i} style={{ color: "#f9a8d4" }}>{token}</span>;
      if (token.startsWith("//"))
        return <span key={i} style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>{token}</span>;
      return <span key={i} style={{ color: "var(--text-primary)" }}>{token}</span>;
    });
  };

  const renderHighlightedCode = (text: string, lang: string) => {
    const isProcessing = lang.toLowerCase().includes("processing");
    const lines = text.split("\n");

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      const isComment =
        trimmed.startsWith("//") ||
        trimmed.startsWith("/*") ||
        trimmed.startsWith("*");

      return (
        <div key={idx} className="table-row group hover:bg-purple-950/20 transition-colors">
          <span
            className="table-cell pr-4 text-right select-none font-mono text-xs w-10 opacity-35 group-hover:opacity-75 transition-opacity"
            style={{ color: "var(--purple-bright)" }}
          >
            {idx + 1}
          </span>
          <span className="table-cell whitespace-pre font-mono text-xs sm:text-sm pl-3">
            {isComment ? (
              <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>{line}</span>
            ) : isProcessing ? (
              highlightProcessingLine(line)
            ) : (
              highlightArduinoLine(line)
            )}
          </span>
        </div>
      );
    });
  };

  // ── Tab accent colours ─────────────────────────────────────────────────────
  const primaryActive = activeTab === "primary";
  const secondActive  = activeTab === "second";

  return (
    <div
      className="rounded-xl border overflow-hidden shadow-2xl"
      style={{
        backgroundColor: "#06040d",
        borderColor: "rgba(168, 85, 247, 0.16)",
      }}
    >
      {/* ── Header bar ──────────────────────────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(168, 85, 247, 0.12)", backgroundColor: "#0d091e" }}
      >
        {/* Tab row (only shown when there's a second file) */}
        {hasSecond && (
          <div className="flex items-center px-4 pt-2 gap-1 border-b" style={{ borderColor: "rgba(168,85,247,0.1)" }}>
            {/* Tab 1 — Arduino .ino */}
            <button
              onClick={() => setActiveTab("primary")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-mono transition-all cursor-pointer"
              style={{
                color: primaryActive ? "#c084fc" : "var(--text-subtle)",
                backgroundColor: primaryActive ? "rgba(168,85,247,0.12)" : "transparent",
                borderBottom: primaryActive ? "2px solid #a855f7" : "2px solid transparent",
              }}
            >
              <Terminal className="w-3 h-3" />
              {fileName}
            </button>

            {/* Tab 2 — Processing .pde */}
            <button
              onClick={() => setActiveTab("second")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-mono transition-all cursor-pointer"
              style={{
                color: secondActive ? "#34d399" : "var(--text-subtle)",
                backgroundColor: secondActive ? "rgba(52,211,153,0.08)" : "transparent",
                borderBottom: secondActive ? "2px solid #34d399" : "2px solid transparent",
              }}
            >
              <Terminal className="w-3 h-3" />
              {secondFileName}
            </button>
          </div>
        )}

        {/* Single-row toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            {!hasSecond && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
            )}
            <span className="text-purple-500/30 text-xs">|</span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-purple-200">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>{activeFile}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="label text-[10px] px-2 py-0.5 rounded border"
              style={{
                color: secondActive ? "#34d399" : "var(--purple-bright)",
                borderColor: secondActive ? "rgba(52,211,153,0.3)" : "rgba(168, 85, 247, 0.2)",
                backgroundColor: secondActive ? "rgba(52,211,153,0.05)" : "rgba(168, 85, 247, 0.05)",
              }}
            >
              {activeLang}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border transition-all active:scale-95 cursor-pointer"
              style={{
                color: copied ? "#34d399" : "var(--text-primary)",
                backgroundColor: "rgba(168, 85, 247, 0.08)",
                borderColor: copied ? "rgba(52, 211, 153, 0.4)" : "rgba(168, 85, 247, 0.2)",
              }}
              title="Copy source code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-300" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Code Area ─────────────────────────────────────────────────────── */}
      <div className="p-4 overflow-x-auto max-h-[520px] scrollbar-thin">
        <div className="table w-full">
          {renderHighlightedCode(activeCode, activeLang ?? "")}
        </div>
      </div>
    </div>
  );
};
