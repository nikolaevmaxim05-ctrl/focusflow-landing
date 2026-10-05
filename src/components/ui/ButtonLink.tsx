import type { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "lg";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens the link in a new tab (use for links leaving the site). */
  external?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "border border-border text-foreground hover:border-muted hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

/** Link styled as a button. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center rounded-control font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
