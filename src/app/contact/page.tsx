"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const CONTACT_REASONS = [
  "💡 Project Collaboration",
  "🐛 Found a Circuit Error",
  "📚 Educational Inquiry",
  "💬 General Feedback",
  "🔧 Hardware Question",
];

type FormState = "idle" | "submitting" | "success";

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-space-mono)",
  fontSize: "13px",
  padding: "12px 16px",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    const subject = encodeURIComponent(`[Robotics Lab] ${form.reason || "Inquiry"} — from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason}\n\nMessage:\n${form.message}`);
    window.open(`mailto:dhruv.makwana.dev@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setTimeout(() => setFormState("success"), 500);
  };

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

        {/* Header */}
        <div className="mb-16 sm:mb-24 border-b pb-14 sm:pb-20" style={{ borderColor: "var(--border)" }}>
          <p className="label mb-6" style={{ color: "var(--accent)" }}>
            Contact
          </p>
          <h1
            className="display-lg mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Let's build
            <br />
            together.
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Found a circuit error? Want to contribute? Just curious? Reach out.
          </p>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left: quick links */}
          <div className="lg:col-span-4 space-y-0">
            <p className="label mb-6" style={{ color: "var(--text-subtle)" }}>
              Direct
            </p>
            {[
              {
                label: "GitHub",
                value: "@A-941",
                href: "https://github.com/A-941",
              },
              {
                label: "Repository",
                value: "arduino-robotics-journey",
                href: "https://github.com/A-941/arduino-robotics-journey",
              },
              {
                label: "Email",
                value: "dhruv.makwana.dev@gmail.com",
                href: "mailto:dhruv.makwana.dev@gmail.com",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex flex-col py-5 border-b group transition-colors"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="label mb-1" style={{ color: "var(--text-subtle)" }}>
                  {item.label}
                </span>
                <span
                  className="text-sm font-medium group-hover:text-white transition-colors"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-space-mono)",
                    fontSize: "12px",
                  }}
                >
                  {item.value} ↗
                </span>
              </a>
            ))}
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 py-20"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl"
                  style={{ backgroundColor: "var(--accent)", color: "#000" }}
                >
                  ✓
                </div>
                <h2
                  className="text-2xl font-semibold mt-2"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                >
                  Message sent.
                </h2>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Your email client opened with a pre-filled draft. Hit send and I'll reply soon.
                </p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", email: "", reason: "", message: "" }); }}
                  className="text-sm mt-4 underline"
                  style={{ color: "var(--text-subtle)" }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">
                {/* Name + Email */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="py-5 border-b sm:border-b-0 sm:border-r pr-0 sm:pr-8"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <label
                      htmlFor="contact-name"
                      className="label block mb-2"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Ada Lovelace"
                      style={{
                        ...inputStyle,
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "0",
                        borderBottom: `1px solid ${focusedField === "name" ? "#e8ff00" : "transparent"}`,
                      }}
                    />
                  </div>
                  <div className="py-5 sm:pl-8">
                    <label
                      htmlFor="contact-email"
                      className="label block mb-2"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="ada@example.com"
                      style={{
                        ...inputStyle,
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "0",
                        borderBottom: `1px solid ${focusedField === "email" ? "#e8ff00" : "transparent"}`,
                      }}
                    />
                  </div>
                </div>

                {/* Reason */}
                <div
                  className="py-5 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <label
                    htmlFor="contact-reason"
                    className="label block mb-2"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Reason
                  </label>
                  <select
                    id="contact-reason"
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0",
                    }}
                  >
                    <option value="" style={{ backgroundColor: "#111" }}>Select a topic...</option>
                    {CONTACT_REASONS.map((r) => (
                      <option key={r} value={r} style={{ backgroundColor: "#111" }}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div
                  className="py-5 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <label
                    htmlFor="contact-message"
                    className="label block mb-2"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hi! I was going through the binary counter tutorial and..."
                    style={{
                      ...inputStyle,
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0",
                      resize: "none",
                    }}
                  />
                  <p
                    className="label mt-2"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {form.message.length} chars
                  </p>
                </div>

                {/* Submit */}
                <div className="pt-8">
                  <motion.button
                    type="submit"
                    disabled={formState === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="px-8 py-4 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "#e8ff00",
                      color: "#000",
                    }}
                  >
                    {formState === "submitting" ? "Opening email..." : "Send message →"}
                  </motion.button>
                  <p
                    className="label mt-4"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Opens your email client with a pre-filled draft.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
