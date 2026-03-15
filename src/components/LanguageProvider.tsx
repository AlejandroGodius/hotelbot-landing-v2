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

const flags: Record<Locale, string> = { en: "🇬🇧", es: "🇪🇸", fr: "🇫🇷", de: "🇩🇪" };

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex gap-1">
      {(Object.keys(flags) as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={`text-sm px-2 py-1 rounded transition-all ${
            locale === lang
              ? "bg-white/10 text-white"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          {flags[lang]}
        </button>
      ))}
    </div>
  );
}
