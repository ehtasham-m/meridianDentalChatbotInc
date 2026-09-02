import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Essential Care",
    tagline: "Checkups, cleanings, and early intervention",
    priceFrom: 3500,
    includes: [
      "Comprehensive exam & digital X-rays",
      "Professional cleaning",
      "Cavity risk assessment",
      "Written treatment roadmap",
    ],
  },
  {
    name: "Restorative",
    tagline: "Fillings, root canals, and single-tooth repair",
    priceFrom: 15000,
    featured: true,
    includes: [
      "Everything in Essential Care",
      "Microscope-assisted procedures",
      "Same-visit pain management",
      "12-month restoration warranty",
    ],
  },
  {
    name: "Complete Transformation",
    tagline: "Implants, veneers, and full-mouth planning",
    priceFrom: 90000,
    includes: [
      "Everything in Restorative",
      "Digital smile design preview",
      "Single clinical lead for your case",
      "Staged payment schedule",
    ],
  },
];

export const PRICE_TABLE = [
  { procedure: "Consultation & exam", price: "PKR 2,000 – 3,500" },
  { procedure: "Professional cleaning (scaling)", price: "PKR 3,500 – 6,000" },
  { procedure: "Composite filling", price: "PKR 4,500 – 9,000" },
  { procedure: "Root canal (single canal)", price: "PKR 15,000 – 25,000" },
  { procedure: "Porcelain veneer, per tooth", price: "PKR 25,000 – 45,000" },
  { procedure: "Clear aligners, full case", price: "PKR 180,000 – 350,000" },
  { procedure: "Dental implant, per tooth", price: "PKR 90,000 – 150,000" },
  { procedure: "In-studio whitening", price: "PKR 12,000 – 25,000" },
];

export const FINANCING_NOTE =
  "Treatment plans over PKR 50,000 can be split into monthly instalments with no markup, arranged directly with our front desk before your first procedure.";

export const INSURANCE_NOTE =
  "We coordinate directly with most major health insurance and corporate panel providers in Pakistan. Bring your policy details to your consultation and our front desk will confirm your coverage before any treatment begins.";
