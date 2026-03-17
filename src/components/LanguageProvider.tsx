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
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-all duration-200"
      >
        <span className="text-base">{langFlags[locale].flag}</span>
        <span className="text-xs font-medium text-white/70">{locale.toUpperCase()}</span>
        <svg className={`w-3 h-3 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 rounded-xl glass border border-white/10 py-1 min-w-[140px] shadow-xl">
            {(Object.keys(langFlags) as Locale[]).map((lang) => {
              const { flag, label } = langFlags[lang];
              const isActive = locale === lang;
              return (
                <button
                  key={lang}
                  onClick={() => { setLocale(lang); setOpen(false); }}
                  className={`w-full px-3 py-2 flex items-center gap-2.5 text-left transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span className="text-sm">{label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
