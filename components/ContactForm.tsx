"use client";

import { useState } from "react";

const PROJECT_TYPES = [
  "A web app",
  "An AI product",
  "Automation",
  "Just saying hello",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // honeypot
          projectType,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not send.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t-2 border-accent pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Message sent
        </p>
        <h2 className="mt-5 font-(family-name:--font-display) text-2xl uppercase leading-tight tracking-tight text-white sm:text-3xl">
          Thanks. I&apos;ll read it properly.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55">
          You&apos;ll usually hear back within a day. If it is urgent, my inbox
          is open at jayanthmurala1@gmail.com.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* bots fill this; it stays out of the tab order and off screen */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          What is this about
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setProjectType(t)}
              className={`rounded-full border px-4 py-2.5 text-[13px] transition-colors ${
                projectType === t
                  ? "border-accent bg-accent text-black"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Your name
          </span>
          <input
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Jane Cooper"
            className={`mt-3 ${field}`}
          />
        </label>

        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@company.com"
            className={`mt-3 ${field}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          The problem
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="A few lines is genuinely enough. What is it, and what has to hold?"
          className={`mt-3 resize-y ${field}`}
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-[14px] text-red-400">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send it"}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          Usually replies within a day
        </p>
      </div>
    </form>
  );
}
