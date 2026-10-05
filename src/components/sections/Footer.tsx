import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { footer } from "@/data/footer";

const linkClassName =
  "rounded-control text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col items-start gap-6">
            <Logo />
            <ul className="flex gap-3">
              {footer.socials.map((social) => (
                <li key={social.network}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-muted hover:border-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover"
                  >
                    <SocialIcon network={social.network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={linkClassName}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div id="contact">
            <h2 className="text-sm font-semibold">{footer.contact.title}</h2>
            <p className="mt-4 text-muted">{footer.contact.text}</p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="mt-3 inline-block rounded-control text-sm font-semibold [overflow-wrap:anywhere] text-accent hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
            >
              {footer.contact.email}
            </a>
          </div>
        </div>

        <p className="border-t border-border pt-8 text-sm text-subtle">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
