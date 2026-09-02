"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Wallet } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants/services";
import { formatDuration } from "@/lib/utils";
import type { Service } from "@/types";

function formatPrice(from: number, to: number) {
  const fmt = (n: number) => `PKR ${n.toLocaleString()}`;
  return `${fmt(from)} – ${fmt(to)}`;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col rounded-xl2 border border-line bg-warm-100 p-7 transition-all duration-400 ease-premium hover:-translate-y-1.5 hover:border-navy-700/15 hover:shadow-card-hover"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clinical-50 text-clinical-600 transition-colors duration-300 group-hover:bg-navy-700 group-hover:text-mint-500">
          <Icon size={20} />
        </div>
        <h3 className="mt-5 font-display text-[19px] font-medium leading-snug text-navy-700">
          {service.name}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
          {service.description}
        </p>

        <div className="mt-6 flex items-center gap-4 border-t border-line pt-5 text-[12.5px] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {formatDuration(service.durationMinutes)}
          </span>
          <span className="flex items-center gap-1.5">
            <Wallet size={13} />
            {formatPrice(service.priceFrom, service.priceTo)}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="group/link flex items-center gap-1 text-[13.5px] font-medium text-navy-700"
          >
            <span className="border-b border-navy-700/30 group-hover/link:border-navy-700">
              Learn more
            </span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </button>
        </div>
      </motion.div>

      <Modal open={open} onOpenChange={setOpen} title={service.name}>
        <p className="text-[15px] leading-relaxed text-ink-muted">{service.description}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {service.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-ink">
              <Check size={16} className="mt-0.5 shrink-0 text-mint-600" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex items-center justify-between rounded-xl2 bg-surface px-5 py-4">
          <div>
            <p className="text-[12px] text-ink-muted">Typical duration</p>
            <p className="text-[14.5px] font-medium text-navy-700">
              {formatDuration(service.durationMinutes)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-ink-muted">Price range</p>
            <p className="text-[14.5px] font-medium text-navy-700">
              {formatPrice(service.priceFrom, service.priceTo)}
            </p>
          </div>
        </div>
        <Button href={`/appointment?service=${service.slug}`} className="mt-6 w-full">
          Book This Treatment
        </Button>
      </Modal>
    </>
  );
}

export function Services() {
  return (
    <SectionWrapper id="services" tone="warm">
      <SectionHeading
        eyebrow="Services"
        title="Every treatment, planned before it's performed."
        description="Eight core areas of care, each backed by the same digital diagnostics — so nothing is a surprise once you're in the chair."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
