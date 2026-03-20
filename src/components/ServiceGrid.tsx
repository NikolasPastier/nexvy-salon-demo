import Image from "next/image";
import FadeIn from "./ui/FadeIn";
import BookingTrigger from "./BookingTrigger";
import config from "../../content/site-config.json";

export default function ServiceGrid() {
  return (
    <section id="sluzby" className="bg-surface py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary-container font-label tracking-[0.3em] text-xs block mb-4">
                Čo ponúkame
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
                Naše služby
              </h2>
            </div>
            <p className="font-body text-on-surface-variant leading-relaxed max-w-sm text-sm">
              Každá návšteva začína individuálnou konzultáciou.
              Používame výhradne prémiové produkty.
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 80}>
              <div className="group flex flex-col h-full bg-white/[0.03] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container rounded-t-2xl">
                  <Image
                    src={`https://picsum.photos/seed/svc-${svc.id}/600/450`}
                    alt={`Ukážka služby: ${svc.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                {/* Title + price */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-xl font-bold text-on-surface">
                    {svc.title}
                  </h3>
                  <span className="font-label font-bold text-primary-container text-xs shrink-0 ml-3 bg-primary-container/15 rounded-full px-3 py-1">
                    {svc.price}
                  </span>
                </div>
                {/* Duration */}
                <p className="font-label text-xs tracking-widest text-on-surface-variant/60 mb-3">
                  {svc.duration}
                </p>
                {/* Description */}
                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4 flex-1">
                  {svc.description}
                </p>
                {/* CTA */}
                <BookingTrigger
                  serviceId={svc.id}
                  className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-xs px-5 flex items-center min-h-[40px] w-fit hover:brightness-110 transition-all rounded-xl"
                  aria-label={`Objednať sa na ${svc.title}`}
                >
                  Objednať
                </BookingTrigger>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
