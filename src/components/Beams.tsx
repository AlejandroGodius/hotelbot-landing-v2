"use client";

import { useEffect, useState } from "react";

type Beam = { id: number; left: string; delay: number; duration: number; opacity: number };

export default function Beams() {
  const [beams, setBeams] = useState<Beam[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBeam: Beam = {
        id: Date.now(),
        left: `${Math.random() * 100}%`,
        delay: 0,
        duration: 2 + Math.random() * 3,
        opacity: 0.1 + Math.random() * 0.15,
      };
      setBeams((prev) => [...prev.slice(-6), newBeam]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="absolute top-0 w-[1px]"
          style={{
            left: beam.left,
            height: "100vh",
            background: `linear-gradient(180deg, transparent, rgba(124,58,237,${beam.opacity}), rgba(6,182,212,${beam.opacity}), transparent)`,
            animation: `beam-down ${beam.duration}s ease-in-out forwards`,
            animationDelay: `${beam.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
