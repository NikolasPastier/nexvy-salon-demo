"use client";

import { ArrowRightIcon, PhoneIcon, PlusIcon } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../../content/site-config.json";

export function BellaCTA() {
  const { openModal } = useBookingModal();

  return (
    <section
      id="cta"
      className="w-full py-24 px-6 flex items-center justify-center"
      style={{ background: "#C8922A" }}
    >
      <div
        className="relative mx-auto flex w-full flex-col items-center cta-inner"
        style={{
          maxWidth: 640,
          borderTop: "1px solid rgba(12,11,9,0.2)",
          borderBottom: "1px solid rgba(12,11,9,0.2)",
          padding: "64px 32px",
          gap: 32,
        }}
      >
        {/* Corner plus icons */}
        <PlusIcon
          className="absolute"
          style={{ top: -13, left: -12, width: 24, height: 24, color: "#0C0B09", opacity: 0.7 }}
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute"
          style={{ top: -13, right: -12, width: 24, height: 24, color: "#0C0B09", opacity: 0.7 }}
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute"
          style={{ bottom: -13, left: -12, width: 24, height: 24, color: "#0C0B09", opacity: 0.7 }}
          strokeWidth={1}
        />
        <PlusIcon
          className="absolute"
          style={{ bottom: -13, right: -12, width: 24, height: 24, color: "#0C0B09", opacity: 0.7 }}
          strokeWidth={1}
        />

        {/* Side border lines */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{ width: 1, borderLeft: "1px solid rgba(12,11,9,0.2)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0"
          style={{ width: 1, borderRight: "1px solid rgba(12,11,9,0.2)" }}
        />

        {/* Centre dashed divider */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{
            left: "50%",
            width: 0,
            borderLeft: "1px dashed rgba(12,11,9,0.15)",
            zIndex: 0,
          }}
        />

        {/* Radial gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(40% 80% at 50% 0%, rgba(12,11,9,0.08), transparent)",
          }}
        />

        {/* Text block */}
        <div className="relative text-center z-10" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(12,11,9,0.5)",
              margin: 0,
            }}
          >
            Zarezervujte termín
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#0C0B09",
              margin: 0,
            }}
          >
            Zarezervujte si<br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>termín</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(12,11,9,0.65)",
              maxWidth: 380,
              margin: "4px auto 0",
              lineHeight: 1.65,
            }}
          >
            Zavolajte nám alebo sa objednajte online — ste u nás vždy vítaní.
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 cta-buttons" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => openModal()}
            className="cta-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "16px 32px",
              background: "#0C0B09",
              color: "#C8922A",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: 11,
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
            <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </button>

          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            className="cta-btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "16px 32px",
              background: "transparent",
              color: "#0C0B09",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(12,11,9,0.3)",
              borderRadius: "9999px",
              transition: "border-color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0C0B09")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(12,11,9,0.3)")}
          >
            <PhoneIcon style={{ width: 14, height: 14 }} />
            {config.business.contacts.phone}
          </a>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .cta-inner       { padding: 40px 20px !important; }
          .cta-buttons     { flex-direction: column !important; width: 100% !important; }
          .cta-btn-primary,
          .cta-btn-secondary { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
