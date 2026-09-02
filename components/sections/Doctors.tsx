"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Languages, Award, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DOCTORS } from "@/lib/constants/doctors";
import type { Doctor } from "@/types";
import Image from "next/image";

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col overflow-hidden rounded-xl3 border border-line bg-warm-100 text-left transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:shadow-card-hover"
      >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900">
        <Image
        src={doctor.image}
        alt={doctor.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[17px] font-medium text-navy-700">{doctor.name}</h3>
          <p className="mt-1 text-[13.5px] text-clinical-600">{doctor.title}</p>
          <div className="mt-4 flex items-center gap-4 text-[12.5px] text-ink-muted">
            <span>{doctor.experienceYears} yrs experience</span>
            <span className="flex items-center gap-1">
              <Languages size={12} />
              {doctor.languages.length} languages
            </span>
          </div>
          <span className="mt-5 flex items-center gap-1 text-[13.5px] font-medium text-navy-700">
            View profile
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </motion.button>

      <Modal open={open} onOpenChange={setOpen} title={doctor.name}>
        <p className="text-[13.5px] font-medium text-clinical-600">{doctor.title}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {doctor.credentials.map((c) => (
            <Badge key={c} variant="outline">
              <Award size={12} />
              {c}
            </Badge>
          ))}
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">{doctor.bio}</p>
        <div className="mt-6 grid grid-cols-2 gap-5 rounded-xl2 bg-surface px-5 py-4">
          <div>
            <p className="text-[12px] text-ink-muted">Experience</p>
            <p className="text-[14.5px] font-medium text-navy-700">{doctor.experienceYears} years</p>
          </div>
          <div>
            <p className="text-[12px] text-ink-muted">Languages</p>
            <p className="text-[14.5px] font-medium text-navy-700">{doctor.languages.join(", ")}</p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-[12px] text-ink-muted">Clinical focus</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {doctor.focus.map((f) => (
              <Badge key={f} variant="mint">
                {f}
              </Badge>
            ))}
          </div>
        </div>
        <Button href={`/appointment?doctor=${doctor.slug}`} className="mt-7 w-full">
          Book with {doctor.name.split(" ")[1]}
        </Button>
      </Modal>
    </>
  );
}

export function Doctors() {
  return (
    <SectionWrapper id="doctors" tone="warm">
      <SectionHeading
        eyebrow="Our Doctors"
        title="One clinician owns your case, every time."
        description="Four specialists, each responsible for their own patients from consultation through follow-up — never handed off mid-treatment."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DOCTORS.map((doctor, i) => (
          <DoctorCard key={doctor.slug} doctor={doctor} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
