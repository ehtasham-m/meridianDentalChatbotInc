"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { PlayCircle, Star, ArrowRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InitialsAvatar } from "@/components/ui/Avatar";
import { ArcDivider } from "@/components/ui/ArcDivider";
import { useCountUp } from "@/hooks/useCountUp";
import { SITE } from "@/lib/constants/site";

const headlineLines = ["Precision you can see.", "Care you can feel."];

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  const blobX = useTransform(x, [-0.5, 0.5], [-16, 16]);
  const blobY = useTransform(y, [-0.5, 0.5], [-16, 16]);
  const cardX = useTransform(x, [-0.5, 0.5], [10, -10]);
  const cardY = useTransform(y, [-0.5, 0.5], [10, -10]);
  const ringX = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    rawY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const { ref: countRef, value: satisfaction } = useCountUp(98);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative mx-auto aspect-[4/5] w-full max-w-[480px]"
    >
      {/* Ambient blurred field */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-clinical-200/50 blur-[70px]"
      />
      <motion.div
        style={{ x: useTransform(blobX, (v) => -v), y: useTransform(blobY, (v) => -v) }}
        className="absolute bottom-0 -left-10 h-64 w-64 rounded-full bg-mint-200/60 blur-[70px]"
      />

      {/* Dot grid texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" aria-hidden="true">
        <defs>
          <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#0A1F33" fillOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Core composition card */}
      <motion.div
        style={{ x: ringX }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute inset-6 rounded-xl3 border border-navy-700/10 bg-gradient-to-br from-warm-100 to-surface shadow-card-hover"
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl3">
          <ArcDivider className="absolute top-10 h-32 opacity-70" color="#2C4A66" strokeWidth={1} />
          <ArcDivider
            className="absolute bottom-10 h-40 rotate-180 opacity-90"
            color="#4FBF98"
            strokeWidth={1.5}
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-navy-700">
            <motion.span
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-mint-500"
            />
            <svg width="34" height="34" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 12C1 12 3 3 8 3C13 3 15 12 15 12"
                stroke="#4FBF98"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        ref={countRef}
        style={{ x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 left-2 rounded-xl2 border border-line/70 bg-warm-100/90 px-5 py-4 shadow-card-hover backdrop-blur-md"
      >
        <p className="font-display text-2xl font-medium tabular-nums text-navy-700">
          {satisfaction}%
        </p>
        <p className="text-[12.5px] text-ink-muted">Patient satisfaction</p>
      </motion.div>

      {/* Floating rating chip */}
      <motion.div
        style={{ x: useTransform(cardX, (v) => -v), y: cardY }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 right-0 flex items-center gap-1.5 rounded-full border border-line/70 bg-warm-100/90 px-4 py-2 shadow-card backdrop-blur-md"
      >
        <Star size={14} className="fill-mint-500 text-mint-500" />
        <span className="text-[13px] font-medium text-navy-700">4.9 · 600+ reviews</span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    if (!tourOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTourOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [tourOpen]);

  return (
    <section className="relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(62,124,166,0.08),transparent_55%)]" />

      <div className="container-content">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-warm-100 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
              <span className="text-[12.5px] font-medium text-ink-muted">
                {SITE.city}&apos;s precision dental studio, since {SITE.founded}
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,2rem+3vw,4.6rem)] font-medium leading-[1.04] tracking-tightest text-navy-700 text-balance">
              {headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-7 max-w-lg text-[18px] leading-relaxed text-ink-muted"
            >
              Every treatment at smile360 starts with a 3D scan of your own
              mouth, not a guess. You&apos;ll see your plan, and often your
              result, before we begin.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="/appointment" size="lg">
                Book Appointment
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <button
                type="button"
                onClick={() => setTourOpen(true)}
                className="group flex items-center gap-2.5 text-[15px] font-medium text-navy-700"
                aria-label="Watch clinic tour"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-700/15 transition group-hover:border-navy-700">
                  <PlayCircle size={19} />
                </span>
                Watch Clinic Tour
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-8"
            >
              <div className="flex -space-x-3">
                {["AR", "BF", "OS", "SI"].map((initials) => (
                  <InitialsAvatar key={initials} initials={initials} size="sm" className="ring-2 ring-warm" />
                ))}
              </div>
              <div>
                <p className="font-display text-xl font-medium text-navy-700">{SITE.stats.yearsOpen}+ years</p>
                <p className="text-[13px] text-ink-muted">of clinical practice</p>
              </div>
              <div>
                <p className="font-display text-xl font-medium tabular-nums text-navy-700">
                  {SITE.stats.patientsTreated.toLocaleString()}+
                </p>
                <p className="text-[13px] text-ink-muted">patients treated</p>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>

      {tourOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="smile360 clinic tour"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setTourOpen(false);
          }}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl3 border border-white/10 bg-navy-900 shadow-2xl">
            <button
              type="button"
              onClick={() => setTourOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900/80 text-white backdrop-blur transition hover:bg-navy-900"
              aria-label="Close clinic tour"
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full bg-black">
              <video
                src="/videos/clinic-tour.mp4"
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              >
                Your browser does not support the video element.
              </video>
            </div>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 md:flex"
      >
        <span className="eyebrow">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-ink-faint" />
        </motion.div>
      </motion.div>
    </section>
  );
}
