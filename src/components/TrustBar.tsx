import { Award, Car, ShieldCheck, Truck } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const icons = [Truck, Car, ShieldCheck, Award];

function pad(n: number) {
  return String(n + 1).padStart(2, "0");
}

export function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative border-y border-border bg-surface">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {dict.trustBar.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={it.title} delay={i * 0.06}>
                <div
                  className={`group relative flex h-full flex-col gap-4 overflow-hidden border-border-soft px-5 py-8 transition-colors duration-300 hover:bg-surface-2 sm:px-6 ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
                    i > 0 ? "lg:border-l" : ""
                  } lg:border-r-0`}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent-bright transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-border text-accent-bright transition-colors duration-300 group-hover:border-accent-bright">
                      <Icon
                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-data text-xs text-ink-dim">{pad(i)}</span>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-ink">{it.title}</div>
                    <div className="mt-1 text-xs text-ink-muted">{it.desc}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
