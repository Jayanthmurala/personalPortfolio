const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "Software Engineer",
  "Systems Thinker",
  "Problem Solver",
  "Product Builder",
];

/**
 * Bridges the hero and the page below it. Two identical runs translated -50%
 * give a seamless loop, and the edges are masked so words arrive and leave
 * rather than being clipped at a hard boundary.
 */
export default function MarqueeBand() {
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-white/10 bg-black py-5">
      <style>{`
        @keyframes brand-marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        .brand-marquee { animation: brand-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .brand-marquee { animation: none; } }
      `}</style>

      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="brand-marquee flex w-max whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {ROLES.map((role) => (
                <span key={role} className="flex shrink-0 items-center">
                  <span className="font-(family-name:--font-display) text-sm uppercase tracking-[0.18em] text-white/75 sm:text-base">
                    {role}
                  </span>
                  <span className="px-7 text-accent sm:px-10" aria-hidden>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
