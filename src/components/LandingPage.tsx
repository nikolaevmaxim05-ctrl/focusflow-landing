import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { getContent } from "@/data";
import { localePath, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});


/** Title, description and links to the other language versions. */
export function pageMetadata(locale: Locale): Metadata {
  const { site } = getContent(locale);

  return {
    title: site.title,
    description: site.description,
    alternates: {
      canonical: localePath(locale),
      languages: Object.fromEntries(
        locales.map((code) => [code, localePath(code)]),
      ),
    },
  };
}

/** The html and body shell shared by every language version. */
export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={locale} className={`${manrope.variable} antialiased`}>
      <body id="top" className="font-sans">
        {children}
      </body>
    </html>
  );
}

/** The whole landing page in one language. */
export function LandingPage({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <>
      <SmoothScroll />
      <Header site={content.site} ui={content.ui} locale={locale} />
      <main>
        <Hero hero={content.hero} ui={content.ui} />
        <Features features={content.features} ui={content.ui} />
        <HowItWorks howItWorks={content.howItWorks} />
        <Pricing pricing={content.pricing} />
        <Testimonials testimonials={content.testimonials} />
      </main>
      <Footer footer={content.footer} site={content.site} />
    </>
  );
}
