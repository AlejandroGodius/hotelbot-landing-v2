import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Godius — AI Copilot for Hotels & Villas",
  description:
    "Your guests book experiences, get answers, and love their stay — all through WhatsApp. Free concierge for your property. Earn commissions on every booking via Viator.",
  keywords: [
    "hotel AI concierge",
    "WhatsApp hotel bot",
    "AI hotel assistant",
    "villa management",
    "guest experience booking",
    "hotel experience booking",
    "WhatsApp business hotel",
    "hotel copilot",
  ],
  openGraph: {
    title: "Godius — AI Copilot for Hotels & Villas",
    description:
      "Free AI concierge for your property. Guests book experiences via WhatsApp, you earn commissions. Upgrade to Pro for full hotel operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
