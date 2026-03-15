"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatDemo from "@/components/ChatDemo";
import Agents from "@/components/Agents";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <ChatDemo />
        <Features />
        <Agents />
        <Impact />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
