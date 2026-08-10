import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteSettings } from "@/content/site";
import { siteUrl } from "@/lib/config";
import { getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { clinicSchema } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteSettings.seo.defaultTitle,
    template: siteSettings.seo.titleTemplate,
  },
  description: siteSettings.seo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteSettings.clinicName,
    locale: "en_US",
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, location] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
  ]);

  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <Header />

        {/* Bottom padding leaves room for the mobile call/book bar. */}
        <main id="main" className="flex-1 pb-16 sm:pb-0">
          {children}
        </main>

        <Footer />

        <StickyMobileCTA phone={settings.phone} phoneHref={settings.phoneHref} />

        {/* Site-wide LocalBusiness data, referenced by @id from page-level schema. */}
        <JsonLd data={clinicSchema(settings, location)} />
      </body>
    </html>
  );
}
