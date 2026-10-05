export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#features". */
  href: string;
}

export interface ImageAsset {
  /** Path relative to the /public folder, e.g. "/logo-mark.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Browser tab title and search result headline. */
  title: string;
  /** Meta description shown in search results. */
  description: string;
  logo: ImageAsset;
  /** Main call-to-action button, shared by the header and other sections. */
  cta: CallToAction;
  nav: NavItem[];
}
