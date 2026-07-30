"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Phone, Quote, User } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PlaceholderImage } from "./ui/PlaceholderImage";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function CEO({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const panelX = useSpring(useTransform(mx, [0, 1], [14, -14]), { stiffness: 150, damping: 20 });
  const panelY = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 150, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Photo */}
          <Reveal className="lg:col-span-5">
            <div
              ref={ref}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              <motion.div
                aria-hidden
                style={{ x: panelX, y: panelY }}
                className="pointer-events-none absolute -inset-4 border border-accent-dim"
              />
              <div className="relative aspect-[4/5] overflow-hidden border border-border-soft">
                <PlaceholderImage label={dict.ceo.photoCaption} icon={User} className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-bg/80 px-4 py-3 backdrop-blur-sm">
                  <span className="font-data text-[10px] uppercase tracking-[0.14em] text-ink-dim">
                    {dict.ceo.photoCaption}
                  </span>
                  <span className="h-1.5 w-1.5 animate-pulse bg-accent-bright" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-data text-xs tracking-[0.2em] text-accent-bright">
                {dict.ceo.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-3 flex items-baseline gap-4">
                <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{dict.ceo.name}</h2>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="hidden h-px flex-1 bg-accent-bright sm:block"
                />
              </div>
              <div className="mt-1.5 text-sm text-accent-bright">{dict.ceo.role}</div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">{dict.ceo.bio}</p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="relative mt-8 max-w-xl">
                <Quote
                  aria-hidden
                  className="pointer-events-none absolute -left-3 -top-7 h-16 w-16 text-accent-bright/10"
                  strokeWidth={1}
                />
                <p className="relative pl-1 text-lg italic leading-relaxed text-ink">
                  «{dict.ceo.quote}»
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <ul className="mt-9 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border-soft pt-6 sm:grid-cols-3">
                {dict.ceo.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-accent-dim" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.34}>
              <a href={siteConfig.viberHref} className="btn btn-outline mt-8 text-sm">
                <Phone className="h-4 w-4" />
                {dict.ceo.contactCta}
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
