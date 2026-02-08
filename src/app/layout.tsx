import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://taprovia.com'),
  title: {
    default: "TAPROVIA | Premium Ceylon Goods",
    template: "%s | TAPROVIA",
  },
  description: "Curated collection of premium goods from Sri Lanka. Discover authentic Ceylon tea, spices, and crafts.",
  keywords: ["Ceylon Tea", "Sri Lanka Spices", "Premium Crafts", "Taprovia", "Authentic Sri Lankan Products"],
  openGraph: {
    title: "TAPROVIA | Premium Ceylon Goods",
    description: "Curated collection of premium goods from Sri Lanka.",
    url: 'https://taprovia.com',
    siteName: 'TAPROVIA',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "fS0m8025dWUjtcaPsHbPNNqRMEXrAgRXaJKoFX-ab9g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#050505] text-[#F3EFE9]`}
      >
        {children}
        <AnalyticsTracker />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
