import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import BookingTrigger from "@/components/BookingTrigger";
import config from "../../../content/site-config.json";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte Bella Studio Bratislava. Adresa: Obchodná 12, 811 06 Bratislava. Tel: +421 950 504 171. Otvorené Po–Pi 9–20, So 9–14.",
};

const { business } = config;
const waNumber = business.contacts.whatsapp.replace(/[\s+]/g, "");
const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent("Dobrý deň, chcel/a by som sa objednať")}`;
const mapsDirectionsHref =
  "https://www.google.com/maps/dir/?api=1&destination=Obchodn%C3%A1+12%2C+811+06+Bratislava";

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-surface-container-lowest pt-[72px] pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto pt-16">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Nájdete nás tu
            </span>
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-on-surface">
              Kontakt
            </h1>
          </div>
        </section>

        {/* Main two-column section */}
        <section className="bg-surface py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — contact info + hours */}
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-on-surface mb-12">
                Informácie
              </h2>

              {/* Address */}
              <div className="flex gap-4 mb-8">
                <MapPin size={18} className="text-primary-container shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">Adresa</p>
                  <p className="font-body text-on-surface">{business.contacts.address}</p>
                  <a
                    href={mapsDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-label text-xs uppercase tracking-widest text-primary-container hover:brightness-110 transition-colors mt-2"
                  >
                    Trasa <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 mb-8">
                <Phone size={18} className="text-primary-container shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">Telefón</p>
                  <a
                    href={`tel:${business.contacts.phone.replace(/\s/g, "")}`}
                    className="font-body text-on-surface hover:text-primary-container transition-colors text-lg"
                  >
                    {business.contacts.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4 mb-8">
                <MessageCircle size={18} className="text-primary-container shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">WhatsApp</p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-on-surface hover:text-primary-container transition-colors"
                  >
                    {business.contacts.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 mb-12">
                <Mail size={18} className="text-primary-container shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">E-mail</p>
                  <a
                    href={`mailto:${business.contacts.email}`}
                    className="font-body text-on-surface hover:text-primary-container transition-colors"
                  >
                    {business.contacts.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <Clock size={18} className="text-primary-container shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex-1">
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4">
                    Otváracie hodiny
                  </p>
                  <div className="space-y-3 font-body text-sm">
                    <div className="flex justify-between border-b border-outline-variant/15 pb-3">
                      <span className="text-on-surface-variant">Pondelok – Piatok</span>
                      <span className="text-on-surface font-medium">{business.hours.monday_friday}</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/15 pb-3">
                      <span className="text-on-surface-variant">Sobota</span>
                      <span className="text-on-surface font-medium">{business.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Nedeľa</span>
                      <span className="text-primary-container font-medium">{business.hours.sunday}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick booking CTA */}
              <div className="mt-12 p-6 bg-surface-container border border-outline-variant/15 rounded-2xl">
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                  Rýchla rezervácia
                </p>
                <BookingTrigger className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-xs px-8 flex items-center min-h-[48px] w-full justify-center hover:brightness-110 transition-all rounded-xl">
                  Rezervovať termín online
                </BookingTrigger>
              </div>
            </div>

            {/* Right — contact form */}
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-on-surface mb-12">
                Napíšte nám
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="w-full h-[420px] md:h-[500px] bg-surface-container">
          <iframe
            src="https://maps.google.com/maps?q=48.14900,17.10840&hl=sk&z=16&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bella Studio — Obchodná 12, Bratislava"
            className="border-0 grayscale opacity-80"
          />
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
