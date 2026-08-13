"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export type Skill = { name: string; icon: string };

const NS = "skillgrid";
const DURATION = 200;
const LEAVE_DELAY = 200;

/** devicon ships these as solid black — they need flipping on a dark card. */
const INVERT = new Set(["Express", "Vercel", "GitHub", "Socket.IO"]);
const LIFT = new Set(["Prisma"]);

const CSS = `
.${NS}-card { transition: all ${DURATION}ms; }
.${NS}-card img { opacity: .62; transition: all ${DURATION}ms; shape-rendering: geometricPrecision; }
.${NS}-card:hover img { opacity: 1; }

.${NS}-small { transform: scale(1.05) translate(-4px, -4px) translateZ(0); }
.${NS}-big   { transform: scale(1.16) translate(-14px, -14px) translateZ(15px); }
.${NS}-big img { opacity: 1; }

.${NS}-glow-big   { animation: ${NS}-glow 1.5s ease-in-out infinite alternate; }
.${NS}-glow-small { animation: ${NS}-glow-sm 1.5s ease-in-out infinite alternate; }
@keyframes ${NS}-glow {
  0% { filter: drop-shadow(0 0 2px rgba(0, 168, 150,.45)); }
  to { filter: drop-shadow(0 1px 14px rgba(0, 168, 150,.85)); }
}
@keyframes ${NS}-glow-sm {
  0% { filter: drop-shadow(0 0 2px rgba(0, 168, 150,.3)); }
  to { filter: drop-shadow(0 1px 7px rgba(0, 168, 150,.45)); }
}
@media (prefers-reduced-motion: reduce) {
  .${NS}-card, .${NS}-card img { transition: none; }
  .${NS}-glow-big, .${NS}-glow-small { animation: none; }
}
`;

export default function SkillGrid({ skills }: { skills: Skill[] }) {
  const [cols, setCols] = useState(8);
  const [hovered, setHovered] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setCols(w < 480 ? 4 : w < 768 ? 5 : w < 1024 ? 6 : 8);
    };
    read();
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("resize", read);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // the four orthogonal neighbours get a smaller lift, so the grid reads as
  // one surface being pushed rather than a single tile popping
  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    const out: number[] = [];
    if (hovered % cols !== 0) out.push(hovered - 1);
    if (hovered % cols !== cols - 1) out.push(hovered + 1);
    out.push(hovered - cols, hovered + cols);
    return out.filter((n) => n >= 0 && n < skills.length);
  }, [hovered, cols, skills.length]);

  const enter = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setHovered(i);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHovered(null), LEAVE_DELAY);
  };

  return (
    <div className="relative">
      <style>{CSS}</style>

      <div
        onPointerLeave={leave}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          transform: "perspective(1600px)",
          transformStyle: "preserve-3d",
        }}
      >
        {skills.map((s, i) => {
          const isBig = hovered === i;
          const isSmall = !isBig && neighbours.includes(i);
          return (
            <div
              key={s.name}
              onPointerEnter={() => enter(i)}
              title={s.name}
              className={[
                `${NS}-card`,
                isBig && `${NS}-big`,
                isSmall && `${NS}-small`,
                isBig && `${NS}-glow-big`,
                isSmall && `${NS}-glow-small`,
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                aspectRatio: "1 / 1",
                background: "#000",
                border: "1px solid #292929",
                borderRadius: 8,
                zIndex: isBig ? skills.length + 1 : i + 1,
              } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.icon}
                alt={s.name}
                draggable={false}
                style={{
                  width: "44%",
                  height: "44%",
                  objectFit: "contain",
                  pointerEvents: "none",
                  userSelect: "none",
                  filter: INVERT.has(s.name)
                    ? "invert(1)"
                    : LIFT.has(s.name)
                      ? "brightness(2.4)"
                      : undefined,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* the name of whatever is under the cursor, held in one fixed spot */}
      <p className="mt-8 h-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        {hovered !== null ? skills[hovered].name : ""}
      </p>
    </div>
  );
}
