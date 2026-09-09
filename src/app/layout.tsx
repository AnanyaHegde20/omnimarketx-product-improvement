import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { TradeModalProvider } from "@/context/TradeModalContext";
import { WatchlistProvider } from "@/context/WatchlistContext";
import TradeModalWrapper from "@/components/TradeModalWrapper";
import BackButton from "@/components/BackButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OmniMarketX - Prediction Markets",
  description: "Modern prediction market platform for making informed predictions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <WatchlistProvider>
            <TradeModalProvider>
              {children}
              <TradeModalWrapper />
              <BackButton />
            </TradeModalProvider>
          </WatchlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
