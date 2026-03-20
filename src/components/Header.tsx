"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import config from "../../content/site-config.json";
import { useBookingModal } from "@/context/BookingModalContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useBookingModal();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">

        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-xl font-black tracking-tighter text-on-surface shrink-0"
        >
          {config.business.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {config.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "font-label uppercase tracking-widest text-xs transition-colors",
                  active
                    ? "text-primary-container border-b border-primary-container pb-0.5"
                    : "text-on-surface hover:text-primary-container",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            className="font-label text-sm text-on-surface-variant hover:text-primary-container transition-colors"
          >
            {config.business.contacts.phone}
          </a>
          <button
            onClick={() => openModal()}
            className="bg-primary-container text-on-primary px-6 font-label font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all flex items-center min-h-[44px] rounded-[24px]"
          >
            Objednať sa
          </button>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => openModal()}
            className="bg-primary-container text-on-primary px-5 font-label font-bold uppercase tracking-widest text-xs flex items-center min-h-[40px] rounded-[24px]"
          >
            Objednať sa
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-on-surface p-2 -mr-2"
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-surface-container-low border-t border-surface-container px-6 py-8 flex flex-col gap-6">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-label uppercase tracking-widest text-sm text-on-surface hover:text-primary-container transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${config.business.contacts.phone.replace(/\s/g, "")}`}
            className="font-label text-sm text-primary-container mt-2"
          >
            {config.business.contacts.phone}
          </a>
        </div>
      )}
    </header>
  );
}
