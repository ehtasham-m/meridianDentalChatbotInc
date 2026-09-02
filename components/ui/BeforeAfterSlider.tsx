"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className,
}: BeforeAfterSliderProps) {
// export function BeforeAfterSlider({ className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(100, Math.max(0, raw)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5));
    if (e.key === "Home") setPercent(0);
    if (e.key === "End") setPercent(100);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl3",
        className
      )}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Before layer (full) */}
<div className="absolute inset-0">
  <Image
    src={beforeImage}
    alt="Before treatment"
    fill
    className="object-cover"
  />

  <span className="absolute left-4 top-4 rounded-full bg-navy-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-eyebrow text-warm-100/80 backdrop-blur">
    Before
  </span>
</div>
      {/* After layer (clipped) */}
<div
  className="absolute inset-0"
  style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
>
  <Image
    src={afterImage}
    alt="After treatment"
    fill
    className="object-cover"
  />
        <span className="absolute right-4 top-4 rounded-full bg-warm-100/80 px-3 py-1 text-[11px] font-medium uppercase tracking-eyebrow text-navy-700 backdrop-blur">
          After
        </span>
      </div>

      {/* Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        style={{ left: `${percent}%` }}
        className="absolute top-0 h-full w-0.5 -translate-x-1/2 cursor-ew-resize bg-warm-100/90"
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-warm-100 text-navy-700 shadow-card-hover">
          <ChevronsLeftRight size={16} />
        </div>
      </div>
    </div>
  );
}
