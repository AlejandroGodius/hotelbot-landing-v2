"use client";

import { useEffect, useRef } from "react";

export default function SpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(124, 58, 237, 0.06), transparent 40%)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-30 transition-all duration-300" />;
}
