"use client";

import { Timeline } from "@/components/ui/timeline";
import { ShimmerLink } from "@/components/ui/shimmer-button";

// ─── Timeline entries ─────────────────────────────────────────────────────────

const timelineData = [
  {
    title: "01",
    content: (
      <div className="space-y-4">
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 400,
            color: "#EDE8DF",
            lineHeight: 1.15,
          }}
        >
          Rezervujte kedykoľvek —
          <br />
          <em style={{ color: "#C8922A", fontStyle: "italic", fontWeight: 300 }}>
            aj o polnoci
          </em>
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "#7A756C",
            lineHeight: 1.75,
            maxWidth: "480px",
          }}
        >
          Žiadne čakanie na otváracie hodiny. Objednajte sa online kedykoľvek —
          cez web, WhatsApp alebo Instagram. Potvrdenie dostanete okamžite.
        </p>
        <div className="flex gap-3 flex-wrap pt-2">
          {["Online rezervácia", "WhatsApp", "Instagram DM"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#C8922A",
                padding: "6px 14px",
                border: "1px solid rgba(200,146,42,0.25)",
                background: "rgba(200,146,42,0.06)",
                borderRadius: "9999px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "02",
    content: (
      <div className="space-y-4">
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 400,
            color: "#EDE8DF",
            lineHeight: 1.15,
          }}
        >
          Nikdy nezabudnete
          <br />
          <em style={{ color: "#C8922A", fontStyle: "italic", fontWeight: 300 }}>
            na termín
          </em>
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "#7A756C",
            lineHeight: 1.75,
            maxWidth: "480px",
          }}
        >
          Automatická pripomienka 24 hodín a 2 hodiny pred každým termínom cez
          WhatsApp. Bez stresu, bez zmeškaní. Naši klienti majú o 60 % menej
          no-show.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "8px",
            padding: "20px 28px",
            background: "rgba(200,146,42,0.06)",
            border: "1px solid rgba(200,146,42,0.15)",
            borderRadius: "14px",
            marginTop: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "52px",
              fontWeight: 300,
              color: "#C8922A",
              lineHeight: 1,
            }}
          >
            60%
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7A756C",
            }}
          >
            menej zmeškaných termínov
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "03",
    content: (
      <div className="space-y-4">
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 400,
            color: "#EDE8DF",
            lineHeight: 1.15,
          }}
        >
          Prémiové produkty,
          <br />
          <em style={{ color: "#C8922A", fontStyle: "italic", fontWeight: 300 }}>
            viditeľné výsledky
          </em>
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "#7A756C",
            lineHeight: 1.75,
            maxWidth: "480px",
          }}
        >
          Pracujeme výhradne s certifikovanými produktmi L&apos;Oréal
          Professionnel, Wella a Kérastase. Každá návšteva začína individuálnou
          konzultáciou — žiadne šablóny.
        </p>
        <div className="flex gap-6 pt-2 flex-wrap">
          {[
            { label: "4.9★", sub: "Google hodnotenie" },
            { label: "156+", sub: "Spokojných klientov" },
            { label: "3×", sub: "Certifikovaný tím" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "#EDE8DF",
                  lineHeight: 1,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7A756C",
                  marginTop: "4px",
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "04",
    content: (
      <div className="space-y-4">
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            fontWeight: 400,
            color: "#EDE8DF",
            lineHeight: 1.15,
          }}
        >
          Centrum Bratislavy —
          <br />
          <em style={{ color: "#C8922A", fontStyle: "italic", fontWeight: 300 }}>
            ľahko dostupné
          </em>
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "#7A756C",
            lineHeight: 1.75,
            maxWidth: "480px",
          }}
        >
          Nachádzame sa na Obchodnej ulici — srdce Bratislavy. MHD zastávka
          priamo pred dverami. Otvorení každý deň okrem nedele.
        </p>
        <ShimmerLink href="#cta" className="mt-2 px-8 py-4">
          Rezervovať termín →
        </ShimmerLink>
      </div>
    ),
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function BellaWhy() {
  return (
    <section id="why" className="bg-[#0C0B09]">

      {/* Section header — sits above the timeline */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-0">
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
          Prečo si vybrať nás
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(40px, 5vw, 66px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#EDE8DF",
            maxWidth: "500px",
            margin: 0,
          }}
        >
          Všetko, čo potrebujete pre dokonalý výsledok
        </h2>
      </div>

      {/* Timeline */}
      <Timeline data={timelineData} />

    </section>
  );
}
