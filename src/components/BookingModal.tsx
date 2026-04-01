"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  User,
  Phone,
  Scissors,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../content/site-config.json";

// ─── Toast ─────────────────────────────────────────────────

export function Toast() {
  const { toast } = useBookingModal();
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div
      className="toast-slide-in"
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 2000,
        maxWidth: 360,
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: isSuccess ? "#C8922A" : "#93000a",
        color: isSuccess ? "#0C0B09" : "#ffdad6",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        fontSize: 13,
        fontWeight: 400,
        borderRadius: "9999px",
      }}
    >
      {isSuccess ? (
        <CheckCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
      ) : (
        <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
      )}
      <p style={{ margin: 0, lineHeight: 1.55 }}>{toast.message}</p>
    </div>
  );
}

// ─── BookingModal ───────────────────────────────────────────

export default function BookingModal() {
  const { isOpen, initialServiceId, preferredStylist, closeModal, showToast } =
    useBookingModal();

  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Pre-fill service from context
  useEffect(() => {
    if (isOpen && initialServiceId) {
      setValues((v) => ({ ...v, service: initialServiceId }));
    }
  }, [isOpen, initialServiceId]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard close
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );
  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  // Particle canvas
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 146, 42, ${p.opacity})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen]);

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setValues({ name: "", phone: "", service: "", date: "", time: "", notes: "" });
    }
  }, [isOpen]);

  // Slovak date formatter
  const formatDate = (d: string) => {
    if (!d) return "";
    const [y, mo, day] = d.split("-");
    const months = ["januára","februára","marca","apríla","mája","júna",
                    "júla","augusta","septembra","októbra","novembra","decembra"];
    return `${parseInt(day)}. ${months[parseInt(mo) - 1]} ${y}`;
  };

  // Submit — fake loading then show success card
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  // ── Shared styles ───────────────────────────────────────

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background:
      focused === name ? "rgba(200,146,42,0.06)" : "rgba(237,232,223,0.03)",
    border: "1px solid",
    borderColor:
      focused === name ? "rgba(200,146,42,0.45)" : "rgba(237,232,223,0.1)",
    borderRadius: "10px",
    padding: "10px 14px 10px 36px",
    color: "#EDE8DF",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    outline: "none",
    transition: "all 0.25s",
    backdropFilter: "blur(4px)",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "9px",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#C8922A",
    marginBottom: "5px",
  };

  const iconStyle = (name: string): React.CSSProperties => ({
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: focused === name ? "#C8922A" : "#7A756C",
    transition: "color 0.25s",
    pointerEvents: "none",
  });

  // ── Mobile vs desktop positioning ──────────────────────

  const mobileModalStyle: React.CSSProperties = {
    position: "fixed",
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
    width: "100%",
    maxWidth: "100%",
    maxHeight: "92vh",
    overflow: "hidden",
  };

  const desktopModalStyle: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 1001,
    width: "100%",
    maxWidth: "560px",
    maxHeight: "92vh",
  };

  const mobileCardStyle: React.CSSProperties = {
    borderRadius: "20px 20px 0 0",
  };

  const desktopCardStyle: React.CSSProperties = {
    borderRadius: "20px",
  };

  const mobileInitial = { y: "100%", opacity: 0 } as const;
  const desktopInitial = { opacity: 0, scale: 0.94, x: "-50%", y: "-46%" } as const;
  const mobileAnimate = { y: 0, opacity: 1 } as const;
  const desktopAnimate = { opacity: 1, scale: 1, x: "-50%", y: "-50%" } as const;
  const mobileExit = { y: "100%", opacity: 0 } as const;
  const desktopExit = { opacity: 0, scale: 0.94, x: "-50%", y: "-46%" } as const;

  const twoColGrid = isMobile ? "1fr" : "1fr 1fr";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={isMobile ? mobileInitial : desktopInitial}
            animate={isMobile ? mobileAnimate : desktopAnimate}
            exit={isMobile ? mobileExit : desktopExit}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={isMobile ? mobileModalStyle : desktopModalStyle}
          >
            <div
              style={{
                position: "relative",
                background: "#141210",
                border: "1px solid rgba(237,232,223,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...(isMobile ? mobileCardStyle : desktopCardStyle),
              }}
            >
              {/* Particle canvas */}
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              {/* Gold top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #C8922A, transparent)",
                }}
              />

              <div
                style={{ 
                  position: "relative", 
                  zIndex: 1, 
                  padding: "28px 32px 24px",
                  overflowY: "auto",
                  maxHeight: "92vh"
                }}
                className="modal-content-pad"
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C8922A",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Bella Studio
                    </span>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(28px, 4vw, 38px)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: "#EDE8DF",
                        lineHeight: 1.1,
                        margin: 0,
                      }}
                    >
                      Rezervácia termínu
                    </h2>
                  </div>
                  <CloseButton onClick={closeModal} />
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(237,232,223,0.06)",
                    marginBottom: "20px",
                  }}
                />

                {/* Success card */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ paddingBottom: "8px" }}
                  >
                    {/* Gold checkmark */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          width: "68px", height: "68px", borderRadius: "50%",
                          background: "rgba(200,146,42,0.1)",
                          border: "1px solid rgba(200,146,42,0.35)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <CheckCircle size={30} style={{ color: "#C8922A" }} />
                      </motion.div>
                    </div>

                    {/* Headline */}
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(24px, 4vw, 30px)", fontWeight: 400, fontStyle: "italic",
                      color: "#EDE8DF", textAlign: "center", lineHeight: 1.2, margin: "0 0 6px",
                    }}>
                      Ďakujeme, {values.name.split(" ")[0]}!
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px", fontWeight: 500, letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#C8922A",
                      textAlign: "center", margin: "0 0 24px",
                    }}>
                      Váš termín je potvrdený
                    </p>

                    {/* Booking details */}
                    <div style={{
                      background: "rgba(237,232,223,0.03)",
                      border: "1px solid rgba(200,146,42,0.18)",
                      borderRadius: "14px", padding: "20px", marginBottom: "20px",
                    }}>
                      {/* Service */}
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "14px" }}>
                        <Scissors size={14} style={{ color: "#C8922A", flexShrink: 0, marginTop: "3px" }} />
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(237,232,223,0.35)", marginBottom: "3px" }}>Služba</div>
                          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", fontWeight: 400, color: "#EDE8DF" }}>
                            {config.services.find(s => s.id === values.service)?.title ?? values.service}
                            {" "}
                            <span style={{ color: "rgba(237,232,223,0.45)", fontSize: "14px" }}>
                              — {config.services.find(s => s.id === values.service)?.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date + time */}
                      {(values.date || values.time) && (
                        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "14px" }}>
                          <Calendar size={14} style={{ color: "#C8922A", flexShrink: 0, marginTop: "3px" }} />
                          <div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(237,232,223,0.35)", marginBottom: "3px" }}>Dátum a čas</div>
                            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", fontWeight: 400, color: "#EDE8DF" }}>
                              {values.date ? formatDate(values.date) : "Podľa dohody"}
                              {values.time ? ` o ${values.time}` : ""}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Address */}
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <MapPin size={14} style={{ color: "#C8922A", flexShrink: 0, marginTop: "3px" }} />
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(237,232,223,0.35)", marginBottom: "3px" }}>Adresa</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(237,232,223,0.75)", lineHeight: 1.5 }}>
                            {config.business.contacts.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp note */}
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px", fontWeight: 300,
                      color: "rgba(237,232,223,0.55)",
                      textAlign: "center", lineHeight: 1.65, margin: "0 0 20px",
                    }}>
                      Potvrdenie sme vám poslali na WhatsApp.<br />
                      Tešíme sa na vás! 🎉
                    </p>

                    {/* Close */}
                    <button
                      onClick={closeModal}
                      style={{
                        width: "100%", padding: "14px",
                        borderRadius: "9999px", border: "1px solid rgba(237,232,223,0.1)",
                        background: "rgba(237,232,223,0.05)",
                        color: "rgba(237,232,223,0.7)",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                        fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
                        cursor: "pointer", transition: "background 0.25s, border-color 0.25s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(237,232,223,0.1)";
                        e.currentTarget.style.borderColor = "rgba(237,232,223,0.2)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(237,232,223,0.05)";
                        e.currentTarget.style.borderColor = "rgba(237,232,223,0.1)";
                      }}
                    >
                      Zavrieť
                    </button>
                  </motion.div>
                )}

                {/* Form */}
                {!submitted && <form onSubmit={handleSubmit}>

                  {/* Preferred stylist badge */}
                  {preferredStylist && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "rgba(200,146,42,0.08)",
                        border: "1px solid rgba(200,146,42,0.2)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        marginBottom: "12px",
                      }}
                    >
                      <User size={13} style={{ color: "#C8922A", flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#EDE8DF",
                        }}
                      >
                        Preferovaný stylist:{" "}
                        <strong style={{ color: "#C8922A", fontWeight: 500 }}>
                          {preferredStylist}
                        </strong>
                      </span>
                    </div>
                  )}

                  {/* Row 1: Name + Phone */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: twoColGrid,
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Meno a priezvisko *</label>
                      <div style={{ position: "relative" }}>
                        <User size={13} style={iconStyle("name")} />
                        <input
                          type="text"
                          placeholder="Ján Novák"
                          value={values.name}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, name: e.target.value }))
                          }
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          required
                          autoComplete="name"
                          style={fieldStyle("name")}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Telefón *</label>
                      <div style={{ position: "relative" }}>
                        <Phone size={13} style={iconStyle("phone")} />
                        <input
                          type="tel"
                          placeholder="+421 9XX XXX XXX"
                          value={values.phone}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, phone: e.target.value }))
                          }
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          required
                          autoComplete="tel"
                          style={fieldStyle("phone")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Service */}
                  <div style={{ marginBottom: "12px" }}>
                    <label style={labelStyle}>Služba *</label>
                    <div style={{ position: "relative" }}>
                      <Scissors size={13} style={iconStyle("service")} />
                      <select
                        value={values.service}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, service: e.target.value }))
                        }
                        onFocus={() => setFocused("service")}
                        onBlur={() => setFocused(null)}
                        required
                        style={{
                          ...fieldStyle("service"),
                          appearance: "none",
                          WebkitAppearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" style={{ background: "#141210" }}>
                          Vyberte službu…
                        </option>
                        {config.services.map((s) => (
                          <option
                            key={s.id}
                            value={s.id}
                            style={{ background: "#141210" }}
                          >
                            {s.title} — {s.price}
                          </option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#7A756C",
                          pointerEvents: "none",
                          fontSize: "10px",
                        }}
                      >
                        ▾
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Date + Time */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: twoColGrid,
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Preferovaný dátum</label>
                      <div style={{ position: "relative" }}>
                        <Calendar size={13} style={iconStyle("date")} />
                        <input
                          type="date"
                          value={values.date}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, date: e.target.value }))
                          }
                          onFocus={() => setFocused("date")}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...fieldStyle("date"),
                            colorScheme: "dark",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Preferovaný čas</label>
                      <div style={{ position: "relative" }}>
                        <Clock size={13} style={iconStyle("time")} />
                        <select
                          value={values.time}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, time: e.target.value }))
                          }
                          onFocus={() => setFocused("time")}
                          onBlur={() => setFocused(null)}
                          style={{
                            ...fieldStyle("time"),
                            appearance: "none",
                            WebkitAppearance: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="" style={{ background: "#141210" }}>
                            Vyberte čas…
                          </option>
                          {[
                            "09:00","10:00","11:00","12:00","13:00",
                            "14:00","15:00","16:00","17:00","18:00","19:00",
                          ].map((t) => (
                            <option key={t} value={t} style={{ background: "#141210" }}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <div
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#7A756C",
                            pointerEvents: "none",
                            fontSize: "10px",
                          }}
                        >
                          ▾
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Notes */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>Poznámky (nepovinné)</label>
                    <div style={{ position: "relative" }}>
                      <MessageSquare
                        size={13}
                        style={{ ...iconStyle("notes"), top: "14px", transform: "none" }}
                      />
                      <textarea
                        placeholder="Špeciálne požiadavky…"
                        value={values.notes}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, notes: e.target.value }))
                        }
                        onFocus={() => setFocused("notes")}
                        onBlur={() => setFocused(null)}
                        rows={2}
                        style={{
                          ...fieldStyle("notes"),
                          resize: "none",
                          paddingTop: "10px",
                          lineHeight: 1.5,
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading || submitted}
                    whileHover={!loading && !submitted ? { scale: 1.01 } : {}}
                    whileTap={!loading && !submitted ? { scale: 0.98 } : {}}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "9999px",
                      border: "none",
                      background: submitted
                        ? "rgba(200,146,42,0.3)"
                        : "linear-gradient(110deg, #C8922A 30%, #F0C060 45%, #E8B84B 50%, #C8922A 60%, #C8922A)",
                      backgroundSize: "200% 100%",
                      animation:
                        submitted ? "none" : "shimmer2 2.5s infinite linear",
                      color: "#0C0B09",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      cursor: loading || submitted ? "default" : "none",
                      transition: "all 0.3s",
                      boxShadow: "0 0 24px rgba(200,146,42,0.25)",
                      opacity: loading ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {loading ? "Overujeme dostupnosť…" : "Odoslať rezerváciu"}
                  </motion.button>

                  {/* Privacy note */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      color: "rgba(237,232,223,0.25)",
                      textAlign: "center",
                      marginTop: "12px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Vaše údaje spracúvame iba za účelom rezervácie termínu.
                  </p>
                </form>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Close button ───────────────────────────────────────────

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Zavrieť"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "rgba(237,232,223,0.06)",
        border: "1px solid rgba(237,232,223,0.1)",
        color: "#7A756C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "none",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,146,42,0.4)";
        e.currentTarget.style.color = "#C8922A";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(237,232,223,0.1)";
        e.currentTarget.style.color = "#7A756C";
      }}
    >
      <X size={14} />
    </button>
  );
}
