"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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

const langButtons: Record<Locale, { label: string; bg: string; text: string }> = {
  en: { label: "EN", bg: "#1e40af", text: "#ffffff" },
  es: { label: "ES", bg: "#dc2626", text: "#ffffff" },
  fr: { label: "FR", bg: "#1e3a8a", text: "#ffffff" },
  de: { label: "DE", bg: "#1f2937", text: "#fbbf24" },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex gap-1">
      {(Object.keys(langButtons) as Locale[]).map((lang) => {
        const btn = langButtons[lang];
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wide transition-all duration-200 ${
              isActive
                ? "ring-2 ring-white/40 scale-110"
                : "opacity-60 hover:opacity-90 hover:scale-105"
            }`}
            style={{ backgroundColor: btn.bg, color: btn.text }}
            title={lang.toUpperCase()}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
