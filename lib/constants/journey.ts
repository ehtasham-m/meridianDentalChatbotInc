import {
  CalendarCheck,
  Stethoscope,
  ScanLine,
  Activity,
  HeartHandshake,
  RefreshCw,
  Scan,
  Microscope,
  MonitorSmartphone,
  Wind,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { JourneyStage, EquipmentItem } from "@/types";

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: 1,
    title: "Booking",
    description:
      "Book online or by phone in under two minutes. You'll choose your doctor, treatment area, and a time that fits your week.",
    icon: CalendarCheck,
  },
  {
    step: 2,
    title: "Consultation",
    description:
      "An unhurried first conversation about what's bothering you and what you want — before any equipment comes out.",
    icon: Stethoscope,
  },
  {
    step: 3,
    title: "Diagnosis & Planning",
    description:
      "Digital scans build a precise picture of your case. For cosmetic and complex work, you see a preview of the outcome.",
    icon: ScanLine,
  },
  {
    step: 4,
    title: "Treatment",
    description:
      "Procedures are performed by the clinician who planned your case, with pain management discussed and agreed in advance.",
    icon: Activity,
  },
  {
    step: 5,
    title: "Recovery",
    description:
      "Clear, written aftercare instructions and a direct line to your clinician if anything feels off in the days after.",
    icon: HeartHandshake,
  },
  {
    step: 6,
    title: "Follow-up",
    description:
      "A scheduled check to confirm healing and results are on track — not left to you to chase down.",
    icon: RefreshCw,
  },
];

export const EQUIPMENT: EquipmentItem[] = [
  {
    name: "Intraoral 3D Scanner",
    description:
      "Replaces the old impression tray with a digital scan of your teeth in under three minutes — no gag-inducing putty.",
    icon: Scan,
    year: "Standard on every scan",
  },
  {
    name: "CBCT 3D Imaging",
    description:
      "A single low-dose scan maps bone density and nerve position in three dimensions, essential for guided implant surgery.",
    icon: MonitorSmartphone,
    year: "Surgical planning",
  },
  {
    name: "Operating Microscope",
    description:
      "Root canal and micro-restorative work performed under 20x magnification, well beyond what the eye alone can resolve.",
    icon: Microscope,
    year: "Endodontics",
  },
  {
    name: "Digital Smile Design",
    description:
      "Your face, scan, and photos combined into a preview of your finished smile — reviewed together before treatment starts.",
    icon: Sparkles,
    year: "Cosmetic planning",
  },
  {
    name: "Soft-Tissue Diode Laser",
    description:
      "Used for gum contouring and minor soft-tissue procedures with less bleeding and faster healing than a scalpel.",
    icon: Wind,
    year: "Periodontics",
  },
  {
    name: "Class B Sterilisation",
    description:
      "Every instrument is autoclaved to Class B hospital standard between patients — the highest sterilisation class in dentistry.",
    icon: ShieldCheck,
    year: "Every visit",
  },
];
