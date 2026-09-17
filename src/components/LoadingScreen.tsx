"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#07070a]"
          aria-hidden="true"
        >
          {/* Outer animated ring */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border-t-2 border-r-2 border-cyan-500/60"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-16 h-16 rounded-full border-t-2 border-indigo-400/50"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
            >
              <Cpu className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center"
          >
            <p className="text-sm font-mono text-cyan-300 font-semibold tracking-widest uppercase">
              Robotics Lab
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Initializing hardware interface...
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="mt-8 w-48 h-px bg-zinc-800 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
