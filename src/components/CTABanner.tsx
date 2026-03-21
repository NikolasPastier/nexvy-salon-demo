"use client";

import BookingTrigger from "./BookingTrigger";
import FadeIn from "./ui/FadeIn";
import config from "../../content/site-config.json";

export default function CTABanner() {
  return (
    <section
      id="cta"
      style={{
        background: "var(--gold)",
        padding: "120px 48px",
        textAlign: "center",
      }}
    >
      <FadeIn>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(12,11,9,0.5)",
            marginBottom: 16,
          }}
        >
          Zarezervujte termín
        </span>
      </FadeIn>
      <FadeIn delay={100}>
        <h2
          style={{
            fontSize: "clamp(52px, 7vw, 96px)",
            color: "#0C0B09",
            marginBottom: 20,
          }}
        >
          Zarezervujte si<br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>termín</em>
        </h2>
      </FadeIn>
      <FadeIn delay={200}>
        <p
          style={{
            fontSize: 16,
            color: "rgba(12,11,9,0.65)",
            marginBottom: 52,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            fontWeight: 300,
          }}
        >
          Zavolajte nám alebo sa objednajte online — ste u nás vždy vítaní.
        </p>
      </FadeIn>
      <FadeIn delay={300}>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <BookingTrigger
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "18px 44px",
              background: "#0C0B09",
              color: "var(--gold)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 2,
              cursor: "none",
              transition: "opacity 0.25s",
            } as React.CSSProperties}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.opacity = "1")}
          >
            Rezervovať online
          </BookingTrigger>
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 32px",
              background: "transparent",
              color: "#0C0B09",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1.5px solid #0C0B09",
              borderRadius: 2,
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(12,11,9,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {config.business.contacts.phone}
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
