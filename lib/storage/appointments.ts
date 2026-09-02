import { AppointmentFormValues } from "@/lib/schema";
import { sendAppointmentEmailNotification } from "@/lib/email";

export interface StoredAppointment extends AppointmentFormValues {
  id: string;
  createdAt: string;
  status: "received" | "confirmed" | "cancelled";
}

// In-memory appointments store for the server runtime
const appointmentsStore: StoredAppointment[] = [];

export async function createAppointmentRequest(
  data: AppointmentFormValues
): Promise<StoredAppointment> {
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

  // Send real email notification asynchronously via Resend
  sendAppointmentEmailNotification(appointment).catch((err) => {
    console.error("[Email Notification Failed]", err);
  });

  return appointment;
}

export function getAllAppointments(): StoredAppointment[] {
  return [...appointmentsStore];
}

export function getAppointmentById(id: string): StoredAppointment | undefined {
  return appointmentsStore.find((apt) => apt.id === id);
}
