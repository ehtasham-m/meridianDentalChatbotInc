"use client";

import React from "react";
import {
  CalendarPlus,
  Sparkles,
  Users,
  CreditCard,
  Clock,
  ShieldAlert,
  PhoneCall,
} from "lucide-react";

interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_OPTIONS = [
  {
    label: "Book Appointment",
    query: "I would like to book an appointment.",
    icon: CalendarPlus,
  },
  {
    label: "Our Services",
    query: "What dental treatments and services do you offer?",
    icon: Sparkles,
  },
  {
    label: "Meet Doctors",
    query: "Tell me about the doctors and specialists at smile360.",
    icon: Users,
  },
  {
    label: "Pricing & Plans",
    query: "What are your procedure prices and instalment plans?",
    icon: CreditCard,
  },
  {
    label: "Opening Hours",
    query: "What are your clinic opening hours and days?",
    icon: Clock,
  },
  {
    label: "Insurance",
    query: "Do you accept health insurance or corporate panels?",
    icon: ShieldAlert,
  },
  {
    label: "Contact Clinic",
    query: "How can I contact smile360 Dental Studio or call in an emergency?",
    icon: PhoneCall,
  },
];

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-1.5 px-4 py-2 border-t border-line/60 bg-warm-100/60 backdrop-blur-sm">
      <span className="w-full text-[11px] font-medium tracking-wider uppercase text-clinical-600 mb-0.5">
        Quick Inquiries
      </span>
      {QUICK_OPTIONS.map((opt) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt.query)}
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-700/15 bg-warm-100 px-3 py-1.5 text-[12.5px] font-medium text-navy-700 shadow-sm transition-all duration-200 hover:border-mint-500 hover:bg-mint-50 hover:text-navy-900 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
          >
            <Icon size={13} className="text-clinical-500" />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
