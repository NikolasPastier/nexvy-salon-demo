"use client";

import { useState } from "react";
import FadeIn from "./ui/FadeIn";
import config from "../../content/site-config.json";

function StarIcon() {
  return (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  );
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const cards = config.reviews;
  const cardWidth = 520 + 24; // card + gap

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, cards.length - 2));
  const offset = Math.min(current * cardWidth, (cards.length - 2) * cardWidth);

  return (
    <section
      id="reviews"
      style={{ padding: "120px 48px", background: "var(--bg)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reviews-header-flex"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
          }}
        >
          <div>
            <FadeIn>
              <span className="label" style={{ display: "block", marginBottom: 16 }}>
                Čo hovoria klienti
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2>Povedali o nás</h2>
            </FadeIn>
          </div>

          {/* Nav buttons */}
          <FadeIn delay={200}>
            <div style={{ display: "flex", gap: 12 }}>
              <NavBtn onClick={prev} aria-label="Predchádzajúce">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </NavBtn>
              <NavBtn onClick={next} aria-label="Nasledujúce">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavBtn>
            </div>
          </FadeIn>
        </div>

        {/* Track */}
        <FadeIn>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                gap: 24,
                transform: `translateX(-${offset}px)`,
                transition: "transform 0.6s var(--ease)",
              }}
            >
              {cards.map((review) => (
                <ReviewCard key={review.author} review={review} />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reviews-header-flex { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function NavBtn({ onClick, children, "aria-label": label }: {
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: 44, height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "var(--bg-3)" : "transparent",
        border: "1px solid var(--border)",
        borderColor: hovered ? "rgba(237,232,223,0.2)" : "var(--border)",
        borderRadius: 2,
        color: "var(--cream)",
        cursor: "none",
        transition: "background 0.25s, border-color 0.25s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function ReviewCard({ review }: { review: { author: string; rating: number; text: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      style={{
        flex: "0 0 520px",
        background: hovered ? "var(--bg-3)" : "var(--bg-2)",
        border: `1px solid ${hovered ? "rgba(200,146,42,0.2)" : "var(--border)"}`,
        borderRadius: 2,
        padding: "44px 48px",
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
        {Array.from({ length: review.rating }).map((_, i) => <StarIcon key={i} />)}
      </div>
      <p
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1.55,
          color: "var(--cream)",
          marginBottom: 32,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
        }}
      >
        <strong style={{ color: "var(--cream)", fontWeight: 400 }}>{review.author}</strong>
        {" · Bratislava"}
      </div>
    </article>
  );
}
