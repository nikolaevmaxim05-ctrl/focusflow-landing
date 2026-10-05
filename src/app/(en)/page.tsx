import { LandingPage } from "@/components/LandingPage";
import { defaultLocale } from "@/i18n/config";

export default function Home() {
  return <LandingPage locale={defaultLocale} />;
}
