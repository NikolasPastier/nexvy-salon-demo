"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const teamMembers = [
  {
    name: "Jana Kováčová",
    designation: "Špecialistka na balayage · 8 rokov skúseností",
    quote:
      "Jana je majsterka jemných prechodov a prírodných odtieňov. Každý balayage tvorí ručne — žiadne šablóny, len čistá technika prispôsobená práve vám. Klientky sa k nej vracajú roky.",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop&crop=face&q=80",
  },
  {
    name: "Marek Novák",
    designation: "Barber & Pánske strihy · 5 rokov skúseností",
    quote:
      "Marek sa špecializuje na klasické aj moderné pánske strihy. Precíznosť, čistá línia, žiadny kompromis. Klienti sa vracajú — to je jeho najlepšia referencia.",
    src: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=600&h=600&fit=crop&crop=face&q=80",
  },
  {
    name: "Lucia Tóthová",
    designation: "Farbenie & Regenerácia · 10 rokov skúseností",
    quote:
      "Lucia kombinuje hlbokú znalosť chémie vlasov s umeleckým okom. Špecializuje sa na intenzívne farbenia a regeneračné ošetrenia. Viditeľný výsledok po prvej návšteve.",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&crop=face&q=80",
  },
];

export function BellaTeam() {
  return (
    <section id="team" style={{ background: "#141210", padding: "96px 0" }}>
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}
        className="team-wrapper"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "72px",
          }}
          className="team-header"
        >
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
              Majstri svojho remesla
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
              Náš tím
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#7A756C",
              maxWidth: "260px",
              lineHeight: 1.65,
              textAlign: "right",
            }}
            className="team-subtext"
          >
            Každý člen tímu je špecialista vo svojom odbore s rokmi skúseností.
          </p>
        </div>

        {/* Animated Testimonials */}
        <AnimatedTestimonials testimonials={teamMembers} autoplay={true} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .team-wrapper { padding: 0 24px !important; }
          .team-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
            margin-bottom: 48px !important;
          }
          .team-subtext {
            text-align: left !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
