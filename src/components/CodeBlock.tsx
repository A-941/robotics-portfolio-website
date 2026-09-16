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

  // Simple, clean syntax tokenization for C++/Arduino code
  const renderHighlightedCode = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Check if full comment
      const isComment = line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*");
      
      return (
        <div key={idx} className="table-row group hover:bg-zinc-800/40 transition-colors">
          <span className="table-cell pr-4 text-right select-none text-zinc-600 group-hover:text-zinc-400 font-mono text-xs w-10">
            {idx + 1}
          </span>
          <span className="table-cell whitespace-pre font-mono text-xs sm:text-sm pl-2">
            {isComment ? (
              <span className="text-zinc-500 italic">{line}</span>
            ) : (
              highlightLine(line)
            )}
          </span>
        </div>
      );
    });
  };

  const highlightLine = (line: string) => {
    // Basic C++/Arduino keywords highlighting
    const keywords = ["const", "int", "void", "for", "if", "else", "return", "unsigned", "long", "float", "char", "bool"];
    const functions = ["setup", "loop", "pinMode", "digitalWrite", "delay", "digitalRead", "analogRead", "analogWrite"];
    const constants = ["OUTPUT", "INPUT", "HIGH", "LOW", "true", "false", "NULL"];

    // Split keeping delimiters for simple token matching
    const tokens = line.split(/(\s+|[(){}[\];,.<>&|!+\-*\/=])/);

    return tokens.map((token, i) => {
      if (keywords.includes(token)) {
        return <span key={i} className="text-purple-400 font-semibold">{token}</span>;
      }
      if (functions.includes(token)) {
        return <span key={i} className="text-cyan-400 font-medium">{token}</span>;
      }
      if (constants.includes(token)) {
        return <span key={i} className="text-amber-400 font-medium">{token}</span>;
      }
      if (/^\d+$/.test(token)) {
        return <span key={i} className="text-emerald-400">{token}</span>;
      }
      if (token.startsWith("//")) {
        return <span key={i} className="text-zinc-500 italic">{token}</span>;
      }
      return <span key={i} className="text-zinc-200">{token}</span>;
    });
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/50">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-zinc-600 text-xs">|</span>
          <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-xs">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium tracking-wider uppercase text-zinc-400 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/50">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 px-2.5 py-1 rounded-md border border-zinc-700/60 transition-all active:scale-95 cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto max-h-[520px] scrollbar-thin scrollbar-thumb-zinc-700">
        <div className="table w-full">
          {renderHighlightedCode(code)}
        </div>
      </div>
    </div>
  );
};
