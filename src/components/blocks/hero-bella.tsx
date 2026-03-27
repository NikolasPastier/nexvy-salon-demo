"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useBookingModal } from "@/context/BookingModalContext";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import config from "../../../content/site-config.json";

export function BellaHero() {
  const { openModal } = useBookingModal();
  const phone = config.business.contacts.phone;

  return (
    <div
      className="flex flex-col overflow-hidden pb-12 md:pb-0"
      style={{ background: "#0C0B09", marginTop: "76px" }}
    >
      <ContainerScroll
        titleComponent={
          <div style={{ padding: "0 24px" }}>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(64px, 10vw, 130px)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#EDE8DF",
                marginBottom: "8px",
              }}
            >
              Bella
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(64px, 10vw, 130px)",
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                color: "#EDE8DF",
                marginBottom: "28px",
                fontStyle: "italic",
              }}
            >
              Studio
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(14px, 1.5vw, 17px)",
                fontWeight: 300,
                color: "rgba(237,232,223,0.6)",
                lineHeight: 1.7,
                maxWidth: "440px",
                margin: "0 auto 36px",
              }}
            >
              Vaše vlasy si zaslúžia to najlepšie.
              <br />
              Prémiové strihanie, farbenie a styling v srdci Bratislavy.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              {/* Primary shimmer button */}
              <ShimmerButton
                onClick={() => openModal()}
                className="px-9 py-4 text-[11px]"
              >
                Objednať sa online
                <ArrowRight size={13} />
              </ShimmerButton>

              {/* Secondary ghost link */}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 28px",
                  background: "rgba(237,232,223,0.05)",
                  color: "#EDE8DF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: "9999px",
                  border: "1px solid rgba(237,232,223,0.15)",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.25s, background 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,232,223,0.35)";
                  e.currentTarget.style.background = "rgba(237,232,223,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(237,232,223,0.15)";
                  e.currentTarget.style.background = "rgba(237,232,223,0.05)";
                }}
              >
                <Phone size={12} />
                {phone}
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.3)",
                }}
              >
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "1px",
                  height: "32px",
                  background: "linear-gradient(to bottom, rgba(200,146,42,0.6), transparent)",
                }}
              />
            </motion.div>
          </div>
        }
      >
        {/* ── SALON IMAGE INSIDE THE 3D CARD ── */}
        <div style={{ position: "relative", width: "100%", height: "100%" }}>

          {/* Main salon photo */}
          <img
            src="/images/hero-salon.jpg"
            alt="Bella Studio - interiér salónu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />

          {/* Dark gradient overlay — bottom fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(12,11,9,0.7) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          {/* "Naša práca" badge top-right */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "6px 14px",
              background: "rgba(200,146,42,0.85)",
              borderRadius: "9999px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#0C0B09",
              }}
            >
              Naša práca
            </span>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
