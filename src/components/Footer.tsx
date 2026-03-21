"use client";

import Link from "next/link";
import config from "../../content/site-config.json";

export default function Footer() {
  const { business } = config;

  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px 48px 48px",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: 64,
          paddingBottom: 64,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: 28,
              fontWeight: 400,
              marginBottom: 12,
              color: "var(--cream)",
            }}
          >
            {business.name}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted)",
              marginBottom: 28,
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontWeight: 300,
            }}
          >
            {business.tagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)", fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}>
            <span style={{ color: "var(--gold)", letterSpacing: 2 }}>★★★★★</span>
            <span>{business.rating} · {business.reviewCount} recenzií</span>
          </div>
          {/* Socials */}
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            {[
              {
                href: business.contacts.instagram,
                label: "Instagram",
                icon: (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                href: business.contacts.facebook,
                label: "Facebook",
                icon: (
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer-social-link"
                style={{
                  width: 36, height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--gold)";
                  e.currentTarget.style.borderColor = "rgba(200,146,42,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 24,
            }}
          >
            Otváracie hodiny
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { day: "Pondelok – Piatok", time: business.hours.monday_friday, closed: false },
              { day: "Sobota", time: business.hours.saturday, closed: false },
              { day: "Nedeľa", time: business.hours.sunday, closed: true },
            ].map((row) => (
              <li
                key={row.day}
                style={{
                  fontSize: 14,
                  color: row.closed ? "rgba(122,117,108,0.5)" : "var(--muted)",
                  padding: "6px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontWeight: 300,
                }}
              >
                {row.day}
                <span style={{ color: row.closed ? "rgba(200,146,42,0.6)" : "var(--cream)" }}>
                  {row.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 24,
            }}
          >
            Kontakt
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              {
                href: "https://maps.google.com",
                text: business.contacts.address,
                icon: (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "var(--gold)" }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
              {
                href: `tel:${business.contacts.phone.replace(/\s/g, "")}`,
                text: business.contacts.phone,
                icon: (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "var(--gold)" }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 012.12 2.18 2 2 0 014.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
              },
              {
                href: `mailto:${business.contacts.email}`,
                text: business.contacts.email,
                icon: (
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2, color: "var(--gold)" }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" />
                  </svg>
                ),
              },
            ].map((item) => (
              <li
                key={item.href}
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontWeight: 300,
                }}
              >
                {item.icon}
                <a
                  href={item.href}
                  style={{ color: "var(--cream)", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream)")}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "rgba(122,117,108,0.6)",
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span>© {new Date().getFullYear()} {business.name}. Všetky práva vyhradené.</span>
        <span>
          Webstránka od{" "}
          <Link href="/" style={{ color: "var(--gold)", textDecoration: "none" }}>
            Nexvy
          </Link>
        </span>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px)  { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
