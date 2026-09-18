"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  fileName?: string;
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  fileName = "sketch.ino",
  code,
  language = "Arduino C++",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const renderHighlightedCode = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const isComment = line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*");

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
            ) : (
              highlightLine(line)
            )}
          </span>
        </div>
      );
    });
  };

  const highlightLine = (line: string) => {
    const keywords = ["const", "int", "void", "for", "if", "else", "return", "unsigned", "long", "float", "char", "bool"];
    const functions = ["setup", "loop", "pinMode", "digitalWrite", "delay", "digitalRead", "analogRead", "analogWrite"];
    const constants = ["OUTPUT", "INPUT", "HIGH", "LOW", "true", "false", "NULL"];

    const tokens = line.split(/(\s+|[(){}[\];,.<>&|!+\-*\/=])/);

    return tokens.map((token, i) => {
      if (keywords.includes(token)) {
        return <span key={i} className="font-semibold" style={{ color: "#c084fc" }}>{token}</span>;
      }
      if (functions.includes(token)) {
        return <span key={i} className="font-medium" style={{ color: "#60a5fa" }}>{token}</span>;
      }
      if (constants.includes(token)) {
        return <span key={i} className="font-medium" style={{ color: "#f97316" }}>{token}</span>;
      }
      if (/^\d+$/.test(token)) {
        return <span key={i} style={{ color: "#e879f9" }}>{token}</span>;
      }
      if (token.startsWith("//")) {
        return <span key={i} style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>{token}</span>;
      }
      return <span key={i} style={{ color: "var(--text-primary)" }}>{token}</span>;
    });
  };

  return (
    <div
      className="rounded-xl border overflow-hidden shadow-2xl"
      style={{
        backgroundColor: "#06040d",
        borderColor: "rgba(168, 85, 247, 0.16)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "#0d091e",
          borderColor: "rgba(168, 85, 247, 0.12)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-purple-500/30 text-xs">|</span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-purple-200">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>{fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="label text-[10px] px-2 py-0.5 rounded border"
            style={{
              color: "var(--purple-bright)",
              borderColor: "rgba(168, 85, 247, 0.2)",
              backgroundColor: "rgba(168, 85, 247, 0.05)",
            }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border transition-all active:scale-95 cursor-pointer"
            style={{
              color: copied ? "#34d399" : "var(--text-primary)",
              backgroundColor: "rgba(168, 85, 247, 0.08)",
              borderColor: copied ? "rgba(52, 211, 153, 0.4)" : "rgba(168, 85, 247, 0.2)",
            }}
            title="Copy firmware code"
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

      {/* Code Area */}
      <div className="p-4 overflow-x-auto max-h-[520px] scrollbar-thin">
        <div className="table w-full">
          {renderHighlightedCode(code)}
        </div>
      </div>
    </div>
  );
};
