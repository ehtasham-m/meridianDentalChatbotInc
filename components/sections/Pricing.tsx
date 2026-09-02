"use client";

import { motion } from "framer-motion";
import { Check, Wallet, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  PRICING_PLANS,
  PRICE_TABLE,
  FINANCING_NOTE,
  INSURANCE_NOTE,
} from "@/lib/constants/pricing";

export function Pricing() {
  return (
    <SectionWrapper id="pricing" tone="warm">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent pricing, agreed before you start."
        description="Every quote is written down and confirmed before treatment begins — nothing is billed that wasn't agreed to first."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex flex-col rounded-xl3 border p-8",
              plan.featured
                ? "border-navy-700 bg-navy-700 text-warm-100 shadow-card-hover lg:-translate-y-3"
                : "border-line bg-warm-100"
            )}
          >
            {plan.featured && (
              <span className="mb-4 inline-flex w-fit items-center rounded-full bg-mint-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-eyebrow text-navy-700">
                Most planned
              </span>
            )}
            <h3 className={cn("font-display text-xl font-medium", plan.featured ? "text-warm-100" : "text-navy-700")}>
              {plan.name}
            </h3>
            <p className={cn("mt-1.5 text-[13.5px]", plan.featured ? "text-warm-100/65" : "text-ink-muted")}>
              {plan.tagline}
            </p>
            <p className={cn("mt-6 font-display text-3xl font-medium", plan.featured ? "text-warm-100" : "text-navy-700")}>
              PKR {plan.priceFrom.toLocaleString()}
              <span className={cn("text-sm font-body font-normal", plan.featured ? "text-warm-100/60" : "text-ink-muted")}>
                {" "}starting
              </span>
            </p>
            <ul className="mt-7 flex flex-1 flex-col gap-3">
              {plan.includes.map((inc) => (
                <li
                  key={inc}
                  className={cn(
                    "flex items-start gap-2.5 text-[14px]",
                    plan.featured ? "text-warm-100/85" : "text-ink"
                  )}
                >
                  <Check size={16} className={cn("mt-0.5 shrink-0", plan.featured ? "text-mint-500" : "text-mint-600")} />
                  {inc}
                </li>
              ))}
            </ul>
            <Button
              href="/appointment"
              variant={plan.featured ? "primary" : "outline"}
              className="mt-8 w-full"
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h3 className="mb-6 font-display text-lg font-medium text-navy-700">
            Procedure price list
          </h3>
          <div className="overflow-hidden rounded-xl2 border border-line">
            {PRICE_TABLE.map((row, i) => (
              <div
                key={row.procedure}
                className={cn(
                  "flex items-center justify-between px-6 py-4 text-[14.5px]",
                  i % 2 === 1 && "bg-surface"
                )}
              >
                <span className="text-ink">{row.procedure}</span>
                <span className="font-medium text-navy-700">{row.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-xl2 border border-line bg-warm-100 p-6">
            <Wallet size={20} className="text-mint-600" />
            <p className="mt-3 font-display text-[15px] font-medium text-navy-700">Financing</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{FINANCING_NOTE}</p>
          </div>
          <div className="rounded-xl2 border border-line bg-warm-100 p-6">
            <ShieldCheck size={20} className="text-mint-600" />
            <p className="mt-3 font-display text-[15px] font-medium text-navy-700">Insurance</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{INSURANCE_NOTE}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
