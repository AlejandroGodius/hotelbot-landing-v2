"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Impact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { key: "stat1", color: "from-primary to-blue-400" },
    { key: "stat2", color: "from-green-400 to-emerald-400" },
    { key: "stat3", color: "from-amber-400 to-orange-400" },
    { key: "stat4", color: "from-accent to-cyan-300" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("impact.title")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="text-center"
            >
              <div className={`text-5xl sm:text-6xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {t(`impact.${stat.key}.value`)}
              </div>
              <p className="text-sm sm:text-base text-text-muted">
                {t(`impact.${stat.key}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
