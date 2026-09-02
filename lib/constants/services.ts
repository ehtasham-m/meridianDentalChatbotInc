import {
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Layers,
  Activity,
  Baby,
  Sun,
  Compass,
} from "lucide-react";
import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    slug: "preventive-general",
    name: "Preventive & General Care",
    icon: ShieldCheck,
    description:
      "Routine exams built around early detection, not just cleanup. Digital diagnostics catch problems while they're still simple to fix.",
    benefits: [
      "Digital X-rays, 90% less radiation",
      "Same-visit findings review",
      "Personalised risk plan",
    ],
    durationMinutes: 40,
    priceFrom: 3500,
    priceTo: 6000,
  },
  {
    slug: "smile-design",
    name: "Smile Design & Cosmetic",
    icon: Sparkles,
    description:
      "Veneers, bonding and whitening planned on a digital mock-up of your own face before a single tooth is touched.",
    benefits: [
      "Preview your result digitally",
      "Porcelain & composite options",
      "Matched to your facial proportions",
    ],
    durationMinutes: 90,
    priceFrom: 25000,
    priceTo: 120000,
  },
  {
    slug: "clear-aligners",
    name: "Clear Aligner Orthodontics",
    icon: RefreshCw,
    description:
      "Straighten without the metal. A full 3D-scanned treatment plan shows you the final result before you commit.",
    benefits: [
      "No physical impressions",
      "Removable, near-invisible trays",
      "Progress tracked every 6 weeks",
    ],
    durationMinutes: 45,
    priceFrom: 180000,
    priceTo: 350000,
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    icon: Layers,
    description:
      "Guided implant placement planned on 3D imaging for sub-millimetre accuracy and a faster, calmer recovery.",
    benefits: [
      "CBCT-guided placement",
      "Titanium & zirconia options",
      "5-year structural warranty",
    ],
    durationMinutes: 75,
    priceFrom: 90000,
    priceTo: 150000,
  },
  {
    slug: "root-canal",
    name: "Root Canal Therapy",
    icon: Activity,
    description:
      "Microscope-assisted endodontics most patients describe as no worse than a filling. Same-day pain relief, always.",
    benefits: [
      "Operating-microscope precision",
      "Single-visit for most cases",
      "Rotary instrumentation, less trauma",
    ],
    durationMinutes: 65,
    priceFrom: 15000,
    priceTo: 35000,
  },
  {
    slug: "pediatric",
    name: "Pediatric Dentistry",
    icon: Baby,
    description:
      "A dedicated children's room and a slower pace, so a first dental visit becomes a good memory instead of a battle.",
    benefits: [
      "Child-paced appointments",
      "Sedation-free behaviour approach",
      "Parent present throughout",
    ],
    durationMinutes: 30,
    priceFrom: 3000,
    priceTo: 8000,
  },
  {
    slug: "whitening",
    name: "Teeth Whitening",
    icon: Sun,
    description:
      "In-studio and take-home systems calibrated to lift years of staining without the sensitivity of over-the-counter kits.",
    benefits: [
      "Shade-matched, gradual result",
      "Sensitivity-managed formula",
      "Take-home maintenance kit",
    ],
    durationMinutes: 50,
    priceFrom: 12000,
    priceTo: 25000,
  },
  {
    slug: "full-mouth",
    name: "Full Mouth Rehabilitation",
    icon: Compass,
    description:
      "For complex, long-neglected cases: a single coordinated plan across implants, crowns and bite correction.",
    benefits: [
      "One plan, one clinical lead",
      "Staged over manageable visits",
      "Bite function fully restored",
    ],
    durationMinutes: 120,
    priceFrom: 300000,
    priceTo: 800000,
  },
];
