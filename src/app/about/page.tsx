import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Resource Guide & Engineering Philosophy | Robotics Lab",
  description:
    "An open-source educational guide explaining the engineering philosophy behind this platform: mastering hardware fundamentals from first principles before deploying edge AI and robotics.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Hardware before abstraction",
    body: "Before you can debug a failing I²C sensor, you need to understand pull-up resistors. Before autonomous navigation, you need GPIO timing. This lab sequences from the metal up — not the framework down.",
  },
  {
    num: "02",
    title: "Show the math, not just the magic",
    body: "Every resistor value is calculated. Every timing diagram is traced. If a formula appears, it's used on real data from this specific circuit — not a textbook placeholder.",
  },
  {
    num: "03",
    title: "Verified, not simulated",
    body: "Every project in this lab ran on physical hardware. Every schematic was breadboarded. Every video shows the actual circuit responding. Simulation is useful — but it's not the same.",
  },
  {
    num: "04",
    title: "Open and reproducible",
    body: "All firmware is MIT Licensed on GitHub. All schematics use standard Tinkercad visual style. Anyone with an Arduino Uno, a breadboard, and this lab can reproduce every result in this curriculum.",
  },
];

const STACK = [
  { label: "Platform", value: "Arduino Uno Rev3 (ATmega328P)" },
  { label: "Logic Level", value: "5V TTL" },
  { label: "Firmware", value: "C++ / Arduino SDK" },
  { label: "Schematics", value: "Tinkercad Circuits" },
  { label: "IDE", value: "Arduino IDE 2.x" },
  { label: "Version Control", value: "Git / GitHub" },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="px-6 sm:px-10 lg:px-14 max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-14">
          <Link
            href="/"
            className="label transition-colors hover:text-white"
            style={{ color: "var(--text-subtle)" }}
          >
            ← Home
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-20 sm:mb-28 border-b pb-16 sm:pb-24" style={{ borderColor: "var(--border)" }}>
          <p className="label mb-6" style={{ color: "var(--accent)" }}>
            Resource Guide
          </p>
          <h1
            className="display-lg mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            Engineering Philosophy
            <br />
            & Why This Lab Exists
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            The internet is full of copy-paste Arduino tutorials. This lab is different:
            every concept is explained from the physics up, every value is derived,
            and every project actually runs on real hardware before appearing here.
          </p>
        </div>

        {/* Principles */}
        <section className="mb-20 sm:mb-28">
          <p className="label mb-10" style={{ color: "var(--text-subtle)" }}>
            Core principles
          </p>
          <div className="space-y-0">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="py-8 border-b grid grid-cols-1 md:grid-cols-12 gap-6"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="md:col-span-2">
                  <span
                    className="label"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {p.num}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h2
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                  >
                    {p.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed max-w-2xl"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tool stack */}
        <section className="mb-20 sm:mb-28">
          <p className="label mb-10" style={{ color: "var(--text-subtle)" }}>
            Lab hardware & toolchain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {STACK.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="label" style={{ color: "var(--text-subtle)" }}>
                  {item.label}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)", fontFamily: "var(--font-space-mono)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Who this is for */}
        <section className="mb-20 sm:mb-28">
          <p className="label mb-8" style={{ color: "var(--text-subtle)" }}>
            Who this is for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Beginners", body: "Complete CS/ECE newcomers who want to understand how hardware actually works, not just copy sketches." },
              { title: "Students", body: "Engineering undergrads looking for supplementary materials with real calculations and working code." },
              { title: "Makers", body: "Hobbyists who want to go beyond tutorials and understand the 'why' behind every component choice." },
              { title: "Educators", body: "Teachers looking for open, freely reproducible hardware labs with verified circuit diagrams." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed pl-[18px]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="pt-14 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-lg font-semibold mb-1"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                Start with Tutorial 01
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                LED Blink & Ohm's Law — the hardware "Hello World"
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/projects/led-blink"
                className="text-sm font-semibold transition-colors"
                style={{ color: "var(--accent)" }}
              >
                Start learning →
              </Link>
              <Link
                href="/contact"
                className="text-sm transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
