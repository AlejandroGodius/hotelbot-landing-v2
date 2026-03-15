"use client";

import { motion } from "framer-motion";
import { Headphones, Globe, Bed, Wrench, TrendingUp } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const agentData = [
  { key: "reception", icon: Headphones, gradient: "from-blue-500 to-cyan-400" },
  { key: "concierge", icon: Globe, gradient: "from-purple-500 to-pink-400" },
  { key: "housekeeping", icon: Bed, gradient: "from-green-500 to-emerald-400" },
  { key: "maintenance", icon: Wrench, gradient: "from-amber-500 to-orange-400" },
  { key: "upselling", icon: TrendingUp, gradient: "from-rose-500 to-red-400" },
];

export default function Agents() {
  const { t } = useLanguage();

  return (
    <section id="agents" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("agents.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("agents.subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {agentData.map((agent, i) => (
            <motion.div
              key={agent.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl bg-surface-light p-6 border border-white/5 hover:border-white/15 transition-all cursor-default"
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-4`}>
                <agent.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t(`agents.${agent.key}.name`)}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {t(`agents.${agent.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
