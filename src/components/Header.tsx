"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import config from "../../content/site-config.json";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 900,
        height: 76,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="px-6 md:px-12"
    >
      {/* Background layer to fix iOS Safari fixed + backdrop-filter bug */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          background: scrolled ? "rgba(12,11,9,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          transition: "background 0.4s, border-color 0.4s",
        }}
      />
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 400,
          color: "var(--cream)",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        {config.business.name}
      </Link>

      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center" style={{ gap: 36, listStyle: "none" }}>
        {[
          { label: "Služby", href: "#services" },
          { label: "Galéria", href: "#gallery" },
          { label: "Tím", href: "#team" },
          { label: "Recenzie", href: "#reviews" },
          { label: "Kontakt", href: "#cta" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.65)",
              textDecoration: "none",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,232,223,0.65)")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop right */}
      <div className="hidden md:flex items-center" style={{ gap: 28 }}>
        <a
          href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
          style={{
            fontSize: 13,
            color: "var(--muted)",
            textDecoration: "none",
            transition: "color 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          {config.business.contacts.phone}
        </a>
        <ShimmerButton
          onClick={() => openModal()}
          className="px-6 py-3 text-[10px]"
        >
          Objednať sa
        </ShimmerButton>
      </div>

      {/* Mobile right */}
      <div className="flex md:hidden items-center" style={{ gap: 12 }}>
        <ShimmerButton
          onClick={() => openModal()}
          className="px-5 py-[10px] text-[10px]"
        >
          Objednať
        </ShimmerButton>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ color: "var(--cream)", background: "none", border: "none", cursor: "none", padding: 8 }}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 76,
            left: 0,
            right: 0,
            background: "var(--bg-2)",
            borderTop: "1px solid var(--border)",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {[
            { label: "Služby", href: "#services" },
            { label: "Galéria", href: "#gallery" },
            { label: "Tím", href: "#team" },
            { label: "Recenzie", href: "#reviews" },
            { label: "Kontakt", href: "#cta" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--cream)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}
          >
            {config.business.contacts.phone}
          </a>
        </div>
      )}
    </header>
  );
}
