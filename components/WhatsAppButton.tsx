"use client";

import React from "react";
import { MessageSquareCode } from "lucide-react";

export default function WhatsAppButton() {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919999999999";
  const phoneNumber = num.replace(/[^0-9+]/g, "");

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=Hi%20PowerAdda,%20I'm%20interested%20in%20obtaining%20renewable%20energy%20and%20power%20backup%20solutions.`}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-floating-trigger"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact PowerAdda on WhatsApp"
    >
      <MessageSquareCode size={24} className="animate-pulse" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-sans font-bold uppercase tracking-wider transition-all duration-500 whitespace-nowrap">
        Chat with Expert
      </span>
    </a>
  );
}
