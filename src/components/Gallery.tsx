"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { galleryImages } from "@/lib/galleryImages";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Gallery({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const captions = dict.gallery.items;
  const count = galleryImages.length;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + count) % count));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, count]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.gallery.eyebrow} title={dict.gallery.title} desc={dict.gallery.desc} />

        <div className="mt-16 columns-2 gap-3 sm:gap-4 md:columns-3">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative mb-3 block w-full overflow-hidden break-inside-avoid text-left sm:mb-4"
            >
              <div className="overflow-hidden">
                <Image
                  src={img.src}
                  alt={captions[i]}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/0 to-bg/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-data text-[11px] uppercase tracking-[0.1em] text-ink">
                  {captions[i]}
                </span>
              </div>
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-border-soft bg-bg/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 text-ink" />
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md sm:p-10"
            onClick={() => setOpenIndex(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-border text-ink"
              onClick={() => setOpenIndex(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i - 1 + count) % count));
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border text-ink sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i + 1) % count));
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border text-ink sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-2xl"
            >
              <Image
                src={galleryImages[openIndex].src}
                alt={captions[openIndex]}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <span className="absolute -bottom-8 left-0 font-data text-xs uppercase tracking-[0.14em] text-ink-muted">
                {captions[openIndex]}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
