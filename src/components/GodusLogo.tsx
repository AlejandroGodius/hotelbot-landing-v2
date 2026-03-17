"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface GodusLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function GodusLogo({ size = "md", showText = true, className = "" }: GodusLogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-xl", gap: "gap-1.5" },
    md: { icon: 64, text: "text-[1.65rem]", gap: "gap-2.5" },
    lg: { icon: 48, text: "text-5xl", gap: "gap-3" },
  };

  const s = sizes[size];

  return (
    <motion.div
      className={`flex items-center ${s.gap} ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Godius Face Logomark */}
      <div className="relative shrink-0">
        <Image
          src="/godius-face.png"
          alt="Godius"
          width={s.icon}
          height={s.icon}
          className="relative z-10 rounded-full object-cover"
          style={{ width: s.icon, height: s.icon }}
          priority
        />

        {/* Glow effect behind logomark */}
        <div
          className="absolute inset-0 blur-lg opacity-40 -z-10 scale-150"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(6,182,212,0.3) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Wordmark */}
      {showText && (
        <span
          className={`${s.text} font-extrabold leading-none godius-wordmark mt-2`}
          style={{
            fontFamily: "'Syne', 'Inter', system-ui, sans-serif",
            letterSpacing: "-0.01em",
          }}
        >
          Godius
        </span>
      )}
    </motion.div>
  );
}
