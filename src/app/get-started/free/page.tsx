"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

const propertyTypes = [
  "Hotel",
  "Boutique Hotel",
  "Villa",
  "Apartment",
  "Hostel",
  "Resort",
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none transition-all";

export default function GetStartedFreePage() {
  const [form, setForm] = useState({
    propertyName: "",
    propertyType: "",
    city: "",
    country: "",
    name: "",
    email: "",
    whatsapp: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    console.log("Free plan registration:", form);
    setTimeout(() => {
      setSubmitting(false);
      alert(
        "Thanks! We'll send your QR code to your WhatsApp shortly."
      );
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 sm:py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to homepage
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-5">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Get Your Free AI Concierge
          </h1>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            Fill in your property details. We&apos;ll generate your unique QR
            code and send it to your WhatsApp — ready to print and place.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* Property name */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Property Name
            </label>
            <input
              type="text"
              name="propertyName"
              required
              placeholder="e.g. Hotel Sunrise Bay"
              value={form.propertyName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Property type */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Property Type
            </label>
            <select
              name="propertyType"
              required
              value={form.propertyType}
              onChange={handleChange}
              className={`${inputClass} ${
                !form.propertyType ? "text-white/30" : ""
              }`}
            >
              <option value="" disabled>
                Select type...
              </option>
              {propertyTypes.map((t) => (
                <option key={t} value={t} className="bg-[#0a0e17] text-white">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* City + Country row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">
                City / Location
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="e.g. Ibiza"
                value={form.city}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">
                Country
              </label>
              <input
                type="text"
                name="country"
                required
                placeholder="e.g. Spain"
                value={form.country}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06]" />

          {/* Your name */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@hotel.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              required
              placeholder="+34 600 000 000"
              value={form.whatsapp}
              onChange={handleChange}
              className={inputClass}
            />
            <p className="text-xs text-white/30 mt-1.5">
              We&apos;ll send your QR code here
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate My QR Code
              </>
            )}
          </button>
        </motion.form>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-white/30 mt-6"
        >
          Free forever &middot; No credit card &middot; Upgrade to Pro anytime
        </motion.p>
      </div>
    </div>
  );
}
