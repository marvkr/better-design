import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, Caveat, Newsreader } from "next/font/google";
import { MotionConfig } from "motion/react";

import { Toaster } from "@/components/ui/sonner";
import { CursorDots } from "@/components/cursor-dots";
import { ReactQueryProvider } from "@/lib/query-provider";
import { PostHogProvider } from "@/lib/posthog-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://better-design.com"
  ),
  title: {
    default: "Better Design — Make the web sexy again",
    template: "%s | Better Design",
  },
  description:
    "Pick a vibe. Get the puzzles. Put something beautiful into the world.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Better Design — Design systems for the AI era.",
    description:
      "Define your brand. Get 80+ components as building blocks. Push something beautiful into the world.",
    siteName: "Better Design",
    // Image intentionally omitted — Next.js resolves it from the
    // `opengraph-image` file convention at src/app/opengraph-image.tsx
    // (and `twitter-image.tsx` for Twitter cards).
  },
  twitter: {
    card: "summary_large_image",
    creator: "@betterdesign_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PostHogProvider>
      <ReactQueryProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${newsreader.variable} antialiased bg-background`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <MotionConfig reducedMotion="user">
                <CursorDots />
                <Toaster />
                {children}
              </MotionConfig>
            </ThemeProvider>
          </body>
        </html>
      </ReactQueryProvider>
    </PostHogProvider>
  );
}
