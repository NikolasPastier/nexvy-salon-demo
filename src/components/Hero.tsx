"use client";

import { useEffect, useRef, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../content/site-config.json";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const { openModal } = useBookingModal();

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const bg = bgRef.current;
      if (!bg) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bg.style.transform = `translateY(${y * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 48px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(20%)",
          transformOrigin: "center",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(12,11,9,0.45) 0%, rgba(12,11,9,0.55) 40%, rgba(12,11,9,0.75) 70%, rgba(12,11,9,0.97) 100%)",
          zIndex: 1,
        }}
      />

      {/* Circular rotating badge */}
      <div
        style={{
          position: "absolute",
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 100,
          height: 100,
          opacity: loaded ? 0.65 : 0,
          transition: "opacity 0.8s var(--ease) 0.8s",
        }}
        className="hidden md:block"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="animate-spin-slow">
          <defs>
            <path id="circle-path" d="M 50 50 m -35 0 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" />
          </defs>
          <text
            fontFamily="var(--font-dm-sans), DM Sans, sans-serif"
            fontSize="9"
            fill="rgba(200,146,42,0.9)"
            letterSpacing="4"
          >
            <textPath href="#circle-path">PRÉMIOVÉ KADERNÍCTVO • BRATISLAVA • </textPath>
          </text>
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, width: "100%" }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 24,
            display: "block",
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          {config.business.contacts.address}
        </span>

        {/* Animated title */}
        <h1 style={{ marginBottom: 32, textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}>
          {["Bella", "Studio"].map((word, i) => (
            <span
              key={word}
              style={{ display: "block", overflow: "hidden" }}
            >
              <span
                style={{
                  display: "block",
                  transform: loaded ? "translateY(0)" : "translateY(100%)",
                  transition: `transform 0.9s var(--ease) ${i * 0.1}s`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 17,
            color: "rgba(237,232,223,0.7)",
            fontWeight: 300,
            marginBottom: 48,
            maxWidth: 440,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s var(--ease) 0.5s, transform 0.8s var(--ease) 0.5s",
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          Vaše vlasy si zaslúžia to najlepšie.<br />
          Prémiové strihanie, farbenie a styling v srdci Bratislavy.
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s var(--ease) 0.65s, transform 0.8s var(--ease) 0.65s",
          }}
        >
          <button
            onClick={() => openModal()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "18px 40px",
              background: "var(--gold)",
              color: "#0C0B09",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 2,
              cursor: "none",
              transition: "background 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-l)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,146,42,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Objednať sa online
          </button>
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 32px",
              background: "rgba(237,232,223,0.06)",
              color: "var(--cream)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid rgba(237,232,223,0.15)",
              borderRadius: 2,
              backdropFilter: "blur(8px)",
              transition: "background 0.25s, border-color 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(237,232,223,0.1)";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(237,232,223,0.06)";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.15)";
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 012.12 2.18 2 2 0 014.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {config.business.contacts.phone}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          right: 48,
          bottom: 80,
          zIndex: 2,
          writingMode: "vertical-rl",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
        }}
        className="hidden md:flex"
      >
        SCROLL
        <div
          style={{
            width: 1,
            height: 64,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
          }}
          className="animate-scroll-line"
        />
      </div>
    </section>
  );
}
