export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#features". */
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Destination of every "Get Started" / call-to-action button. */
  ctaUrl: string;
  nav: NavItem[];
}
