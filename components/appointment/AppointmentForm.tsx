"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/schema";
import { SelectField } from "@/components/ui/Select";
import { DatePickerField } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants/services";
import { DOCTORS } from "@/lib/constants/doctors";

const TIME_SLOTS = [
  "9:00 AM", "9:45 AM", "10:30 AM", "11:15 AM", "12:00 PM",
  "2:00 PM", "2:45 PM", "3:30 PM", "4:15 PM", "5:00 PM", "5:45 PM",
];

interface AppointmentFormProps {
  initialService?: string;
  initialDoctor?: string;
}

export function AppointmentForm({ initialService, initialDoctor }: AppointmentFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: initialService ?? "",
      doctor: initialDoctor ?? "",
      date: "",
      time: "",
      notes: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.details || data.error || "Failed to submit request.");
      }

      setConfirmedId(data.appointment?.id || null);
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please call the clinic.";
      setSubmitError(message);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center rounded-xl3 border border-line bg-warm-100 px-8 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: "spring", bounce: 0.45 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-mint-50"
        >
          <CheckCircle2 size={30} className="text-mint-600" />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-medium text-navy-700">Request received</h3>
        {confirmedId && (
          <span className="mt-2 inline-block rounded-full bg-surface px-3 py-1 text-xs font-mono text-ink-muted">
            Ref: {confirmedId}
          </span>
        )}
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-muted">
          Our front desk will call within one business day to confirm your slot. Check your inbox
          for a copy of this request.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            reset();
            setConfirmedId(null);
            setSubmitted(false);
          }}
        >
          Book another appointment
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-xl3 border border-line bg-warm-100 p-6 md:p-10">
      {submitError && (
        <div className="mb-6 rounded-xl2 border border-red-200 bg-red-50 p-4 text-[13.5px] text-red-700">
          <p className="font-medium">Could not submit request:</p>
          <p className="mt-0.5">{submitError}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Full name
          </label>
          <div className="relative">
            <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className="h-[52px] w-full rounded-xl2 border border-line bg-warm-100 pl-11 pr-4 text-[14.5px] text-ink focus:border-navy-700 focus:outline-none"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[12.5px] text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Phone number
          </label>
          <div className="relative">
            <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              id="phone"
              {...register("phone")}
              placeholder="0300 1112233"
              className="h-[52px] w-full rounded-xl2 border border-line bg-warm-100 pl-11 pr-4 text-[14.5px] text-ink focus:border-navy-700 focus:outline-none"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-[12.5px] text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Email
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="h-[52px] w-full rounded-xl2 border border-line bg-warm-100 pl-11 pr-4 text-[14.5px] text-ink focus:border-navy-700 focus:outline-none"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-[12.5px] text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Treatment
          </label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <SelectField
                id="service"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Choose a treatment"
                error={!!errors.service}
                options={SERVICES.map((s) => ({ value: s.slug, label: s.name }))}
              />
            )}
          />
          {errors.service && <p className="mt-1.5 text-[12.5px] text-red-500">{errors.service.message}</p>}
        </div>

        <div>
          <label htmlFor="doctor" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Preferred doctor
          </label>
          <Controller
            name="doctor"
            control={control}
            render={({ field }) => (
              <SelectField
                id="doctor"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="No preference"
                error={!!errors.doctor}
                options={DOCTORS.map((d) => ({ value: d.slug, label: d.name }))}
              />
            )}
          />
          {errors.doctor && <p className="mt-1.5 text-[12.5px] text-red-500">{errors.doctor.message}</p>}
        </div>

        <div>
          <label htmlFor="date" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Preferred date
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePickerField id="date" value={field.value} onChange={field.onChange} error={!!errors.date} />
            )}
          />
          {errors.date && <p className="mt-1.5 text-[12.5px] text-red-500">{errors.date.message}</p>}
        </div>

        <div>
          <label htmlFor="time" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Preferred time
          </label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <SelectField
                id="time"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Choose a time"
                error={!!errors.time}
                options={TIME_SLOTS.map((t) => ({ value: t, label: t }))}
              />
            )}
          />
          {errors.time && <p className="mt-1.5 text-[12.5px] text-red-500">{errors.time.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="notes" className="mb-2 block text-[13.5px] font-medium text-navy-700">
            Anything we should know? <span className="text-ink-faint">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare size={16} className="pointer-events-none absolute left-4 top-4 text-ink-faint" />
            <textarea
              id="notes"
              {...register("notes")}
              rows={3}
              placeholder="Sensitivity, previous treatment, scheduling constraints..."
              className="w-full resize-none rounded-xl2 border border-line bg-warm-100 py-3.5 pl-11 pr-4 text-[14.5px] text-ink focus:border-navy-700 focus:outline-none"
            />
          </div>
          {errors.notes && <p className="mt-1.5 text-[12.5px] text-red-500">{errors.notes.message}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full sm:w-auto">
        <AnimatePresence mode="wait" initial={false}>
          {isSubmitting ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 size={16} className="animate-spin" />
              Sending request...
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Confirm Appointment Request
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      <p className="mt-4 text-[12.5px] text-ink-muted">
        This confirms your request — our front desk will call to finalise the slot.
      </p>
    </form>
  );
}
