import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/schema";
import { createAppointmentRequest, getAllAppointments } from "@/lib/storage/appointments";

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

    const appointment = await createAppointmentRequest(parseResult.data);

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
  // Returns summary of recent appointment requests (without exposing sensitive info)
  const all = getAllAppointments();
  return NextResponse.json({
    total: all.length,
    appointments: all.map((a) => ({
      id: a.id,
      name: a.name,
      service: a.service,
      doctor: a.doctor,
      date: a.date,
      time: a.time,
      status: a.status,
      createdAt: a.createdAt,
    })),
  });
}
