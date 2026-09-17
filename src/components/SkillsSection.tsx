"use client";

import React from "react";
import { motion } from "motion/react";
import { Cpu, Code2, Zap, CheckCircle2, Layers } from "lucide-react";
import { skillsList } from "@/data/projectsData";

export const SkillsSection = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Embedded")) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (category.includes("Software")) return <Code2 className="w-5 h-5 text-indigo-400" />;
    return <Zap className="w-5 h-5 text-amber-400" />;
  };

  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-zinc-800/80 bg-gradient-to-b from-[#08080c] via-zinc-950/40 to-[#08080c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 mb-4 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Curriculum & Foundations
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Core Engineering Competencies
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Essential embedded systems, circuit theory, and physical prototyping skills taught through hands-on breadboard builds and verified firmware.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillsList.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-7 backdrop-blur-md hover:border-cyan-500/40 transition-colors flex flex-col shadow-lg shadow-black/40"
            >
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-zinc-800/80">
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  {getCategoryIcon(skillGroup.category)}
                </div>
                <h3 className="text-lg font-bold text-zinc-100">
                  {skillGroup.category}
                </h3>
              </div>

              <ul className="space-y-4 flex-grow">
                {skillGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="group">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 shrink-0">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 pl-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
