"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, PlayCircle, Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InitialsAvatar, RatingStars } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [videoOpen, setVideoOpen] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <SectionWrapper id="testimonials" tone="warm">
      <SectionHeading
        eyebrow="Testimonials"
        title="What patients say, unedited."
        description="Pulled from our verified Google Business reviews."
        action={
          <a
            href="https://www.google.com/search?q=smile360+Dental+Studio+reviews"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-medium text-navy-700 transition hover:border-navy-700"
          >
            <Star size={13} className="fill-mint-500 text-mint-500" />
            4.9 on Google · 600+ reviews
          </a>
        }
      />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 lg:basis-1/3">
              <div className="flex h-full flex-col rounded-xl2 border border-line bg-warm-100 p-7">
                <RatingStars rating={t.rating} />
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <div className="flex items-center gap-3">
                    <InitialsAvatar initials={t.initials} size="sm" />
                    <div>
                      <p className="text-[14px] font-medium text-navy-700">{t.name}</p>
                      <p className="text-[12.5px] text-ink-muted">{t.treatment}</p>
                    </div>
                  </div>
                  {t.hasVideo && (
                    <button
                      onClick={() => setVideoOpen(t.name)}
                      aria-label={`Watch ${t.name}'s video testimonial`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-mint-500 transition hover:bg-navy-900"
                    >
                      <PlayCircle size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-6 bg-navy-700" : "w-1.5 bg-line"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous testimonial"
            onClick={() => emblaApi?.scrollPrev()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition hover:border-navy-700"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => emblaApi?.scrollNext()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition hover:border-navy-700"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <Modal
        open={videoOpen !== null}
        onOpenChange={(o) => !o && setVideoOpen(null)}
        title={`${videoOpen ?? ""}'s story`}
        widthClass="max-w-2xl"
      >
        <div className="flex aspect-video items-center justify-center rounded-xl2 bg-navy-700 text-warm-100/60">
          <PlayCircle size={40} />
        </div>
        <p className="mt-4 text-[13.5px] text-ink-muted">
          Video testimonial placeholder — connect your hosted video source here.
        </p>
      </Modal>
    </SectionWrapper>
  );
}
