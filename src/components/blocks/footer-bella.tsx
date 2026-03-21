"use client";

import { type ComponentProps, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { ShimmerLink } from "@/components/ui/shimmer-button";
import config from "../../../content/site-config.json";

// ─── AnimatedContainer (21st.dev pattern) ────────────────────────────────────

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── BellaFooter ──────────────────────────────────────────────────────────────

export function BellaFooter() {
  const { phone, email, address, instagram, facebook } =
    config.business.contacts;

  return (
    <footer
      style={{
        background: "#0C0B09",
        borderTop: "1px solid rgba(237,232,223,0.06)",
        position: "relative",
      }}
    >
      {/* 21st.dev signature: radial gold glow on the top border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          width: "33%",
          height: "1px",
          background: "rgba(200,146,42,0.6)",
          borderRadius: "9999px",
          filter: "blur(3px)",
        }}
      />

      {/* Main grid */}
      <div
        className="footer-grid"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "80px 48px 56px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: "64px",
        }}
      >
        {/* ── Col 1 — Brand ── */}
        <AnimatedContainer delay={0.1}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "32px",
              fontWeight: 400,
              color: "#EDE8DF",
              margin: "0 0 10px",
            }}
          >
            Bella Studio
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#7A756C",
              margin: "0 0 24px",
            }}
          >
            Vaše vlasy si zaslúžia to najlepšie.
          </p>

          {/* Google rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                color: "#C8922A",
                letterSpacing: "3px",
                fontSize: "13px",
              }}
            >
              ★★★★★
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#7A756C",
              }}
            >
              <strong style={{ color: "#EDE8DF", fontWeight: 400 }}>
                {config.business.rating}
              </strong>{" "}
              · {config.business.reviewCount} recenzií
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { Icon: Instagram, label: "Instagram", href: instagram },
              { Icon: Facebook, label: "Facebook", href: facebook },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(237,232,223,0.08)",
                  borderRadius: "50%",
                  color: "#7A756C",
                  textDecoration: "none",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C8922A";
                  e.currentTarget.style.borderColor = "rgba(200,146,42,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7A756C";
                  e.currentTarget.style.borderColor = "rgba(237,232,223,0.08)";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* ── Col 2 — Hours ── */}
        <AnimatedContainer delay={0.2}>
          <h4
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8922A",
              margin: "0 0 28px",
            }}
          >
            Otváracie hodiny
          </h4>
          {[
            {
              day: "Pondelok – Piatok",
              hours: config.business.hours.monday_friday,
              closed: false,
            },
            {
              day: "Sobota",
              hours: config.business.hours.saturday,
              closed: false,
            },
            {
              day: "Nedeľa",
              hours: config.business.hours.sunday,
              closed: true,
            },
          ].map(({ day, hours, closed }) => (
            <div
              key={day}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid rgba(237,232,223,0.05)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: closed ? "rgba(122,117,108,0.45)" : "#7A756C",
                }}
              >
                {day}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: closed ? "rgba(200,146,42,0.5)" : "#EDE8DF",
                }}
              >
                {hours}
              </span>
            </div>
          ))}
        </AnimatedContainer>

        {/* ── Col 3 — Contact ── */}
        <AnimatedContainer delay={0.3}>
          <h4
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8922A",
              margin: "0 0 28px",
            }}
          >
            Kontakt
          </h4>

          {[
            {
              Icon: MapPin,
              text: address,
              href: "https://maps.google.com/?q=Obchodná+12+Bratislava",
            },
            {
              Icon: Phone,
              text: phone,
              href: `tel:${phone.replace(/\s/g, "")}`,
            },
            { Icon: Mail, text: email, href: `mailto:${email}` },
          ].map(({ Icon, text, href }) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                padding: "12px 0",
                borderBottom: "1px solid rgba(237,232,223,0.05)",
              }}
            >
              <Icon
                size={14}
                style={{ color: "#C8922A", marginTop: "2px", flexShrink: 0 }}
              />
              <a
                href={href}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel={href.startsWith("https") ? "noreferrer" : undefined}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "#EDE8DF",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C8922A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#EDE8DF")
                }
              >
                {text}
              </a>
            </div>
          ))}

          <ShimmerLink
            href="#cta"
            className="mt-7 px-6 py-[13px] text-[10px]"
          >
            Rezervovať termín →
          </ShimmerLink>
        </AnimatedContainer>
      </div>

      {/* Gold gradient divider */}
      <AnimatedContainer delay={0.4}>
        <div
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 48px" }}
        >
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, #C8922A, rgba(200,146,42,0.15), transparent)",
            }}
          />
        </div>
      </AnimatedContainer>

      {/* Bottom bar */}
      <AnimatedContainer delay={0.5}>
        <div
          className="footer-bottom"
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "24px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "rgba(122,117,108,0.5)",
            }}
          >
            © {new Date().getFullYear()} Bella Studio. Všetky práva
            vyhradené.
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "rgba(122,117,108,0.5)",
            }}
          >
            Webstránka od{" "}
            <a
              href="https://nexvy.sk"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#C8922A", textDecoration: "none" }}
            >
              Nexvy
            </a>
          </span>
        </div>
      </AnimatedContainer>

      {/* Responsive — replaces styled-jsx (not available in App Router) */}
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
            padding: 64px 32px 48px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            padding: 48px 24px 40px !important;
          }
          .footer-bottom { padding: 20px 24px !important; }
        }
      `}</style>
    </footer>
  );
}
