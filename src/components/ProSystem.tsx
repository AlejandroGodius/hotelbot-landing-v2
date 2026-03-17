"use client";

import { motion } from "framer-motion";
import { Database, Users, LayoutDashboard, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const steps = [
  { num: 1, key: "step1", icon: Database, color: "text-purple-400", bg: "bg-purple-400/10", glow: "shadow-purple-400/20" },
  { num: 2, key: "step2", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", glow: "shadow-blue-400/20" },
  { num: 3, key: "step3", icon: LayoutDashboard, color: "text-indigo-400", bg: "bg-indigo-400/10", glow: "shadow-indigo-400/20" },
];

export default function ProSystem() {
  const { t } = useLanguage();

  return (
    <section id="pro-system" className="py-28 relative overflow-hidden">
      {/* Background glow — purple/blue gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-purple-600/8 blur-[180px]" />
        <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/8 blur-[180px]" />
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
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-purple-300 mb-4 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md"
          >
            {t("proSystem.badge")}
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {t("proSystem.title")}
            </span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t("proSystem.subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Connecting dashed lines (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-[2px]">
            <div className="w-full h-full border-t-2 border-dashed border-purple-500/20" />
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
              <div className="relative rounded-2xl bg-surface-light/60 p-8 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden h-full">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Premium gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 200, damping: 12 }}
                  className="relative flex items-center gap-4 mb-6"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-300 border border-purple-500/20`}>
                    <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{step.num}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-white mb-3">
                  {t(`proSystem.${step.key}.title`)}
                </h3>
                <p className="relative text-sm text-text-muted leading-relaxed">
                  {t(`proSystem.${step.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://hotelbot-six.vercel.app/get-started"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all duration-300"
            >
              {t("pricing.cta")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
