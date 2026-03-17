"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Headphones, Globe, Bed, Wrench, TrendingUp, Megaphone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const agentData = [
  { key: "reception", icon: Headphones, gradient: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.3)" },
  { key: "concierge", icon: Globe, gradient: "from-purple-500 to-pink-400", glow: "rgba(168,85,247,0.3)" },
  { key: "housekeeping", icon: Bed, gradient: "from-green-500 to-emerald-400", glow: "rgba(34,197,94,0.3)" },
  { key: "maintenance", icon: Wrench, gradient: "from-amber-500 to-orange-400", glow: "rgba(245,158,11,0.3)" },
  { key: "upselling", icon: TrendingUp, gradient: "from-rose-500 to-red-400", glow: "rgba(244,63,94,0.3)" },
  { key: "campaigns", icon: Megaphone, gradient: "from-indigo-500 to-violet-400", glow: "rgba(99,102,241,0.3)" },
];

function TiltCard({ children, glow }: { children: React.ReactNode; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${glow}` }}
      className="relative rounded-2xl bg-surface-light/80 p-7 border border-white/5 cursor-default transition-shadow"
    >
      {children}
    </motion.div>
  );
}

export default function Agents() {
  const { t } = useLanguage();

  return (
    <section id="agents" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-4 px-4 py-2 rounded-full glass"
          >
            AI Agents
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("agents.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("agents.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {agentData.map((agent, i) => (
            <motion.div
              key={agent.key}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            >
              <TiltCard glow={agent.glow}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-5 shadow-lg`} style={{ transform: "translateZ(30px)" }}>
                  <agent.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ transform: "translateZ(20px)" }}>
                  {t(`agents.${agent.key}.name`)}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                  {t(`agents.${agent.key}.desc`)}
                </p>
                {/* Status indicator */}
                <div className="mt-4 flex items-center gap-2" style={{ transform: "translateZ(15px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-green-400/70 font-semibold">Active</span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
