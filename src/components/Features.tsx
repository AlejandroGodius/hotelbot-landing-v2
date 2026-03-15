"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Languages,
  Ship,
  Megaphone,
  ArrowRightLeft,
  Star,
  LayoutDashboard,
  Timer,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const featureData = [
  { key: "whatsapp", icon: MessageCircle },
  { key: "multilang", icon: Languages },
  { key: "experiences", icon: Ship },
  { key: "campaigns", icon: Megaphone },
  { key: "handoff", icon: ArrowRightLeft },
  { key: "reviews", icon: Star },
  { key: "dashboard", icon: LayoutDashboard },
  { key: "onboarding", icon: Timer },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("features.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureData.map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl bg-surface-light/50 p-6 border border-white/5 hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary-light" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {t(`features.${feature.key}.title`)}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {t(`features.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
