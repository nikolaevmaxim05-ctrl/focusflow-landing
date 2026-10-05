import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { isLocale } from "@/i18n/config";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <LandingPage locale={locale} />;
}
