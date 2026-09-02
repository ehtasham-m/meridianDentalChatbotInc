import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/schema";
import { createAppointmentRequest } from "@/lib/storage/appointments";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = appointmentSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errorMessages,
        },
        { status: 400 }
      );
    }

    const { appointment, notification } = await createAppointmentRequest(parseResult.data);

    if (!notification.success) {
      console.error("Appointment notification failed", {
        appointmentId: appointment.id,
        error: notification.error,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Your request was saved, but we could not notify the clinic. Please call the clinic to confirm it.",
          appointment: { id: appointment.id },
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been received. Our front desk will call to finalise the slot.",
        appointment: {
          id: appointment.id,
          name: appointment.name,
          service: appointment.service,
          doctor: appointment.doctor,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status,
          createdAt: appointment.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment request:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit appointment request. Please try calling the clinic directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
