import { site } from "./site";
import type { FooterContent } from "./types";

export const footer: FooterContent = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Get it on Google Play", href: site.cta.href, external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        // Placeholders: these pages do not exist yet.
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  contact: {
    title: "Contact",
    text: "Questions or feedback? Write to us.",
    // Placeholder: replace with the real support address.
    email: "hello@example.com",
  },
  socials: [
    // Placeholders: replace "#" with the real profile links.
    { network: "x", label: "FocusFlow on X", href: "#" },
    { network: "instagram", label: "FocusFlow on Instagram", href: "#" },
    { network: "youtube", label: "FocusFlow on YouTube", href: "#" },
  ],
  copyright: "FocusFlow. All rights reserved.",
};
