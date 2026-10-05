import Image from "next/image";
import type { SiteConfig } from "@/data/types";

interface LogoProps {
  site: SiteConfig;
}

/** Logo mark on a white tile followed by the site name. Links to the top of the page. */
export function Logo({ site }: LogoProps) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        className="size-9 rounded-lg bg-white transition-all duration-300 group-hover:shadow-[0_0_18px_rgb(45_212_191/0.7)]"
        priority
      />
      <span className="text-lg font-bold tracking-tight transition-all duration-300 group-hover:[text-shadow:0_0_16px_rgb(45_212_191/0.7)]">
        {site.name}
      </span>
    </a>
  );
}
