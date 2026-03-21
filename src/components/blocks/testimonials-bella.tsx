"use client";

import { TestimonialCard } from "@/components/ui/testimonial-card";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    author: {
      name: "Martina K.",
      location: "Bratislava",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    },
    text: "Najlepšie kaderníctvo v Bratislave! Jana je úžasná, vždy presne vie, čo chcem. Balayage vyšiel lepšie ako na Instagrame.",
  },
  {
    author: {
      name: "Peter S.",
      location: "Bratislava",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
    text: "Konečne poriadny barber. Marek rozumie svojmu remeslu — presný strih, skvelý servis. Chodiť budem iba sem.",
  },
  {
    author: {
      name: "Zuzana M.",
      location: "Petržalka",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    },
    text: "Balayage od Lucy je úplne iný level. Rezervácia cez WhatsApp bola super jednoduchá, pripomienka prišla sama.",
  },
  {
    author: {
      name: "Andrea L.",
      location: "Staré Mesto",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
    },
    text: "Úžasná atmosféra, profesionálny tím. Prišla som po prvýkrát a hneď som sa cítila ako doma. Vrátim sa určite.",
  },
  {
    author: {
      name: "Lucia B.",
      location: "Ružinov",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
    },
    text: "Farbenie dopadlo presne podľa mojich predstáv. Ceny sú férové a kvalita je na najvyššej úrovni.",
  },
  {
    author: {
      name: "Tomáš H.",
      location: "Bratislava",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
    text: "Chodím k Marekovi pravidelne. Vždy perfektný výsledok, bez čakania, profesionálny prístup na 100%.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function BellaTestimonials() {
  return (
    <section id="reviews" className="bg-[#0C0B09] py-24 px-0 overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C8922A",
            }}
          >
            Čo hovoria klienti
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(40px, 5vw, 66px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#EDE8DF",
              margin: 0,
            }}
          >
            Povedali o nás
          </h2>

          {/* Google rating */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="14" height="14" fill="#C8922A" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#7A756C",
              }}
            >
              <strong style={{ color: "#EDE8DF", fontWeight: 400 }}>4.9</strong>
              {" · "}156 recenzií na Google
            </span>
          </div>
        </div>

        {/* Marquee — 4 identical strips so the loop snap is always off-screen */}
        <div
          className="group relative flex w-full overflow-hidden flex-row"
          style={
            {
              "--gap": "16px",
              "--duration": "50s",
              gap: "var(--gap)",
            } as React.CSSProperties
          }
        >
          {[0, 1, 2, 3].map((stripIndex) => (
            <div
              key={stripIndex}
              className="flex shrink-0 flex-row animate-marquee-gap group-hover:[animation-play-state:paused]"
              style={{ gap: "var(--gap)" } as React.CSSProperties}
              aria-hidden={stripIndex > 0 ? true : undefined}
            >
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} {...t} />
              ))}
            </div>
          ))}

          {/* Fade edges — exact match to section bg */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0C0B09] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0C0B09] to-transparent z-10" />
        </div>

      </div>
    </section>
  );
}
