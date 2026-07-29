import { ArrowUpRight, MessageSquareQuote, Star } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { FacebookIcon } from "./ui/icons";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Reviews({ dict }: { dict: Dictionary }) {
  return (
    <section id="reviews" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.reviews.eyebrow} title={dict.reviews.title} align="center" />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-6 border border-border-soft px-6 py-16 text-center sm:px-16">
            <MessageSquareQuote className="h-9 w-9 text-ink-dim" strokeWidth={1.25} />
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-ink-dim" strokeWidth={1.5} />
              ))}
            </div>
            <p className="max-w-sm text-base text-ink-muted">{dict.reviews.empty}</p>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-sm"
            >
              <FacebookIcon className="h-4 w-4" />
              {dict.reviews.cta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
