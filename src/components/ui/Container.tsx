import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centers content and applies the shared horizontal page padding. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
