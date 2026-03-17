"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const plans = [
  { key: "free", features: 5, highlighted: false },
  { key: "pro", features: 8, highlighted: true },
];

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-28 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
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
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-4 px-4 py-2 rounded-full glass"
          >
            Pricing
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("pricing.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring" }}
              whileHover={{ y: -10 }}
              style={{ overflow: "visible" }}
              className={`relative rounded-2xl p-8 transition-all duration-300 flex flex-col ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/15 to-surface-light gradient-border-spin"
                  : "bg-gradient-to-b from-orange-500/15 to-surface-light gradient-border-spin"
              }`}
            >
              {plan.highlighted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30">
                    <Sparkles className="w-3 h-3" />
                    {t("pricing.pro.badge")}
                  </span>
                </motion.div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{t(`pricing.${plan.key}.name`)}</h3>
                <p className="text-sm text-text-muted mb-5">{t(`pricing.${plan.key}.desc`)}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-black ${plan.highlighted ? "gradient-text" : "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"}`}>
                    {t(`pricing.${plan.key}.price`)}
                  </span>
                  <span className="text-text-muted text-lg">{t(`pricing.${plan.key}.period`)}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {Array.from({ length: plan.features }, (_, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.highlighted ? "bg-primary/20" : "bg-orange-500/20"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlighted ? "text-primary-light" : "text-orange-400"}`} />
                    </div>
                    <span className="text-sm text-white/80">{t(`pricing.${plan.key}.f${j + 1}`)}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.key === "free" ? "/get-started/free" : "https://hotelbot-six.vercel.app/get-started"}
                className={`block w-full text-center py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                  plan.highlighted
                    ? "glow-button bg-gradient-to-r from-primary via-blue-600 to-accent text-white hover:scale-105"
                    : "glow-button bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white hover:scale-105"
                }`}
              >
                {plan.key === "free" ? t("pricing.cta.free") : t("pricing.cta")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
