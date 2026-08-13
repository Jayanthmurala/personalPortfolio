"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

/** Namespaced so two instances on one page never collide on defs ids. */
const P = "idbadge";

/* ------------------------------------------------------------------ *
 * Ribbon geometry.
 * Each strand is a CLOSED FILLED path: outer edge forward, inner edge
 * back. Width is baked into the control points so the band can taper
 * where it twists edge-on (~35%) and run full ~26px where it faces us.
 * ------------------------------------------------------------------ */

/**
 * Back strand: leaves the tab, climbs up-left, exits off-canvas at the top.
 * Near-constant full width — this one always faces the viewer.
 */
const BACK_STRAND = `
  M 105,-16
  C 122,20 133,52 147,84
  C 165,128 186,175 202,219
  C 216,251 231,283 245,314
  C 257,343 268,372 279,400
  L 305,392
  C 294,364 283,335 271,306
  C 257,275 242,243 228,211
  C 212,167 191,120 173,76
  C 159,44 148,12 131,-24
  Z
`;

/**
 * Front strand: leaves the same tab, sweeps right and up in the wide U,
 * arcs back over the top to the left, crosses IN FRONT of the back strand
 * near (150,65), and runs off the left edge. Tapers to ~35% width through
 * the turn where the webbing twists edge-on.
 */
const FRONT_STRAND = `
  M 319,394
  C 336,368 350,344 364,323
  C 383,296 404,268 422,243
  C 442,214 462,182 471,152
  C 476,124 474,92 463,66
  C 448,42 426,22 400,9
  C 375,-3 348,-9 322,-11
  C 294,-13 262,3 238,17
  C 214,31 190,47 166,60
  C 140,74 112,88 88,99
  C 40,117 -45,134 -140,150
  L -140,172
  C -40,156 44,139 92,121
  C 116,111 146,94 174,80
  C 198,68 224,52 248,39
  C 272,27 298,10 322,15
  C 348,20 374,26 396,35
  C 415,43 432,58 441,78
  C 449,100 450,128 445,152
  C 437,180 418,209 398,233
  C 382,252 358,288 340,313
  C 326,334 310,368 293,398
  Z
`;

/* Centrelines. A gradient in objectBoundingBox units washes across the whole
   path bbox, not across the webbing, so the across-width roundness is faked
   with a soft sheen down the middle of each strand. */
const BACK_CORE = `
  M 118,-20 C 135,16 146,48 160,80 C 178,124 199,171 215,215
  C 229,247 244,279 258,310 C 270,339 281,368 292,396
`;
const FRONT_CORE = `
  M 306,396 C 322,370 336,346 350,324 C 369,297 390,269 408,244
  C 428,215 448,183 457,152 C 462,124 460,92 449,68
  C 434,44 412,24 386,11 C 361,-1 334,-7 308,-9
  C 280,-11 248,5 224,19 C 200,33 176,49 152,62
  C 126,76 98,90 74,101 C 26,119 -58,136 -140,161
`;

/** The twist where the ribbon rolls edge-on, between the U and the left run. */
const FOLD_WEDGE = `
  M 238,17
  C 214,31 190,47 166,60
  L 174,80
  C 198,68 224,52 248,39
  Z
`;

const CARD = { x: 300, y: 438, width: 300, height: 396, rx: 10 };
const INSERT = { x: 314, y: 452, width: 272, height: 368, rx: 6 };
/** Both slots sit inset from the edges; the clasp threads the left one. */
const SLOT_L = { x: 340, y: 456, width: 58, height: 12, rx: 6 };
const SLOT_R = { x: 502, y: 456, width: 58, height: 12, rx: 6 };
const HANG_X = 369; // centre of SLOT_L — everything above hangs from here
const INSERT_BOX = { x: INSERT.x, y: INSERT.y, width: INSERT.width, height: INSERT.height };

export default function IdBadge({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // lazy init instead of setState-in-effect; guarded for SSR
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!fine) return;
      const r = hostRef.current?.getBoundingClientRect();
      if (!r) return;
      setTilt({
        x: ((e.clientX - r.left) / r.width - 0.5) * 8,
        y: ((e.clientY - r.top) / r.height - 0.5) * -8,
      });
    },
    [fine]
  );

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={hostRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative h-full w-full ${className}`}
    >
      <style>{`
        @keyframes ${P}-sway {
          0%, 100% { transform: rotate(-1.2deg); }
          50%      { transform: rotate(1.2deg); }
        }
        .${P}-sway {
          animation: ${P}-sway 6s ease-in-out infinite;
          transform-box: view-box;
          transform-origin: 180px 0px;
        }
        .${P}-lag { animation-delay: .15s; }
        .${P}-tilt {
          transform-box: view-box;
          transform-origin: 180px 0px;
          transition: transform .45s cubic-bezier(.22,1,.36,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .${P}-sway { animation: none; }
          .${P}-tilt { transition: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 770 848"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="img"
        aria-label="Hanging ID badge on a lanyard"
      >
        {/* ============================== defs ============================== */}
        <defs>
          {/* Cylindrical shading across the ribbon's width. */}
          <linearGradient id={`${P}-webA`} x1="0" y1="0" x2="1" y2="0.15">
            <stop offset="0%" stopColor="#585e65" />
            <stop offset="45%" stopColor="#33383e" />
            <stop offset="100%" stopColor="#1c1f23" />
          </linearGradient>
          <linearGradient id={`${P}-webB`} x1="0.1" y1="0" x2="0.9" y2="0.6">
            <stop offset="0%" stopColor="#4c5158" />
            <stop offset="50%" stopColor="#2c3036" />
            <stop offset="100%" stopColor="#191c1f" />
          </linearGradient>
          <linearGradient id={`${P}-webC`} x1="0" y1="0.1" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#5c626a" />
            <stop offset="42%" stopColor="#353a41" />
            <stop offset="100%" stopColor="#1d2024" />
          </linearGradient>

          {/* Hard stop transition == reflective metal, not plastic. */}
          <linearGradient id={`${P}-metal`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#f4f6f8" />
            <stop offset="38%" stopColor="#9aa0a6" />
            <stop offset="39%" stopColor="#ffffff" />
            <stop offset="72%" stopColor="#6e747b" />
            <stop offset="100%" stopColor="#c3c8cd" />
          </linearGradient>

          <linearGradient id={`${P}-gloss`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Fine horizontal weave grain — must stay barely perceptible. */}
          <filter id={`${P}-weave`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9 0.04"
              numOctaves="2"
              result="n"
            />
            <feColorMatrix in="n" type="saturate" values="0" />
          </filter>

          <filter id={`${P}-contact`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id={`${P}-cardShadow`} x="-40%" y="-40%" width="190%" height="190%">
            <feDropShadow dx="4" dy="14" stdDeviation="16" floodColor="#000" floodOpacity="0.32" />
          </filter>
          <filter id={`${P}-slotInner`} x="-50%" y="-120%" width="200%" height="360%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.55" />
          </filter>

          {/* Weave is painted once and masked to the strands. */}
          <mask id={`${P}-webMask`}>
            <path d={BACK_STRAND} fill="#fff" />
            <path d={FOLD_WEDGE} fill="#fff" />
            <path d={FRONT_STRAND} fill="#fff" />
          </mask>

          <clipPath id={`${P}-insert`}>
            <rect {...INSERT} />
          </clipPath>
          {/* Vinyl frame only — the window over the insert stays readable. */}
          <mask id={`${P}-frame`}>
            <rect {...CARD} fill="#fff" />
            <rect {...INSERT} fill="#000" />
          </mask>
          {/* Upper half of the ring — hidden behind the card's front face. */}
          <clipPath id={`${P}-aboveCard`}>
            <rect x="0" y="0" width="770" height={CARD.y + 26} />
          </clipPath>
        </defs>

        {/* pointer tilt (outer) → idle sway (inner): kept on separate nodes
            so the CSS animation and the inline transform don't fight. */}
        <g
          className={`${P}-tilt`}
          style={{ transform: `rotate(${tilt.x}deg)` }}
        >
          {/* ============================ strip ============================ */}
          {/* The sway lives on the outer <g>; a CSS transform would clobber a
              transform attribute on the same node, so the shift goes inside. */}
          <g className={`${P}-sway`}>
          <g transform={`translate(${HANG_X - 297} 0)`}>
            <path d={BACK_STRAND} fill={`url(#${P}-webA)`} />
            <path d={BACK_CORE} fill="none" stroke="#98a0a8" strokeWidth="9" strokeOpacity="0.45" />
            <path d={BACK_STRAND} fill="none" stroke="#0e1013" strokeWidth="0.75" strokeOpacity="0.45" />

            <path d={FOLD_WEDGE} fill={`url(#${P}-webB)`} />
            <path d={FOLD_WEDGE} fill="none" stroke="#0e1013" strokeWidth="0.75" strokeOpacity="0.4" />

            {/* Contact shadow under the crossover — this sells the overlap. */}
            <ellipse
              cx="150"
              cy="58"
              rx="30"
              ry="14"
              fill="#000"
              opacity="0.34"
              filter={`url(#${P}-contact)`}
              transform="rotate(60 150 58)"
            />

            <path d={FRONT_STRAND} fill={`url(#${P}-webC)`} />
            <path d={FRONT_CORE} fill="none" stroke="#9aa2aa" strokeWidth="9" strokeOpacity="0.42" />
            <path d={FRONT_STRAND} fill="none" stroke="#0e1013" strokeWidth="0.75" strokeOpacity="0.45" />

            {/* Specular line along the lit (upper-left) edge. */}
            <path
              d="M 322,-11 C 294,-13 262,3 238,17 C 214,31 190,47 166,60 C 140,74 112,88 88,99"
              fill="none"
              stroke="#c3cad1"
              strokeWidth="1"
              strokeOpacity="0.75"
            />
            <path
              d="M 111,-14 C 128,22 139,54 153,86 C 171,130 192,177 208,221"
              fill="none"
              stroke="#c3cad1"
              strokeWidth="1"
              strokeOpacity="0.6"
            />

            <g mask={`url(#${P}-webMask)`} opacity="0.07">
              <rect x="0" y="-40" width="600" height="500" filter={`url(#${P}-weave)`} />
            </g>

            {/* Folded double-thickness tab, with crease. */}
            <path
              d="M 281,392 L 313,392 L 316,432 L 278,432 Z"
              fill={`url(#${P}-webA)`}
            />
            <path d="M 279,424 L 315,424" stroke="#0e1013" strokeWidth="1.4" strokeOpacity="0.8" />
            <path d="M 279,421 L 315,421" stroke="#8b939b" strokeWidth="1" strokeOpacity="0.8" />
            <path d="M 281,392 L 313,392 L 316,432 L 278,432 Z" fill="none" stroke="#0e1013" strokeWidth="0.75" strokeOpacity="0.5" />
            <ellipse cx="297" cy="400" rx="22" ry="7" fill="#000" opacity="0.16" filter={`url(#${P}-contact)`} />
          </g>
          </g>

          {/* ==================== holder + card (lagging) ==================== */}
          <g className={`${P}-sway ${P}-lag`}>
            {/* Card shadow + sleeve back panel */}
            <g filter={`url(#${P}-cardShadow)`}>
              <rect {...CARD} fill="#dcdee1" />
            </g>

            {/* Insert card, faintly visible through the vinyl */}
            <rect {...INSERT} fill="#f7f8f9" />

            {/* Consumer content sits on the insert */}
            <foreignObject {...INSERT_BOX} clipPath={`url(#${P}-insert)`}>
              <div style={{ width: "100%", height: "100%" }}>{children}</div>
            </foreignObject>

            {/* Ring, back half — behind the card's front face */}
            <g clipPath={`url(#${P}-aboveCard)`}>
              <ellipse
                cx={HANG_X}
                cy="462"
                rx="17"
                ry="23"
                fill="none"
                stroke={`url(#${P}-metal)`}
                strokeWidth="5"
              />
            </g>

            {/* Sleeve front panel. Full 0.82 vinyl on the frame; over the window
                only a faint haze, so printed content stays crisp under it. */}
            <rect {...CARD} fill="#ffffff" opacity="0.82" mask={`url(#${P}-frame)`} />

            {/* Weld seam */}
            <path d={`M ${CARD.x} ${CARD.y + 44} H ${CARD.x + CARD.width}`} stroke="#b9bdc2" strokeWidth="1" strokeOpacity="0.8" />
            <path d={`M ${CARD.x} ${CARD.y + 45} H ${CARD.x + CARD.width}`} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.9" />

            {/* Die-cut slots — punched through the vinyl */}
            <g filter={`url(#${P}-slotInner)`}>
              <rect {...SLOT_L} fill="#c2c5ca" />
              <rect {...SLOT_R} fill="#c2c5ca" />
            </g>

            {/* Ring, front half — passes in front of the back face, through the slot */}
            <path
              d={`M ${HANG_X},485 A 17,23 0 0 0 ${HANG_X + 17},462`}
              fill="none"
              stroke={`url(#${P}-metal)`}
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Gloss: broad upper-left sweep + narrow right-edge streak */}
            <rect {...CARD} fill={`url(#${P}-gloss)`} />
            <rect x={CARD.x + CARD.width - 26} y={CARD.y + 16} width="7" height={CARD.height - 60} rx="3.5" fill="#fff" opacity="0.16" />

            {/* Rim light on top + left, fading out toward bottom-right */}
            <path
              d={`M ${CARD.x + CARD.rx} ${CARD.y} H ${CARD.x + CARD.width - CARD.rx}`}
              stroke="#c3cad1"
              strokeWidth="1"
              strokeOpacity="0.75"
            />
            <path
              d={`M ${CARD.x} ${CARD.y + CARD.rx} V ${CARD.y + CARD.height - 90}`}
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
            <rect {...CARD} fill="none" stroke="#9aa0a6" strokeWidth="1" strokeOpacity="0.28" />

            {/* Crimp + lobster clasp, in front of everything */}
            <rect x={HANG_X - 14} y="410" width="28" height="20" rx="4" fill={`url(#${P}-metal)`} stroke="#767c83" strokeWidth="1" />
            <path d={`M ${HANG_X - 9},414 H ${HANG_X + 9}`} stroke="#fff" strokeOpacity="0.9" strokeWidth="1.5" />

            <rect x={HANG_X - 10} y="428" width="21" height="42" rx="10" fill={`url(#${P}-metal)`} stroke="#6e747b" strokeWidth="1.2" />
            {/* spring gate */}
            <path d={`M ${HANG_X + 11},438 C ${HANG_X + 20},444 ${HANG_X + 20},456 ${HANG_X + 11},461`} fill="none" stroke="#8b9198" strokeWidth="3" strokeLinecap="round" />
            <circle cx={HANG_X} cy="434" r="2.6" fill="#fff" opacity="0.95" />
          </g>
        </g>
      </svg>
    </div>
  );
}
