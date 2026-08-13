"use client";

import { useState } from "react";
import LineSidebar from "@/components/LineSidebar";

export type Phase = { label: string; title: string; body: string };

export default function ProcessIndex({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const current = phases[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
      <div className="lg:pt-2">
        <LineSidebar
          items={phases.map((p) => p.label)}
          active={active}
          defaultActive={0}
          accentColor="#00A896"
          textColor="#8f8f8f"
          markerColor="#4a4a4a"
          showIndex
          showMarker
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={60}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          onItemClick={(i) => setActive(i)}
        />
      </div>

      {/* keyed so the copy re-runs its fade each time the phase changes */}
      <div key={active} className="animate-[phase-in_.45s_ease-out] lg:pt-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          {String(active + 1).padStart(2, "0")} · {current.label}
        </p>
        <h3 className="mt-5 max-w-xl font-(family-name:--font-display) text-2xl uppercase leading-tight tracking-tight text-white sm:text-[2.25rem]">
          {current.title}
        </h3>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60">
          {current.body}
        </p>
      </div>

      <style>{`
        @keyframes phase-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-[phase-in"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
