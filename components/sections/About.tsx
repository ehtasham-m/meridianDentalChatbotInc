"use client";

import { motion } from "framer-motion";
import { Target, MessageSquareText, Heart, UserCheck } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SITE } from "@/lib/constants/site";

const VALUES = [
  {
    icon: Target,
    title: "Precision",
    description: "Every plan starts from a 3D scan, never a visual estimate.",
  },
  {
    icon: MessageSquareText,
    title: "Transparency",
    description: "You see cost and outcome before treatment, not after.",
  },
  {
    icon: Heart,
    title: "Comfort",
    description: "Pace is set by the patient, especially for children.",
  },
  {
    icon: UserCheck,
    title: "Continuity",
    description: "One clinician owns your case, start to follow-up.",
  },
];

const MILESTONES = [
  { year: "2011", text: "smile360 opens on MM Alam Road with two treatment rooms." },
  { year: "2015", text: "First CBCT 3D imaging suite added for guided implant surgery." },
  { year: "2019", text: "Digital Smile Design workflow introduced for cosmetic cases." },
  { year: "2023", text: "10,000th patient treated at the studio." },
  { year: String(new Date().getFullYear()), text: "Four full-time clinicians, six treatment rooms." },
];

export function About() {
  return (
    <SectionWrapper id="about" tone="surface">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <span className="eyebrow mb-5 block">About smile360</span>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] font-medium leading-[1.2] tracking-tightest text-navy-700 text-balance"
          >
            &ldquo;We think dentistry works best when it&apos;s planned like
            engineering and delivered like hospitality.&rdquo;
          </motion.blockquote>
          <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink-muted">
            Founded in {SITE.founded} by Dr. Ayesha Raza, smile360 was built
            on a simple frustration: dental treatment plans were rarely
            explained, and outcomes were rarely shown in advance. Fifteen
            years later, that&apos;s still the standard every case is held to.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <v.icon size={19} className="text-mint-600" />
                <p className="mt-3 font-display text-[15px] font-medium text-navy-700">
                  {v.title}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />
          <div className="flex flex-col gap-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-mint-500 bg-warm-100" />
                <p className="font-display text-sm font-semibold text-clinical-600">{m.year}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-navy-700">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
