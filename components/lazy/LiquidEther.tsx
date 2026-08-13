"use client";

import dynamic from "next/dynamic";

/**
 * Decorative: the page reads correctly without it. One wrapper per component
 * so a page only ever pulls the chunk it actually renders — a shared barrel
 * dragged three.js onto pages that never use it.
 */
export default dynamic(() => import("@/components/LiquidEther"), { ssr: false });
