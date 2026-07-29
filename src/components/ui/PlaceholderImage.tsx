import { Camera, type LucideIcon } from "lucide-react";
import clsx from "clsx";

export function PlaceholderImage({
  label,
  icon: Icon = Camera,
  className,
  dense = false,
}: {
  label: string;
  icon?: LucideIcon;
  className?: string;
  dense?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-surface",
        className
      )}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, var(--color-surface-2) 0%, var(--color-surface) 55%, var(--color-bg-soft) 100%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <Icon
          className={dense ? "h-5 w-5 text-ink-dim" : "h-7 w-7 text-ink-dim"}
          strokeWidth={1.5}
        />
        {!dense && (
          <span className="font-data text-[11px] uppercase tracking-[0.14em] text-ink-dim">
            {label}
          </span>
        )}
      </div>
      <div className="absolute left-3 top-3 h-2 w-2 border-l border-t border-border-soft" />
      <div className="absolute right-3 bottom-3 h-2 w-2 border-r border-b border-border-soft" />
    </div>
  );
}
