"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, CheckCircle2, DollarSign, Car, Sparkles, Wifi } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Message = { id: number; type: "guest" | "bot"; text: string; typing?: boolean };
type Notification = { id: number; icon: typeof CheckCircle2; title: string; detail: string; color: string };

export default function ChatDemo() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const addMsg = (type: "guest" | "bot", text: string, typing = false) =>
      setMessages((prev) => [...prev, { id: Date.now() + Math.random(), type, text, typing }]);

    const replaceBot = (text: string) =>
      setMessages((prev) => {
        const idx = prev.findLastIndex((m) => m.type === "bot");
        if (idx === -1) return prev;
        const u = [...prev];
        u[idx] = { ...u[idx], text, typing: false };
        return u;
      });

    const addNotif = (icon: typeof CheckCircle2, title: string, detail: string, color: string) =>
      setNotifications((prev) => [...prev, { id: Date.now() + Math.random(), icon, title, detail, color }]);

    const seq = [
      { d: 600, fn: () => addMsg("guest", t("demo.msg.guest1")) },
      { d: 1800, fn: () => addMsg("bot", "", true) },
      { d: 3200, fn: () => replaceBot(t("demo.msg.bot1")) },
      { d: 5200, fn: () => addMsg("guest", t("demo.msg.guest2")) },
      { d: 6400, fn: () => addMsg("bot", "", true) },
      { d: 8200, fn: () => replaceBot(t("demo.msg.bot2")) },
      { d: 10500, fn: () => addMsg("guest", t("demo.msg.guest3")) },
      { d: 11500, fn: () => addMsg("bot", "", true) },
      { d: 13000, fn: () => { replaceBot(t("demo.msg.bot3")); addNotif(CheckCircle2, t("demo.staff.notif1"), t("demo.staff.notif1.detail"), "text-green-400"); } },
      { d: 14500, fn: () => addNotif(Car, t("demo.staff.notif2"), t("demo.staff.notif2.detail"), "text-blue-400") },
      { d: 16000, fn: () => addNotif(DollarSign, t("demo.staff.notif3"), t("demo.staff.notif3.detail"), "text-amber-400") },
    ];

    const timers = seq.map((s) => setTimeout(s.fn, s.d));
    return () => timers.forEach(clearTimeout);
  }, [isVisible, t]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <section id="demo" ref={ref} className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-green-400 mb-4 px-4 py-2 rounded-full glass"
          >
            Live Demo
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-black mb-5">
            <span className="gradient-text">{t("demo.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("demo.subtitle")}</p>
        </motion.div>

        {/* Phone + Dashboard layout */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* WhatsApp Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20 }}
            className="relative mx-auto max-w-[380px] w-full"
          >
            {/* Phone frame */}
            <div className="rounded-[2.5rem] bg-gradient-to-b from-gray-700 to-gray-900 p-[3px] shadow-2xl shadow-primary/20">
              <div className="rounded-[2.3rem] bg-surface-light overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-24 h-5 rounded-full bg-black/80" />
                </div>

                {/* WhatsApp header */}
                <div className="px-4 py-3 bg-green-800/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">HotelBot AI</p>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-green-400" />
                      <p className="text-[10px] text-green-400">online</p>
                    </div>
                  </div>
                </div>

                {/* Chat messages */}
                <div ref={chatRef} className="p-3 h-[440px] overflow-y-auto space-y-2.5 bg-[#0a0f14]">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className={`flex ${msg.type === "guest" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line shadow-lg ${
                            msg.type === "guest"
                              ? "bg-green-700/80 text-white rounded-2xl rounded-br-sm"
                              : "bg-white/8 text-white/90 rounded-2xl rounded-bl-sm border border-white/5"
                          }`}
                        >
                          {msg.typing ? (
                            <div className="flex gap-1.5 py-1.5 px-1">
                              {[0, 1, 2].map((i) => (
                                <span key={i} className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                              ))}
                            </div>
                          ) : (
                            <>
                              {msg.type === "bot" && (
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <Sparkles className="w-3 h-3 text-primary-light" />
                                  <span className="text-[10px] font-bold text-primary-light uppercase tracking-wider">AI Concierge</span>
                                </div>
                              )}
                              {msg.text}
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input bar */}
                <div className="px-3 py-3 bg-[#0a0f14] border-t border-white/5">
                  <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
                    <span className="text-xs text-white/25 flex-1">{t("demo.guest.placeholder")}</span>
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Home bar */}
                <div className="flex justify-center py-2">
                  <div className="w-28 h-1 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

            {/* Glow behind phone */}
            <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-accent/20 blur-[60px] rounded-full -z-10" />
          </motion.div>

          {/* Staff Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20, delay: 0.2 }}
            className="rounded-2xl overflow-hidden gradient-border-spin"
          >
            <div className="bg-surface-light rounded-2xl overflow-hidden">
              {/* Dashboard header */}
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t("demo.staff.title")}</p>
                  <p className="text-[10px] text-text-muted">HotelBot Pro</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 font-bold">LIVE</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 p-4">
                {[
                  { label: "Active Chats", value: "3", gradient: "from-primary/20 to-primary/5", valueColor: "text-purple-300" },
                  { label: "Today Revenue", value: "€847", gradient: "from-accent/20 to-accent/5", valueColor: "text-cyan-300" },
                  { label: "Satisfaction", value: "98%", gradient: "from-green-500/20 to-green-500/5", valueColor: "text-green-300" },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`rounded-xl bg-gradient-to-b ${card.gradient} p-3 text-center border border-white/5`}
                  >
                    <p className={`text-xl font-black ${card.valueColor}`}>{card.value}</p>
                    <p className="text-[10px] text-text-muted">{card.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="px-4 pb-4">
                <p className="text-[10px] text-text-muted uppercase tracking-[0.15em] mb-3 font-bold">Live Activity</p>
                <div className="space-y-2.5 min-h-[280px]">
                  <AnimatePresence mode="popLayout">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 30, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ type: "spring", damping: 20 }}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <notif.icon className={`w-4 h-4 ${notif.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white">{notif.title}</p>
                          <p className="text-xs text-text-muted mt-0.5">{notif.detail}</p>
                        </div>
                        <span className="text-[9px] text-text-muted shrink-0">now</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {notifications.length === 0 && (
                    <div className="text-center py-16">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-14 h-14 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mx-auto mb-4"
                      >
                        <Sparkles className="w-6 h-6 text-primary/30" />
                      </motion.div>
                      <p className="text-sm text-text-muted">Waiting for activity...</p>
                      <p className="text-xs text-text-muted/50 mt-1">Scroll to trigger demo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
