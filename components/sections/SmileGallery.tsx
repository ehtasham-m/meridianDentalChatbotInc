"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { GALLERY_CASES, GALLERY_CATEGORIES } from "@/lib/constants/gallery";
import { cn } from "@/lib/utils";

export function SmileGallery() {
  const [category, setCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    category === "All" ? GALLERY_CASES : GALLERY_CASES.filter((c) => c.category === category);

  const active = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <SectionWrapper id="gallery" tone="surface">
      <SectionHeading
        eyebrow="Smile Gallery"
        title="Drag to compare. Every case is real."
        description="Representative results by treatment type. Drag the divider, or use arrow keys once it's focused."
        action={
          <div className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                  category === cat
                    ? "border-navy-700 bg-navy-700 text-warm-100"
                    : "border-line text-ink-muted hover:border-navy-700/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.button
            key={item.slug}
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group text-left"
          >
            <div className="overflow-hidden rounded-xl3 transition-transform duration-400 ease-premium group-hover:-translate-y-1">
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-[14.5px] font-medium text-navy-700">{item.title}</p>
                <p className="text-[12.5px] text-ink-muted">{item.treatment}</p>
              </div>
              <Badge variant="outline">{item.category}</Badge>
            </div>
          </motion.button>
        ))}
      </div>

      <Modal
        open={active !== null}
        onOpenChange={(o) => !o && setLightboxIndex(null)}
        title={active?.title ?? ""}
        widthClass="max-w-3xl"
      >
        {active && (
          <div>
            <BeforeAfterSlider
            beforeImage={active.beforeImage}
            afterImage={active.afterImage}
            className="mb-6"
          />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-6 text-[13.5px]">
                <div>
                  <p className="text-ink-muted">Treatment</p>
                  <p className="font-medium text-navy-700">{active.treatment}</p>
                </div>
                <div>
                  <p className="text-ink-muted">Timeline</p>
                  <p className="font-medium text-navy-700">{active.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  aria-label="Previous case"
                  onClick={() =>
                    setLightboxIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-navy-700"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  aria-label="Next case"
                  onClick={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % filtered.length))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-navy-700"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
