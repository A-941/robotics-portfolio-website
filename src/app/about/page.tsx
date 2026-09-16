import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cpu,
  Brain,
  Rocket,
  BookOpen,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  Wrench,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export const metadata = {
  title: "About Dhruv | AI & Hardware Robotics Journey",
  description:
    "Learn about Dhruv Makwana, 2nd-year CS student bridging physical embedded electronics, edge computing, and artificial intelligence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header / Intro */}
        <div className="space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Background & Vision
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Me & The Long-Term Vision
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
            I'm <strong className="text-white font-bold">Dhruv</strong>, a 2nd-year Computer Science student learning hardware engineering, digital electronics, and robotics from the ground up alongside my AI/ML coursework.
          </p>
        </div>

        {/* The Core Motivation */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Why Combine Computer Science & Hardware?
            </h2>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              In pure software, code lives in an idealized environment of unlimited memory and isolated sandboxes. But the real physical world doesn't work that way. Signals have voltage drops, sensors have noise, motors experience inertia, and semiconductors have thermal constraints.
            </p>
            <p>
              The most transformative developments in technology — from autonomous self-driving rovers to edge neural processors and humanoid robotics — happen at the exact intersection where algorithms meet physical actuation. By learning circuit prototyping, digital logic, and embedded C++ now, I am building the low-level foundation necessary to deploy intelligent machine learning models onto edge hardware.
            </p>
          </div>
        </section>

        {/* Two Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-lg">
              <Brain className="w-5 h-5" />
              Software & AI Focus
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Studying algorithms, data structures, computer vision, and neural networks. Dedicated to understanding how deep learning inference can run efficiently on resource-constrained microcontrollers.
            </p>
            <ul className="text-xs text-zinc-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> C++ & Python programming
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Computer vision & OpenCV
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Edge AI optimization (TinyML)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-lg">
              <Cpu className="w-5 h-5" />
              Hardware & Robotics Focus
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Mastering physical electronics step-by-step: digital I/O, Ohm's law, analog-to-digital converters, ultrasonic pulse timing, PWM motor drivers, and closed-loop control systems.
            </p>
            <ul className="text-xs text-zinc-400 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Breadboard prototyping & schematic design
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Microcontroller architecture (ATmega328P / ESP32)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Actuation, H-bridges & sensor telemetry
              </li>
            </ul>
          </div>
        </div>

        {/* Why this site exists (The Dual Purpose) */}
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-emerald-500/20">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The Dual Purpose of this Platform
            </h2>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              Many developer portfolios are just resumes with screenshots. I wanted to build something that solves two real problems:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <span className="text-xs uppercase font-bold text-emerald-400">Purpose 01</span>
                <h4 className="font-bold text-white text-base">A Rigorous Personal Log</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Forcing myself to write complete circuit derivations, document every wiring step, and explain bitwise operations guarantees that I truly understand every concept at depth.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <span className="text-xs uppercase font-bold text-cyan-400">Purpose 02</span>
                <h4 className="font-bold text-white text-base">An Open Reference for Beginners</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When starting out in ECE or robotics, vague schematics and undocumented code snippets create unnecessary frustration. This site provides clear Tinkercad-style breadboard diagrams and honest beginner troubleshooting tips so anyone can wire and learn without guesswork.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Hardware Workbench */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <Wrench className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Hardware Lab & Prototyping Kit
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
              <div className="text-sm font-bold text-white">Arduino Uno R3</div>
              <div className="text-xs text-zinc-400 mt-0.5">Primary MCU Platform</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
              <div className="text-sm font-bold text-white">Solderless Boards</div>
              <div className="text-xs text-zinc-400 mt-0.5">Rapid Breadboarding</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
              <div className="text-sm font-bold text-white">Sensors & Actuators</div>
              <div className="text-xs text-zinc-400 mt-0.5">Ultrasonic, Servos, L298N</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800">
              <div className="text-sm font-bold text-white">C++ & Tinkercad</div>
              <div className="text-xs text-zinc-400 mt-0.5">Firmware & Modeling</div>
            </div>
          </div>
        </section>

        {/* Contact / Links */}
        <section className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 space-y-6">
          <h3 className="text-xl font-bold text-white">Let's Connect & Collaborate</h3>
          <p className="text-sm text-zinc-300">
            Whether you are a fellow student learning embedded systems, an engineer working on edge robotics, or looking to collaborate:
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/A-941"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-zinc-700"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub: @A-941
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="mailto:dhruv.makwana.dev@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              dhruv.makwana.dev@gmail.com
            </a>

            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm">
              <LinkedinIcon className="w-4 h-4" />
              [Add your LinkedIn here]
            </span>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Return to Home
            </Link>

            <Link
              href="/projects/led-blink"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-300"
            >
              Start with Project 01: LED Blink
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
