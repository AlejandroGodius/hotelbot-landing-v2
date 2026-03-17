"use client";

import { motion } from "framer-motion";
import { QrCode, MessageCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const steps = [
  { num: 1, key: "step1", icon: QrCode, color: "text-emerald-400", bg: "bg-emerald-400/10", glow: "shadow-emerald-400/20" },
  { num: 2, key: "step2", icon: MessageCircle, color: "text-green-400", bg: "bg-green-400/10", glow: "shadow-green-400/20" },
  { num: 3, key: "step3", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10", glow: "shadow-amber-400/20" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/5 blur-[150px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />
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
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent-light mb-4 px-4 py-2 rounded-full glass"
          >
            {t("howItWorks.badge")}
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("howItWorks.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Connecting dashed lines (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-[2px]">
            <div className="w-full h-full border-t-2 border-dashed border-white/10" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80, damping: 15 }}
              className="relative group"
            >
              <div className="relative rounded-2xl bg-surface-light/60 p-8 border border-white/5 hover:border-white/15 transition-all duration-500 overflow-hidden h-full">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 12 }}
                  className="relative flex items-center gap-4 mb-6"
                >
                  <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-2xl font-black ${step.color}`}>{step.num}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-white mb-3">
                  {t(`howItWorks.${step.key}.title`)}
                </h3>
                <p className="relative text-sm text-text-muted leading-relaxed">
                  {t(`howItWorks.${step.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
