"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, CheckCircle2, DollarSign, Car, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Message = {
  id: number;
  type: "guest" | "bot";
  text: string;
  typing?: boolean;
};

type Notification = {
  id: number;
  icon: typeof CheckCircle2;
  title: string;
  detail: string;
  color: string;
};

export default function ChatDemo() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const sequence = [
      // Phase 0: Guest message 1
      { delay: 500, action: () => addMessage("guest", t("demo.msg.guest1")) },
      // Phase 1: Bot typing
      { delay: 1500, action: () => addMessage("bot", "", true) },
      // Phase 2: Bot response 1
      { delay: 2500, action: () => replaceLastBot(t("demo.msg.bot1")) },
      // Phase 3: Guest message 2
      { delay: 4500, action: () => addMessage("guest", t("demo.msg.guest2")) },
      // Phase 4: Bot typing
      { delay: 5500, action: () => addMessage("bot", "", true) },
      // Phase 5: Bot response 2
      { delay: 7000, action: () => replaceLastBot(t("demo.msg.bot2")) },
      // Phase 6: Guest message 3
      { delay: 9000, action: () => addMessage("guest", t("demo.msg.guest3")) },
      // Phase 7: Bot typing
      { delay: 10000, action: () => addMessage("bot", "", true) },
      // Phase 8: Bot response 3 + notifications
      {
        delay: 11500,
        action: () => {
          replaceLastBot(t("demo.msg.bot3"));
          addNotification(CheckCircle2, t("demo.staff.notif1"), t("demo.staff.notif1.detail"), "text-green-400");
        },
      },
      {
        delay: 13000,
        action: () => addNotification(Car, t("demo.staff.notif2"), t("demo.staff.notif2.detail"), "text-blue-400"),
      },
      {
        delay: 14500,
        action: () => addNotification(DollarSign, t("demo.staff.notif3"), t("demo.staff.notif3.detail"), "text-amber-400"),
      },
    ];

    const timers = sequence.map((s) => setTimeout(s.action, s.delay));
    return () => timers.forEach(clearTimeout);
  }, [isVisible, t]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function addMessage(type: "guest" | "bot", text: string, typing = false) {
    setMessages((prev) => [...prev, { id: Date.now(), type, text, typing }]);
  }

  function replaceLastBot(text: string) {
    setMessages((prev) => {
      const idx = prev.findLastIndex((m) => m.type === "bot");
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], text, typing: false };
      return updated;
    });
  }

  function addNotification(icon: typeof CheckCircle2, title: string, detail: string, color: string) {
    setNotifications((prev) => [...prev, { id: Date.now(), icon, title, detail, color }]);
  }

  return (
    <section id="demo" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="gradient-text">{t("demo.title")}</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">{t("demo.subtitle")}</p>
        </motion.div>

        {/* Split screen */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Guest Chat */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden gradient-border"
          >
            <div className="bg-surface-light rounded-2xl overflow-hidden">
              {/* Chat header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-lg">💬</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t("demo.guest.title")}</p>
                  <p className="text-xs text-green-400">WhatsApp</p>
                </div>
                <div className="ml-auto flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              {/* Messages */}
              <div ref={chatRef} className="p-4 h-[420px] overflow-y-auto space-y-3">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-2 ${msg.type === "guest" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.type === "bot" && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                          msg.type === "guest"
                            ? "bg-green-600 text-white rounded-br-sm"
                            : "bg-white/10 text-white/90 rounded-bl-sm"
                        }`}
                      >
                        {msg.typing ? (
                          <div className="flex gap-1 py-1">
                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        ) : (
                          msg.text
                        )}
                      </div>
                      {msg.type === "guest" && (
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-white/10">
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                  <span className="text-sm text-white/30 flex-1">{t("demo.guest.placeholder")}</span>
                  <Sparkles className="w-4 h-4 text-primary/50" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Staff Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden gradient-border"
          >
            <div className="bg-surface-light rounded-2xl overflow-hidden">
              {/* Dashboard header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t("demo.staff.title")}</p>
                  <p className="text-xs text-text-muted">HotelBot Pro</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-400/20 text-green-400">Live</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="p-4 h-[420px] overflow-y-auto">
                {/* Status cards */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Active Chats", value: "3", color: "from-primary/20 to-primary/5" },
                    { label: "Today Revenue", value: "€847", color: "from-accent/20 to-accent/5" },
                    { label: "Satisfaction", value: "98%", color: "from-green-500/20 to-green-500/5" },
                  ].map((card, i) => (
                    <div key={i} className={`rounded-xl bg-gradient-to-b ${card.color} p-3 text-center`}>
                      <p className="text-lg font-bold text-white">{card.value}</p>
                      <p className="text-xs text-text-muted">{card.label}</p>
                    </div>
                  ))}
                </div>

                {/* Live notifications */}
                <p className="text-xs text-text-muted uppercase tracking-wider mb-3">Live Activity</p>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                      >
                        <notif.icon className={`w-5 h-5 ${notif.color} shrink-0 mt-0.5`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">{notif.title}</p>
                          <p className="text-xs text-text-muted">{notif.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {notifications.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-primary/40" />
                      </div>
                      <p className="text-sm text-text-muted">Waiting for activity...</p>
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
