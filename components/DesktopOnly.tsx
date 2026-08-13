"use client";

import type { ReactNode } from "react";
import { useMinWidth } from "@/components/useMinWidth";

/**
 * Renders nothing at all below the breakpoint. Unlike `hidden lg:block`, the
 * children never mount, so phones do not pay for WebGL contexts, canvas loops
 * or the network requests those components make.
 */
export default function DesktopOnly({
  children,
  minWidth = 1024,
  className = "",
}: {
  children: ReactNode;
  minWidth?: number;
  className?: string;
}) {
  const show = useMinWidth(minWidth);
  if (!show) return null;
  return <div className={className}>{children}</div>;
}
