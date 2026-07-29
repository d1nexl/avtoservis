import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { FacebookIcon } from "./ui/icons";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border pb-24 pt-16 lg:pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-muted">{dict.footer.tagline}</p>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="mt-5 flex h-10 w-10 items-center justify-center border border-border text-ink-muted transition-colors hover:border-accent-bright hover:text-accent-bright"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <div>
            <div className="font-data text-xs uppercase tracking-[0.14em] text-ink-dim">
              {dict.footer.servicesTitle}
            </div>
            <ul className="mt-4 space-y-2.5">
              {dict.services.items.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-data text-xs uppercase tracking-[0.14em] text-ink-dim">
              {dict.footer.contactsTitle}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <a href={siteConfig.phoneHref} className="transition-colors hover:text-ink">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li>{dict.contacts.hoursValue}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-6 sm:flex-row">
          <p className="font-data text-xs text-ink-dim">
            © {year} {siteConfig.name}. {dict.footer.rights}
          </p>
          <Link
            href={`/${locale}`}
            className="font-data text-xs text-ink-dim transition-colors hover:text-ink-muted"
          >
            {siteConfig.name}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
