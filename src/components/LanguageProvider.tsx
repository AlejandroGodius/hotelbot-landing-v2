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

const langFlags: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
  es: { flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00f1ol" },
  fr: { flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00e7ais" },
  de: { flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex gap-1.5">
      {(Object.keys(langFlags) as Locale[]).map((lang) => {
        const { flag, label } = langFlags[lang];
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            onClick={() => setLocale(lang)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
              isActive
                ? "ring-2 ring-white/40 scale-110 bg-white/10"
                : "opacity-50 hover:opacity-90 hover:scale-105 hover:bg-white/5"
            }`}
            title={label}
          >
            {flag}
          </button>
        );
      })}
    </div>
  );
}
