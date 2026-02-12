import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NeuralSystemInitializer } from "@/components/neural/SystemInitializer"; // Custom Logic Component
import "./globals.css";

/**
 * Project A1: Neural Shell [cite: 2026-02-11]
 * Rule: Pichai Rule (Scale) & Musk Rule (Efficiency).
 * Rule: Onion Architecture (Nested Security Layers).
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "A1 | Neural Command Nexus",
  description: "Super Genius AI Engine v2.5. Guardian Protocol Active. Made with First Principles.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "A1 Neural",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#020202", // Rule: OLED Black for Max Efficiency [cite: 2026-02-11]
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-[#020202] text-foreground selection:bg-primary/30`}
      >
        {/* Layer 1: The Guardian Validation Layer (Onion Architecture) [cite: 2026-02-11] */}
        <TooltipProvider delayDuration={0}>
          
          {/* Layer 2: Neural System Initializer (Runs 5-Second Diagnosis) [cite: 2026-02-11] */}
          <NeuralSystemInitializer />

          <div className="relative flex min-h-screen flex-col overflow-hidden">
            {/* Layer 3: Main Interface Shell [cite: 2026-02-11] */}
            <main className="flex-1 relative z-10">
              {children}
            </main>

            {/* Global Neural Feedback System (RLHF) [cite: 2026-02-11] */}
            <Toaster />
          </div>

          {/* Layer 4: Security Overlay & Scan Line [cite: 2026-02-11] */}
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/neural-noise.png')] opacity-[0.02] mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scan" />
          </div>

        </TooltipProvider>

        {/* Ghost Module stub for future Omega Protocol (Kill Switch) [cite: 2026-02-11] */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.key === 'k') {
              console.warn('PROTOCOL OMEGA: SYSTEM FREEZE TRIGGERED');
              // Implement Hard-coded Kill Switch Logic here
            }
          });
        `}} />
      </body>
    </html>
  );
}
