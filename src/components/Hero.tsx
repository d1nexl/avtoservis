"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Container } from "./ui/Container";
import { MagneticButton } from "./ui/MagneticButton";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero({ dict }: { dict: Dictionary }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 60]);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-32">
      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-6"
        >
          <motion.div variants={item} className="mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="font-data text-xs tracking-[0.2em] text-accent-bright">
              {dict.hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="text-[2.75rem] leading-[1.05] font-semibold text-ink sm:text-6xl lg:text-[3.75rem]">
            <motion.span variants={item} className="block">
              {dict.hero.title1}
            </motion.span>
            <motion.span variants={item} className="block text-accent-gradient">
              {dict.hero.title2}
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-ink-muted">
            {dict.hero.desc}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#booking" className="btn-primary">
              {dict.hero.cta1}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#services" className="btn-outline">
              {dict.hero.cta2}
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border-soft pt-6 font-data text-xs text-ink-dim"
          >
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {dict.hero.hours}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              {dict.hero.address}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div
            ref={frameRef}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden lg:ml-auto lg:mr-0 lg:max-w-none"
          >
            <div className="pointer-events-none absolute -inset-3 z-10 border border-border-soft" />
            <motion.div style={{ y: parallaxY }} className="absolute inset-0 -top-[8%] h-[116%]">
              <Image
                src="/images/gallery/gallery-04-bmw-polish.jpg"
                alt={dict.hero.visualCaption}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
            </motion.div>
            <div
              className="absolute inset-0 z-[5]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,18,15,0.05) 0%, rgba(20,18,15,0) 40%, rgba(20,18,15,0.55) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-border bg-bg/80 px-4 py-3 backdrop-blur-sm">
              <span className="font-data text-[10px] uppercase tracking-[0.14em] text-ink-dim">
                {dict.hero.visualCaption}
              </span>
              <span className="h-1.5 w-1.5 animate-pulse bg-accent-bright" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
