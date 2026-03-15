import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HotelBot — AI Concierge for Hotels & Villas",
  description:
    "WhatsApp AI concierge that handles guest requests, books experiences, manages operations and generates revenue for boutique hotels and luxury villas.",
  keywords: [
    "hotel chatbot",
    "AI concierge",
    "WhatsApp hotel",
    "villa management",
    "guest experience",
    "hotel automation",
  ],
  openGraph: {
    title: "HotelBot — AI Concierge for Hotels & Villas",
    description:
      "WhatsApp AI concierge for boutique hotels and luxury villas. 5 AI agents, experience booking, smart campaigns.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
