"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { SITE } from "@/lib/constants/site";

export interface ChatAction {
  type: string;
  path?: string;
  label?: string;
  phone?: string;
  whatsapp?: string;
  appointmentId?: string;
  details?: Record<string, unknown>;
}

export interface ChatMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  actions?: ChatAction[];
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  messages: ChatMessageItem[];
  isLoading: boolean;
  unreadCount: number;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  startAppointmentFlow: (service?: string, doctor?: string) => void;
}

const INITIAL_MESSAGE: ChatMessageItem = {
  id: "initial-greeting",
  role: "assistant",
  content: `Hi! I'm the **${SITE.shortName}** virtual receptionist. I can help you explore our treatments, find the right doctor, check prices, or start an appointment request. How can I help you today?`,
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY = "smile360_chat_messages_v1";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Restore messages from sessionStorage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
      }
      return next;
    });
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare message history to send to server
      const currentHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentHistory }),
      });

      if (!res.ok) {
        throw new Error("Chat service returned error status");
      }

      const data = await res.json();

      const assistantMessage: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.text || "Thank you. Is there anything else I can assist you with?",
        createdAt: new Date().toISOString(),
        actions: data.clientActions || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
      const fallbackMessage: ChatMessageItem = {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        content: `I'm having trouble connecting right now. Please call ${SITE.shortName} at ${SITE.phoneDisplay} or WhatsApp us at ${SITE.whatsappDisplay}.`,
        createdAt: new Date().toISOString(),
        actions: [
          { type: "contact_fallback", phone: SITE.phoneDisplay, whatsapp: SITE.whatsappDisplay },
        ],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, isOpen]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `initial-greeting-${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
    ]);
    setUnreadCount(0);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const startAppointmentFlow = useCallback((service?: string, doctor?: string) => {
    setIsOpen(true);
    setUnreadCount(0);
    let prompt = "I would like to book an appointment";
    if (service) prompt += ` for ${service}`;
    if (doctor) prompt += ` with Dr. ${doctor}`;
    sendMessage(prompt);
  }, [sendMessage]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleOpen,
        messages,
        isLoading,
        unreadCount,
        sendMessage,
        clearChat,
        startAppointmentFlow,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
