"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  CalendarCheck2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ChatMessageItem } from "./ChatContext";
import { SITE } from "@/lib/constants/site";

interface ChatMessageProps {
  message: ChatMessageItem;
}

// Simple parser for bold and line breaks in assistant replies without external markdown runtime dependency
function formatMessageContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, lineIdx) => {
    // Check if line is a bullet point
    const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
    const cleanLine = isBullet ? line.trim().substring(2) : line;

    // Parse bold text **bold**
    const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

    const renderedParts = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className="font-semibold text-navy-700">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <li key={lineIdx} className="ml-4 list-disc text-[13.5px] leading-relaxed my-0.5">
          {renderedParts}
        </li>
      );
    }

    if (!cleanLine.trim()) {
      return <div key={lineIdx} className="h-2" />;
    }

    return (
      <p key={lineIdx} className="text-[13.5px] leading-relaxed my-1">
        {renderedParts}
      </p>
    );
  });
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full flex-col ${
        isUser ? "items-end" : "items-start"
      } my-2 px-3`}
    >
      <div className="flex items-start gap-2 max-w-[88%]">
        {!isUser && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-700 text-mint mt-0.5 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                stroke="#4FBF98"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        <div
          className={`relative rounded-2xl px-4 py-3 text-[14px] shadow-sm ${
            isUser
              ? "rounded-tr-xs bg-navy-700 text-warm-100 selection:bg-mint-500 selection:text-navy-900"
              : "rounded-tl-xs border border-line bg-warm-100 text-ink"
          }`}
        >
          <div className="break-words">{formatMessageContent(message.content)}</div>

          {/* Action cards for structured responses */}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 flex flex-col gap-2 border-t border-line/70 pt-2.5">
              {message.actions.map((act, idx) => {
                if (act.type === "appointment_received") {
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-mint-200 bg-mint-50/70 p-3 text-ink"
                    >
                      <div className="flex items-center gap-1.5 text-mint-700 font-medium text-[13px]">
                        <CheckCircle2 size={16} />
                        <span>Request Recorded</span>
                      </div>
                      {act.appointmentId && (
                        <p className="mt-1 font-mono text-[11px] text-ink-muted">
                          Reference: <span className="font-semibold text-navy-700">{act.appointmentId}</span>
                        </p>
                      )}
                      <p className="mt-1 text-[12px] text-ink-muted leading-tight">
                        Our front desk will call within one business day to finalize the appointment slot.
                      </p>
                    </div>
                  );
                }

                if (act.type === "navigate" && act.path) {
                  return (
                    <Link
                      key={idx}
                      href={act.path}
                      className="inline-flex items-center justify-between rounded-lg border border-clinical-200 bg-clinical-50 px-3 py-2 text-[12.5px] font-medium text-clinical-600 transition-colors hover:bg-clinical-200/50"
                    >
                      <span className="flex items-center gap-1.5">
                        <CalendarCheck2 size={14} />
                        {act.label || `Go to ${act.path}`}
                      </span>
                      <ExternalLink size={12} />
                    </Link>
                  );
                }

                if (act.type === "contact_fallback") {
                  return (
                    <div key={idx} className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={SITE.phoneHref}
                        className="inline-flex items-center gap-1.5 rounded-full border border-navy-700/20 bg-warm-100 px-3 py-1.5 text-[12px] font-medium text-navy-700 hover:bg-navy-700 hover:text-warm-100 transition-colors"
                      >
                        <Phone size={12} />
                        Call {SITE.phoneDisplay}
                      </a>
                      <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-mint-600/30 bg-mint-50 px-3 py-1.5 text-[12px] font-medium text-mint-700 hover:bg-mint-600 hover:text-warm-100 transition-colors"
                      >
                        <MessageCircle size={12} />
                        WhatsApp Us
                      </a>
                      <a
                        href={`tel:${SITE.emergencyLine}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-600 hover:text-warm-100 transition-colors"
                      >
                        <ShieldCheck size={12} />
                        Emergency Line
                      </a>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>
      </div>
      <span className="mt-1 px-9 text-[10.5px] text-ink-faint">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
