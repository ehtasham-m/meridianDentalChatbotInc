"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { JOURNEY_STAGES } from "@/lib/constants/journey";

export function PatientJourney() {
  return (
    <SectionWrapper id="journey" tone="navy">
      <SectionHeading
        eyebrow="Patient Journey"
        title="Six stages. One clinician, throughout."
        description="The same structured path for every case, from the first call to the follow-up visit that confirms healing is on track."
        light
      />

      <div className="relative">
        <ArcDivider
          className="absolute left-0 top-6 hidden h-24 w-full opacity-[0.15] lg:block"
          color="#4FBF98"
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-0">
          {JOURNEY_STAGES.map((stage, i) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-start"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-mint-500/30 bg-warm-100/5 backdrop-blur">
                <stage.icon size={20} className="text-mint-500" />
              </div>
              <span className="eyebrow text-warm-100/40">Step {stage.step}</span>
              <h3 className="mt-2 font-display text-[17px] font-medium text-warm-100">
                {stage.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-warm-100/60">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
