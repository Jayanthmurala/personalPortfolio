"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.2
      });
      gsap.to(follower, {
        scale: 2,
        duration: 0.2
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.2
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-island');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: '-8px',
          top: '-8px',
          background: 'radial-gradient(circle, #00f5c4 0%, #a259ff 100%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 pointer-events-none z-40 opacity-20"
        style={{
          left: '-16px',
          top: '-16px',
          border: '2px solid #00f5c4',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}