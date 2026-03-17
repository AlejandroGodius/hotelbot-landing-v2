"use client";

import { Bot } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Godius</span>
            </div>
            <p className="text-sm text-text-muted">{t("footer.tagline")}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#features" className="hover:text-white transition-colors">{t("nav.features")}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t("nav.pricing")}</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">{t("nav.demo")}</a></li>
              <li><a href="#agents" className="hover:text-white transition-colors">{t("nav.agents")}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.about")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.blog")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.careers")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.gdpr")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-text-muted">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
