"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-accent/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/15 blur-[200px] animate-pulse-glow" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 20 }}
          className="relative"
        >
          {/* Floating sparkles */}
          <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-10 left-1/4">
            <Sparkles className="w-6 h-6 text-primary/30" />
          </motion.div>
          <motion.div animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-5 right-1/4">
            <Sparkles className="w-4 h-4 text-accent/30" />
          </motion.div>

          <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>

          <motion.a
            href="https://hotelbot-six.vercel.app/get-started"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group glow-button inline-flex items-center gap-3 px-12 py-6 text-xl font-black rounded-full bg-gradient-to-r from-primary via-blue-600 to-accent text-white shadow-2xl shadow-primary/25 transition-all"
          >
            {t("cta.button")}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.a>

          <p className="mt-8 text-sm text-text-muted">{t("cta.note")}</p>
        </motion.div>
      </div>
    </section>
  );
}
