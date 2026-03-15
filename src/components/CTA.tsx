"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-600/20 to-accent/20" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-10 py-5 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            {t("cta.button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-6 text-sm text-text-muted">{t("cta.note")}</p>
        </motion.div>
      </div>
    </section>
  );
}
