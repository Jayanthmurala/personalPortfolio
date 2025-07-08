"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text reveal
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "<0.3"
    );

    // Animate loading bar
    tl.to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
    });

    // Exit animation
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setIsLoading(false),
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0a0d14] via-black to-[#0a0d14] flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold tracking-wide glow-text animate-pulse"
        >
          Jayanth Murala
        </h1>

        <p
          ref={subtitleRef}
          className="text-md md:text-lg text-gray-400 tracking-wide"
        >
          <p
            ref={subtitleRef}
            className="text-md md:text-lg text-gray-400 tracking-wide"
          >
            🛸 Preparing full-stack awesomeness...
          </p>
        </p>

        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#00f5c4] to-[#a259ff] rounded-full shimmer"
            style={{ width: "0%" }}
          />
        </div>

        <p className="text-sm text-gray-500 tracking-wider italic">
          &quot;Turning ideas into immersive code...&quot;
        </p>
      </div>
    </div>
  );
}
