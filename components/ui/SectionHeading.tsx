"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 md:mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn("max-w-2xl", align === "center" && "max-w-3xl")}
      >
        <span
          className={cn(
            "eyebrow mb-4 block",
            light && "text-mint-500"
          )}
        >
          {eyebrow}
        </span>
        <h2
          className={cn(
            "text-fluid-h2 font-display font-medium leading-[1.08] tracking-tightest text-balance",
            light ? "text-warm-100" : "text-navy-700"
          )}
          style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.25rem)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-5 text-[17px] leading-relaxed",
              light ? "text-warm-100/70" : "text-ink-muted"
            )}
          >
            {description}
          </p>
        )}
      </motion.div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
