"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Award, Gauge, LayoutGrid, MapPin, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const icons: LucideIcon[] = [Award, ShieldCheck, Gauge, Truck, LayoutGrid, MapPin];

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function WhyUsCard({
  index,
  title,
  desc,
  Icon,
}: {
  index: number;
  title: string;
  desc: string;
  Icon: LucideIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(227,152,92,0.16), transparent 72%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="group relative h-full overflow-hidden border-r border-b border-border p-7 transition-colors duration-300 sm:p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 -top-6 select-none font-data text-[6rem] font-bold leading-none text-white/[0.035] transition-colors duration-500 group-hover:text-accent-bright/[0.09]"
      >
        {pad(index)}
      </span>

      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center border border-border text-accent-bright transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent-bright group-hover:shadow-[0_16px_32px_-10px_rgba(227,152,92,0.55)]">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="mt-5 text-lg font-semibold text-ink">{title}</div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
      </div>
    </div>
  );
}

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="why-us" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.whyUs.eyebrow} title={dict.whyUs.title} />

        <div className="mt-16 grid grid-cols-1 border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {dict.whyUs.items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <WhyUsCard index={i} title={it.title} desc={it.desc} Icon={icons[i]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
