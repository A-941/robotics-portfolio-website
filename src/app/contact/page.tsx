"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle2,
  ArrowLeft,
  Cpu,
  MessageSquare,
  ExternalLink,
  Code2,
  BookOpen,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";


const CONTACT_REASONS = [
  { label: "💡 Project Collaboration", value: "collaboration" },
  { label: "🐛 Found a Circuit Error", value: "bug" },
  { label: "📚 Educational Inquiry", value: "education" },
  { label: "💬 General Feedback", value: "feedback" },
  { label: "🔧 Hardware Question", value: "hardware" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub (@A-941)",
    desc: "Source code & firmware sketches",
    href: "https://github.com/A-941",
    icon: GithubIcon,
    color: "text-zinc-300",
    bg: "bg-zinc-900/80 border-zinc-700/70 hover:border-zinc-500",
  },
  {
    label: "arduino-robotics-journey",
    desc: "Hardware project repository",
    href: "https://github.com/A-941/arduino-robotics-journey",
    icon: Code2,
    color: "text-cyan-300",
    bg: "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400/60",
  },
  {
    label: "dhruv.makwana.dev@gmail.com",
    desc: "Direct email contact",
    href: "mailto:dhruv.makwana.dev@gmail.com",
    icon: Mail,
    color: "text-emerald-300",
    bg: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400/60",
  },
];


type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Compose mailto link as a graceful, no-backend-required fallback
    const subject = encodeURIComponent(`[Robotics Lab] ${form.reason || "General Inquiry"} — from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:dhruv.makwana.dev@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => setFormState("success"), 600);
  };

  const inputClass =
    "w-full bg-zinc-950/80 border border-zinc-700/60 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 outline-none transition-all duration-200 font-mono";

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-[#08080c] relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-indigo-500/8 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-cyan-500/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Intro + Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <MessageSquare className="w-3.5 h-3.5" />
                Get In Touch
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Let's Collaborate &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  Build Together
                </span>
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Whether you're a fellow student learning embedded systems, an engineer working on edge robotics, a teacher looking for quality learning resources, or you just found a wiring mistake — reach out.
              </p>
            </div>

            {/* Social + Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Source & Links
              </p>
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${link.bg}`}
                >
                  <div className="p-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex-shrink-0">
                    <link.icon className={`w-4 h-4 ${link.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${link.color}`}>{link.label}</p>
                    <p className="text-xs text-zinc-500 truncate">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-zinc-600 ml-auto flex-shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Quick Nav */}
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-3">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Quick Navigation</p>
              <div className="space-y-2">
                {[
                  { href: "/projects/led-blink", label: "Tutorial 01: LED Blink & Ohm's Law", icon: Cpu },
                  { href: "/projects/binary-counter", label: "Tutorial 02: Binary Counter", icon: Code2 },
                  { href: "/about", label: "Resource Guide & Philosophy", icon: BookOpen },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-cyan-300 transition-colors py-1"
                  >
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/40">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-16 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                  <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                    Your email client has been opened with a pre-filled message. Hit send and I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => { setFormState("idle"); setForm({ name: "", email: "", reason: "", message: "" }); }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Send a Message</h2>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">
                      Fill out the form — it opens your email client pre-filled.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-300 block">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ada Lovelace"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-300 block">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ada@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-reason" className="text-xs font-semibold text-zinc-300 block">
                      Reason for Reaching Out
                    </label>
                    <select
                      id="contact-reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select a topic...</option>
                      {CONTACT_REASONS.map((r) => (
                        <option key={r.value} value={r.label}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-zinc-300 block">
                      Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi! I was trying the binary counter tutorial and noticed..."
                      className={`${inputClass} resize-none`}
                    />
                    <p className="text-[11px] text-zinc-600 font-mono">{form.message.length} characters</p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Opening email client...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px] text-zinc-600 font-mono">
                    Opens your default email client with a pre-filled draft.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
