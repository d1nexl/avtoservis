"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeCodes, type Locale } from "@/lib/i18n/config";
import clsx from "clsx";

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex items-center overflow-hidden border border-border font-data text-sm">
      {locales.map((loc, i) => (
        <button
          key={loc}
          onClick={() => {
            if (loc === locale) return;
            document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=31536000`;
            const rest = pathname.replace(`/${locale}`, "") || "/";
            router.push(`/${loc}${rest === "/" ? "" : rest}`);
          }}
          aria-current={loc === locale}
          className={clsx(
            "px-3.5 py-2 transition-colors duration-200",
            i > 0 && "border-l border-border",
            loc === locale
              ? "bg-accent text-bg font-semibold"
              : "text-ink-muted hover:text-ink"
          )}
        >
          {localeCodes[loc]}
        </button>
      ))}
    </div>
  );
}
