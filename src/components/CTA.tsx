import { ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function CTA({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 sm:py-28">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent-bright), transparent)" }}
      />
      <Container className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <h2 className="max-w-lg text-3xl font-semibold text-ink sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mt-3 max-w-md text-ink-muted">{dict.cta.desc}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href="#booking" className="btn btn-primary shrink-0 text-sm">
            {dict.cta.button}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
