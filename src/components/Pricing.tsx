"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const plans = [
  {
    key: "starter",
    features: 5,
    highlighted: false,
  },
  {
    key: "pro",
    features: 7,
    highlighted: true,
  },
  {
    key: "enterprise",
    features: 7,
    highlighted: false,
  },
];

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("pricing.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-primary/20 to-surface-light border-2 border-primary/50 scale-105"
                  : "bg-surface-light border border-white/10"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white">
                    {t("pricing.pro.badge")}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {t(`pricing.${plan.key}.name`)}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {t(`pricing.${plan.key}.desc`)}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {t(`pricing.${plan.key}.price`)}
                  </span>
                  <span className="text-text-muted">
                    {t(`pricing.${plan.key}.period`)}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {Array.from({ length: plan.features }, (_, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">
                      {t(`pricing.${plan.key}.f${j + 1}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25"
                    : plan.key === "enterprise"
                    ? "glass text-white hover:bg-white/10"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                {plan.key === "enterprise"
                  ? t("pricing.cta.enterprise")
                  : t("pricing.cta")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
