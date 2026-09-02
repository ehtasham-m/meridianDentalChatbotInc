"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  RotateCcw,
  Send,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./ChatContext";
import { ChatMessage } from "./ChatMessage";
import { QuickReplies } from "./QuickReplies";
import { SITE } from "@/lib/constants/site";

export function ChatWindow() {
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    sendMessage,
    clearChat,
  } = useChat();

  const [input, setInput] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input;
    setInput("");
    await sendMessage(query);
  };

  const handleQuickSelect = (query: string) => {
    sendMessage(query);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-24 right-4 z-50 flex h-[580px] max-h-[85vh] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-line/80 bg-warm-100 shadow-2xl backdrop-blur-xl lg:bottom-6 lg:right-6"
        role="dialog"
        aria-label="smile360 Virtual Receptionist Chat"
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-line bg-navy-700 px-4 py-3.5 text-warm-100">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 border border-white/10 shadow-inner">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                  stroke="#4FBF98"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-mint-500 ring-2 ring-navy-700" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-[14.5px] font-medium tracking-tight text-warm-100">
                  {SITE.shortName} Receptionist
                </h3>
                <Sparkles size={13} className="text-mint-500" />
              </div>
              <p className="text-[11.5px] text-warm-100/70">
                Precision Care • Live Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="Reset conversation"
              aria-label="Reset conversation"
              className="flex h-8 w-8 items-center justify-center rounded-full text-warm-100/70 transition-colors hover:bg-white/10 hover:text-warm-100"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-warm-100/70 transition-colors hover:bg-white/10 hover:text-warm-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick Contact Ribbon */}
        <div className="flex items-center justify-between border-b border-line bg-surface-soft px-3.5 py-1.5 text-[11.5px] text-ink-muted">
          <span className="font-medium">Direct Assistance:</span>
          <div className="flex items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1 font-medium text-navy-700 hover:text-clinical-600 transition-colors"
            >
              <Phone size={11} />
              Call
            </a>
            <span className="text-line">•</span>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-mint-700 hover:text-mint-600 transition-colors"
            >
              <MessageCircle size={11} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-2 bg-warm/40">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex items-start gap-2 my-2 px-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-700 text-mint mt-0.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                    stroke="#4FBF98"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="rounded-2xl rounded-tl-xs border border-line bg-warm-100 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-700/40" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-700/60 [animation-delay:0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-navy-700/80 [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {showQuickReplies && (
          <QuickReplies onSelect={handleQuickSelect} disabled={isLoading} />
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="border-t border-line bg-warm-100 p-3"
        >
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about treatments, doctors, appointments..."
              disabled={isLoading}
              className="h-11 w-full rounded-full border border-line bg-surface-soft pl-4 pr-12 text-[13.5px] text-ink placeholder:text-ink-faint focus:border-navy-700 focus:bg-warm-100 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-mint-500 text-navy-900 shadow-sm transition-transform hover:bg-mint-600 disabled:opacity-40 disabled:hover:bg-mint-500 active:scale-95"
            >
              <Send size={14} />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between px-2 text-[10.5px] text-ink-faint">
            <span>AI Virtual Receptionist • Not medical advice</span>
            <button
              type="button"
              onClick={() => setShowQuickReplies((v) => !v)}
              className="text-clinical-600 hover:underline"
            >
              {showQuickReplies ? "Hide Topics" : "Show Topics"}
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
