import type { Doctor } from "@/types";

export const DOCTORS: Doctor[] = [
  {
    slug: "ayesha-raza",
    name: "Dr. Ayesha Raza",
    title: "Clinical Director & Lead Prosthodontist",
    credentials: ["BDS", "FCPS (Prosthodontics)"],
    experienceYears: 16,
    languages: ["Urdu", "English", "Punjabi"],
    // initials: "AR",
    image: "/images/doctors/lady.jpg",
    focus: ["Smile design", "Full-mouth rehabilitation", "Veneers"],
    bio: "Ayesha founded smile360 in 2011 after training in prosthodontics, convinced that reconstructive dentistry didn't have to feel clinical or impersonal. She still treats complex full-mouth cases personally and leads the studio's clinical standards.",
  },
  {
    slug: "bilal-farooqi",
    name: "Dr. Bilal Farooqi",
    title: "Orthodontist",
    credentials: ["BDS", "MSc Orthodontics (UK)"],
    experienceYears: 11,
    languages: ["Urdu", "English"],
    // initials: "BF",
    image: "/images/doctors/bilal.png",

    focus: ["Clear aligners", "Adult orthodontics", "Bite correction"],
    bio: "Bilal trained in orthodontics in the UK before returning to Faisalabad to build smile360's aligner programme. He treats orthodontics as an engineering problem first — every case is planned in 3D before a single tray is made.",
  },
  {
    slug: "omar-sheikh",
    name: "Dr. Omar Sheikh",
    title: "Oral & Maxillofacial Surgeon",
    credentials: ["BDS", "FCPS (Oral Surgery)"],
    experienceYears: 13,
    languages: ["Urdu", "English"],
    // initials: "OS",
    image: "/images/doctors/omer.jpg",
    focus: ["Dental implants", "Extractions", "Guided surgery"],
    bio: "Omar leads smile360's implant and surgical practice, working from CBCT-guided plans that let him place implants with sub-millimetre accuracy. He's known among patients for explaining exactly what he's doing, step by step, in the chair.",
  },
  {
    slug: "sana-iqbal",
    name: "Dr. Sana Iqbal",
    title: "Pediatric & Preventive Dentist",
    credentials: ["BDS", "Dip. Pediatric Dentistry"],
    experienceYears: 8,
    languages: ["Urdu", "English", "Punjabi"],
    // initials: "SI",
    image: "/images/doctors/sanaa.png",

    focus: ["Children's dentistry", "Preventive care", "Sealants"],
    bio: "Sana runs smile360's children's programme, built around the idea that a calm first visit shapes a lifetime of dental habits. She works at the child's pace, with parents in the room, and no sedation for routine care.",
  },
];
