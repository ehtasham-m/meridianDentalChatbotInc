"use client";

import React from "react";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./ChatContext";
import { ChatWindow } from "./ChatWindow";

export function DentalChatWidget() {
  const { isOpen, toggleOpen, unreadCount } = useChat();

  return (
    <>
      <ChatWindow />

      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 right-4 z-40 lg:bottom-6 lg:right-6">
        <motion.button
          onClick={toggleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close virtual receptionist" : "Open virtual receptionist"}
          aria-expanded={isOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-warm-100 shadow-card-hover transition-colors hover:bg-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500"
        >
          {/* Subtle pulse ring on trigger */}
          {!isOpen && (
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-mint-500/30 animate-pulse-ring" />
          )}

          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare size={24} className="text-mint-400 group-hover:text-mint-300" />
                <Sparkles
                  size={12}
                  className="absolute -top-1 -right-1 text-mint-300 animate-pulse"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unread badge indicator */}
          {!isOpen && unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mint-500 text-[11px] font-bold text-navy-900 shadow-sm"
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  );
}
