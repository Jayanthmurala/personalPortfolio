"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type SpringOptions,
} from "framer-motion";

/**
 * Replaces the OS cursor inside its own surface with an arrow that tracks on a
 * snappy spring and a label pill that trails on a laggier one, rocking with
 * horizontal velocity and scaling on press. Skipped entirely on coarse
 * pointers, where there is no cursor to replace.
 */
export default function CursorArea({
  children,
  label = "View",
  color = "#00A896",
  textColor = "#001018",
  size = 31,
  pressScale = 0.92,
  tiltStrength = 25,
  className = "",
}: {
  children: ReactNode;
  label?: string;
  color?: string;
  textColor?: string;
  size?: number;
  pressScale?: number;
  tiltStrength?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [coarse, setCoarse] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  const arrowCfg = useMemo<SpringOptions>(
    () => ({ stiffness: 380, damping: 32, mass: 0.6 }),
    []
  );
  const labelCfg = useMemo<SpringOptions>(
    () => ({ stiffness: 220, damping: 26, mass: 0.7 }),
    []
  );

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const arrowX = useSpring(mouseX, arrowCfg);
  const arrowY = useSpring(mouseY, arrowCfg);
  const labelX = useSpring(mouseX, labelCfg);
  const labelY = useSpring(mouseY, labelCfg);

  const scale = useMotionValue(1);
  useEffect(() => {
    const c = animate(scale, pressed ? pressScale : 1, {
      type: "spring",
      stiffness: 500,
      damping: 28,
      mass: 0.5,
    });
    return () => c.stop();
  }, [pressed, pressScale, scale]);

  const tiltTarget = useMotionValue(0);
  const rotate = useSpring(tiltTarget, {
    stiffness: 200,
    damping: 24,
    mass: 0.6,
  });

  const lx = useTransform(labelX, (v) => v + size * 0.9);
  const ly = useTransform(labelY, (v) => v + size * 0.2 + 6);

  const last = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || coarse) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const now = performance.now();
      let vx = 0;
      if (last.current) {
        const dt = Math.max(1, now - last.current.t);
        vx = ((x - last.current.x) / dt) * 1000;
      }
      const vy = last.current
        ? ((y - last.current.y) / Math.max(1, now - last.current.t)) * 1000
        : 0;
      last.current = { x, y, t: now };

      mouseX.set(x);
      mouseY.set(y);

      // rock the pill by direction, scaled by overall speed
      const norm = Math.min(1, Math.hypot(vx, vy) / 1500);
      tiltTarget.set(Math.sign(vx) * norm * tiltStrength);
    };

    const enter = () => setHovering(true);
    const leave = () => {
      setHovering(false);
      last.current = null;
      tiltTarget.set(0);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousedown", down);
    el.addEventListener("mouseup", up);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mouseup", up);
    };
  }, [coarse, mouseX, mouseY, tiltTarget, tiltStrength]);

  return (
    <div
      ref={hostRef}
      className={`relative ${className}`}
      style={{ cursor: coarse ? undefined : "none" }}
    >
      {children}

      {!coarse && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
          {/* label sits behind the arrow so the tip is never covered */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              x: lx,
              y: ly,
              rotate,
              scale,
              background: color,
              borderRadius: 999,
              padding: `${size * 0.18}px ${size * 0.36}px`,
              opacity: hovering ? 1 : 0,
              transformOrigin: "0% 50%",
              transition: "opacity 140ms ease",
              willChange: "transform, opacity",
            }}
          >
            <span
              style={{
                color: textColor,
                fontSize: Math.max(7, size * 0.4),
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              x: arrowX,
              y: arrowY,
              scale,
              width: size,
              height: size,
              opacity: hovering ? 1 : 0,
              transformOrigin: "0% 0%",
              transition: "opacity 140ms ease",
              willChange: "transform, opacity",
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 28 28"
              fill="none"
              style={{ display: "block", overflow: "visible" }}
            >
              <path
                d="M5 3 L23 14 L14 16 L11 24 Z"
                fill={color}
                stroke="rgba(0,0,0,0.35)"
                strokeWidth={0.6}
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  );
}
