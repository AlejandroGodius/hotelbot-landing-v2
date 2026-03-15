"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState("0");
  const numMatch = value.match(/(\d+)/);
  const target = numMatch ? parseInt(numMatch[1]) : 0;
  const prefix = value.slice(0, value.indexOf(String(target)));
  const suffix = value.slice(value.indexOf(String(target)) + String(target).length);

  useEffect(() => {
    if (!inView || target === 0) return;
    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplay(Math.floor(current).toString());
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  if (target === 0) return <>{value}</>;
  return <>{prefix}{display}{suffix}</>;
}

export default function Impact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { key: "stat1", gradient: "from-primary via-purple-400 to-pink-400" },
    { key: "stat2", gradient: "from-green-400 via-emerald-400 to-teal-400" },
    { key: "stat3", gradient: "from-amber-400 via-orange-400 to-red-400" },
    { key: "stat4", gradient: "from-cyan-400 via-blue-400 to-indigo-400" },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-4">
            <span className="gradient-text">{t("impact.title")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.5, y: 40 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 80, damping: 15 }}
              whileHover={{ scale: 1.1 }}
              className="text-center p-6 rounded-2xl glass gradient-border-spin cursor-default"
            >
              <div className={`text-5xl sm:text-7xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                <AnimatedNumber value={t(`impact.${stat.key}.value`)} inView={inView} />
              </div>
              <p className="text-sm text-text-muted">
                {t(`impact.${stat.key}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
