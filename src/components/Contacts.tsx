import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { FacebookIcon } from "./ui/icons";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Contacts({ dict }: { dict: Dictionary }) {
  const rows = [
    {
      icon: Phone,
      label: dict.contacts.phoneLabel,
      value: siteConfig.phoneDisplay,
      href: siteConfig.phoneHref,
    },
    {
      icon: MapPin,
      label: dict.contacts.addressLabel,
      value: siteConfig.address,
      href: siteConfig.mapLinkSrc,
    },
    {
      icon: Clock,
      label: dict.contacts.hoursLabel,
      value: `${dict.contacts.hoursValue} · ${dict.contacts.hoursValueClosed}`,
    },
    {
      icon: FacebookIcon,
      label: dict.contacts.facebookLabel,
      value: "Facebook",
      href: siteConfig.facebookUrl,
    },
  ];

  return (
    <section id="contacts" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.contacts.eyebrow} title={dict.contacts.title} />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <ul className="border-t border-border">
              {rows.map((row, i) => {
                const Icon = row.icon;
                const content = (
                  <div className="flex items-start gap-4 py-6">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" strokeWidth={1.5} />
                    <div>
                      <div className="font-data text-[11px] uppercase tracking-[0.14em] text-ink-dim">
                        {row.label}
                      </div>
                      <div className="mt-1 text-base text-ink">{row.value}</div>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={row.label} delay={i * 0.06}>
                    <li className="border-b border-border">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="block transition-colors hover:bg-surface"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-border-soft grayscale transition-all duration-500 hover:grayscale-0 sm:aspect-[16/10]">
                <iframe
                  title={dict.contacts.mapCaption}
                  src={siteConfig.mapEmbedSrc}
                  loading="lazy"
                  className="h-full w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
