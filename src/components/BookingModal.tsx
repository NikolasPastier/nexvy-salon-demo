"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Loader2, CheckCircle, AlertCircle, User } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../content/site-config.json";

// ─── Constants ────────────────────────────────────────────
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

const EMPTY_FORM = { name: "", phone: "", service: "", date: "", time: "", notes: "" };

// ─── Sub-components ───────────────────────────────────────
function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const fieldClass =
  "w-full bg-transparent border-b border-outline-variant/30 py-3 font-body text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary-container transition-colors duration-200";

// ─── Toast ────────────────────────────────────────────────
export function Toast() {
  const { toast } = useBookingModal();
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div className={[
      "fixed top-4 right-4 md:top-6 md:right-6 z-[200]",
      "max-w-sm w-[calc(100vw-2rem)] md:w-auto",
      "px-5 py-4 flex items-start gap-3 toast-slide-in",
      isSuccess ? "bg-primary-container text-on-primary" : "bg-error-container text-on-error-container",
    ].join(" ")}>
      {isSuccess
        ? <CheckCircle size={18} className="shrink-0 mt-0.5" />
        : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
      <p className="font-body text-sm leading-relaxed">{toast.message}</p>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────
export default function BookingModal() {
  const { isOpen, initialServiceId, preferredStylist, closeModal, showToast } = useBookingModal();
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    if (isOpen && initialServiceId) {
      setForm((f) => ({ ...f, service: initialServiceId }));
    }
  }, [isOpen, initialServiceId]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); },
    [closeModal]
  );
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const serviceName =
        config.services.find((s) => s.id === form.service)?.title ?? form.service;

      const res = await fetch(config.business.booking.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: form.name,
          phone: form.phone,
          service: form.service,
          serviceName,
          date: form.date,
          time: form.time,
          notes: form.notes,
          ...(preferredStylist ? { preferredStylist } : {}),
          salon: config.business.name,
        }),
      });

      if (!res.ok) throw new Error("Server error");
      closeModal();
      setForm({ ...EMPTY_FORM });
      showToast("Ďakujeme! Potvrdenie dostanete na WhatsApp.", "success");
    } catch {
      showToast("Niečo sa pokazilo. Skúste to znova alebo nám zavolajte.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-surface/75 backdrop-blur-sm" onClick={closeModal} aria-hidden />

      <div role="dialog" aria-modal="true" aria-label="Rezervácia termínu"
        className="relative w-full md:max-w-lg h-full md:h-auto md:max-h-[92vh] bg-surface-container-high md:rounded-2xl flex flex-col overflow-hidden modal-enter">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-outline-variant/20 shrink-0">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface">Rezervácia termínu</h2>
            <p className="font-label text-xs uppercase tracking-widest text-primary-container mt-0.5">
              {config.business.name}
            </p>
          </div>
          <button onClick={closeModal}
            className="text-on-surface-variant hover:text-on-surface transition-colors p-2 -mr-2"
            aria-label="Zavrieť">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">

          {/* Preferred stylist badge (when pre-set from team page) */}
          {preferredStylist && (
            <div className="flex items-center gap-2 bg-primary-container/10 border border-primary-container/20 px-4 py-3">
              <User size={14} className="text-primary-container shrink-0" />
              <span className="font-label text-xs text-on-surface">
                Preferovaný stylist:{" "}
                <span className="text-primary-container font-bold">{preferredStylist}</span>
              </span>
            </div>
          )}

          <Field label="Meno a priezvisko *" htmlFor="booking-name">
            <input id="booking-name" type="text" name="name" value={form.name} onChange={handleChange}
              required autoComplete="name" className={fieldClass} placeholder="Ján Novák" />
          </Field>

          <Field label="Telefón *" htmlFor="booking-phone">
            <input id="booking-phone" type="tel" name="phone" value={form.phone} onChange={handleChange}
              required autoComplete="tel" className={fieldClass} placeholder="+421 9XX XXX XXX" />
          </Field>

          <Field label="Služba *" htmlFor="booking-service">
            <div className="relative">
              <select id="booking-service" name="service" value={form.service} onChange={handleChange}
                required className={`${fieldClass} appearance-none pr-8`}>
                <option value="" disabled>Vyberte službu…</option>
                {config.services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title} — {s.price}</option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Preferovaný dátum" htmlFor="booking-date">
              <input id="booking-date" type="date" name="date" value={form.date} onChange={handleChange}
                min={minDate} className={fieldClass} />
            </Field>
            <Field label="Preferovaný čas" htmlFor="booking-time">
              <div className="relative">
                <select id="booking-time" name="time" value={form.time} onChange={handleChange}
                  className={`${fieldClass} appearance-none pr-8`}>
                  <option value="">Vyberte čas…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronIcon />
              </div>
            </Field>
          </div>

          <Field label="Poznámky (nepovinné)" htmlFor="booking-notes">
            <textarea id="booking-notes" name="notes" value={form.notes} onChange={handleChange}
              rows={3} className={`${fieldClass} resize-none`}
              placeholder="Špeciálne požiadavky…" />
          </Field>

          <button type="submit" disabled={loading}
            className="mt-2 bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-sm flex items-center justify-center min-h-[52px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0 rounded-xl">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />Odosielam…
              </span>
            ) : "Odoslať rezerváciu"}
          </button>

          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 text-center pb-2">
            Vaše údaje spracovávame iba za účelom rezervácie.
          </p>
        </form>
      </div>
    </div>
  );
}
