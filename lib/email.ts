import { Resend } from "resend";
import { StoredAppointment } from "@/lib/storage/appointments";
import { SITE } from "@/lib/constants/site";
import { SERVICES } from "@/lib/constants/services";
import { DOCTORS } from "@/lib/constants/doctors";

let resendClient: Resend | null = null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendAppointmentEmailNotification(
  appointment: StoredAppointment
): Promise<{ success: boolean; error?: string; emailId?: string }> {
  try {
    const resend = getResendClient();
    if (!resend) {
      console.warn("[Email Notification] RESEND_API_KEY is not configured.");
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    const recipientEmail = process.env.CLINIC_NOTIFICATION_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!recipientEmail) {
      console.error("[Email Notification] CLINIC_NOTIFICATION_EMAIL is not configured.");
      return { success: false, error: "CLINIC_NOTIFICATION_EMAIL not configured" };
    }

    if (!fromEmail) {
      console.error("[Email Notification] RESEND_FROM_EMAIL is not configured.");
      return { success: false, error: "RESEND_FROM_EMAIL not configured" };
    }

    const serviceObj = SERVICES.find((s) => s.slug === appointment.service);
    const serviceName = serviceObj ? serviceObj.name : appointment.service;

    const doctorObj = DOCTORS.find((d) => d.slug === appointment.doctor);
    const doctorName = doctorObj ? doctorObj.name : appointment.doctor;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #1E293B; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background-color: #0F172A; padding: 24px 32px; color: #FAF7F2; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
            .header p { margin: 4px 0 0; font-size: 13px; color: #4FBF98; }
            .content { padding: 32px; }
            .badge { display: inline-block; background-color: #E6F8F3; color: #065F46; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
            .details-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            .details-table td { padding: 12px 8px; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
            .details-table td.label { font-weight: 600; color: #475569; width: 35%; }
            .details-table td.value { color: #0F172A; }
            .notes-box { margin-top: 20px; padding: 16px; background-color: #F8FAFC; border-radius: 8px; border-left: 4px solid #4FBF98; font-size: 14px; color: #334155; }
            .footer { padding: 20px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${SITE.name}</h1>
              <p>New Appointment Request • Front Desk Notification</p>
            </div>
            <div class="content">
              <span class="badge">Reference ID: ${appointment.id}</span>
              <p style="margin-top: 0; font-size: 15px; line-height: 1.5;">
                A new appointment booking request has been submitted. Please review the details below and contact the patient to confirm their slot:
              </p>

              <table class="details-table">
                <tr>
                  <td class="label">Patient Name</td>
                  <td class="value"><strong>${appointment.name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Phone Number</td>
                  <td class="value"><a href="tel:${appointment.phone}" style="color: #0F172A; text-decoration: underline;">${appointment.phone}</a></td>
                </tr>
                <tr>
                  <td class="label">Email</td>
                  <td class="value"><a href="mailto:${appointment.email}" style="color: #0F172A; text-decoration: underline;">${appointment.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Requested Treatment</td>
                  <td class="value"><strong>${serviceName}</strong></td>
                </tr>
                <tr>
                  <td class="label">Preferred Doctor</td>
                  <td class="value">${doctorName}</td>
                </tr>
                <tr>
                  <td class="label">Preferred Date</td>
                  <td class="value"><strong>${appointment.date}</strong></td>
                </tr>
                <tr>
                  <td class="label">Preferred Time</td>
                  <td class="value"><strong>${appointment.time}</strong></td>
                </tr>
              </table>

              ${
                appointment.notes
                  ? `
                <div class="notes-box">
                  <strong>Patient Notes / Symptoms:</strong><br>
                  ${escapeHtml(appointment.notes)}
                </div>
              `
                  : ""
              }
            </div>
            <div class="footer">
              ${SITE.name} • ${SITE.addressLine1}, ${SITE.city}<br>
              Phone: ${SITE.phoneDisplay} | WhatsApp: ${SITE.whatsappDisplay}
            </div>
          </div>
        </body>
      </html>
    `;

    // Production sender: an address on a domain verified in Resend.
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `New Appointment Request: ${appointment.name} (${appointment.date} at ${appointment.time})`,
      html: emailHtml,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return { success: false, error: error.message };
    }

    console.log(`[Resend Success] Email notification sent to ${recipientEmail}, id:`, data?.id);
    return { success: true, emailId: data?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Resend Exception]", errorMsg);
    return { success: false, error: errorMsg };
  }
}
