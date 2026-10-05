import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { pageMetadata, RootDocument } from "@/components/LandingPage";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import "../globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/** Only the translated languages get an address; the default one lives at "/". */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale) : {};
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
