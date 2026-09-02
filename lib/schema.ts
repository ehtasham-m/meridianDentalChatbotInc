import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Enter your full name")
    .max(80, "That name looks too long"),
  phone: z
    .string()
    .min(9, "Enter a valid phone number")
    .regex(/^[0-9+()\-\s]+$/, "Use numbers only, e.g. 0300 1112233"),
  email: z.string().email("Enter a valid email address"),
  service: z.string().min(1, "Choose a treatment"),
  doctor: z.string().min(1, "Choose a doctor"),
  date: z.string().min(1, "Choose a date"),
  time: z.string().min(1, "Choose a time"),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
