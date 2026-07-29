"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";
import type { Dictionary } from "@/lib/i18n/getDictionary";

type Status = "idle" | "submitting" | "success";

export function Booking({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();

    const nextErrors: Record<string, boolean> = {};
    if (!name) nextErrors.name = true;
    if (!phone) nextErrors.phone = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // TODO: wire to a real backend / lead endpoint (e.g. email API, CRM webhook, Formspree).
    // Currently simulates a successful submission for the production-ready UI/UX.
    window.setTimeout(() => setStatus("success"), 1100);
  }

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={dict.booking.eyebrow} title={dict.booking.title} desc={dict.booking.desc} />

            <Reveal delay={0.2}>
              <div className="mt-10 border-t border-border-soft pt-6">
                <div className="font-data text-xs uppercase tracking-[0.14em] text-ink-dim">
                  {dict.booking.or}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={siteConfig.phoneHref} className="btn btn-outline text-sm">
                    <Phone className="h-4 w-4" />
                    {dict.booking.callBtn}
                  </a>
                  <a
                    href={siteConfig.viberHref}
                    className="btn btn-outline text-sm"
                  >
                    {dict.booking.viberBtn}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative border border-border-soft p-6 sm:p-9">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center gap-4 py-14 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <CheckCircle2 className="h-12 w-12 text-accent-bright" strokeWidth={1.25} />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-ink">{dict.booking.successTitle}</h3>
                      <p className="max-w-xs text-sm text-ink-muted">{dict.booking.successDesc}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                      noValidate
                    >
                      <Field
                        label={dict.booking.name}
                        name="name"
                        placeholder={dict.booking.namePlaceholder}
                        error={errors.name}
                        errorMsg={dict.booking.errorRequired}
                        autoComplete="name"
                      />
                      <Field
                        label={dict.booking.phone}
                        name="phone"
                        type="tel"
                        placeholder={dict.booking.phonePlaceholder}
                        error={errors.phone}
                        errorMsg={dict.booking.errorRequired}
                        autoComplete="tel"
                      />
                      <Field
                        label={dict.booking.car}
                        name="car"
                        placeholder={dict.booking.carPlaceholder}
                      />
                      <div>
                        <label className="mb-2 block text-xs font-medium text-ink-muted" htmlFor="service">
                          {dict.booking.service}
                        </label>
                        <select
                          id="service"
                          name="service"
                          defaultValue=""
                          className="h-12 w-full border border-border bg-bg-soft px-3.5 text-sm text-ink outline-none transition-colors focus:border-accent-bright"
                        >
                          <option value="" disabled>
                            {dict.booking.servicePlaceholder}
                          </option>
                          <optgroup label={dict.services.tabRepair}>
                            {dict.services.items.map((s) => (
                              <option key={s.title} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label={dict.services.tabDetailing}>
                            {dict.detailingServices.items.map((s) => (
                              <option key={s.title} value={s.title}>
                                {s.title}
                              </option>
                            ))}
                          </optgroup>
                          <option value="other">{dict.booking.serviceOther}</option>
                        </select>
                      </div>
                      <Field
                        label={dict.booking.date}
                        name="date"
                        type="date"
                        className="sm:col-span-1"
                      />
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-medium text-ink-muted" htmlFor="comment">
                          {dict.booking.comment}
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          placeholder={dict.booking.commentPlaceholder}
                          className="w-full resize-none border border-border bg-bg-soft px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-accent-bright"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="btn btn-primary col-span-1 mt-1 text-sm sm:col-span-2 disabled:opacity-70"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {dict.booking.submitting}
                          </>
                        ) : (
                          dict.booking.submit
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  errorMsg,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  errorMsg?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-medium text-ink-muted" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error}
        className={`h-12 w-full border bg-bg-soft px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-accent-bright ${
          error ? "border-accent" : "border-border"
        }`}
      />
      {error && errorMsg && <p className="mt-1.5 text-xs text-accent-bright">{errorMsg}</p>}
    </div>
  );
}
