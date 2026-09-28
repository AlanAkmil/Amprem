import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BottomNav } from "@/components/site/BottomNav";
import { Footer } from "@/components/site/Footer";
import { HidakaAi } from "@/components/site/HidakaAi";
import { Navbar } from "@/components/site/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { absoluteUrl, siteConfig } from "@/config/site";
import { defaultMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8b5cf6",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: siteConfig.author,
      url: absoluteUrl("/"),
      logo: absoluteUrl(siteConfig.logo),
    },
  };

  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.siteName,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" },
    author: { "@type": "Organization", name: siteConfig.author },
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
        />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
          </div>
          <HidakaAi />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
