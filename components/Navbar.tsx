"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [beam, setBeam] = useState<{ x: number; w: number } | null>(null);
  const [open, setOpen] = useState(false);

  const activeIndex = ITEMS.findIndex((i) => i.href === pathname);

  // The beam is positioned from measured geometry, so it stays correct at any
  // font size or viewport rather than relying on hard-coded offsets.
  const place = useCallback(() => {
    const list = listRef.current;
    const el = itemRefs.current[activeIndex];
    if (!list || !el) return setBeam(null);
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setBeam({ x: r.left - l.left + r.width / 2, w: r.width });
  }, [activeIndex]);

  useEffect(() => {
    place();
    window.addEventListener("resize", place);
    // fonts land after first paint and shift the measurements
    document.fonts?.ready.then(place).catch(() => {});
    return () => window.removeEventListener("resize", place);
  }, [place]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-5 sm:px-8">
      <div className="relative flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Jayanth Murala, home"
          className="group flex items-center gap-2.5"
        >
          <Image
            src="/assets/avatar.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20 transition-[box-shadow,--tw-ring-color] group-hover:ring-accent/70"
          />
          <span className="font-(family-name:--font-display) text-xl leading-none text-white sm:text-2xl">
            MJ
          </span>
        </Link>

        {/* centred pill, absolutely placed so the logo and CTA never shift it */}
        <nav className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul
            ref={listRef}
            className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-md"
          >
            {/* light source above the active item */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-px h-[3px] rounded-full bg-accent transition-all duration-500 ease-out"
              style={{
                width: beam ? Math.min(beam.w * 0.5, 46) : 0,
                left: beam?.x ?? 0,
                transform: "translateX(-50%)",
                opacity: beam ? 1 : 0,
                boxShadow: "0 0 14px 3px rgba(0,168,150,0.9)",
              }}
            />
            {/* the light it casts down into the pill */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-px h-14 transition-all duration-500 ease-out"
              style={{
                width: 150,
                left: beam?.x ?? 0,
                transform: "translateX(-50%)",
                opacity: beam ? 1 : 0,
                background:
                  "radial-gradient(50% 100% at 50% 0%, rgba(0,168,150,0.30), transparent 72%)",
              }}
            />

            {ITEMS.map((item, i) => {
              const active = i === activeIndex;
              return (
                <li key={item.href} className="relative">
                  <Link
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-1.5 text-[15px] transition-colors ${
                      active
                        ? "font-medium text-white"
                        : "text-white/50 hover:text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-white/[0.08] px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
          >
            Book a call
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mt-3 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-md lg:hidden">
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                item.href === pathname
                  ? "text-accent"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
