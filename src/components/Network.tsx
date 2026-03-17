"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, Compass, Car, Utensils, Plane, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const cards = [
  { key: "card1", icon: Compass, gradient: "from-orange-500 to-amber-400", glow: "rgba(245,158,11,0.2)" },
  { key: "card2", icon: Car, gradient: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.2)" },
  { key: "card3", icon: Utensils, gradient: "from-rose-500 to-pink-400", glow: "rgba(244,63,94,0.2)" },
  { key: "card4", icon: Plane, gradient: "from-emerald-500 to-green-400", glow: "rgba(34,197,94,0.2)" },
];

export default function Network() {
  const { t } = useLanguage();

  const stats = [
    { key: "stat1", color: "text-green-400" },
    { key: "stat2", color: "text-cyan-400" },
    { key: "stat3", color: "text-amber-400" },
  ];

  return (
    <section id="network" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-primary/5 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      {/* Animated connection lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <motion.path
            d="M200,400 Q600,200 1000,400"
            stroke="url(#networkGrad)"
            strokeWidth="1"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,400 Q600,600 1000,400"
            stroke="url(#networkGrad)"
            strokeWidth="1"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="networkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.5)" />
              <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0.5)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-4 px-4 py-2 rounded-full glass"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            {t("partners.badge")}
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("partners.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">{t("partners.subtitle")}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: `0 0 40px ${card.glow}` }}
              className="relative rounded-2xl bg-surface-light/80 p-8 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer-line opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                <card.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-white mb-3">
                {t(`partners.${card.key}.title`)}
              </h3>
              <p className="relative text-sm text-text-muted leading-relaxed">
                {t(`partners.${card.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="text-center px-10 py-6 rounded-2xl glass gradient-border-spin cursor-default"
            >
              <span className={`text-4xl font-black ${stat.color}`}>
                {t(`partners.${stat.key}.value`)}
              </span>
              <p className="text-sm text-text-muted mt-1">
                {t(`partners.${stat.key}.label`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="inline-flex items-center gap-2 text-sm text-text-muted/70">
            <Sparkles className="w-4 h-4 text-primary-light" />
            {t("partners.hint")}
            <Sparkles className="w-4 h-4 text-primary-light" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
