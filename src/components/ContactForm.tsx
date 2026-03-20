"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import config from "../../content/site-config.json";

const fieldClass =
  "w-full bg-transparent border-b border-outline-variant/30 py-3 font-body text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:border-primary-container transition-colors duration-200";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const { showToast } = useBookingModal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(config.business.booking.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          ...form,
          salon: config.business.name,
        }),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      showToast("Správa odoslaná! Ozveme sa vám čoskoro.", "success");
    } catch {
      showToast("Niečo sa pokazilo. Skúste to znova alebo nám zavolajte.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <Field label="Meno a priezvisko *">
        <input
          type="text" name="name" value={form.name}
          onChange={handleChange} required autoComplete="name"
          className={fieldClass} placeholder="Ján Novák"
        />
      </Field>
      <Field label="E-mail *">
        <input
          type="email" name="email" value={form.email}
          onChange={handleChange} required autoComplete="email"
          className={fieldClass} placeholder="jan@example.sk"
        />
      </Field>
      <Field label="Správa *">
        <textarea
          name="message" value={form.message}
          onChange={handleChange} required rows={5}
          className={`${fieldClass} resize-none`}
          placeholder="Vaša správa alebo otázka…"
        />
      </Field>
      <button
        type="submit" disabled={loading}
        className="bg-primary-container text-on-primary font-label font-bold uppercase tracking-widest text-sm flex items-center justify-center min-h-[52px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed rounded-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />Odosielam…
          </span>
        ) : "Odoslať správu"}
      </button>
    </form>
  );
}
