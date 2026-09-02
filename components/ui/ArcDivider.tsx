"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArcDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
  strokeWidth?: number;
}

/**
 * The signature graphic device of the site: a single restrained arc,
 * reused as a hero backdrop, a section divider, a timeline connector,
 * and an avatar ring. Never filled, never literal — just one clean line.
 */
export function ArcDivider({
  className,
  color = "#4FBF98",
  flip = false,
  strokeWidth = 1.5,
}: ArcDividerProps) {
  return (
    <svg
      viewBox="0 0 400 160"
      fill="none"
      aria-hidden="true"
      className={cn("w-full", flip && "-scale-x-100", className)}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M6 150 C 120 -10, 280 -10, 394 150"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
