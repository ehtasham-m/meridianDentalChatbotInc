import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "warm" | "surface" | "navy";
}

const toneClasses: Record<NonNullable<SectionWrapperProps["tone"]>, string> = {
  warm: "bg-warm",
  surface: "bg-surface",
  navy: "bg-navy-700 text-warm-100",
};

export function SectionWrapper({
  id,
  children,
  className,
  tone = "warm",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 md:py-32",
        toneClasses[tone],
        className
      )}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}
