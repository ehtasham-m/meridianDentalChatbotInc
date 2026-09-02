"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { EQUIPMENT } from "@/lib/constants/journey";
import { cn } from "@/lib/utils";

export function Technology() {
  const [active, setActive] = useState(EQUIPMENT[0]!.name);
  const current = EQUIPMENT.find((e) => e.name === active) ?? EQUIPMENT[0]!;
  const Icon = current.icon;

  return (
    <SectionWrapper id="technology" tone="surface">
      <SectionHeading
        eyebrow="Technology"
        title="The equipment behind every plan."
        description="Diagnostics most patients never see decide how precise, and how comfortable, their treatment turns out to be."
      />

      <Tabs.Root value={active} onValueChange={setActive} orientation="vertical">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Tabs.List className="flex flex-col gap-1" aria-label="Clinic technology">
            {EQUIPMENT.map((item) => (
              <Tabs.Trigger
                key={item.name}
                value={item.name}
                className={cn(
                  "group flex items-start gap-4 rounded-xl2 border px-5 py-4 text-left transition-all duration-300 ease-premium",
                  active === item.name
                    ? "border-navy-700/15 bg-warm-100 shadow-card"
                    : "border-transparent hover:bg-warm-100/60"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    active === item.name
                      ? "bg-navy-700 text-mint-500"
                      : "bg-surface text-ink-muted"
                  )}
                >
                  <item.icon size={16} />
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-navy-700">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-ink-muted">
                    {item.year}
                  </span>
                </span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="relative min-h-[380px] overflow-hidden rounded-xl3 border border-line bg-gradient-to-br from-navy-700 to-navy-900 p-10 text-warm-100 md:p-14">
            <ArcDivider
              className="absolute -bottom-6 left-1/2 h-40 w-[140%] -translate-x-1/2 opacity-20"
              color="#4FBF98"
            />
            {/* Scan sweep */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-10 h-px bg-gradient-to-r from-transparent via-mint-500 to-transparent"
              animate={{ top: ["18%", "82%", "18%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col justify-between"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-warm-100/20 bg-warm-100/10 backdrop-blur">
                  <Icon size={24} className="text-mint-500" />
                </div>
                <div>
                  <p className="eyebrow text-mint-500">{current.year}</p>
                  <h3 className="mt-3 font-display text-2xl font-medium">{current.name}</h3>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-warm-100/70">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Tabs.Root>
    </SectionWrapper>
  );
}
