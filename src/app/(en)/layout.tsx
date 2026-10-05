import type { ReactNode } from "react";
import { pageMetadata, RootDocument } from "@/components/LandingPage";
import { defaultLocale } from "@/i18n/config";
import "../globals.css";

export const metadata = pageMetadata(defaultLocale);

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale={defaultLocale}>{children}</RootDocument>;
}
