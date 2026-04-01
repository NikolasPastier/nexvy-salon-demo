"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff } from "lucide-react";
import { getVapi } from "@/lib/vapi";
import config from "../../content/site-config.json";

const ASSISTANT_ID = "24edf052-fb22-4b8f-81bf-8b8abdc1a906";
const GOLD = "#C8922A";
const DARK = "#0C0B09";

type CallState = "idle" | "connecting" | "active" | "ended";

// ─── Sound wave animation ─────────────────────────────────────────────────────

function SoundWave() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "20px" }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "9999px",
            background: GOLD,
            animation: `vapiBar 0.8s ease-in-out infinite`,
            animationDelay: `${(i - 1) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Timer ────────────────────────────────────────────────────────────────────

function useCallTimer(running: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) { setSeconds(0); return; }
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function MicToast({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: "fixed",
      bottom: "100px",
      right: "24px",
      zIndex: 9100,
      padding: "12px 18px",
      background: "#1a1a1a",
      color: "#fff",
      borderRadius: "12px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "13px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      transform: visible ? "translateY(0)" : "translateY(12px)",
      opacity: visible ? 1 : 0,
      transition: "all 0.3s",
      pointerEvents: "none",
      maxWidth: "240px",
      lineHeight: 1.5,
    }}>
      🎙️ Prosím povoľte prístup k mikrofónu
    </div>
  );
}

// ─── Widget ───────────────────────────────────────────────────────────────────

export function VapiWidget() {
  const [state, setState]       = useState<CallState>("idle");
  const [micError, setMicError] = useState(false);
  const [tooltip, setTooltip]   = useState(false);
  const timer                   = useCallTimer(state === "active");
  const endedTimer              = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Wire up vapi events once
  useEffect(() => {
    const vapi = getVapi();

    const onStart = () => setState("active");
    const onEnd   = () => {
      setState("ended");
      endedTimer.current = setTimeout(() => setState("idle"), 3000);
    };
    const onError = (e: unknown) => {
      console.error("Vapi error:", e);
      setState("idle");
    };

    vapi.on("call-start", onStart);
    vapi.on("call-end",   onEnd);
    vapi.on("error",      onError);

    return () => {
      vapi.removeListener("call-start", onStart);
      vapi.removeListener("call-end",   onEnd);
      vapi.removeListener("error",      onError);
      clearTimeout(endedTimer.current);
    };
  }, []);

  const startCall = async () => {
    if (state !== "idle") return;

    // Request mic permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setMicError(true);
      setTimeout(() => setMicError(false), 3500);
      return;
    }

    setState("connecting");
    try {
      const vapi = getVapi();
      await vapi.start(
        ASSISTANT_ID,
        {
          firstMessage: `Dobrý deň, ${config.business.name}, čím vám môžem pomôcť?`,
          variableValues: {
            business_name:  config.business.name,
            address:        config.business.contacts.address,
            services:       config.services
              .map((s) => `${s.title} (${s.price}, ${s.duration})`)
              .join(", "),
            hours_weekday:  config.business.hours.monday_friday,
            hours_saturday: config.business.hours.saturday,
            phone:          config.business.contacts.phone,
          },
        }
      );
    } catch (e) {
      console.error("Failed to start call:", e);
      setState("idle");
    }
  };

  const endCall = () => {
    getVapi().stop();
    // call-end event will handle state transition
  };

  const isIdle = state === "idle";
  const isActive = state === "active";
  const isConnecting = state === "connecting";
  const isEnded = state === "ended";

  return (
    <>
      {/* Mic error toast */}
      <MicToast visible={micError} />

      <div style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "10px",
      }}>

        {/* Expanded card — active or ended */}
        {(isActive || isConnecting || isEnded) && (
          <div style={{
            background: DARK,
            border: "1px solid rgba(200,146,42,0.25)",
            borderRadius: "20px",
            padding: "20px 24px",
            minWidth: "220px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* Status row */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {isEnded ? (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#22c55e" }}>
                  Hovor ukončený ✓
                </span>
              ) : (
                <>
                  {isActive ? <SoundWave /> : (
                    <div style={{ display: "flex", gap: "3px", alignItems: "center", height: "20px" }}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: GOLD, animation: "vapiDot 1s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#EDE8DF" }}>
                      {isConnecting ? "Pripájam..." : "Hovor prebieha..."}
                    </div>
                    {isActive && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(237,232,223,0.45)", marginTop: "2px" }}>
                        {timer}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* End call button */}
            {!isEnded && (
              <button
                onClick={endCall}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "9999px",
                  border: "none",
                  background: "#ef4444",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
              >
                <PhoneOff size={13} />
                Ukončiť hovor
              </button>
            )}
          </div>
        )}

        {/* Floating bubble */}
        {isIdle && (
          <div style={{ position: "relative" }}>
            {/* Tooltip */}
            {tooltip && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                right: 0,
                background: DARK,
                color: "#EDE8DF",
                padding: "8px 14px",
                borderRadius: "10px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                pointerEvents: "none",
              }}>
                Zavolať AI recepčnú
                <div style={{
                  position: "absolute",
                  bottom: "-5px",
                  right: "20px",
                  width: "10px",
                  height: "10px",
                  background: DARK,
                  transform: "rotate(45deg)",
                  borderRadius: "2px",
                }} />
              </div>
            )}

            <button
              onClick={startCall}
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              aria-label="Zavolať AI recepčnú"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "none",
                background: GOLD,
                color: DARK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(200,146,42,0.45)",
                animation: "vapiPulse 2.5s ease-in-out infinite",
                transition: "transform 0.2s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Phone size={22} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes vapiPulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(200,146,42,0.45); }
          50%       { box-shadow: 0 8px 36px rgba(200,146,42,0.75), 0 0 0 10px rgba(200,146,42,0.12); }
        }
        @keyframes vapiBar {
          0%, 100% { height: 6px;  }
          50%       { height: 18px; }
        }
        @keyframes vapiDot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        @media (max-width: 640px) {
          /* Nudge up so it clears mobile browser chrome + WhatsApp FAB */
          .vapi-root { bottom: 80px !important; }
        }
      `}</style>
    </>
  );
}
