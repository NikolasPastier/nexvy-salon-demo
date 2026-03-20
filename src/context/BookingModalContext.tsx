"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────
interface ToastState {
  message: string;
  type: "success" | "error";
}

interface ModalContextValue {
  isOpen: boolean;
  initialServiceId: string | undefined;
  preferredStylist: string | undefined;
  openModal: (serviceId?: string, stylistName?: string) => void;
  closeModal: () => void;
  toast: ToastState | null;
  showToast: (message: string, type: "success" | "error") => void;
}

// ─── Context ──────────────────────────────────────────────
const ModalContext = createContext<ModalContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────
export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialServiceId, setInitialServiceId] = useState<string | undefined>();
  const [preferredStylist, setPreferredStylist] = useState<string | undefined>();
  const [toast, setToast] = useState<ToastState | null>(null);

  const openModal = (serviceId?: string, stylistName?: string) => {
    setInitialServiceId(serviceId);
    setPreferredStylist(stylistName);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, initialServiceId, preferredStylist, openModal, closeModal, toast, showToast }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────
export function useBookingModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within BookingModalProvider");
  return ctx;
}
