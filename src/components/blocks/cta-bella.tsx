"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../../content/site-config.json";

export function BellaCTA({ className }: { className?: string }) {
  const { openModal } = useBookingModal();
  const phone = config.business.contacts.phone;

  return (
    <section
      id="cta"
      className={cn("overflow-hidden bg-[#C8922A]", className)}
    >
      <div
        className="relative mx-auto flex flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-16 cta-inner"
        style={{ maxWidth: "80rem" }}
      >

        {/* Badge */}
        <div className="animate-cta-fade-in-up delay-100" style={{ opacity: 0 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "5px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(12,11,9,0.2)",
              background: "rgba(12,11,9,0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(12,11,9,0.55)",
              }}
            >
              Zarezervujte termín
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="animate-cta-fade-in-up delay-200"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(52px, 7vw, 96px)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#0C0B09",
            opacity: 0,
          }}
        >
          Zarezervujte si
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>termín</em>
        </h2>

        {/* Description */}
        <p
          className="animate-cta-fade-in-up delay-300"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(12,11,9,0.6)",
            maxWidth: "420px",
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Zavolajte nám alebo sa objednajte online —
          <br />
          ste u nás vždy vítaní.
        </p>

        {/* Buttons */}
        <div
          className="animate-cta-fade-in-up delay-500 cta-buttons"
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <button
            onClick={() => openModal()}
            className="cta-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 36px",
              background: "#0C0B09",
              color: "#C8922A",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: "9999px",
              cursor: "none",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Rezervovať online
            <ArrowRight size={13} />
          </button>

          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="cta-btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "16px 32px",
              background: "transparent",
              color: "#0C0B09",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "9999px",
              border: "1.5px solid rgba(12,11,9,0.3)",
              transition: "border-color 0.25s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(12,11,9,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(12,11,9,0.3)")
            }
          >
            <Phone size={12} />
            {phone}
          </a>
        </div>

        {/* Rectangle border with plus corners — 21st.dev signature */}
        <div
          className="animate-cta-scale-in delay-700 cta-rect"
          style={{
            position: "absolute",
            inset: "16px",
            borderTop: "1px solid rgba(12,11,9,0.15)",
            borderBottom: "1px solid rgba(12,11,9,0.15)",
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          {/* Side vertical lines */}
          <div
            style={{
              position: "absolute",
              top: "-16px",
              bottom: "-16px",
              left: 0,
              width: "1px",
              borderLeft: "1px solid rgba(12,11,9,0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-16px",
              bottom: "-16px",
              right: 0,
              width: "1px",
              borderRight: "1px solid rgba(12,11,9,0.15)",
            }}
          />

          {/* Corner plus icons */}
          {(
            [
              { top: -11, left: -10 },
              { top: -11, right: -10 },
              { bottom: -11, left: -10 },
              { bottom: -11, right: -10 },
            ] as React.CSSProperties[]
          ).map((pos, i) => (
            <svg
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(12,11,9,0.4)"
              strokeWidth="1"
              style={{ position: "absolute", ...pos }}
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          ))}

          {/* Centre dashed vertical line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "1px",
              borderLeft: "1px dashed rgba(12,11,9,0.12)",
              zIndex: 0,
            }}
          />
        </div>

        {/* Glow — subtle inset shadow from top */}
        <div
          className="fade-top-lg animate-cta-scale-in delay-700 pointer-events-none absolute inset-0"
          style={{
            opacity: 0,
            boxShadow:
              "0 -16px 128px 0 rgba(12,11,9,0.12) inset, 0 -16px 32px 0 rgba(12,11,9,0.08) inset",
          }}
        />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          .cta-inner    { padding: 40px 24px !important; }
          .cta-rect     { inset: 10px !important; }
          .cta-buttons  { flex-direction: column !important; width: 100% !important; }
          .cta-btn-primary,
          .cta-btn-secondary { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
