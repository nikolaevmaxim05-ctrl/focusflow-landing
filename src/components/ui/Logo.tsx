import Image from "next/image";
import { site } from "@/data/site";

/** Logo mark on a white tile followed by the site name. Links to the top of the page. */
export function Logo() {
  return (
    <a
      href="#top"
      className="inline-flex items-center gap-2.5 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        className="size-9 rounded-lg bg-white"
        priority
      />
      <span className="text-lg font-bold tracking-tight">{site.name}</span>
    </a>
  );
}
