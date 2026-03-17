"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import SpotlightEffect from "@/components/SpotlightEffect";
import ParticleField from "@/components/ParticleField";
import Beams from "@/components/Beams";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatDemo from "@/components/ChatDemo";
import Agents from "@/components/Agents";
import Features from "@/components/Features";
import Network from "@/components/Network";
import Impact from "@/components/Impact";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import ProSystem from "@/components/ProSystem";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="noise">
        <ParticleField />
        <SpotlightEffect />
        <Beams />
        <Navbar />
        <main className="relative z-20">
          <Hero />
          <ChatDemo />
          <Features />
          <HowItWorks />
          <Network />
          <Agents />
          <ProSystem />
          <Impact />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
