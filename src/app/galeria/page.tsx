import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GalleryGrid from "@/components/GalleryGrid";
import BookingTrigger from "@/components/BookingTrigger";

export const metadata: Metadata = {
  title: "Galéria",
  description:
    "Pozrite si ukážky našej práce — pred a po. Strihanie, farbenie, balayage a svadobné účesy v salóne Bella Studio Bratislava.",
};

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-surface-container-lowest pt-[72px] pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto pt-16">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Naša práca
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-on-surface">
                Pred &amp;{" "}
                <span className="italic text-primary-container">Po</span>
              </h1>
              <p className="font-body text-on-surface-variant max-w-sm leading-relaxed text-sm">
                Každý výsledok je príbehom premeny. Prelistujte si naše
                obľúbené práce.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery with filter */}
        <section className="bg-surface py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <GalleryGrid />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-container py-20 px-6 md:px-12 text-center rounded-t-[32px]">
          <div className="max-w-xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-primary tracking-tighter mb-4">
              Chcete takúto premenu?
            </h2>
            <p className="font-body text-on-primary/70 mb-8">
              Objednajte sa a my sa postaráme o zvyšok.
            </p>
            <BookingTrigger className="bg-surface-container-lowest text-on-surface font-label font-bold uppercase tracking-widest text-sm px-10 flex items-center justify-center min-h-[52px] mx-auto hover:bg-surface-container-low transition-all w-fit rounded-xl">
              Rezervovať termín
            </BookingTrigger>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
