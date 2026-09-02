import { Phone, Mail, MapPin, Clock, MessageCircle, Car, Navigation } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants/site";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    SITE.mapEmbedQuery
  )}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    SITE.mapEmbedQuery
  )}`;

  return (
    <SectionWrapper id="contact" tone="surface">
      <SectionHeading
        eyebrow="Contact"
        title="Come see the studio for yourself."
        description="Walk-ins are welcome for consultations, though booking ahead guarantees your preferred time."
      />

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-5">
          <div className="rounded-xl2 border border-line bg-warm-100 p-6">
            <div className="flex items-start gap-3.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-mint-600" />
              <div>
                <p className="text-[14.5px] font-medium text-navy-700">{SITE.addressLine1}</p>
                <p className="text-[13.5px] text-ink-muted">{SITE.addressLine2}</p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-clinical-600"
                >
                  <Navigation size={12} />
                  Get directions
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl2 border border-line bg-warm-100 p-6">
            <div className="flex items-start gap-3.5">
              <Clock size={18} className="mt-0.5 shrink-0 text-mint-600" />
              <div className="flex-1">
                <p className="mb-2.5 text-[14.5px] font-medium text-navy-700">Working hours</p>
                <div className="flex flex-col gap-1.5">
                  {SITE.hours.map((h) => (
                    <div key={h.days} className="flex justify-between text-[13.5px] text-ink-muted">
                      <span>{h.days}</span>
                      <span className="text-ink">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-start gap-2.5 rounded-xl2 border border-line bg-warm-100 p-5 transition hover:border-mint-500"
            >
              <MessageCircle size={17} className="text-mint-600" />
              <span className="text-[13.5px] font-medium text-navy-700">WhatsApp</span>
              <span className="text-[12.5px] text-ink-muted">{SITE.whatsappDisplay}</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex flex-col items-start gap-2.5 rounded-xl2 border border-line bg-warm-100 p-5 transition hover:border-mint-500"
            >
              <Mail size={17} className="text-mint-600" />
              <span className="text-[13.5px] font-medium text-navy-700">Email</span>
              <span className="text-[12.5px] text-ink-muted">{SITE.email}</span>
            </a>
          </div>

          <div className="rounded-xl2 border border-line bg-navy-700 p-6 text-warm-100">
            <div className="flex items-start gap-3.5">
              <Phone size={18} className="mt-0.5 shrink-0 text-mint-500" />
              <div>
                <p className="text-[14.5px] font-medium">Dental emergency?</p>
                <p className="mt-1 text-[13px] text-warm-100/65">
                  Call our emergency line, answered 24/7.
                </p>
                <a href={`tel:${SITE.emergencyLine}`} className="mt-2 block text-[14px] font-medium text-mint-500">
                  {SITE.emergencyLine}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-xl2 border border-line bg-warm-100 p-6">
            <Car size={18} className="mt-0.5 shrink-0 text-mint-600" />
            <div>
              <p className="text-[14.5px] font-medium text-navy-700">Parking</p>
              <p className="mt-1 text-[13px] text-ink-muted">
                Complimentary valet at the building entrance during working hours.
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-[420px] overflow-hidden rounded-xl3 border border-line lg:min-h-full">
          <iframe
            title="smile360 Dental Studio location"
            src={mapSrc}
            className="h-full min-h-[420px] w-full grayscale-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="mt-6">
        <Button href="/appointment" size="lg">
          Book Appointment
        </Button>
      </div>
    </SectionWrapper>
  );
}
