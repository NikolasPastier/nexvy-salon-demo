"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { useBookingModal } from "@/context/BookingModalContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    imageAlt: "Strihanie a styling",
    title: "Strihanie a styling",
    price: "od €30",
    duration: "45 min",
    description:
      "Precízny strih podľa vašich predstáv s profesionálnym stylingom. Každý strih začína konzultáciou.",
    tags: ["Dámske", "Pánske", "Detské"],
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    imageAlt: "Farbenie vlasov",
    title: "Farbenie vlasov",
    price: "od €55",
    duration: "90 min",
    description:
      "Profesionálne farbenie s prémiovými farbami L\u2019Oréal Professionnel. Dlhotrvajúci výsledok.",
    tags: ["L\u2019Oréal", "Wella", "Bez amoniaku"],
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    imageAlt: "Melír a Balayage",
    title: "Melír & Balayage",
    price: "od €75",
    duration: "120 min",
    description:
      "Prirodzené odtiene handpainted technikou od našich špecialistov. Každý balayage je unikátny.",
    tags: ["Handpainted", "Prírodný", "Prémiový"],
  },
  {
    id: 4,
    imageSrc:
      "https://images.unsplash.com/photo-1522337913523-33d2e08b1f8c?w=600&q=80",
    imageAlt: "Keratin a regenerácia",
    title: "Keratin & Regenerácia",
    price: "od €65",
    duration: "90 min",
    description:
      "Hĺbková regenerácia poškodených vlasov s keratínovým ošetrením. Viditeľný rozdiel po prvom ošetrení.",
    tags: ["Keratin", "Regenerácia", "Poškodené vlasy"],
  },
  {
    id: 5,
    imageSrc:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80",
    imageAlt: "Svadobné a spoločenské účesy",
    title: "Svadobné účesy",
    price: "od €85",
    duration: "60–120 min",
    description:
      "Špeciálne príležitosti si zaslúžia špeciálnu starostlivosť. Skúšobné účesy a finálna príprava v deň svadby.",
    tags: ["Svadobné", "Spoločenské", "Skúška zadarmo"],
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function BellaServices() {
  const { openModal } = useBookingModal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="bg-[#0C0B09] py-24" style={{ overflow: "hidden" }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-12" style={{ overflowY: "visible" }}>

        {/* Header */}
        <div className="flex items-end justify-between mb-16 services-header-flex">
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C8922A",
                marginBottom: "16px",
              }}
            >
              Čo ponúkame
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
              Naše služby
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#7A756C",
                marginTop: "12px",
                maxWidth: "360px",
                lineHeight: 1.7,
              }}
            >
              Každá návšteva začína individuálnou konzultáciou. Používame
              výhradne prémiové produkty.
            </p>
          </div>

          {/* Nav arrows — desktop only */}
          <div className="hidden md:flex gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              aria-label="Predchádzajúce"
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(237,232,223,0.1)",
                borderRadius: "9999px",
                color: canLeft ? "#EDE8DF" : "#3a3830",
                transition: "all 0.25s",
                cursor: canLeft ? "none" : "default",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              aria-label="Ďalšie"
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: canRight ? "#C8922A" : "transparent",
                border: "1px solid",
                borderColor: canRight ? "#C8922A" : "rgba(237,232,223,0.1)",
                borderRadius: "9999px",
                color: canRight ? "#0C0B09" : "#3a3830",
                transition: "all 0.25s",
                cursor: canRight ? "none" : "default",
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable card row — intentionally bleeds right to hint at more cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 no-scrollbar"
          style={{ overflowX: "scroll", overflowY: "visible", paddingTop: "12px", paddingBottom: "16px" }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              onBook={() => openModal()}
            />
          ))}
        </div>

        {/* Mobile hint */}
        <p
          className="md:hidden mt-4 text-center"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7A756C",
          }}
        >
          ← Potiahnite pre ďalšie služby →
        </p>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-header-flex { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
