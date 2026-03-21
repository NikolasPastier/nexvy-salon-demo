"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "./ui/FadeIn";
import { useBookingModal } from "@/context/BookingModalContext";

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "AI recepčná 24/7",
    desc: "Odpovedá na otázky klientov a prijíma rezervácie nepretržite — aj keď ste mimo salónu.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: "Online rezervácia",
    desc: "Klienti si môžu rezervovať termín kedykoľvek online — bez telefonátov, 24 hodín denne.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "WhatsApp pripomienky",
    desc: "Automatické pripomienky cez WhatsApp znižujú počet zmeškaných termínov o 60 %.",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
      </svg>
    ),
    title: "Prémiové produkty",
    desc: "Pracujeme výhradne s certifikovanými produktmi L'Oréal, Wella a Kerastase.",
  },
];

const stats = [
  { count: 4.9, suffix: "★", decimal: true, label: "Google hodnotenie" },
  { count: 156, suffix: "+", decimal: false, label: "Spokojných klientov" },
  { count: 60, suffix: "%", decimal: false, label: "Menej no-show" },
];

function StatItem({ stat }: { stat: typeof stats[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("0");
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          el.classList.add("visible");
          const target = stat.count;
          const duration = 1400;
          const start = performance.now();
          const update = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = target * eased;
            setValue(stat.decimal ? val.toFixed(1) : String(Math.round(val)));
            if (progress < 1) requestAnimationFrame(update);
            else setValue(stat.decimal ? String(target.toFixed(1)) : String(target));
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [stat]);

  return (
    <div
      ref={ref}
      className="stat-item"
      style={{
        background: "var(--bg-2)",
        padding: "40px 36px",
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontSize: 60,
          lineHeight: 1,
          fontWeight: 300,
          color: "var(--cream)",
          marginBottom: 8,
        }}
      >
        {value}
        <span style={{ color: "var(--gold)", fontSize: stat.decimal ? 30 : 40 }}>{stat.suffix}</span>
      </div>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { openModal } = useBookingModal();

  return (
    <section id="why" style={{ padding: "120px 48px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div
          className="why-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left: text + stats */}
          <FadeIn>
            <div>
              <span className="label">Prečo si vybrať nás</span>
              <h2 style={{ marginTop: 16 }}>
                Technológia a<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>remeslo</em>
              </h2>
              <p
                style={{
                  marginTop: 20,
                  color: "rgba(237,232,223,0.6)",
                  marginBottom: 40,
                  fontSize: 15,
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontWeight: 300,
                }}
              >
                Spojili sme tradičné kaderníctvo s modernými AI nástrojmi. Výsledok — žiadny zmeškaný termín, žiadne čakanie, len dokonalý výsledok.
              </p>
              <button
                onClick={() => openModal()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 26px",
                  background: "var(--gold)",
                  color: "#0C0B09",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: 2,
                  cursor: "none",
                  transition: "background 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-l)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
              >
                Začnite ešte dnes
              </button>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1,
                  background: "var(--border)",
                  border: "1px solid var(--border)",
                  marginTop: 48,
                }}
                className="stats-row"
              >
                {stats.map((stat) => (
                  <StatItem key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: feature cards */}
          <FadeIn delay={200}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 1,
                background: "var(--border)",
              }}
            >
              {features.map((f) => (
                <FeatureRow key={f.title} feature={f} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        @media (max-width: 640px)  { .stats-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function FeatureRow({ feature }: { feature: typeof features[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: hovered ? "var(--bg-3)" : "var(--bg-2)",
        padding: "32px 36px",
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        transition: "background 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 44, height: 44,
          flexShrink: 0,
          background: "var(--gold-dim)",
          border: "1px solid rgba(200,146,42,0.2)",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--gold)",
        }}
      >
        {feature.icon}
      </div>
      <div>
        <h4
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 6,
            color: "var(--cream)",
          }}
        >
          {feature.title}
        </h4>
        <p
          style={{
            fontSize: 14,
            color: "rgba(237,232,223,0.55)",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          {feature.desc}
        </p>
      </div>
    </div>
  );
}
