import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingTrigger from "@/components/BookingTrigger";
import config from "../../../content/site-config.json";

export const metadata: Metadata = {
  title: "Naše služby",
  description:
    "Strihanie a styling, balayage, melír, keratínová regenerácia, svadobné účesy a detské strihanie. Prémiové kaderníctvo Bella Studio v Bratislave.",
};

// Group services by category preserving insertion order
function groupByCategory(services: typeof config.services) {
  const map = new Map<string, typeof config.services>();
  for (const svc of services) {
    const cat = (svc as typeof svc & { category: string }).category ?? "Iné";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(svc);
  }
  return map;
}

export default function SluzbyPage() {
  const grouped = groupByCategory(config.services);

  return (
    <>
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-surface-container-lowest pt-[72px] pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto pt-16">
            <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
              Bella Studio
            </span>
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-on-surface">
              Naše služby
            </h1>
            <p className="font-body text-on-surface-variant mt-4 max-w-xl leading-relaxed">
              Každá návšteva začína individuálnou konzultáciou. Používame výhradne
              prémiové produkty šetrné k vašim vlasom.
            </p>
          </div>
        </section>

        {/* Services grouped by category */}
        {Array.from(grouped.entries()).map(([category, services]) => (
          <section key={category} className="bg-surface py-20 px-6 md:px-12 border-b border-surface-container-low/50">
            <div className="max-w-7xl mx-auto">
              {/* Category heading */}
              <div className="flex items-center gap-6 mb-12">
                <span className="font-label text-xs tracking-[0.3em] text-primary-container">
                  {category}
                </span>
                <div className="flex-1 h-px bg-outline-variant/20" />
              </div>

              {/* Service cards */}
              <div className="flex flex-col gap-10">
                {services.map((svc) => (
                  <article
                    key={svc.id}
                    className="group flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-72 lg:w-80 shrink-0 overflow-hidden bg-surface-container h-56 md:h-auto">
                      <Image
                        src={`https://picsum.photos/seed/svc-lg-${svc.id}/640/480`}
                        alt={`Ukážka: ${svc.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-8 flex-1">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
                            {svc.title}
                          </h2>
                          <div className="text-right shrink-0">
                            <span className="font-label font-bold text-primary-container text-xl">
                              {svc.price}
                            </span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 mb-5">
                          <span className="w-1.5 h-1.5 bg-primary-container rounded-full" />
                          <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/70">
                            {svc.duration}
                          </span>
                        </div>

                        <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                          {svc.description}
                        </p>
                      </div>

                      <BookingTrigger
                        serviceId={svc.id}
                        className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-xs px-8 flex items-center min-h-[48px] w-fit hover:brightness-110 transition-all rounded-xl"
                        aria-label={`Objednať sa na ${svc.title} — ${svc.price}`}
                      >
                        Objednať — {svc.price}
                      </BookingTrigger>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="bg-surface-container-lowest py-20 px-6 md:px-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-on-surface">
              Neviete sa rozhodnúť?
            </h2>
            <p className="font-body text-on-surface-variant mb-8 leading-relaxed">
              Zavolajte nám alebo sa objednajte na bezplatnú konzultáciu.
              Radi vám poradíme.
            </p>
            <BookingTrigger className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-sm px-10 flex items-center justify-center min-h-[52px] mx-auto hover:brightness-110 transition-all w-fit rounded-xl">
              Bezplatná konzultácia
            </BookingTrigger>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
