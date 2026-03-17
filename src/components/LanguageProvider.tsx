"use client";

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Locale, t as translate } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = (key: string) => translate(locale, key);
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

const langFlags: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
  es: { flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00f1ol" },
  fr: { flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00e7ais" },
  de: { flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
};

function GlobeIcon({ spinning }: { spinning: boolean }) {
  return (
    <motion.svg
      animate={spinning ? { rotateY: 360 } : {}}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </motion.svg>
  );
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (lang: Locale) => {
    if (lang === locale) { setOpen(false); return; }
    setSpinning(true);
    setLocale(lang);
    setOpen(false);
    setTimeout(() => setSpinning(false), 1500);
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
      >
        <div className="text-primary-light group-hover:text-white transition-colors">
          <GlobeIcon spinning={spinning} />
        </div>
        <span className="text-lg leading-none">{langFlags[locale].flag}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-3 z-50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 min-w-[180px]"
            style={{ background: "rgba(10, 10, 31, 0.95)", backdropFilter: "blur(20px)" }}
          >
            <div className="p-1.5">
              {(Object.keys(langFlags) as Locale[]).map((lang, i) => {
                const { flag, label } = langFlags[lang];
                const isActive = locale === lang;
                return (
                  <motion.button
                    key={lang}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSelect(lang)}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-primary/20 to-accent/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{flag}</span>
                    <span className="text-sm font-medium flex-1 text-left">{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="lang-active"
                        className="w-1.5 h-1.5 rounded-full bg-primary-light"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            <div className="px-4 py-2 border-t border-white/5">
              <p className="text-[10px] text-white/30 text-center">AI responds in 30+ languages</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
