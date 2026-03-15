"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Languages, Ship, Megaphone,
  ArrowRightLeft, Star, LayoutDashboard, Timer,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const featureData = [
  { key: "whatsapp", icon: MessageCircle, color: "text-green-400", bg: "bg-green-400/10" },
  { key: "multilang", icon: Languages, color: "text-blue-400", bg: "bg-blue-400/10" },
  { key: "experiences", icon: Ship, color: "text-purple-400", bg: "bg-purple-400/10" },
  { key: "campaigns", icon: Megaphone, color: "text-amber-400", bg: "bg-amber-400/10" },
  { key: "handoff", icon: ArrowRightLeft, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { key: "reviews", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { key: "dashboard", icon: LayoutDashboard, color: "text-pink-400", bg: "bg-pink-400/10" },
  { key: "onboarding", icon: Timer, color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-28 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

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
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-4 px-4 py-2 rounded-full glass"
          >
            Features
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("features.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureData.map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl bg-surface-light/60 p-6 border border-white/5 hover:border-white/15 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className={`relative w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="relative text-base font-bold text-white mb-2">
                {t(`features.${feature.key}.title`)}
              </h3>
              <p className="relative text-sm text-text-muted leading-relaxed">
                {t(`features.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
