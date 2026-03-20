import Image from "next/image";
import BookingTrigger from "./BookingTrigger";
import config from "../../content/site-config.json";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/bella-salon-hero/1920/1080"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-24 max-w-5xl w-full">
        <span className="font-label tracking-[0.3em] text-xs text-primary-container block mb-6">
          {config.business.contacts.address}
        </span>
        <h1 className="font-headline text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-on-surface mb-6">
          {config.business.name}
        </h1>
        <p className="font-body text-lg md:text-xl max-w-xl text-on-surface/80 mb-10 leading-relaxed">
          {config.business.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <BookingTrigger
            className="bg-primary-container text-on-primary px-10 font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-[0_0_40px_rgba(232,168,56,0.2)] flex items-center justify-center min-h-[52px] rounded-xl"
            aria-label="Otvoriť formulár rezervácie online"
          >
            Objednať sa online
          </BookingTrigger>
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            className="border border-outline/30 px-10 font-label font-bold uppercase tracking-widest text-sm text-on-surface hover:bg-on-surface/5 transition-all flex items-center justify-center min-h-[52px] rounded-xl"
            aria-label={`Zavolať na ${config.business.contacts.phone}`}
          >
            {config.business.contacts.phone}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-4 text-primary-container" aria-hidden="true">
        <span className="font-label uppercase tracking-widest text-xs">Scroll</span>
        <div className="w-10 h-px bg-primary-container" />
      </div>
    </section>
  );
}
