/**
 * @fileoverview Root layout for the VoteGuide application.
 * Configures global fonts (Inter + Outfit via Google Fonts), metadata for SEO,
 * accessibility skip-link, error boundary, and the floating AI assistant widget.
 */

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AIAssistant } from "@/components/ui/AIAssistant";
import { SkipLink } from "@/components/ui/SkipLink";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

/** Inter — primary body font */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Outfit — display/heading font */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Application-level metadata for SEO and social sharing.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: "VoteGuide — Your Complete Election Companion",
  description:
    "An AI-powered civic-tech application that guides citizens through the 7 stages of the election process — from eligibility to certified results. Built with Next.js, Firebase, Gemini AI, and Google Maps.",
  keywords: [
    "voting",
    "election",
    "voter registration",
    "civic tech",
    "ballot guide",
    "polling locations",
    "AI assistant",
    "Google Maps",
    "Firebase",
  ],
  authors: [{ name: "VoteGuide Team" }],
  robots: "index, follow",
  openGraph: {
    title: "VoteGuide — Your Complete Election Companion",
    description:
      "Navigate the complete election lifecycle with AI-powered assistance, interactive checklists, and personalized ballot previews.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * RootLayout wraps every page with global providers, fonts, and persistent
 * UI elements (SkipLink, ErrorBoundary, AIAssistant).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050914] text-gray-100 font-sans relative">
        <SkipLink />
        <ErrorBoundary>
          <div id="main-content">{children}</div>
        </ErrorBoundary>
        <AIAssistant />
      </body>
    </html>
  );
}
