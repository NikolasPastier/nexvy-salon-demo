"use client";

import { type ButtonHTMLAttributes } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  serviceId?: string;
  stylistName?: string;
}

export default function BookingTrigger({ serviceId, stylistName, children, ...props }: Props) {
  const { openModal } = useBookingModal();
  return (
    <button onClick={() => openModal(serviceId, stylistName)} {...props}>
      {children}
    </button>
  );
}
