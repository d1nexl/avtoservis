"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import type { Dictionary } from "@/lib/i18n/getDictionary";

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

function StepNode({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateXRaw = useTransform(py, [0, 1], [22, -22]);
  const rotateYRaw = useTransform(px, [0, 1], [-22, 22]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 16, mass: 0.6 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 16, mass: 0.6 });

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45), transparent 55%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.16 }}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ scale: { type: "spring", stiffness: 280, damping: 16 } }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-accent-bright/70 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_22px_44px_-10px_rgba(227,152,92,0.65)]"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, rgba(227,152,92,0.45), rgba(32,29,25,0.96) 70%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <span
          className="relative font-data text-lg font-semibold text-accent-bright"
          style={{ transform: "translateZ(28px)" }}
        >
          {pad(index)}
        </span>
      </motion.div>
    </div>
  );
}

export function Process({ dict }: { dict: Dictionary }) {
  const steps = dict.process.steps;

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.process.eyebrow} title={dict.process.title} />

        {/* Desktop: horizontal scroll-driven line */}
        <div className="mt-24 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-px bg-border" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 right-0 top-7 h-px bg-accent-bright"
            />
            <div className="relative grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepNode index={i} />
                  <div className="mt-5 text-base font-semibold text-ink">{step.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute left-7 top-0 bottom-0 w-px bg-border" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute left-7 top-0 bottom-0 w-px bg-accent-bright"
          />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-20"
              >
                <div className="absolute left-0 top-0">
                  <StepNode index={i} />
                </div>
                <div className="pt-3 text-base font-semibold text-ink">{step.title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
