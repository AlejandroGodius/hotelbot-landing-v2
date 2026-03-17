import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HotelBot — WhatsApp AI Assistant for Hotels & Villas",
  description:
    "Paste your Booking.com URL. In 5 minutes, get a WhatsApp AI assistant that answers guests 24/7, books experiences, and generates revenue. 6 AI agents, affiliate commissions, smart campaigns.",
  keywords: [
    "hotel chatbot",
    "WhatsApp hotel bot",
    "AI hotel assistant",
    "villa management",
    "guest experience automation",
    "hotel AI",
    "WhatsApp business hotel",
  ],
  openGraph: {
    title: "HotelBot — WhatsApp AI Assistant for Hotels & Villas",
    description:
      "Paste your URL, get a WhatsApp AI assistant in 5 minutes. 6 AI agents, experience booking, affiliate revenue, smart campaigns.",
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
