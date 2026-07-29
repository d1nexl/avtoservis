"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { repairImages } from "@/lib/repairImages";
import { detailingImages } from "@/lib/detailingImages";
import type { Dictionary } from "@/lib/i18n/getDictionary";

type ServiceGroup = Dictionary["services"] | Dictionary["detailingServices"];
type ServiceItem = ServiceGroup["items"][number];

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

export function Services({ dict }: { dict: Dictionary }) {
  const [category, setCategory] = useState<"repair" | "detailing">("repair");
  const [active, setActive] = useState(0);

  const group: ServiceGroup = category === "repair" ? dict.services : dict.detailingServices;
  const items = group.items;
  const current = items[active];
  const images = category === "repair" ? repairImages : detailingImages;
  const currentImage = images[active];

  function selectCategory(next: "repair" | "detailing") {
    if (next === category) return;
    setCategory(next);
    setActive(0);
  }

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={group.eyebrow} title={group.title} desc={group.desc} />

          <div className="inline-flex w-full border border-border font-data text-xs sm:w-auto">
            <button
              onClick={() => selectCategory("repair")}
              className={`flex-1 px-4 py-2.5 transition-colors duration-200 sm:flex-none ${
                category === "repair" ? "bg-accent text-bg font-semibold" : "text-ink-muted hover:text-ink"
              }`}
            >
              {dict.services.tabRepair}
            </button>
            <button
              onClick={() => selectCategory("detailing")}
              className={`flex-1 border-l border-border px-4 py-2.5 transition-colors duration-200 sm:flex-none ${
                category === "detailing" ? "bg-accent text-bg font-semibold" : "text-ink-muted hover:text-ink"
              }`}
            >
              {dict.services.tabDetailing}
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 lg:grid-cols-12">
          {/* List */}
          <div className="lg:col-span-5">
            <ul className="border-t border-border">
              {items.map((s, i) => (
                <li key={s.title} className="border-b border-border">
                  <button
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-surface lg:py-6"
                  >
                    <span
                      className={`font-data text-sm transition-colors ${
                        active === i ? "text-accent-bright" : "text-ink-dim"
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <span
                      className={`flex-1 text-lg font-medium transition-colors sm:text-xl ${
                        active === i ? "text-ink" : "text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {s.title}
                    </span>
                    <ArrowUpRight
                      className={`hidden h-4 w-4 shrink-0 transition-all duration-300 sm:block ${
                        active === i
                          ? "translate-x-0 translate-y-0 text-accent-bright opacity-100"
                          : "-translate-x-1 translate-y-1 text-ink-dim opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    />
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-ink-dim transition-transform duration-300 sm:hidden ${
                        active === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile inline detail */}
                  <div className="lg:hidden">
                    <AnimatePresence initial={false}>
                      {active === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ServiceDetailBody group={group} item={s} imageSrc={images[i]} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop panel */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28 grid grid-cols-2 gap-8">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImage}
                      alt={current.title}
                      fill
                      sizes="(max-width: 1024px) 0px, 30vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category}-${active}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ServiceDetailBody group={group} item={current} showTitle />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceDetailBody({
  group,
  item,
  showTitle = false,
  imageSrc,
}: {
  group: ServiceGroup;
  item: ServiceItem;
  showTitle?: boolean;
  imageSrc?: string;
}) {
  return (
    <div className={showTitle ? "" : "px-1 pb-8 pt-1"}>
      {!showTitle && imageSrc && (
        <div className="relative mb-5 aspect-video overflow-hidden border border-border-soft">
          <Image src={imageSrc} alt={item.title} fill sizes="100vw" className="object-cover" />
        </div>
      )}
      {showTitle && <h3 className="text-2xl font-semibold text-ink">{item.title}</h3>}
      <p className="mt-2 text-sm text-ink-muted">{item.short}</p>

      <div className="mt-6">
        <div className="font-data text-[11px] uppercase tracking-[0.14em] text-accent-bright">
          {group.symptomsLabel}
        </div>
        <ul className="mt-3 space-y-2">
          {item.symptoms.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm text-ink-muted">
              <span className="mt-2 h-1 w-1 shrink-0 bg-accent-dim" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <div className="font-data text-[11px] uppercase tracking-[0.14em] text-accent-bright">
          {group.includedLabel}
        </div>
        <ul className="mt-3 space-y-2">
          {item.included.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm text-ink-muted">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" strokeWidth={1.5} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <a href="#booking" className="btn btn-outline mt-7 w-full text-sm sm:w-auto">
        {group.cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
