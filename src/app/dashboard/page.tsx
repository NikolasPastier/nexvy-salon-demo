"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from "recharts";
import config from "../../../content/site-config.json";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Potvrdené" | "Prebieha" | "Dokončené" | "No-show";

interface Appointment {
  id: number;
  name: string;
  service: string;
  price: number;
  time: string;
  stylist: string;
  phone: string;
  status: Status;
  notes?: string;
}

interface AtRiskClient {
  name: string;
  lastVisit: string;
  weeksInactive: number;
  lastService: string;
  phone: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#C8922A";
const DARK = "#0C0B09";
const CREAM = "#EDE8DF";
const MUTED = "#7A756C";

const PIN = "1234";

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, name: "Jana Kováčová",    service: "Farbenie",     price: 65, time: "09:00", stylist: "Lucia",   phone: "+421900111222", status: "Dokončené" },
  { id: 2, name: "Petra Novák",      service: "Strihanie",    price: 30, time: "09:30", stylist: "Martina", phone: "+421900222333", status: "Dokončené" },
  { id: 3, name: "Eva Horváth",      service: "Keratin",      price: 65, time: "10:00", stylist: "Zuzana",  phone: "+421900333444", status: "Prebieha"  },
  { id: 4, name: "Monika Slobodová", service: "Balayage",     price: 75, time: "11:00", stylist: "Lucia",   phone: "+421900444555", status: "Potvrdené" },
  { id: 5, name: "Katarína Blaho",   service: "Strihanie",    price: 30, time: "12:00", stylist: "Martina", phone: "+421900555666", status: "Potvrdené" },
  { id: 6, name: "Zuzana Mináč",     service: "Farbenie",     price: 70, time: "13:30", stylist: "Lucia",   phone: "+421900666777", status: "Potvrdené" },
  { id: 7, name: "Silvia Kováč",     service: "Strihanie",    price: 30, time: "15:00", stylist: "Zuzana",  phone: "+421900777888", status: "Potvrdené" },
  { id: 8, name: "Lucia Bartová",    service: "Strihanie",    price: 30, time: "16:30", stylist: "Martina", phone: "+421900888999", status: "Potvrdené" },
];

const AT_RISK_CLIENTS: AtRiskClient[] = [
  { name: "Jana Kováčová", lastVisit: "12.2.2025", weeksInactive: 11, lastService: "Farbenie",  phone: "+421900111222" },
  { name: "Petra Novák",   lastVisit: "5.2.2025",  weeksInactive: 12, lastService: "Strihanie", phone: "+421900222333" },
  { name: "Monika Free",   lastVisit: "28.1.2025", weeksInactive: 13, lastService: "Balayage",  phone: "+421900333444" },
];

const WEEKLY_DATA = [
  { day: "Po", thisWeek: 7, lastWeek: 5 },
  { day: "Ut", thisWeek: 6, lastWeek: 8 },
  { day: "St", thisWeek: 9, lastWeek: 6 },
  { day: "Št", thisWeek: 8, lastWeek: 7 },
  { day: "Pi", thisWeek: 10, lastWeek: 9 },
  { day: "So", thisWeek: 5, lastWeek: 4 },
  { day: "Ne", thisWeek: 0, lastWeek: 0 },
];

const REVIEWS = [
  { name: "Jana H.",    rating: 5, date: "25.3.2025", text: "Úžasný balayage od Lucie! Presne to, čo som si predstavovala. Budem sa vracať." },
  { name: "Petra M.",  rating: 5, date: "22.3.2025", text: "Strih bol perfektný, Martina mi poradila aj s tvarom. Veľmi profesionálne." },
  { name: "Zuzana K.", rating: 4, date: "18.3.2025", text: "Príjemné prostredie, farbenie vyšlo skvelo. Cena zodpovedá kvalite." },
  { name: "Monika R.", rating: 5, date: "15.3.2025", text: "Keratínová kúra zmenila moje vlasy na nepoznanie. Ďakujem Lucia!" },
  { name: "Eva B.",    rating: 5, date: "10.3.2025", text: "Najlepšie kaderníctvo v Bratislave. Vždy odchádzam spokojná." },
];

const AI_INSIGHTS: Record<number, string> = {
  1: `Martina má voľné sloty v utorok poobede. Odporúčam spustiť rebooking kampaň pre klientky z marca.`,
  3: `Farbenie generuje 38 % tržieb ale zaberá 45 % času. Zvážte úpravu ceny o +5 %.`,
  5: `3 klientky nemali návštevu 10+ týždňov. Piatok je najlepší deň na re-engagement správu.`,
};

const RATING_TREND = [
  { month: "Jan", rating: 4.1, reviews: 23 },
  { month: "Feb", rating: 4.3, reviews: 41 },
  { month: "Mar", rating: 4.7, reviews: 67 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function timeStr() {
  return new Date().toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
}

function plusSevenDays() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("sk-SK", { day: "numeric", month: "numeric", year: "numeric" });
}

const STATUS_COLOR: Record<Status, { bg: string; color: string }> = {
  Potvrdené:  { bg: "rgba(200,146,42,0.12)",   color: GOLD    },
  Prebieha:   { bg: "rgba(59,130,246,0.12)",   color: "#3b82f6" },
  Dokončené:  { bg: "rgba(34,197,94,0.12)",    color: "#16a34a" },
  "No-show":  { bg: "rgba(239,68,68,0.12)",    color: "#dc2626" },
};

// ─── PIN Screen ───────────────────────────────────────────────────────────────

function PinScreen({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState<string[]>([]);
  const [shake, setShake]   = useState(false);
  const [error, setError]   = useState("");

  const tryPin = useCallback((d: string[]) => {
    if (d.join("") === PIN) {
      onUnlock();
    } else {
      setShake(true);
      setError("Nesprávny PIN");
      setTimeout(() => { setShake(false); setDigits([]); setError(""); }, 900);
    }
  }, [onUnlock]);

  const press = (k: string) => {
    if (digits.length >= 4) return;
    const next = [...digits, k];
    setDigits(next);
    if (next.length === 4) setTimeout(() => tryPin(next), 120);
  };

  const del = () => setDigits(d => d.slice(0, -1));

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: DARK, gap: "32px", padding: "24px",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400, color: CREAM, letterSpacing: "0.04em" }}>
          {config.business.name}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginTop: "8px" }}>
          Personál — Prihlásenie
        </div>
      </div>

      {/* PIN dots */}
      <div style={{
        display: "flex", gap: "16px",
        animation: shake ? "pinShake 0.5s" : "none",
      }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{
            width: "16px", height: "16px", borderRadius: "50%",
            background: i < digits.length ? GOLD : "rgba(237,232,223,0.15)",
            transition: "background 0.15s",
          }} />
        ))}
      </div>

      {error && (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#ef4444", letterSpacing: "0.08em" }}>
          {error}
        </div>
      )}

      {/* Keypad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 72px)", gap: "12px" }}>
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
          <button
            key={i}
            onClick={() => k === "⌫" ? del() : k !== "" ? press(k) : undefined}
            disabled={k === ""}
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: k === "" ? "transparent" : "rgba(237,232,223,0.06)",
              border: k === "" ? "none" : "1px solid rgba(237,232,223,0.1)",
              color: k === "⌫" ? GOLD : CREAM,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: k === "⌫" ? "20px" : "24px",
              fontWeight: 300, cursor: k === "" ? "default" : "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (k !== "") e.currentTarget.style.background = "rgba(200,146,42,0.12)"; }}
            onMouseLeave={e => { if (k !== "") e.currentTarget.style.background = "rgba(237,232,223,0.06)"; }}
          >
            {k}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pinShake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  );
}

// ─── Stat Tile ────────────────────────────────────────────────────────────────

function StatTile({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "20px 24px",
      border: `1px solid ${accent ? "rgba(200,146,42,0.3)" : "#e5e7eb"}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      display: "flex", flexDirection: "column", gap: "4px",
    }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>
        {label}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "36px", fontWeight: 400, color: accent ? GOLD : DARK, lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: MUTED }}>{sub}</div>}
    </div>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 400, color: DARK, margin: 0, lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: MUTED, margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

// ─── WhatsApp Modal ───────────────────────────────────────────────────────────

function WaModal({ client, onClose }: { client: AtRiskClient; onClose: () => void }) {
  const msg = `Ahoj ${client.name.split(" ")[0]}! Už je to ${client.weeksInactive} týždňov od vašej poslednej návštevy. Chýbate nám! Na ďalšiu návštevu máte -15 %. Platí do ${plusSevenDays()}. 💛`;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(msg).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
         onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", maxWidth: "460px", width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
           onClick={e => e.stopPropagation()}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>
          WhatsApp správa
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 400, color: DARK, margin: "0 0 20px" }}>
          {client.name}
        </h3>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: DARK, lineHeight: 1.65, marginBottom: "20px", border: "1px solid #e5e7eb" }}>
          {msg}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={copy} style={{ flex: 1, minWidth: "120px", padding: "12px 20px", borderRadius: "9999px", border: `1px solid ${GOLD}`, background: "transparent", color: GOLD, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer" }}>
            {copied ? "✓ Skopírované" : "Kopírovať správu"}
          </button>
          <a href={`https://wa.me/${client.phone.replace(/\s+/g,"")}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
             style={{ flex: 1, minWidth: "120px", padding: "12px 20px", borderRadius: "9999px", background: "#25d366", border: "none", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            Otvoriť WhatsApp
          </a>
        </div>
        <button onClick={onClose} style={{ marginTop: "16px", width: "100%", padding: "10px", borderRadius: "9999px", border: "1px solid #e5e7eb", background: "transparent", color: MUTED, fontFamily: "'DM Sans', sans-serif", fontSize: "11px", cursor: "pointer" }}>
          Zavrieť
        </button>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
  const [appts, setAppts]           = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [expanded, setExpanded]     = useState<number | null>(null);
  const [waClient, setWaClient]     = useState<AtRiskClient | null>(null);
  const [clock, setClock]           = useState(timeStr());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setClock(timeStr()), 30000);
    return () => clearInterval(t);
  }, []);

  // Live stats
  const completed  = appts.filter(a => a.status === "Dokončené");
  const noShows    = appts.filter(a => a.status === "No-show").length;
  const revenue    = completed.reduce((s, a) => s + a.price, 0);
  const avgTicket  = completed.length ? Math.round(revenue / completed.length) : 0;

  const markDone = (id: number) =>
    setAppts(a => a.map(x => x.id === id ? { ...x, status: "Dokončené" } : x));
  const markNoShow = (id: number) =>
    setAppts(a => a.map(x => x.id === id ? { ...x, status: "No-show" } : x));

  // AI insight — rotate by day of week
  const dow = new Date().getDay(); // 0=Sun … 6=Sat
  const insightKey = dow === 1 ? 1 : dow === 3 ? 3 : 5;
  const insight = AI_INSIGHTS[insightKey] ?? AI_INSIGHTS[5];

  // Top services from state
  const serviceRevenue: Record<string, number> = {};
  completed.forEach(a => { serviceRevenue[a.service] = (serviceRevenue[a.service] ?? 0) + a.price; });
  const topServices = Object.entries(serviceRevenue)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  const rebookData = [{ name: "Rebooked", value: 68 }, { name: "Nie", value: 32 }];
  const clientTypeData = [{ name: "Vracajúci", value: 66 }, { name: "Noví", value: 34 }];
  const stylistUtil = [
    { name: "Lucia", util: 87 }, { name: "Martina", util: 61 }, { name: "Zuzana", util: 74 },
  ];

  const monthlyRevenue = 3240;
  const monthlyTarget  = 4000;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4f1", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: DARK, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 400, color: CREAM, letterSpacing: "0.02em" }}>
            {config.business.name}
          </div>
          <div style={{ fontSize: "11px", color: "rgba(237,232,223,0.5)", marginTop: "2px" }}>
            {todayStr()} · {clock}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "9999px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e" }}>AI systém aktívny</span>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px", display: "flex", flexDirection: "column", gap: "40px" }}>

        {/* ── Live Stats ─────────────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Dnešný prehľad" sub="Aktualizuje sa automaticky" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <StatTile label="Rezervácie dnes" value={`${completed.length}/8`} sub="dokončené" accent />
            <StatTile label="No-show dnes" value={String(noShows)} sub="zmeškaných termínov" />
            <StatTile label="Tržby dnes" value={`€${revenue}`} sub="z dokončených služieb" accent />
            <StatTile label="Priemerný ticket" value={`€${avgTicket}`} sub="na klienta" />
          </div>
        </div>

        {/* ── Schedule ───────────────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Dnešný rozvrh" sub="Klikni na rezerváciu pre detaily" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {appts.map(a => {
              const sc = STATUS_COLOR[a.status];
              const isExp = expanded === a.id;
              return (
                <div key={a.id}
                  style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", overflow: "hidden", transition: "box-shadow 0.2s", boxShadow: isExp ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.05)" }}>
                  {/* Row */}
                  <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", gap: "14px", cursor: "pointer" }}
                    onClick={() => setExpanded(isExp ? null : a.id)}>
                    {/* Time */}
                    <div style={{ minWidth: "44px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 400, color: DARK }}>
                      {a.time}
                    </div>
                    {/* Gold line */}
                    <div style={{ width: "3px", height: "36px", borderRadius: "2px", background: a.status === "Dokončené" ? "#22c55e" : a.status === "Prebieha" ? "#3b82f6" : a.status === "No-show" ? "#ef4444" : GOLD, flexShrink: 0 }} />
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                      <div style={{ fontSize: "12px", color: MUTED }}>{a.service} · {a.stylist} · €{a.price}</div>
                    </div>
                    {/* Status badge */}
                    <div style={{ padding: "4px 12px", borderRadius: "9999px", background: sc.bg, color: sc.color, fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {a.status}
                    </div>
                    {/* Chevron */}
                    <div style={{ color: MUTED, fontSize: "12px", transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "none", flexShrink: 0 }}>▾</div>
                  </div>

                  {/* Expanded */}
                  {isExp && (
                    <div style={{ borderTop: "1px solid #f3f4f6", padding: "14px 18px 18px", background: "#fafafa" }}>
                      <div style={{ fontSize: "13px", color: MUTED, marginBottom: "12px" }}>
                        📞 <a href={`tel:${a.phone}`} style={{ color: GOLD, textDecoration: "none" }}>{a.phone}</a>
                        {a.notes && <span style={{ marginLeft: "12px" }}>📝 {a.notes}</span>}
                      </div>
                      {(a.status === "Potvrdené" || a.status === "Prebieha") && (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button onClick={() => markDone(a.id)} style={{ padding: "8px 18px", borderRadius: "9999px", border: "none", background: "#22c55e", color: "#fff", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
                            ✓ Označiť ako dokončené
                          </button>
                          <button onClick={() => markNoShow(a.id)} style={{ padding: "8px 18px", borderRadius: "9999px", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", fontSize: "12px", fontWeight: 500, cursor: "pointer" }}>
                            Označiť ako No-show
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Weekly Performance ─────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Výkonnosť tohto týždňa" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>

            {/* Bar chart */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "16px" }}>Rezervácie (tento vs. minulý týždeň)</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={WEEKLY_DATA} barGap={2}>
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="thisWeek" name="Tento týždeň" fill={GOLD} radius={[4,4,0,0]} />
                  <Bar dataKey="lastWeek" name="Minulý týždeň" fill="rgba(200,146,42,0.25)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rebooking donut */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "8px" }}>Rebooking rate</div>
              <div style={{ fontSize: "11px", color: MUTED, marginBottom: "16px" }}>Cieľ: 80 %</div>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={rebookData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" startAngle={90} endAngle={-270}>
                      <Cell fill={GOLD} />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "42px", fontWeight: 400, color: GOLD, lineHeight: 1 }}>68 %</div>
                  <div style={{ fontSize: "12px", color: MUTED, marginTop: "4px" }}>rebooked</div>
                </div>
              </div>
            </div>

            {/* Stylist utilisation */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "20px" }}>Využitie stylistov</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {stylistUtil.map(s => (
                  <div key={s.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                      <span style={{ color: DARK, fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: GOLD, fontWeight: 500 }}>{s.util} %</span>
                    </div>
                    <div style={{ height: "8px", background: "#f3f4f6", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.util}%`, background: GOLD, borderRadius: "9999px", transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Monthly Overview ───────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Mesačný prehľad" sub="Apríl 2025" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>

            {/* Revenue progress */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "16px" }}>Tržby tento mesiac</div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "48px", fontWeight: 400, color: GOLD, lineHeight: 1, marginBottom: "8px" }}>
                €{monthlyRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: "12px", color: MUTED, marginBottom: "12px" }}>z cieľa €{monthlyTarget.toLocaleString()} ({Math.round(monthlyRevenue / monthlyTarget * 100)} %)</div>
              <div style={{ height: "8px", background: "#f3f4f6", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.round(monthlyRevenue / monthlyTarget * 100)}%`, background: GOLD, borderRadius: "9999px" }} />
              </div>
            </div>

            {/* Top services */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "20px" }}>Top služby</div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart layout="vertical" data={[
                  { name: "Farbenie",    value: 1240 },
                  { name: "Strihanie",   value: 890  },
                  { name: "Balayage",    value: 620  },
                  { name: "Keratin",     value: 490  },
                ]} margin={{ left: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => `€${v}`} contentStyle={{ borderRadius: "10px", border: "none" }} />
                  <Bar dataKey="value" fill={GOLD} radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* New vs returning */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "8px" }}>Klienti</div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <ResponsiveContainer width={130} height={130}>
                  <PieChart>
                    <Pie data={clientTypeData} cx="50%" cy="50%" outerRadius={55} dataKey="value" startAngle={90} endAngle={-270}>
                      <Cell fill={GOLD} />
                      <Cell fill="rgba(200,146,42,0.2)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {clientTypeData.map((d, i) => (
                    <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? GOLD : "rgba(200,146,42,0.3)", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 500, color: DARK }}>{d.value} %</div>
                        <div style={{ fontSize: "11px", color: MUTED }}>{d.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating trend */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", gridColumn: "1 / -1" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: DARK, marginBottom: "16px" }}>Google recenzie — trend hodnotenia</div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={RATING_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[3.8, 5]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "none" }} />
                  <Legend />
                  <Line type="monotone" dataKey="rating" name="Hodnotenie" stroke={GOLD} strokeWidth={2.5} dot={{ fill: GOLD, r: 5 }} />
                  <Line type="monotone" dataKey="reviews" name="Počet recenzií" stroke="rgba(200,146,42,0.35)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── At-Risk Clients ────────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Klienti bez návštevy (8+ týždňov)" sub="Odporúčame re-engagement správu" />
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 120px auto", gap: "16px", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", fontSize: "10px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
              <span>Meno</span>
              <span>Posledná návšteva</span>
              <span>Neaktívny</span>
              <span>Posledná služba</span>
              <span></span>
            </div>
            {AT_RISK_CLIENTS.map(c => {
              const amber = c.weeksInactive >= 10 && c.weeksInactive <= 12;
              const red   = c.weeksInactive >= 13;
              return (
                <div key={c.name} style={{
                  display: "grid", gridTemplateColumns: "1fr 120px 100px 120px auto",
                  gap: "16px", padding: "14px 20px", alignItems: "center",
                  borderBottom: "1px solid #f3f4f6",
                  background: red ? "rgba(239,68,68,0.04)" : amber ? "rgba(245,158,11,0.05)" : "transparent",
                }}>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: DARK }}>{c.name}</span>
                  <span style={{ fontSize: "13px", color: MUTED }}>{c.lastVisit}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: red ? "#dc2626" : amber ? "#d97706" : MUTED }}>
                    {c.weeksInactive} týž.
                  </span>
                  <span style={{ fontSize: "13px", color: MUTED }}>{c.lastService}</span>
                  <button onClick={() => setWaClient(c)} style={{ padding: "7px 16px", borderRadius: "9999px", border: `1px solid ${GOLD}`, background: "transparent", color: GOLD, fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Poslať správu
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── AI Insight ─────────────────────────────────────────────────────── */}
        <div style={{
          background: `linear-gradient(135deg, rgba(200,146,42,0.08) 0%, rgba(200,146,42,0.03) 100%)`,
          border: `1px solid rgba(200,146,42,0.25)`,
          borderRadius: "20px", padding: "28px 32px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div style={{ fontSize: "28px", flexShrink: 0 }}>💡</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, marginBottom: "8px" }}>
                AI odporúčanie dnes
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 400, color: DARK, lineHeight: 1.55, margin: 0 }}>
                {insight}
              </p>
            </div>
          </div>
        </div>

        {/* ── Google Reviews ─────────────────────────────────────────────────── */}
        <div>
          <SectionHeading title="Posledné Google recenzie" sub="AI odpovede odoslané automaticky" />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {REVIEWS.map(r => (
              <div key={r.name} style={{ background: "#fff", borderRadius: "16px", padding: "20px 24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `rgba(200,146,42,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 600, color: GOLD }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: DARK }}>{r.name}</div>
                      <div style={{ fontSize: "11px", color: MUTED }}>{r.date}</div>
                    </div>
                  </div>
                  <div style={{ color: GOLD, letterSpacing: "2px" }}>{"★".repeat(r.rating)}</div>
                </div>
                <p style={{ fontSize: "13px", color: DARK, lineHeight: 1.6, margin: "0 0 12px" }}>{r.text}</p>
                <div style={{ background: "rgba(200,146,42,0.06)", borderRadius: "10px", padding: "10px 14px", border: "1px solid rgba(200,146,42,0.12)" }}>
                  <div style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: "4px" }}>✅ AI odpoveď odoslaná</div>
                  <div style={{ fontSize: "13px", color: MUTED, lineHeight: 1.5 }}>
                    Ďakujeme, {r.name.split(" ")[0]}! Tešíme sa na vašu ďalšiu návštevu. 🌸
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* WhatsApp modal */}
      {waClient && <WaModal client={waClient} onClose={() => setWaClient(null)} />}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked
    ? <Dashboard />
    : <PinScreen onUnlock={() => setUnlocked(true)} />;
}
