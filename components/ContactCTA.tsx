"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Holds still until the section is genuinely in view, then plays a staged
 * reveal: the two headline lines slam in, a rule strikes across, and after a
 * deliberate beat the copy and buttons arrive. Fires once — a CTA that
 * re-animates every time you scroll past becomes noise.
 */
export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // wait until a real portion has arrived, not the first stray pixel
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={shown ? "cta-in" : "cta-idle"}>
      <style>{`
        .cta-idle [data-cta] { opacity: 0; }

        @keyframes cta-slam {
          0%   { opacity: 0; transform: translateY(46px) scale(1.05); }
          60%  { opacity: 1; transform: translateY(-6px) scale(0.995); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cta-strike {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes cta-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* the slam — two lines, back to back */
        .cta-in [data-cta="l1"] { animation: cta-slam .62s cubic-bezier(.16,1,.3,1) both; }
        .cta-in [data-cta="l2"] { animation: cta-slam .62s cubic-bezier(.16,1,.3,1) .1s both; }

        /* the strike, landing on the beat after the second line */
        .cta-in [data-cta="rule"] {
          transform-origin: left;
          animation: cta-strike .5s cubic-bezier(.7,0,.3,1) .62s both;
        }

        /* ...then the hold, and everything else follows */
        .cta-in [data-cta="copy"] { animation: cta-rise .5s ease-out 1.16s both; }
        .cta-in [data-cta="cta1"] { animation: cta-rise .5s ease-out 1.30s both; }
        .cta-in [data-cta="cta2"] { animation: cta-rise .5s ease-out 1.40s both; }
        .cta-in [data-cta="note"] { animation: cta-rise .5s ease-out 1.55s both; }

        @media (prefers-reduced-motion: reduce) {
          .cta-in [data-cta] { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <h2 className="max-w-3xl font-(family-name:--font-display) text-[clamp(2rem,5.5vw,4.25rem)] uppercase leading-[0.95] tracking-tight text-white">
        <span data-cta="l1" className="block">
          Tell me what
        </span>
        <span data-cta="l2" className="block text-accent">
          it has to hold.
        </span>
      </h2>

      <div data-cta="rule" className="mt-8 h-px w-full max-w-lg bg-accent/60" />

      <p
        data-cta="copy"
        className="mt-8 max-w-md text-[17px] leading-relaxed text-white/55"
      >
        A few lines about the problem is enough to start. If it is not something
        I should take on, I will say that too.
      </p>

      {/* Two doors, same room. One for people with a project, one for people
          not ready to call it that yet. */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          data-cta="cta1"
          href="/contact"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          Let&apos;s build something
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>

        <Link
          data-cta="cta2"
          href="/contact"
          className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
        >
          Just say hello
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <p
        data-cta="note"
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30"
      >
        Usually replies within a day
      </p>
    </div>
  );
}
