"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating geometric shapes
    const shapes = [
      { type: 'circle', size: 20, color: '#00f5c4' },
      { type: 'triangle', size: 15, color: '#a259ff' },
      { type: 'square', size: 12, color: '#00f5c4' },
      { type: 'circle', size: 25, color: '#a259ff' },
      { type: 'triangle', size: 18, color: '#00f5c4' },
    ];

    shapes.forEach((shape, index) => {
      const element = document.createElement('div');
      element.className = 'absolute pointer-events-none opacity-10';
      
      if (shape.type === 'circle') {
        element.style.width = `${shape.size}px`;
        element.style.height = `${shape.size}px`;
        element.style.borderRadius = '50%';
        element.style.background = `radial-gradient(circle, ${shape.color}, transparent)`;
      } else if (shape.type === 'triangle') {
        element.style.width = '0';
        element.style.height = '0';
        element.style.borderLeft = `${shape.size/2}px solid transparent`;
        element.style.borderRight = `${shape.size/2}px solid transparent`;
        element.style.borderBottom = `${shape.size}px solid ${shape.color}`;
      } else if (shape.type === 'square') {
        element.style.width = `${shape.size}px`;
        element.style.height = `${shape.size}px`;
        element.style.background = `linear-gradient(45deg, ${shape.color}, transparent)`;
        element.style.transform = 'rotate(45deg)';
      }

      // Random initial position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;

      container.appendChild(element);

      // Animate floating movement
      gsap.to(element, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: 360,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 2
      });

      // Fade in and out
      gsap.to(element, {
        opacity: 0.3,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 1.5
      });
    });

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
}