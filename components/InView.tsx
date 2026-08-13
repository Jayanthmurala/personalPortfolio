"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only while the slot is near the viewport. Canvas components
 * keep their animation loop running forever otherwise, burning frames on a
 * hero the visitor scrolled past a long time ago.
 */
export default function InView({
  children,
  className = "",
  rootMargin = "300px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : null}
    </div>
  );
}
