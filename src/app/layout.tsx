import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

import fs from 'fs';
import path from 'path';

function getSettings() {
  try {
    const settingsPath = path.join(process.cwd(), 'src/data/admin/settings.json');
    const data = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {
      siteTitle: "MINT. LUXE. AUTO.",
      metaDescription: "Curating the Exceptional"
    };
  }
}

const settings = getSettings();

export const metadata: Metadata = {
  title: settings.siteTitle || "MINT. LUXE. AUTO. | Curating the Exceptional",
  description: settings.metaDescription || "Bespoke automotive concierge and boutique showroom for the world's most exclusive vehicles.",
  keywords: ["luxury cars", "automotive concierge", "bespoke vehicles", "premium cars"],
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <LanguageProvider>
          <Preloader />
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
