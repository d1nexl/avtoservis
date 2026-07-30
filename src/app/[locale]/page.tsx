import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { CEO } from "@/components/CEO";
import { Booking } from "@/components/Booking";
import { Contacts } from "@/components/Contacts";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { Footer } from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} />
        <TrustBar dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <WhyUs dict={dict} />
        <Gallery dict={dict} />
        <Reviews dict={dict} />
        <CEO dict={dict} />
        <Booking dict={dict} />
        <Contacts dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
      <StickyMobileBar dict={dict} />
    </>
  );
}
