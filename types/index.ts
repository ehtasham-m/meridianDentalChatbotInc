import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
  durationMinutes: number;
  priceFrom: number;
  priceTo: number;
}

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  credentials: string[];
  experienceYears: number;
  languages: string[];
  bio: string;
  focus: string[];
  // initials: string;
  image: string;
}

export interface Testimonial {
  name: string;
  treatment: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  initials: string;
  hasVideo?: boolean;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  priceFrom: number;
  featured?: boolean;
  includes: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Appointments" | "Pricing & Insurance" | "Treatments";
}

export interface JourneyStage {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string;
}

export interface EquipmentItem {
  name: string;
  description: string;
  icon: LucideIcon;
  year: string;
}
