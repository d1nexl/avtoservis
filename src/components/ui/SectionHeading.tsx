import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <span className="font-data text-xs tracking-[0.2em] text-accent-bright">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-ink">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base sm:text-lg text-ink-muted">
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}
