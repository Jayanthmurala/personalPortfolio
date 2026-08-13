"use client";

import { useEffect, useState } from "react";

/**
 * True only once the client confirms the viewport is at least `px` wide.
 * Use it to *avoid mounting* expensive components on small screens — CSS
 * `hidden lg:block` still mounts them, so a phone pays for WebGL contexts and
 * network fetches it will never see.
 */
export function useMinWidth(px: number) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [px]);

  return ok;
}
