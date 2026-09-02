import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: `Book an appointment at ${SITE.name} in ${SITE.city}.`,
};

interface AppointmentPageProps {
  searchParams: Promise<{ service?: string; doctor?: string }>;
}

export default async function AppointmentPage({ searchParams }: AppointmentPageProps) {
  const params = await searchParams;

  return (
    <div className="bg-surface pb-24 pt-36 md:pt-44">
      <div className="container-content max-w-3xl">
        <Link
          href="/"
          className="mb-8 flex w-fit items-center gap-2 text-[13.5px] font-medium text-ink-muted transition hover:text-navy-700"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <span className="eyebrow mb-4 block">Book Appointment</span>
        <h1 className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] font-medium leading-[1.1] tracking-tightest text-navy-700 text-balance">
          Let&apos;s find you a time.
        </h1>
        <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-muted">
          Fill in a few details and our front desk will confirm your slot within one business
          day. For same-day emergencies, call{" "}
          <a href={`tel:${SITE.emergencyLine}`} className="font-medium text-navy-700 underline">
            {SITE.emergencyLine}
          </a>{" "}
          instead.
        </p>

        <div className="mt-10">
          <AppointmentForm initialService={params.service} initialDoctor={params.doctor} />
        </div>
      </div>
    </div>
  );
}
