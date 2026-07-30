import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { siteConfig } from "@/lib/siteConfig";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const ogLocale = locale === "ru" ? "ru_RU" : "cs_CZ";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords:
      locale === "ru"
        ? [
            "автосервис Чешский Крумлов",
            "ремонт автомобилей Český Krumlov",
            "компьютерная диагностика",
            "шиномонтаж",
            "детейлинг автомобиля",
            "ремонт ходовой части",
          ]
        : [
            "autoservis Český Krumlov",
            "oprava aut Český Krumlov",
            "počítačová diagnostika",
            "pneuservis",
            "detailing vozidel",
            "oprava podvozku",
          ],
    authors: [{ name: siteConfig.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        cs: "/cs",
        "x-default": "/ru",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteConfig.name,
    image: `${siteConfig.siteUrl}/og-image.png`,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vyšný 100",
      postalCode: "381 01",
      addressLocality: "Český Krumlov",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Český Krumlov",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "18:00",
    },
    sameAs: [siteConfig.facebookUrl],
    url: `${siteConfig.siteUrl}/${locale}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.title,
      itemListElement: [...dict.services.items, ...dict.detailingServices.items].map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
        },
      })),
    },
  };

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-body overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
