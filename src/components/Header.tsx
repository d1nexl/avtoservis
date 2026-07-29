"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { LangSwitch } from "./LangSwitch";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import type { Locale } from "@/lib/i18n/config";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = [
    { href: "#services", label: dict.nav.services },
    { href: "#process", label: dict.nav.process },
    { href: "#why-us", label: dict.nav.whyUs },
    { href: "#gallery", label: dict.nav.gallery },
    { href: "#reviews", label: dict.nav.reviews },
    { href: "#contacts", label: dict.nav.contacts },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <Container className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link
          href={`/${locale}`}
          onClick={() => setOpen(false)}
          className="-ml-2 justify-self-start sm:-ml-4"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center justify-self-center lg:flex lg:gap-6 xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-base font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="col-start-3 flex items-center justify-self-end">
          <div className="hidden items-center gap-3 lg:flex">
            <LangSwitch locale={locale} />
            <a href="#booking" className="btn btn-primary text-base">
              {dict.nav.cta}
            </a>
          </div>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-border text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-bg lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border-soft py-3.5 text-lg font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex items-center justify-between gap-4">
                <LangSwitch locale={locale} />
                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary flex-1 text-base"
                >
                  {dict.nav.cta}
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
