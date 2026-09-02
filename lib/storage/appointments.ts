import { AppointmentFormValues } from "@/lib/schema";
import { sendAppointmentEmailNotification } from "@/lib/email";

export interface StoredAppointment extends AppointmentFormValues {
  id: string;
  createdAt: string;
  status: "received" | "confirmed" | "cancelled";
}

export interface AppointmentRequestResult {
  appointment: StoredAppointment;
  notification: {
    success: boolean;
    error?: string;
    emailId?: string;
  };
}

// In-memory appointments store for the server runtime
const appointmentsStore: StoredAppointment[] = [];

export async function createAppointmentRequest(
  data: AppointmentFormValues
): Promise<AppointmentRequestResult> {
  // Generate a clean human-readable reference ID
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `APT-${dateStr}-${randomSuffix}`;

  const appointment: StoredAppointment = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
    status: "received",
  };

  appointmentsStore.unshift(appointment);

  // Wait for Resend so the API never reports a notification as successful when it failed.
  const notification = await sendAppointmentEmailNotification(appointment);

  return { appointment, notification };
}

export function getAllAppointments(): StoredAppointment[] {
  return [...appointmentsStore];
}

export function getAppointmentById(id: string): StoredAppointment | undefined {
  return appointmentsStore.find((apt) => apt.id === id);
}
