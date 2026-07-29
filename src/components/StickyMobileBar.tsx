import { Calendar, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function StickyMobileBar({ dict }: { dict: Dictionary }) {
  const items = [
    { icon: Phone, label: dict.stickyBar.call, href: siteConfig.phoneHref },
    { icon: Calendar, label: dict.stickyBar.book, href: "#booking" },
    { icon: MapPin, label: dict.stickyBar.route, href: siteConfig.mapLinkSrc, external: true },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-bg/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Quick actions"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center gap-1 border-r border-border-soft py-3 text-ink-muted last:border-r-0 active:bg-surface"
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[11px]">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
