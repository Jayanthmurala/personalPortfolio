"use client";

import { useCallback, useRef, useState } from "react";

export type WorkItem = {
  title: string;
  kind: string;
  line: string;
  stack: string;
  href: string;
  /** Live URL shown in the preview; omitted for private client work. */
  live?: string;
  /** Screenshot in /public/work. Falls back to a typographic panel. */
  image?: string;
};

export default function WorkIndex({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  // rAF-throttled so the panel tracks the cursor without thrashing React
  const onMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      setPos({ x: clientX, y: clientY });
      frame.current = null;
    });
  }, []);

  const item = active !== null ? items[active] : null;

  return (
    <div onMouseMove={onMove} className="relative">
      <ul>
        {items.map((w, i) => (
          <li key={w.title}>
            <a
              href={w.href}
              target={w.href.startsWith("http") ? "_blank" : undefined}
              rel={w.href.startsWith("http") ? "noreferrer" : undefined}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group grid grid-cols-1 gap-y-3 border-b border-white/15 py-9 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-12 sm:items-baseline sm:gap-x-8"
            >
              <span className="font-mono text-[11px] text-accent sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="sm:col-span-5">
                <h3 className="font-(family-name:--font-display) text-2xl uppercase leading-none tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-[2rem]">
                  {w.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {w.kind}
                </p>
              </div>

              <p className="text-[15px] leading-relaxed text-white/60 sm:col-span-5">
                {w.line}
              </p>

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-accent sm:col-span-1 sm:text-right">
                {w.href === "#" ? "Private" : "View"}
              </span>

              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25 sm:col-span-12 sm:col-start-2">
                {w.stack}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview. Pointer-events off so it never blocks the
          link underneath; hidden on touch, where there is no hover. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] origin-center transition-opacity duration-200 lg:block ${
          item ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(${pos.x + 28}px, ${pos.y - 130}px, 0) rotate(-3deg) scale(${
            item ? 1 : 0.94
          })`,
          transition: "opacity .2s ease, transform .28s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="overflow-hidden rounded-lg border border-white/15 bg-neutral-900 shadow-2xl shadow-black/70">
          {item?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              className="block aspect-[8/5] w-full object-cover object-top"
            />
          ) : (
            <div className="flex aspect-[8/5] w-full items-center justify-center bg-neutral-800 px-6 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                Under NDA
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-2.5">
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
              {item?.live ?? "Not publicly available"}
            </span>
            {item?.live && (
              <span className="font-mono text-[10px] text-accent">↗</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
